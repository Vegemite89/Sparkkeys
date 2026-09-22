# SparkKeys — handoff for another Grok

Copy everything below into a new Grok chat or Grok Bot. Work in this repository. Do not invent a repo tree.

---

Project: SparkKeys. Beginner-to-intermediate piano teaching app.

Owner direction: patient piano instructor + practical engineer. Change the existing app. Do not rebuild unless asked. Small testable steps. Never invent a public https link. iPhone cannot run a downloaded HTML folder as a website. Do not tell the user to open index.html in Safari/Chrome on iOS. Do not claim untested features. Do not store PAN/CVV. When asked for the app, return the full folder + zip.

## What exists (web prototype — THIS is the product today)

```
index.html              screens; loads css + js (flat on GitHub: app.css, *.js at root)
app.css / css/app.css   dark studio, teal/gold, keys, landscape
grand-engine.js         ONLY PianoEngine
mic-engine.js           MicPitch (Web Audio autocorrelation → InputProvider)
app.js                  lessons, waterfall, scoring, save, MIDI + mic UI
GROK-HANDOFF.md         these rules
```

Load order must stay: `grand-engine.js` → `mic-engine.js` → `app.js`. One `const PianoEngine` only, in grand-engine.js.

## What is only in the PRD (not built)

Native iOS + Android Flutter app. Real OAuth. App Store / Play / Stripe payments. Multi-velocity bundled grand (pp/mp/mf/ff). Offline sample pack. Do not implement those unless asked. Do not treat PRD text as current code.

## Audio (honest)

Web uses **recorded acoustic-grand samples**, one dynamic per pitch (C1–C8) from tonejs-instruments CDN. Velocity is **gain + low-pass**, not extra hammer recordings.

- currentVelocityLayers: 1
- plannedNativeVelocityLayers: 4
- 64-voice cap, hold-to-sustain, MIDI CC64 pedal, light resonance, hall send
- First tap resumes AudioContext, loads pressed note first, max 3 downloads at once
- Optional later: `samples/soft|medium|hard/C4.mp3` drop-in
- Oscillator fallback was removed

## Teaching product (in app.js)

- 25 song-first lessons (TEST_UNLOCK_ALL = true)
- Songs: Ode to Joy, Twinkle, Mary, Canon (beginner C), Clair de Lune (simplified), Keys tour
- First song from two-stave Ode PDF: C major 4/4, rests bars 4 and 8; LH walks on the same quarter grid
- Modes: Waterfall (default), Sheet
- Hands: Right, Left, Both
- Assist: Learn, Practice, Challenge
- Wait-for-you: tiles pause until the correct key; held bass may continue
- Scoring, badges by stage, auto-advance to next lesson
- Progress: localStorage `sparkkeys-progress-v2` (completed[], currentLesson, unlocked[], badges)
- Profile: localStorage `sparkkeys-profile-v1` (name, email, provider email|google|facebook, signedIn). Google/Facebook are local tags only
- Inputs: pointer multitouch piano, computer keys, Web MIDI, MicPitch (mic-engine.js → InputProvider). Long-press callout disabled on keys
- Landscape: viewport width/height + matchMedia + visualViewport + resize. Wide button is preview fallback. Do not fake rotate(90deg)
- Visuals: dark stage, teal/gold, camera ease into studio, ambient lights, finger coach at TOP of waterfall

## GitHub

Account: Vegemite89
Repo: https://github.com/Vegemite89/Sparkkeys
Grok Bot should clone or edit this repo. Work on `index.html`, `css/app.css`, `js/grand-engine.js`, `js/app.js`. Do not invent a second app.
GitHub Pages is not enabled. Do not invent a public site URL.

## Payments

Prototype is not checkout. Never store card numbers. Future: App Store, Play Billing, or Stripe tokens only.

## Finish order (unless user changes it)

1. Playable app from these files
2. Audio feel: hold, chords, no stuck notes
3. Landscape playability
4. Native app from the PRD

## Rules for the next Grok or Grok Bot

- Edit existing files. Do not start a new app.
- Do not strip lessons, scoring, MIDI, profile, or waterfall to fix audio.
- After a change, list what to tap to verify.
- If asked to send the app: zip this folder including all html/css/js.
