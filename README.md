# SparkKeys

Web prototype of a beginner piano app.

## Files in this repo

```
index.html         app shell (home, studio, course, theory, profile)
app.css            dark studio theme, keys, landscape
grand-engine.js    recorded grand samples (1 velocity layer + gain/filter)
mic-engine.js      MicPitch — Web Audio single-note mic → InputProvider
app.js             25 lessons, waterfall, scoring, localStorage
GROK-HANDOFF.md    brief for another Grok chat
```

`index.html` loads `app.css`, then `grand-engine.js`, `mic-engine.js`, then `app.js`.

Input: on-screen touch, Web MIDI, and microphone note recognition (quiet room, single notes).

The Grok project folder still uses `css/app.css` and `js/…`. This GitHub copy is flattened so the page actually finds the files.

Audio: one recorded dynamic per pitch from a CDN. Not four hammer layers.
