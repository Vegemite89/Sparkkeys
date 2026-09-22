# SparkKeys

Beginner piano teaching web prototype.

## Repo files that are the product today

- `index.html` — screens; loads CSS + JS
- `css/app.css` — dark studio, teal/gold, keys, landscape
- `js/grand-engine.js` — only `PianoEngine` (recorded grand samples, 1 velocity layer)
- `js/app.js` — lessons, waterfall, scoring, save
- `GROK-HANDOFF.md` — rules for any Grok / Grok Bot working on this app

`preview.html` lives in the Grok project folder for in-chat preview. It is the same app with CSS+JS inlined.

## Rules

- Change these files. Do not start a new app.
- Load order: `grand-engine.js` then `app.js`.
- One `const PianoEngine` only, in `grand-engine.js`.
- Audio is recorded samples from the tonejs-instruments CDN, one dynamic per pitch. Velocity is gain + filter, not four hammer layers.
- Do not store card numbers.
- iPhone cannot run a downloaded HTML folder as a website.
- GitHub Pages is not enabled.

Repo: https://github.com/Vegemite89/Sparkkeys
