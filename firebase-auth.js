/**
 * SparkKeys Firebase Authentication (compat SDK).
 * Requires: firebase-app-compat, firebase-auth-compat, firebase-config.js
 * Never logs passwords.
 */
(function (global) {
  "use strict";

  var auth = null;
  var app = null;
  var ready = false;
  var initError = null;
  var unsubAuth = null;

  function friendlyAuthError(err) {
    var code = (err && err.code) || "";
    var map = {
      "auth/invalid-email": "That email does not look valid.",
      "auth/user-disabled": "This account has been disabled.",
      "auth/user-not-found": "No account found for that email.",
      "auth/wrong-password": "Incorrect password.",
      "auth/invalid-credential": "Email or password is incorrect.",
      "auth/email-already-in-use": "An account already exists for that email.",
      "auth/weak-password": "Password should be at least 6 characters.",
      "auth/operation-not-allowed": "This sign-in method is not enabled in Firebase Console.",
      "auth/popup-closed-by-user": "Sign-in popup was closed.",
      "auth/popup-blocked": "Popup blocked — allow popups for this site and try again.",
      "auth/cancelled-popup-request": "Another sign-in popup is already open.",
      "auth/account-exists-with-different-credential": "An account already exists with the same email but a different sign-in method.",
      "auth/network-request-failed": "Network error — check your connection.",
      "auth/too-many-requests": "Too many attempts. Wait a moment and try again.",
      "auth/unauthorized-domain": "This domain is not authorized in Firebase Console (Authentication → Settings → Authorized domains)."
    };
    if (map[code]) return map[code];
    if (err && err.message && !/password/i.test(err.message)) return err.message;
    return "Sign-in failed. Please try again.";
  }

  function ensureReady() {
    if (!global.isFirebaseConfigured || !global.isFirebaseConfigured()) {
      var e = new Error("Auth not configured");
      e.code = "sparkkeys/not-configured";
      throw e;
    }
    if (initError) throw initError;
    if (!ready || !auth) {
      var e2 = new Error("Firebase Auth is not ready");
      e2.code = "sparkkeys/not-ready";
      throw e2;
    }
    return auth;
  }

  function providerIdFromUser(user) {
    if (!user) return null;
    var data = user.providerData && user.providerData[0];
    var pid = (data && data.providerId) || (user.isAnonymous ? "anonymous" : "password");
    if (pid === "password") return "email";
    if (pid === "google.com") return "google";
    if (pid === "facebook.com") return "facebook";
    return pid;
  }

  function publicUser(user) {
    if (!user) return null;
    return {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      provider: providerIdFromUser(user),
      isAnonymous: !!user.isAnonymous
    };
  }

  function emitAuth(user) {
    var pub = publicUser(user);
    global.sparkKeysUser = pub;
    try {
      if (typeof global.onSparkKeysAuth === "function") {
        global.onSparkKeysAuth(pub);
      }
    } catch (hookErr) {
      // Hook errors must not break auth flow
      console.warn("[SparkKeysAuth] onSparkKeysAuth hook error:", hookErr && hookErr.message);
    }
    try {
      global.dispatchEvent(new CustomEvent("sparkkeys-auth", { detail: pub }));
    } catch (_) {}
  }

  function init() {
    if (ready) return { ok: true, auth: auth };
    if (!global.isFirebaseConfigured || !global.isFirebaseConfigured()) {
      initError = null;
      ready = false;
      auth = null;
      return { ok: false, reason: "not-configured" };
    }
    if (typeof global.firebase === "undefined") {
      initError = new Error("Firebase SDK not loaded");
      return { ok: false, reason: "sdk-missing" };
    }
    try {
      var cfg = global.SPARKKEYS_FIREBASE;
      if (!global.firebase.apps || !global.firebase.apps.length) {
        app = global.firebase.initializeApp({
          apiKey: cfg.apiKey,
          authDomain: cfg.authDomain,
          projectId: cfg.projectId,
          storageBucket: cfg.storageBucket,
          messagingSenderId: cfg.messagingSenderId,
          appId: cfg.appId
        });
      } else {
        app = global.firebase.app();
      }
      auth = global.firebase.auth();
      ready = true;
      initError = null;
      if (unsubAuth) {
        try { unsubAuth(); } catch (_) {}
      }
      unsubAuth = auth.onAuthStateChanged(function (user) {
        emitAuth(user);
      });
      return { ok: true, auth: auth };
    } catch (err) {
      initError = err;
      ready = false;
      console.warn("[SparkKeysAuth] init failed:", err && err.message);
      return { ok: false, reason: "init-failed", error: err };
    }
  }

  function signUpEmail(email, password) {
    var a = ensureReady();
    return a.createUserWithEmailAndPassword(String(email || "").trim(), String(password || ""))
      .then(function (cred) { return publicUser(cred.user); })
      .catch(function (err) {
        var e = new Error(friendlyAuthError(err));
        e.code = err.code || "auth/unknown";
        throw e;
      });
  }

  function signInEmail(email, password) {
    var a = ensureReady();
    return a.signInWithEmailAndPassword(String(email || "").trim(), String(password || ""))
      .then(function (cred) { return publicUser(cred.user); })
      .catch(function (err) {
        var e = new Error(friendlyAuthError(err));
        e.code = err.code || "auth/unknown";
        throw e;
      });
  }

  function signInGoogle() {
    var a = ensureReady();
    var provider = new global.firebase.auth.GoogleAuthProvider();
    return a.signInWithPopup(provider)
      .then(function (cred) { return publicUser(cred.user); })
      .catch(function (err) {
        var e = new Error(friendlyAuthError(err));
        e.code = err.code || "auth/unknown";
        throw e;
      });
  }

  function signInFacebook() {
    var a = ensureReady();
    var provider = new global.firebase.auth.FacebookAuthProvider();
    return a.signInWithPopup(provider)
      .then(function (cred) { return publicUser(cred.user); })
      .catch(function (err) {
        var e = new Error(friendlyAuthError(err));
        e.code = err.code || "auth/unknown";
        throw e;
      });
  }

  function signOut() {
    var a = ensureReady();
    return a.signOut()
      .then(function () {
        emitAuth(null);
        return null;
      })
      .catch(function (err) {
        var e = new Error(friendlyAuthError(err));
        e.code = err.code || "auth/unknown";
        throw e;
      });
  }

  function onAuthChange(callback) {
    if (typeof callback !== "function") return function () {};
    init();
    if (!auth) {
      callback(null);
      return function () {};
    }
    return auth.onAuthStateChanged(function (user) {
      callback(publicUser(user));
    });
  }

  function currentUser() {
    if (!auth) return global.sparkKeysUser || null;
    return publicUser(auth.currentUser);
  }

  function isConfigured() {
    return !!(global.isFirebaseConfigured && global.isFirebaseConfigured());
  }

  function isReady() {
    return ready && !!auth;
  }

  global.SparkKeysAuth = {
    init: init,
    signUpEmail: signUpEmail,
    signInEmail: signInEmail,
    signInGoogle: signInGoogle,
    signInFacebook: signInFacebook,
    signOut: signOut,
    onAuthChange: onAuthChange,
    currentUser: currentUser,
    isConfigured: isConfigured,
    isReady: isReady,
    friendlyAuthError: friendlyAuthError
  };

  global.sparkKeysUser = global.sparkKeysUser || null;
  init();
})(typeof window !== "undefined" ? window : globalThis);
