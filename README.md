# SparkKeys

Beginner piano web app. Live at https://sparkkeys.web.app/ (Firebase Hosting, project `sparkkeys`).

This repo is the single source of truth for the live site. The files here are exactly what is deployed.

## How changes go live

open a PR -> preview link appears -> Mitchell approves -> merge deploys live

1. **Open a PR.** Every change goes on its own branch and pull request. Nobody pushes straight to `main`.
2. **Preview link appears.** GitHub Actions deploys the PR to a private Firebase preview channel and posts the link as a comment on the PR. Preview links expire after 7 days.
3. **Mitchell approves.** Mitchell tests the preview link on his iPhone. Nothing goes live without his yes.
4. **Merge deploys live.** Merging the PR into `main` deploys it to https://sparkkeys.web.app/ automatically.

If a release breaks something, roll back from Firebase Console -> Hosting -> Release history -> the previous release -> Roll back, or revert the merge commit on GitHub.

Deploys use the repo secret `FIREBASE_SERVICE_ACCOUNT_SPARKKEYS` (a Firebase Hosting service account key). Never commit keys, `.env` files or service-account JSON.

## Files

```
index.html          app shell (home, studio, course, theory, profile) + script load order
app.css             dark studio theme, keys, landscape, auth panel
grand-engine.js     PianoEngine: recorded grand samples from CDN (gain/filter velocity)
mic-engine.js       MicPitch: Web Audio single-note mic -> InputProvider
mic.css             mic chip / status styles
app.js              lessons, waterfall, scoring, profile, MIDI + mic UI
firebase-config.js  Firebase web config (public web keys only)
firebase-auth.js    Firebase Auth helpers (email/password, Google)
privacy.html        privacy policy
firebase.json       Firebase Hosting config (serves the repo root)
.firebaserc         default Firebase project: sparkkeys
.github/workflows/  preview-on-PR and deploy-on-merge workflows
AUTH-SETUP.md       Firebase Auth setup notes
Start.bat/serve.ps1 local Windows test server (http://127.0.0.1:8765/)
GROK-HANDOFF.md     brief for other assistants
```

Load order in `index.html`: `grand-engine.js` -> `mic-engine.js` -> `app.js`.

Audio: one recorded dynamic per pitch, loaded from a CDN.
