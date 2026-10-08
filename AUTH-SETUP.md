# SparkKeys Firebase Auth — Mitchell setup

Auth UI is in the app. It stays on **“Auth not configured”** until you paste a real Firebase web config.

## 1. Firebase Console

1. Open [Firebase Console](https://console.firebase.google.com/) → your SparkKeys project (or create one).
2. **Authentication → Sign-in method** — enable:
   - **Email/Password**
   - **Google**
   - **Facebook** (needs Meta app — see below)
3. **Authentication → Settings → Authorized domains** — add:
   - `localhost`
   - any staging/production host you use later

## 2. Facebook (Meta)

1. Create / open an app at [Meta for Developers](https://developers.facebook.com/).
2. Add Facebook Login; set Valid OAuth Redirect URIs to the URI Firebase shows for Facebook.
3. Copy **App ID** and **App Secret** into Firebase → Authentication → Facebook provider.

## 3. Paste web config into SparkKeys

1. Firebase → Project settings → Your apps → Web app → SDK setup.
2. Edit `firebase-config.js` and either:
   - Set `window.SPARKKEYS_FIREBASE` before the script loads, **or**
   - Replace the placeholder fields and set `configured: true`.

Example:

```js
window.SPARKKEYS_FIREBASE = {
  apiKey: "AIza…",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123…",
  appId: "1:123…:web:…",
  configured: true
};
```

`isFirebaseConfigured()` becomes true when placeholders are gone (or `configured: true` with real keys).

## 4. Local test

Serve the folder (static files only), open `index.html`, open **Profile** or the header **Sign in** chip.

```bash
cd /workspace/sparkkeys-fix
python3 -m http.server 8765
# open http://localhost:8765/
```

Popups (Google/Facebook) need a real browser; file:// may block them — use localhost.

## 5. What is still TODO

- **Delete account** — not implemented yet.
- **Anonymous auth** — optional later; not wired.
- **Cloud progress sync (Firestore)** — not invented yet. On sign-in the app sets `window.sparkKeysUser` and calls `onSparkKeysAuth(user)` so a future Firestore merge can hook in. Progress stays in **localStorage** as the offline fallback.
- **Do not sync Strobe** in this public folder (there is no Strobe here).

## Files

| File | Role |
|------|------|
| `firebase-config.js` | Placeholder / real config + `isFirebaseConfigured()` |
| `firebase-auth.js` | Compat Auth helpers |
| `index.html` | Profile panel + auth modal + CDN script order |
| `app.js` | Profile UI wiring + `onSparkKeysAuth` hook |
| `app.css` | Auth modal / panel styles |
