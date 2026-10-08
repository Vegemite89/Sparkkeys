/**
 * SparkKeys Firebase web config.
 *
 * Prefer setting window.SPARKKEYS_FIREBASE before this file loads, or paste your
 * Firebase Console web config into the object below and set configured: true.
 * Until then isFirebaseConfigured() is false and the UI shows "Auth not configured".
 */
(function (global) {
  "use strict";

  var PLACEHOLDER = {
    apiKey: "AIzaSyARZbLT0zyaZoAu_AHAgurnDNYM-OuPQZA",
    authDomain: "sparkkeys.firebaseapp.com",
    projectId: "sparkkeys",
    storageBucket: "sparkkeys.firebasestorage.app",
    messagingSenderId: "829867794335",
    appId: "1:829867794335:web:47f1bdbaa0d08766bbe7aa",
    measurementId: "G-YE6XCFRGPE",
    configured: true
  };

  var incoming = global.SPARKKEYS_FIREBASE;
  if (!incoming || typeof incoming !== "object") {
    global.SPARKKEYS_FIREBASE = Object.assign({}, PLACEHOLDER);
  } else {
    global.SPARKKEYS_FIREBASE = Object.assign({}, PLACEHOLDER, incoming);
  }

  function looksLikePlaceholder(value) {
    if (value == null) return true;
    var s = String(value).trim();
    if (!s) return true;
    return /^YOUR_/i.test(s) || s.indexOf("YOUR_PROJECT") !== -1;
  }

  function isFirebaseConfigured() {
    var c = global.SPARKKEYS_FIREBASE;
    if (!c || typeof c !== "object") return false;
    if (c.configured === false) return false;
    if (c.configured === true) {
      return !!(c.apiKey && c.authDomain && c.projectId && c.appId);
    }
    return (
      !looksLikePlaceholder(c.apiKey) &&
      !looksLikePlaceholder(c.authDomain) &&
      !looksLikePlaceholder(c.projectId) &&
      !looksLikePlaceholder(c.appId)
    );
  }

  global.isFirebaseConfigured = isFirebaseConfigured;
})(typeof window !== "undefined" ? window : globalThis);
