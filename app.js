const NOTE_NAMES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const midiName = m => NOTE_NAMES[m % 12] + (Math.floor(m / 12) - 1);
const isBlack = m => [1,3,6,8,10].includes(m % 12);
const WHITE_START = 36; // C2 so left-hand bass sits on real keys
const WHITE_END = 76;   // E5
const WHITES = [];
for (let m = WHITE_START; m <= WHITE_END; m++) if (!isBlack(m)) WHITES.push(m);

const SONGS = {
  ode: {
    title: "Ode to Joy",
    composer: "Beethoven · beginner",
    tip: "Right hand stays in C position: thumb on Middle C, then D E F G. The little rests in bars 4 and 8 are a breath — lift, then play.",
    bpm: 80,
    notes: [
      // melody from the two-stave PDF (quarters, rests in 4 and 8)
      n(0,1,64,3,"R"), n(1,1,64,3,"R"), n(2,1,65,4,"R"), n(3,1,67,5,"R"),
      n(4,1,67,5,"R"), n(5,1,65,4,"R"), n(6,1,64,3,"R"), n(7,1,62,2,"R"),
      n(8,1,60,1,"R"), n(9,1,60,1,"R"), n(10,1,62,2,"R"), n(11,1,64,3,"R"),
      n(12,1,64,3,"R"), n(14,1,62,2,"R"),
      n(16,1,64,3,"R"), n(17,1,64,3,"R"), n(18,1,65,4,"R"), n(19,1,67,5,"R"),
      n(20,1,67,5,"R"), n(21,1,65,4,"R"), n(22,1,64,3,"R"), n(23,1,62,2,"R"),
      n(24,1,60,1,"R"), n(25,1,60,1,"R"), n(26,1,62,2,"R"), n(27,1,64,3,"R"),
      n(28,1,62,2,"R"), n(30,1,60,1,"R"),
      // left hand walks on the same quarter grid as the right
      n(0,1,48,5,"L"), n(1,1,48,5,"L"), n(2,1,48,5,"L"), n(3,1,48,5,"L"),
      n(4,1,43,1,"L"), n(5,1,43,1,"L"), n(6,1,43,1,"L"), n(7,1,43,1,"L"),
      n(8,1,48,5,"L"), n(9,1,48,5,"L"), n(10,1,48,5,"L"), n(11,1,48,5,"L"),
      n(12,1,43,1,"L"), n(14,1,43,1,"L"),
      n(16,1,48,5,"L"), n(17,1,48,5,"L"), n(18,1,48,5,"L"), n(19,1,48,5,"L"),
      n(20,1,43,1,"L"), n(21,1,43,1,"L"), n(22,1,43,1,"L"), n(23,1,43,1,"L"),
      n(24,1,48,5,"L"), n(25,1,48,5,"L"), n(26,1,48,5,"L"), n(27,1,48,5,"L"),
      n(28,1,48,5,"L"), n(30,1,48,5,"L")
    ]
  },
  twinkle: {
    title: "Twinkle Twinkle",
    composer: "Traditional",
    tip: "Same C position. Notice how the tune climbs to A — your thumb can stay on C and your hand can stretch, or just hop finger 5 up to A and back.",
    bpm: 84,
    notes: [
      n(0,1,60,1,"R"), n(1,1,60,1,"R"), n(2,1,67,5,"R"), n(3,1,67,5,"R"), n(4,1,69,5,"R"), n(5,1,69,5,"R"), n(6,2,67,5,"R"),
      n(8,1,65,4,"R"), n(9,1,65,4,"R"), n(10,1,64,3,"R"), n(11,1,64,3,"R"), n(12,1,62,2,"R"), n(13,1,62,2,"R"), n(14,2,60,1,"R"),
      n(16,1,67,5,"R"), n(17,1,67,5,"R"), n(18,1,65,4,"R"), n(19,1,65,4,"R"), n(20,1,64,3,"R"), n(21,1,64,3,"R"), n(22,2,62,2,"R"),
      n(24,1,67,5,"R"), n(25,1,67,5,"R"), n(26,1,65,4,"R"), n(27,1,65,4,"R"), n(28,1,64,3,"R"), n(29,1,64,3,"R"), n(30,2,62,2,"R"),
      n(32,1,60,1,"R"), n(33,1,60,1,"R"), n(34,1,67,5,"R"), n(35,1,67,5,"R"), n(36,1,69,5,"R"), n(37,1,69,5,"R"), n(38,2,67,5,"R"),
      n(40,1,65,4,"R"), n(41,1,65,4,"R"), n(42,1,64,3,"R"), n(43,1,64,3,"R"), n(44,1,62,2,"R"), n(45,1,62,2,"R"), n(46,2,60,1,"R"),
      n(0,1,48,5,"L"), n(1,1,48,5,"L"), n(2,1,48,5,"L"), n(3,1,48,5,"L"),
      n(4,1,48,5,"L"), n(5,1,48,5,"L"), n(6,2,48,5,"L"),
      n(8,1,41,1,"L"), n(9,1,41,1,"L"), n(10,1,43,2,"L"), n(11,1,43,2,"L"), n(12,1,43,2,"L"), n(13,1,43,2,"L"), n(14,2,48,5,"L"),
      n(16,1,43,2,"L"), n(17,1,43,2,"L"), n(18,1,48,5,"L"), n(19,1,48,5,"L"), n(20,1,48,5,"L"), n(21,1,48,5,"L"), n(22,2,43,2,"L"),
      n(24,1,43,2,"L"), n(25,1,43,2,"L"), n(26,1,43,2,"L"), n(27,1,43,2,"L"), n(28,1,43,2,"L"), n(29,1,43,2,"L"), n(30,2,43,2,"L"),
      n(32,1,48,5,"L"), n(33,1,48,5,"L"), n(34,1,48,5,"L"), n(35,1,48,5,"L"), n(36,1,48,5,"L"), n(37,1,48,5,"L"), n(38,2,48,5,"L"),
      n(40,1,41,1,"L"), n(41,1,41,1,"L"), n(42,1,43,2,"L"), n(43,1,43,2,"L"), n(44,1,48,5,"L"), n(45,1,48,5,"L"), n(46,2,48,5,"L")
    ]
  },
  mary: {
    title: "Mary Had a Little Lamb",
    composer: "Traditional",
    tip: "This one starts on E with finger 3. Feel the little skip down to C, then back up. Keep your wrist soft.",
    bpm: 88,
    notes: [
      n(0,1,64,3,"R"), n(1,1,62,2,"R"), n(2,1,60,1,"R"), n(3,1,62,2,"R"), n(4,1,64,3,"R"), n(5,1,64,3,"R"), n(6,2,64,3,"R"),
      n(8,1,62,2,"R"), n(9,1,62,2,"R"), n(10,2,62,2,"R"), n(12,1,64,3,"R"), n(13,1,67,5,"R"), n(14,2,67,5,"R"),
      n(16,1,64,3,"R"), n(17,1,62,2,"R"), n(18,1,60,1,"R"), n(19,1,62,2,"R"), n(20,1,64,3,"R"), n(21,1,64,3,"R"), n(22,1,64,3,"R"), n(23,1,64,3,"R"),
      n(24,1,62,2,"R"), n(25,1,62,2,"R"), n(26,1,64,3,"R"), n(27,1,62,2,"R"), n(28,4,60,1,"R"),
      n(0,1,48,5,"L"), n(1,1,48,5,"L"), n(2,1,48,5,"L"), n(3,1,48,5,"L"), n(4,1,48,5,"L"), n(5,1,48,5,"L"), n(6,2,48,5,"L"),
      n(8,1,43,1,"L"), n(9,1,43,1,"L"), n(10,2,43,1,"L"), n(12,1,43,1,"L"), n(13,1,43,1,"L"), n(14,2,43,1,"L"),
      n(16,1,48,5,"L"), n(17,1,48,5,"L"), n(18,1,48,5,"L"), n(19,1,48,5,"L"), n(20,1,48,5,"L"), n(21,1,48,5,"L"), n(22,1,48,5,"L"), n(23,1,48,5,"L"),
      n(24,1,43,1,"L"), n(25,1,43,1,"L"), n(26,1,43,1,"L"), n(27,1,43,1,"L"), n(28,4,48,5,"L")
    ]
  },
  keys: {
    title: "Meet the keys",
    composer: "Guided tour",
    tip: "This is a playground. Tap any key, hear it, and watch its name. Middle C is the home base we will keep coming back to.",
    bpm: 70,
    notes: [
      n(0,2,60,1,"R"), n(2,2,62,2,"R"), n(4,2,64,3,"R"), n(6,2,65,4,"R"), n(8,2,67,5,"R"),
      n(10,2,67,5,"R"), n(12,2,65,4,"R"), n(14,2,64,3,"R"), n(16,2,62,2,"R"), n(18,2,60,1,"R")
    ]
  },
  canon: {
    title: "Canon in D",
    composer: "Pachelbel · beginner in C",
    tip: "This famous walk repeats: C G A E F C F G in the left hand. Hear the pattern first — that loop is the piece.",
    bpm: 76,
    notes: [
      n(0,2,64,3,"R"), n(2,2,62,2,"R"), n(4,2,60,1,"R"), n(6,2,59,1,"R"),
      n(8,2,57,1,"R"), n(10,2,55,5,"R"), n(12,2,57,1,"R"), n(14,2,59,2,"R"),
      n(0,2,48,5,"L"), n(2,2,43,1,"L"), n(4,2,45,2,"L"), n(6,2,40,5,"L"),
      n(8,2,41,5,"L"), n(10,2,36,5,"L"), n(12,2,41,5,"L"), n(14,2,43,1,"L")
    ]
  },
  clair: {
    title: "Clair de Lune",
    composer: "Debussy · beginner moonlight",
    tip: "Slow rocking: E to G and back. Soft wrists. This is the feeling of the piece, not the concert version.",
    bpm: 60,
    notes: [
      n(0,2,64,3,"R"), n(2,2,67,5,"R"), n(4,2,64,3,"R"), n(6,2,67,5,"R"),
      n(8,2,72,5,"R"), n(10,2,69,5,"R"), n(12,4,67,5,"R"),
      n(0,2,48,5,"L"), n(2,2,48,5,"L"), n(4,2,48,5,"L"), n(6,2,48,5,"L"),
      n(8,2,45,2,"L"), n(10,2,45,2,"L"), n(12,4,43,1,"L")
    ]
  }
};
function n(t,d,midi,finger,hand){ return {t,d,midi,finger,hand}; }

const state = {
  song: "ode",
  mode: "fall", // fall | sheet
  hands: "R",
  playing: false,
  wait: true,
  showNames: true,
  beat: 0,
  startPerf: 0,
  lastFrame: 0,
  bpm: 80,
  volume: 0.7,
  awaiting: [],
  audio: null,
  held: new Map(),
  assist: "learn",
  lessonId: null,
  lessonNotes: null,
  showFingers: true,
  showGuides: true,
  score: null,
  midi: { access: null, name: null },
  sustainPedal: false,
  forceLandscape: false
};

const els = {
  home: document.getElementById("home"),
  studio: document.getElementById("studio"),
  playBtn: document.getElementById("playBtn"),
  bpm: document.getElementById("bpm"),
  bpmLabel: document.getElementById("bpmLabel"),
  vol: document.getElementById("vol"),
  volLabel: document.getElementById("volLabel"),
  lessonTitle: document.getElementById("lessonTitle"),
  lessonSub: document.getElementById("lessonSub"),
  coach: document.getElementById("coach"),
  fall: document.getElementById("fall"),
  staffWrap: document.getElementById("staffWrap"),
  staff: document.getElementById("staff"),
  whites: document.getElementById("whites"),
  blacks: document.getElementById("blacks"),
  hintbar: document.getElementById("hintbar"),
  pbar: document.getElementById("pbar"),
  toast: document.getElementById("toast"),
  waitChip: document.getElementById("waitChip"),
  nameChip: document.getElementById("nameChip"),
  modeSheet: document.getElementById("modeSheet"),
  modeFall: document.getElementById("modeFall"),
  handR: document.getElementById("handR"),
  handL: document.getElementById("handL"),
  handB: document.getElementById("handB")
};

function currentNotes() {
  const all = state.lessonNotes || SONGS[state.song].notes;
  if (state.hands === "B") return all;
  return all.filter(x => x.hand === state.hands);
}
function songLen() {
  const notes = currentNotes();
  return notes.reduce((m, x) => Math.max(m, x.t + x.d), 8);
}

function ensureAudio() {
  const audio = PianoEngine.ensure();
  if (typeof PianoEngine.warmVisible === "function") PianoEngine.warmVisible(WHITE_START, WHITE_END);
  return audio;
}
function playTone(midi, dur = 0.4) {
  const id = PianoEngine.noteOn(midi, 84);
  const voice = PianoEngine.voices.find(v => v.id === id);
  if (voice) voice.preview = true;
  const ms = Math.max(160, dur * 1000);
  setTimeout(() => {
    const v = PianoEngine.voices.find(x => x.id === id);
    if (!v || v.dead) return;
    if (!v.preview && (touchHoldCount.get(midi) || 0) > 0) return;
    PianoEngine._release(v);
  }, ms);
}
const activeVoices = PianoEngine.held;
function startHeldNote(midi, velocity) {
  if (typeof PianoEngine.prioritize === "function") PianoEngine.prioritize(midi);
  PianoEngine.noteOn(midi, velocity == null ? 82 : velocity);
}
function stopHeldNote(midi) {
  PianoEngine.noteOff(midi);
}
function stopAllHeldNotes() {
  PianoEngine.stopAll();
}

/* ---------- keyboard ---------- */
function buildBoard() {
  els.whites.innerHTML = "";
  els.blacks.innerHTML = "";
  WHITES.forEach((midi, i) => {
    const k = document.createElement("div");
    k.className = "wkey";
    k.dataset.midi = midi;
    const name = document.createElement("div");
    name.className = "name";
    name.textContent = midi === 60 ? "Middle C" : NOTE_NAMES[midi % 12];
    const finger = document.createElement("div");
    finger.className = "finger";
    k.append(name, finger);
    bindKey(k, midi);
    els.whites.appendChild(k);
  });
  const whiteCount = WHITES.length;
  WHITES.forEach((midi, i) => {
    const nextBlack = midi + 1;
    if (isBlack(nextBlack) && nextBlack < WHITE_END) {
      const b = document.createElement("div");
      b.className = "bkey";
      b.dataset.midi = nextBlack;
      const left = ((i + 1) / whiteCount) * 100;
      b.style.left = `calc(${left}% - 3.6%)`;
      bindKey(b, nextBlack);
      els.blacks.appendChild(b);
    }
  });
  refreshNames();
}
const activePointers = new Map();
const touchHoldCount = new Map();
function bindKey(el, midi) {
  const down = event => {
    event.preventDefault();
    if (activePointers.has(event.pointerId)) return;
    try { el.setPointerCapture(event.pointerId); } catch {}
    activePointers.set(event.pointerId, midi);
    touchHoldCount.set(midi, (touchHoldCount.get(midi) || 0) + 1);
    pressKey(midi, true);
  };
  const up = event => {
    event.preventDefault();
    const held = activePointers.get(event.pointerId);
    if (held == null) return;
    activePointers.delete(event.pointerId);
    try { if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId); } catch {}
    const left = (touchHoldCount.get(held) || 1) - 1;
    if (left <= 0) {
      touchHoldCount.delete(held);
      pressKey(held, false);
    } else touchHoldCount.set(held, left);
  };
  el.addEventListener("pointerdown", down);
  el.addEventListener("pointerup", up);
  el.addEventListener("pointercancel", up);
  el.addEventListener("touchstart", event => event.preventDefault(), { passive: false });
  el.addEventListener("touchend", event => event.preventDefault(), { passive: false });
}
function keyEls(midi) {
  return [...document.querySelectorAll(`[data-midi="${midi}"]`)];
}
function pressKey(midi, on, velocity) {
  keyEls(midi).forEach(el => {
    if (on) el.classList.add("on");
    else if (!touchHoldCount.get(midi)) el.classList.remove("on");
  });
  InputProvider.note(midi, on, velocity);
}
function releaseTouchPointers() {
  const midis = new Set(activePointers.values());
  activePointers.clear();
  touchHoldCount.clear();
  midis.forEach(midi => {
    keyEls(midi).forEach(el => el.classList.remove("on"));
    stopHeldNote(midi);
  });
}
const InputProvider = {
  // Touch, computer keys, and MIDI all arrive here.
  // MicrophoneInput can later call note(midi, true) on onset.
  note(midi, on, velocity) {
    if (on) {
      startHeldNote(midi, velocity);
      scoreNote(midi);
      const waiting = awaitingList();
      const hit = waiting.find(x => x.midi === midi);
      if (state.wait && state.playing && hit) {
        const waited = performance.now() - (hit._asked || performance.now());
        if (state.score) {
          state.score.correct += 1;
          state.score.times.push(waited);
          state.score.streak += 1;
          state.score.bestStreak = Math.max(state.score.bestStreak, state.score.streak);
        }
        clearAwait(hit);
        flashToast("Yes — " + NOTE_NAMES[midi % 12]);
      } else if (state.wait && state.playing && waiting.length) {
        const want = waiting[0];
        if (state.score) {
          state.score.wrong += 1;
          state.score.streak = 0;
          state.score.errors.push({
            expected: want.midi,
            actual: midi,
            finger: want.finger,
            hand: want.hand,
            piece: state.song,
            lesson: state.lessonId
          });
        }
        els.hintbar.textContent = "Almost — want " + NOTE_NAMES[want.midi % 12] + " with finger " + want.finger;
        showGuide(want);
      }
    } else {
      stopHeldNote(midi);
    }
  }
};
function scoreNote() { /* scoring lives in InputProvider.note */ }
function flashToast(msg) {
  els.toast.textContent = msg;
  els.toast.classList.add("show");
  setTimeout(() => els.toast.classList.remove("show"), 700);
}
function refreshNames() {
  document.querySelectorAll(".wkey .name").forEach(n => {
    n.style.display = state.showNames ? "block" : "none";
  });
}
function clearGuides() {
  document.querySelectorAll(".wkey.guide, .bkey.guide").forEach(el => el.classList.remove("guide"));
  document.querySelectorAll(".finger").forEach(el => el.classList.remove("show"));
}
function showGuide(note) {
  if (!state.showGuides && state.assist === "challenge") return;
  keyEls(note.midi).forEach(el => {
    if (state.showGuides) el.classList.add("guide");
    const f = el.querySelector(".finger");
    if (f) f.classList.remove("show");
  });
}

/* ---------- playback ---------- */
function activeSet() {
  return currentNotes().filter(x => state.beat >= x.t - 0.02 && state.beat < x.t + x.d);
}
function startPlay() {
  if (state.lessonId) markCourseStarted();
  ensureAudio();
  currentNotes().slice(0, 8).forEach(x => {
    if (typeof PianoEngine.prioritize === "function") PianoEngine.prioritize(x.midi);
  });
  state.playing = true;
  state.beat = 0;
  state.startPerf = performance.now();
  state.lastFrame = state.startPerf;
  state.awaiting = [];
  currentNotes().forEach(x => { x._fired = false; delete x._asked; });
  state.score = { correct: 0, wrong: 0, streak: 0, bestStreak: 0, times: [], errors: [], started: performance.now() };
  els.playBtn.textContent = "■";
  els.playBtn.classList.add("stop");
  requestAnimationFrame(tick);
}
function stopPlay() {
  state.playing = false;
  state.awaiting = [];
  els.playBtn.textContent = "▶";
  els.playBtn.classList.remove("stop");
  clearGuides();
  document.querySelectorAll(".wkey.on, .bkey.on").forEach(el => el.classList.remove("on"));
}
function tick(now) {
  if (!state.playing) return;
  if (!(state.wait && awaitingList().length)) {
    const dt = (now - state.lastFrame) / 1000;
    state.beat += dt * (state.bpm / 60);
  }
  state.lastFrame = now;

  const len = songLen();
  els.pbar.style.width = Math.min(100, (state.beat / len) * 100) + "%";

  const notes = currentNotes();
  const justHit = notes.filter(x => state.beat >= x.t && state.beat < x.t + 0.05 && !x._fired);
  justHit.forEach(x => {
    x._fired = true;
    const heldOver = isHeldContinuation(x, notes) || isMidiDown(x.midi);
    if (!(state.wait) || heldOver) {
      if (!state.wait) {
        playTone(x.midi, Math.max(0.18, x.d * 60 / state.bpm));
        keyEls(x.midi).forEach(el => {
          el.classList.add("on");
          setTimeout(() => { if (!state.wait) el.classList.remove("on"); }, Math.max(120, x.d * 60000 / state.bpm * 0.7));
        });
      } else if (heldOver && state.score) {
        state.score.correct += 1;
        state.score.streak += 1;
        state.score.bestStreak = Math.max(state.score.bestStreak, state.score.streak);
      }
    } else {
      if (!Array.isArray(state.awaiting)) state.awaiting = [];
      if (!state.awaiting.some(n => n.midi === x.midi && n.hand === x.hand)) {
        state.awaiting.push(x);
        x._asked = performance.now();
      }
      els.hintbar.textContent = "Play " + prettyNote(x);
    }
  });
  state.awaiting = awaitingList().filter(n => {
    if (!isMidiDown(n.midi)) return true;
    if (state.score) {
      state.score.correct += 1;
      state.score.streak += 1;
    }
    return false;
  });

  clearGuides();
  activeSet().forEach(showGuide);
  const upcoming = notes.find(x => x.t >= state.beat - 0.01);
  if (upcoming) {
    els.coach.innerHTML = coachLine(upcoming);
  }

  if (state.mode === "fall") drawFall();
  else drawStaff();

  if (state.beat >= len + 0.4) {
    notes.forEach(x => x._fired = false);
    flashToast("Beautiful work.");
    stopPlay();
    els.coach.innerHTML = "That was the whole tune. Play it again slower, or switch to the other view.";
    if (state.lessonId) finishLessonAttempt();
    return;
  }
  requestAnimationFrame(tick);
}
function isMidiDown(midi) {
  return (touchHoldCount.get(midi) || 0) > 0 || PianoEngine.held.has(midi);
}
function isHeldContinuation(note, notes) {
  const prev = notes
    .filter(x => x.hand === note.hand && x.midi === note.midi && x.t < note.t - 0.001)
    .sort((a, b) => b.t - a.t)[0];
  return !!(prev && prev.t + prev.d >= note.t - 0.05);
}
function awaitingList() {
  return Array.isArray(state.awaiting) ? state.awaiting.filter(Boolean) : (state.awaiting ? [state.awaiting] : []);
}
function clearAwait(note) {
  const list = awaitingList();
  if (!list.length) return;
  const x = note || list[0];
  keyEls(x.midi).forEach(el => {
    el.classList.add("on");
    setTimeout(() => el.classList.remove("on"), 180);
  });
  state.awaiting = list.filter(n => n !== x);
  els.hintbar.textContent = "Keep going";
}
function prettyNote(x) {
  const letter = NOTE_NAMES[x.midi % 12];
  return `${letter} with finger ${x.finger} (${x.hand === "R" ? "right" : "left"} hand)`;
}
function coachLine(x) {
  return `Next: <b>${NOTE_NAMES[x.midi % 12]}</b> · finger <b>${x.finger}</b> · ${x.hand === "R" ? "right" : "left"} hand. Hold it for the length of the falling bar.`;
}

/* ---------- waterfall ---------- */
const fallSparks = [];
function spawnSparks(x, y, color, n) {
  for (let i = 0; i < n; i++) {
    fallSparks.push({
      x: x + (Math.random() - 0.5) * 10,
      y,
      vx: (Math.random() - 0.5) * 1.4,
      vy: -0.4 - Math.random() * 1.6,
      life: 1,
      color
    });
  }
}
function drawFall() {
  const c = els.fall;
  const dpr = window.devicePixelRatio || 1;
  const w = c.clientWidth, h = c.clientHeight;
  if (c.width !== w * dpr) { c.width = w * dpr; c.height = h * dpr; }
  const ctx = c.getContext("2d");
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  const haze = ctx.createLinearGradient(0, 0, 0, h);
  haze.addColorStop(0, "rgba(40,8,0,0)");
  haze.addColorStop(0.72, "rgba(40,10,0,.12)");
  haze.addColorStop(1, "rgba(70,30,8,.35)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, w, h);

  const look = 8;
  const header = 52;
  const hitY = h - 10;

  const rail = ctx.createLinearGradient(0, hitY - 10, 0, hitY + 8);
  rail.addColorStop(0, "rgba(255,190,80,0)");
  rail.addColorStop(0.55, "rgba(255,210,120,.55)");
  rail.addColorStop(1, "rgba(255,240,200,.12)");
  ctx.fillStyle = rail;
  ctx.fillRect(0, hitY - 8, w, 16);
  ctx.strokeStyle = "rgba(255,230,170,.85)";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, hitY); ctx.lineTo(w, hitY); ctx.stroke();

  const notes = currentNotes();
  notes.forEach(note => {
    const start = (look - (note.t - state.beat)) / look;
    const end = (look - (note.t + note.d - state.beat)) / look;
    const y1 = header + start * (hitY - header);
    const y2 = header + end * (hitY - header);
    if (y2 > hitY + 24 || y1 < -50) return;
    const pc = note.midi % 12;
    const col = note.hand === "L" ? "#e24b4b" : (pc === 4 || pc === 9 ? "#ffb84a" : pc === 0 || pc === 7 ? "#2ee6c5" : "#e24b4b");
    const glow = col === "#2ee6c5" ? "rgba(46,230,197,.4)" : col === "#ffb84a" ? "rgba(255,184,74,.4)" : "rgba(226,75,75,.38)";
    const x = midiX(note.midi, w);
    const slot = w / WHITES.length;
    const bw = Math.max(10, slot * (isBlack(note.midi) ? 0.42 : 0.62));
    const top = Math.min(y1, y2);
    const hh = Math.max(10, Math.abs(y1 - y2));
    const hitting = y1 >= hitY - 14 && y1 <= hitY + 10;

    ctx.save();
    ctx.shadowColor = glow;
    ctx.shadowBlur = hitting ? 28 : 18;
    const body = ctx.createLinearGradient(x, top, x, top + hh);
    body.addColorStop(0, "rgba(255,240,200,.35)");
    body.addColorStop(0.18, col);
    body.addColorStop(1, col);
    ctx.fillStyle = body;
    roundRect(ctx, x - bw / 2, top, bw, hh, Math.min(8, bw / 2));
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(255,255,230,.55)";
    roundRect(ctx, x - bw * 0.18, top + 2, Math.max(2, bw * 0.22), Math.max(6, hh - 4), 2);
    ctx.fill();
    ctx.restore();

    if (hitting) spawnSparks(x, hitY, col, 3);
  });

  for (let i = fallSparks.length - 1; i >= 0; i--) {
    const p = fallSparks[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.04;
    p.life -= 0.03;
    if (p.life <= 0) { fallSparks.splice(i, 1); continue; }
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, 2, 2);
    ctx.globalAlpha = 1;
  }
  if (fallSparks.length > 180) fallSparks.splice(0, fallSparks.length - 180);
}
function midiX(midi, w) {
  const want = isBlack(midi) ? midi - 1 : midi;
  let idx = WHITES.indexOf(want);
  if (idx < 0) {
    let best = 0, dist = 999;
    WHITES.forEach((m, i) => {
      const d = Math.abs(m - midi);
      if (d < dist) { dist = d; best = i; }
    });
    idx = best;
  }
  const slot = w / WHITES.length;
  return (idx + 0.5) * slot + (isBlack(midi) ? slot * 0.5 : 0);
}
function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r);
  ctx.arcTo(x,y,x+w,y,r);
  ctx.closePath();
}

/* ---------- sheet ---------- */
function drawStaff() {
  els.staffWrap.classList.add("show");
  const show = currentNotes();
  const svg = els.staff;
  const W = 1000, H = 240;
  const staffY = [70,86,102,118,134];
  const windowBeats = 12;
  const origin = Math.max(0, state.beat - 1.2);
  const noteX = (t) => 130 + (t - origin) * (820 / windowBeats);
  let s = "";
  s += `<rect width="${W}" height="${H}" fill="transparent"/>`;
  staffY.forEach(y => s += `<line x1="70" x2="980" y1="${y}" y2="${y}" stroke="rgba(255,255,255,.28)" stroke-width="1.5"/>`);
  s += trebleClef();
  s += `<text x="108" y="96" fill="#ffd166" font-size="22" font-weight="700">4</text>`;
  s += `<text x="108" y="128" fill="#ffd166" font-size="22" font-weight="700">4</text>`;
  const startBar = Math.floor(origin / 4) * 4;
  for (let b = startBar; b <= origin + windowBeats + 4; b += 4) {
    const x = noteX(b) - 8;
    if (x < 80 || x > 980) continue;
    s += `<line x1="${x}" x2="${x}" y1="70" y2="134" stroke="rgba(255,255,255,.2)" />`;
    s += `<text x="${x+4}" y="58" fill="#93a0b8" font-size="11">bar ${b/4+1}</text>`;
  }
  show.forEach(note => {
    const x = noteX(note.t);
    if (x < 90 || x > 975) return;
    const y = pitchY(note.midi);
    const active = state.beat >= note.t && state.beat < note.t + note.d;
    const passed = state.beat >= note.t + note.d;
    const fill = active ? "#ffd166" : passed ? "rgba(255,255,255,.28)" : "#f4f7ff";
    if (note.midi <= 60) s += `<line x1="${x-14}" x2="${x+14}" y1="${pitchY(60)}" y2="${pitchY(60)}" stroke="${fill}" />`;
    s += `<ellipse cx="${x}" cy="${y}" rx="9" ry="6.5" fill="${fill}" transform="rotate(-18 ${x} ${y})"/>`;
    if (note.d >= 2) s += `<rect x="${x+8}" y="${y-18}" width="2" height="18" fill="${fill}"/>`;
    s += `<text x="${x}" y="${y-16}" text-anchor="middle" fill="${active ? "#ffd166" : "#93a0b8"}" font-size="11" font-weight="700">${note.finger}</text>`;
    if (state.showNames) {
      s += `<text x="${x}" y="168" text-anchor="middle" fill="${active ? "#5ef0c0" : "#93a0b8"}" font-size="11">${NOTE_NAMES[note.midi%12]}</text>`;
    }
  });
  const playX = noteX(state.beat);
  s += `<line x1="${playX}" x2="${playX}" y1="50" y2="150" stroke="#ff6b4a" stroke-width="2"/>`;
  svg.innerHTML = s;
}
function pitchY(midi) {
  // treble staff: E4 (64) = bottom line 134
  const stepsFromE4 = letterSteps(midi) - letterSteps(64);
  return 134 - stepsFromE4 * 8;
}
function letterSteps(midi) {
  const pc = midi % 12;
  const oct = Math.floor(midi / 12);
  const map = {0:0,1:0,2:1,3:1,4:2,5:3,6:3,7:4,8:4,9:5,10:5,11:6};
  return oct * 7 + map[pc];
}
function trebleClef() {
  return `<text x="74" y="138" font-size="78" fill="#eef4ff" font-family="Times New Roman, serif">𝄞</text>`;
}

/* ---------- navigation ---------- */
function openStudio(song, mode) {
  stopAllHeldNotes();
  state.song = song;
  state.mode = mode;
  SONGS[song].notes.forEach(x => x._fired = false);
  const meta = SONGS[song];
  els.lessonTitle.textContent = meta.title;
  els.lessonSub.textContent = meta.composer + " · tap Play when you are ready";
  const fs = document.getElementById("fallSong");
  const fl = document.getElementById("fallLesson");
  if (fs) fs.textContent = meta.title;
  if (fl) fl.textContent = state.lessonId ? "Lesson" : "Free Play";
  els.coach.innerHTML = meta.tip;
  els.bpm.value = meta.bpm;
  state.bpm = meta.bpm;
  els.bpmLabel.textContent = meta.bpm + " BPM";
  els.home.classList.remove("active");
  els.studio.classList.add("active");
  setStudioActive(true);
  setMode(mode);
  stopPlay();
  els.pbar.style.width = "0%";
  resizeFall();
  if (mode === "sheet") drawStaff(); else drawFall();
  updateOrientationUI();
}
function setMode(mode) {
  state.mode = mode;
  els.modeSheet.classList.toggle("on", mode === "sheet");
  els.modeFall.classList.toggle("on", mode === "fall");
  els.staffWrap.classList.toggle("show", mode === "sheet");
  els.studio.classList.toggle("fall-on", mode === "fall");
  if (mode === "sheet") drawStaff(); else drawFall();
}
function setHands(h) {
  state.hands = h;
  els.handR.classList.toggle("on", h === "R");
  els.handL.classList.toggle("on", h === "L");
  els.handB.classList.toggle("on", h === "B");
  if (state.mode === "sheet") drawStaff(); else drawFall();
}

document.querySelectorAll("[data-go]").forEach(btn => {
  btn.addEventListener("click", () => {
    const go = btn.dataset.go;
    if (go === "keys") { state.lessonId = null; state.lessonNotes = null; openStudio("keys", "fall"); }
    if (go === "read") { state.lessonId = null; state.lessonNotes = null; openStudio("ode", "sheet"); }
    if (go === "fall") { state.lessonId = null; state.lessonNotes = null; openStudio("ode", "fall"); }
    if (go === "songs") { state.lessonId = null; state.lessonNotes = null; openStudio("ode", "fall"); }
    if (go === "theory") openTheory();
    if (go === "course") showScreen("course");
    if (go === "mymusic") showScreen("mymusic");
    if (go === "progress") showScreen("progressScreen");
    if (go === "profile") showScreen("profile");
  });
});
function showScreen(id) {
  ["home","studio","theory","course","mymusic","progressScreen","profile"].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.classList.toggle("active", s === id);
  });
  setStudioActive(id === "studio");
  if (id === "course") renderCourse();
  if (id === "mymusic") renderMyMusic();
  if (id === "progressScreen") renderProgress();
  if (id === "home") renderDashboard();
  if (id === "profile") renderProfile();
  updateOrientationUI();
}
function leaveStudioToHome() {
  stopPlay();
  if (state.lessonId) rememberOpenLesson(state.lessonId);
  showScreen("home");
}
document.getElementById("backBtn").onclick = leaveStudioToHome;
els.playBtn.onclick = () => {
  currentNotes().forEach(x => x._fired = false);
  if (state.playing) stopPlay(); else startPlay();
};
els.bpm.oninput = () => {
  state.bpm = +els.bpm.value;
  els.bpmLabel.textContent = state.bpm + " BPM";
};
els.vol.oninput = () => {
  state.volume = els.vol.value / 100;
  els.volLabel.textContent = els.vol.value + "%";
  if (state.audio) state.audio.master.gain.value = state.volume;
};
els.modeSheet.onclick = () => setMode("sheet");
els.modeFall.onclick = () => setMode("fall");
els.handR.onclick = () => setHands("R");
els.handL.onclick = () => setHands("L");
els.handB.onclick = () => setHands("B");
els.waitChip.onclick = () => {
  state.wait = !state.wait;
  els.waitChip.classList.toggle("on", state.wait);
  els.waitChip.textContent = state.wait ? "Waiting for you" : "Auto play";
};
els.nameChip.onclick = () => {
  state.showNames = !state.showNames;
  els.nameChip.classList.toggle("on", state.showNames);
  refreshNames();
  if (state.mode === "sheet") drawStaff();
};
els.waitChip.classList.add("on");
els.nameChip.classList.add("on");

function resizeFall() {
  const c = els.fall;
  if (!c || !c.parentElement) return;
  const r = c.parentElement.getBoundingClientRect();
  c.style.width = "100%";
  c.style.height = "100%";
  if (r.width > 0 && r.height > 0) {
    const dpr = window.devicePixelRatio || 1;
    const w = Math.round(r.width * dpr);
    const h = Math.round(r.height * dpr);
    if (c.width !== w || c.height !== h) {
      c.width = w;
      c.height = h;
    }
  }
}

const KEYMAP = {a:60,s:62,d:64,f:65,g:67,h:69,j:71,k:72,w:61,e:63,t:66,y:68,u:70};
window.addEventListener("keydown", e => {
  if (e.repeat) return;
  const m = KEYMAP[e.key.toLowerCase()];
  if (m) pressKey(m, true);
  if (e.key === " ") { e.preventDefault(); els.playBtn.click(); }
});
window.addEventListener("keyup", e => {
  const m = KEYMAP[e.key.toLowerCase()];
  if (m) pressKey(m, false);
});

buildBoard();
els.waitChip.classList.add("on");

const pianoBoard = document.getElementById("board");
["contextmenu", "selectstart", "dragstart"].forEach(type => {
  pianoBoard.addEventListener(type, event => event.preventDefault());
});
pianoBoard.addEventListener("touchstart", event => event.preventDefault(), { passive: false });
function isLandscape() {
  if (state.forceLandscape) return true;
  const vw = (window.visualViewport && window.visualViewport.width) || window.innerWidth;
  const vh = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
  return vw > vh || window.matchMedia("(orientation: landscape)").matches;
}
function setForceLandscape(on) {
  state.forceLandscape = !!on;
  const btn = document.getElementById("wideKeysBtn");
  if (btn) btn.classList.toggle("on", state.forceLandscape);
  updateOrientationUI();
}
function unlockScreenOrientation() {
  try {
    if (screen.orientation && typeof screen.orientation.unlock === "function") {
      screen.orientation.unlock();
    }
  } catch {}
}
function playStudioCamera() {
  const studio = document.getElementById("studio");
  if (!studio) return;
  studio.classList.remove("cam-in");
  void studio.offsetWidth;
  studio.classList.add("cam-in");
  clearTimeout(state._camTimer);
  state._camTimer = setTimeout(() => studio.classList.remove("cam-in"), 1000);
}
function setStudioActive(on) {
  const was = document.body.classList.contains("studio-active");
  document.body.classList.toggle("studio-active", !!on);
  unlockScreenOrientation();
  if (!on) {
    stopAllHeldNotes();
    releaseTouchPointers();
    document.getElementById("studio")?.classList.remove("cam-in");
  } else if (!was) {
    requestAnimationFrame(playStudioCamera);
  }
  updateOrientationUI();
}
function resizeKeyboard() {
  const board = document.getElementById("board");
  if (!board) return;
  const landscape = isLandscape();
  const studioOn = document.body.classList.contains("studio-active");
  const vh = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
  if (studioOn && landscape) {
    board.style.height = Math.max(180, Math.min(260, Math.round(vh * 0.40))) + "px";
  } else {
    board.style.height = "";
  }
  const whites = board.querySelectorAll(".wkey");
  const whiteCount = whites.length || WHITES.length;
  if (!whiteCount) return;
  board.querySelectorAll(".bkey").forEach(key => {
    const whiteMidi = (+key.dataset.midi) - 1;
    const i = WHITES.indexOf(whiteMidi);
    if (i < 0) return;
    const left = ((i + 1) / whiteCount) * 100;
    key.style.width = "7.2%";
    key.style.left = `calc(${left}% - 3.6%)`;
  });
  void board.offsetWidth;
}
function redrawStudioView() {
  const studioOn = document.getElementById("studio") && document.getElementById("studio").classList.contains("active");
  if (!studioOn) return;
  if (state.mode === "sheet") drawStaff();
  else drawFall();
}
function updateOrientationUI() {
  const landscape = isLandscape();
  console.log("orientation debug", {
    width: window.innerWidth,
    height: window.innerHeight,
    landscape,
    forced: state.forceLandscape,
    media: window.matchMedia("(orientation: landscape)").matches,
    screenOrientation: screen.orientation?.type
  });
  document.body.classList.toggle("sk-landscape", landscape);
  document.body.classList.toggle("sk-portrait", !landscape);
  const hint = document.getElementById("rotateHint");
  const studioOn = document.getElementById("studio") && document.getElementById("studio").classList.contains("active");
  if (hint) {
    if (studioOn && !landscape) hint.style.display = "flex";
    else hint.style.display = "none";
  }
  resizeKeyboard();
  resizeFall();
  redrawStudioView();
  requestAnimationFrame(() => {
    resizeKeyboard();
    resizeFall();
    redrawStudioView();
  });
}
window.addEventListener("resize", updateOrientationUI);
window.addEventListener("orientationchange", () => {
  setTimeout(updateOrientationUI, 100);
});
const landscapeQuery = window.matchMedia("(orientation: landscape)");
if (landscapeQuery.addEventListener) landscapeQuery.addEventListener("change", updateOrientationUI);
else if (landscapeQuery.addListener) landscapeQuery.addListener(updateOrientationUI);
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", updateOrientationUI);
}
if (screen.orientation && screen.orientation.addEventListener) {
  screen.orientation.addEventListener("change", () => setTimeout(updateOrientationUI, 50));
}
unlockScreenOrientation();
const rotateHintEl = document.getElementById("rotateHint");
if (rotateHintEl) rotateHintEl.onclick = () => setForceLandscape(true);
const wideKeysBtn = document.getElementById("wideKeysBtn");
if (wideKeysBtn) wideKeysBtn.onclick = () => setForceLandscape(!state.forceLandscape);
updateOrientationUI();
window.addEventListener("blur", () => { releaseTouchPointers(); stopAllHeldNotes(); });
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    releaseTouchPointers();
    stopAllHeldNotes();
    if (state.lessonId) rememberOpenLesson(state.lessonId);
    else saveProgress();
  }
});
window.addEventListener("pagehide", () => {
  if (state.lessonId) rememberOpenLesson(state.lessonId);
  else saveProgress();
});

// long-press song picker on songs card already opens ode; add a simple switcher via title tap
function renderSongRow() {
  const row = document.getElementById("songRow");
  const items = [
    ["keys","Keys tour"],
    ["ode","Ode to Joy"],
    ["twinkle","Twinkle"],
    ["mary","Mary"],
    ["canon","Canon"],
    ["clair","Clair de Lune"]
  ];
  row.innerHTML = items.map(([id,label]) =>
    `<button data-song="${id}" class="${id===state.song?"on":""}">${label}</button>`
  ).join("");
  row.querySelectorAll("button").forEach(b => {
    b.onclick = () => openStudio(b.dataset.song, state.mode);
  });
}
const _open = openStudio;
openStudio = function(song, mode) {
  _open(song, mode);
  renderSongRow();
};
renderSongRow();

const THEORY = [
  {
    id: "notes",
    tab: "Notes",
    title: "Keys are houses on a street",
    html: `
      <p>Imagine the piano is a long street. Each white key is a house. The houses have only seven names, then the names start over: <b>C D E F G A B</b>, then C again.</p>
      <p>That next C is like the same house name on the next block. We call that an <b>octave</b> — same name, just farther up the street.</p>
      <p>Black keys are the little side paths between some houses. For <i>Ode to Joy</i> we stay on the white houses.</p>
      <div class="example">
        <p style="margin:0 0 8px">Tap the house names. Each one is the next door along the street.</p>
        <div class="row" id="alphaRow"></div>
      </div>
      <p><b>Middle C</b> is your front door. It sits near the middle of the piano. Rest your right-hand thumb there.</p>`
  },
  {
    id: "steps",
    tab: "Steps",
    title: "Walking, standing, hopping",
    html: `
      <p>A tune is just a walk along that street. You only need three moves:</p>
      <p><b>Stand still</b> — play the same house twice. Ode to Joy starts this way: E, then E again.<br>
      <b>Take a step</b> — walk to the next-door house (E to F).<br>
      <b>Hop</b> — jump over one house (C hops over D and lands on E).</p>
      <div class="example">
        <p style="margin:0 0 8px">Tap a move and listen. Can you hear still, step, or hop?</p>
        <div class="row">
          <button class="tkey" data-demo="rep">Stand still</button>
          <button class="tkey" data-demo="step">Take a step</button>
          <button class="tkey" data-demo="skip">Hop over</button>
        </div>
        <p class="answer" id="moveAns"></p>
      </div>
      <p>Ode to Joy is mostly standing still and taking steps. That is why it is easy to sing.</p>`
  },
  {
    id: "staff",
    tab: "Staff",
    title: "The page is a ladder",
    html: `
      <p>Written music is a <b>ladder with five rungs</b>. We call that ladder the <b>staff</b>. Higher on the ladder = higher sound. Lower = lower sound.</p>
      <p>The fancy sign at the start (the <b>treble clef</b>) is like a sticker that says “upstairs.” Those are the notes your right hand usually plays.</p>
      <p>You do not have to memorise the whole ladder today. Learn one floor: the tiny extra line just under the ladder is <b>Middle C</b> — your front door drawn on paper. The bottom rung is E.</p>
      <p>A helper for later: the rungs going up are E G B D F. The spaces between rungs spell <b>FACE</b>.</p>
      <div class="example">
        <svg class="staff-mini" id="quizStaff" viewBox="0 0 320 110"></svg>
        <p style="margin:8px 0">Which house is glowing on the ladder?</p>
        <div class="row" id="staffQuiz"></div>
        <p class="answer" id="staffAns"></p>
      </div>`
  },
  {
    id: "rhythm",
    tab: "Rhythm",
    title: "Notes are footsteps",
    html: `
      <p>A <b>beat</b> is one footstep in a steady walk. Note drawings tell you how long to stay on that foot:</p>
      <p><b>Quarter note</b> = stand for 1 step<br>
      <b>Half note</b> = stand for 2 steps<br>
      <b>Whole note</b> = stand for a whole 4-step box<br>
      <b>Rest</b> = lift your foot. Silence is still part of the walk.</p>
      <div class="example">
        <p style="margin:0 0 8px">Tap a length. Watch the bar fill while you count 1-2-3-4.</p>
        <div class="row">
          <button class="dur" data-dur="1">1 step</button>
          <button class="dur" data-dur="2">2 steps</button>
          <button class="dur" data-dur="4">4 steps</button>
        </div>
        <div class="pulse"><i id="pulseBar"></i></div>
      </div>
      <p>Ode to Joy is almost all 1-step notes. The little rests in bars 4 and 8 are just a breath — like pausing at the kerb before you keep walking.</p>`
  },
  {
    id: "time",
    tab: "4/4",
    title: "Music comes in egg cartons",
    html: `
      <p>The two numbers at the start look mysterious. Think of them as an <b>egg carton</b>.</p>
      <p>The top <b>4</b> says: this carton holds four eggs (four footsteps).<br>
      The bottom <b>4</b> says: each egg is a 1-step note.</p>
      <p>Each carton is a <b>bar</b>. We clap <b>1</b>-2-3-4, then start a new carton. Beat 1 is the first egg — a little bigger.</p>
      <div class="example">
        <button class="tkey" id="clap44">Hear one carton of 4</button>
        <p class="answer" id="clapAns">Count with me when you tap.</p>
      </div>
      <p><b>Tempo</b> is only walking speed. Slow practice is a stroll. Fast playing is a jog. Start with a stroll (about 80 steps a minute).</p>`
  },
  {
    id: "scale",
    tab: "C major",
    title: "C major is one friendly street",
    html: `
      <p>A <b>key</b> is the street a song lives on. <b>C major</b> means “we are staying on the white houses: C D E F G A B C.”</p>
      <p>Walking those houses in order is climbing a staircase. That staircase is the <b>C major scale</b>. When you reach the next C, you are home again, just one floor up.</p>
      <p>Ode to Joy, Twinkle, and Mary all live on this same street. That is why the sheet has no extra signs at the start — no detours onto black keys.</p>
      <div class="example">
        <button class="tkey" id="playScale">Walk up the C street</button>
        <p class="answer">Listen for “home” when the last C arrives.</p>
      </div>
      <p>Most neighbours have a black side path between them (a bigger step). E to F and B to C have no side path — those two are smaller steps. You do not need that yet to play the song. It just explains why the staircase feels even.</p>`
  },
  {
    id: "chord",
    tab: "Chords",
    title: "A chord is three friends",
    html: `
      <p>A single key is one person humming. A <b>chord</b> is three friends humming at the same time.</p>
      <p>The C major friends are <b>C, E, and G</b>. You pick every other house: C, skip D, E, skip F, G.</p>
      <p>Together they sound like a comfy sofa — settled, not itchy. The left-hand notes in SparkKeys are two of those friends standing under the tune so it does not feel lonely.</p>
      <div class="example">
        <div class="row">
          <button class="tkey" id="playC">Friend C</button>
          <button class="tkey" id="playE">Friend E</button>
          <button class="tkey" id="playG">Friend G</button>
          <button class="tkey" id="playCEG">All three together</button>
        </div>
      </div>
      <p>When two hands feel ready: right hand tells the story. Left hand brings the three friends to sit underneath.</p>`
  }
];

let theoryIndex = 0;

function openTheory(i = 0) {
  theoryIndex = i;
  els.home.classList.remove("active");
  els.studio.classList.remove("active");
  document.getElementById("theory").classList.add("active");
  renderTheory();
}
function renderTheory() {
  const tabs = document.getElementById("theoryTabs");
  tabs.innerHTML = THEORY.map((t,i) =>
    `<button class="${i===theoryIndex?"on":""}" data-i="${i}">${t.tab}</button>`
  ).join("");
  tabs.querySelectorAll("button").forEach(b => b.onclick = () => { theoryIndex = +b.dataset.i; renderTheory(); });
  const lesson = THEORY[theoryIndex];
  document.getElementById("theoryCard").innerHTML = `<h3>${lesson.title}</h3>${lesson.html}`;
  document.getElementById("theoryPrev").disabled = theoryIndex === 0;
  document.getElementById("theoryNext").textContent = theoryIndex === THEORY.length-1 ? "Back to songs" : "Next idea ›";
  wireTheoryLesson(lesson.id);
}
function wireTheoryLesson(id) {
  if (id === "notes") {
    const row = document.getElementById("alphaRow");
    const letters = [["C",60],["D",62],["E",64],["F",65],["G",67],["A",69],["B",71],["C",72]];
    row.innerHTML = letters.map(([L,m]) => `<button class="tkey" data-m="${m}">${L}</button>`).join("");
    row.querySelectorAll("button").forEach(b => b.onclick = () => {
      row.querySelectorAll("button").forEach(x => x.classList.remove("on"));
      b.classList.add("on");
      playTone(+b.dataset.m, 0.55);
    });
  }
  if (id === "steps") {
    const playPair = (a,b) => { playTone(a,0.35); setTimeout(()=>playTone(b,0.45), 360); };
    document.querySelectorAll("[data-demo]").forEach(btn => {
      btn.onclick = () => {
        const kind = btn.dataset.demo;
        const box = document.getElementById("moveAns");
        if (kind === "rep") { playPair(64,64); box.textContent = "Standing still: E, then E again. Same house."; }
        if (kind === "step") { playPair(64,65); box.textContent = "A step: E walks next door to F."; }
        if (kind === "skip") { playPair(60,64); box.textContent = "A hop: C jumps over D and lands on E."; }
      };
    });
  }
  if (id === "staff") {
    const pool = [
      {name:"C", midi:60, label:"Middle C"},
      {name:"E", midi:64, label:"bottom line E"},
      {name:"F", midi:65, label:"first space F"},
      {name:"G", midi:67, label:"second line G"},
      {name:"A", midi:69, label:"second space A"}
    ];
    let current = pool[0];
    const drawQ = () => {
      current = pool[Math.floor(Math.random()*pool.length)];
      const y = pitchY(current.midi) - 20;
      const svg = document.getElementById("quizStaff");
      let s = `<rect width="320" height="110" fill="transparent"/>`;
      [30,42,54,66,78].forEach(y0 => s += `<line x1="36" x2="300" y1="${y0}" y2="${y0}" stroke="rgba(255,255,255,.35)"/>`);
      s += `<text x="40" y="82" font-size="48" fill="#eef4ff" font-family="Times New Roman, serif">𝄞</text>`;
      const ny = ({60:90,64:78,65:72,67:66,69:60})[current.midi];
      if (current.midi === 60) s += `<line x1="168" x2="208" y1="${ny}" y2="${ny}" stroke="#ffd166"/>`;
      s += `<ellipse cx="188" cy="${ny}" rx="10" ry="7" fill="#ffd166" transform="rotate(-18 188 ${ny})"/>`;
      svg.innerHTML = s;
      document.getElementById("staffAns").textContent = "Choose a letter.";
      document.getElementById("staffQuiz").querySelectorAll(".quiz").forEach(b => b.classList.remove("good","bad"));
    };
    const box = document.getElementById("staffQuiz");
    box.innerHTML = ["C","D","E","F","G","A"].map(L => `<button class="quiz" data-n="${L}">${L}</button>`).join("");
    box.querySelectorAll("button").forEach(b => b.onclick = () => {
      const ok = b.dataset.n === current.name;
      b.classList.add(ok ? "good" : "bad");
      document.getElementById("staffAns").textContent = ok
        ? "Yes — " + current.label + "."
        : "Not this time. It was " + current.label + ".";
      playTone(current.midi, 0.5);
      setTimeout(drawQ, 900);
    });
    drawQ();
  }
  if (id === "rhythm") {
    document.querySelectorAll("[data-dur]").forEach(btn => {
      btn.onclick = () => {
        const beats = +btn.dataset.dur;
        const bar = document.getElementById("pulseBar");
        bar.style.transition = "none"; bar.style.width = "0%";
        void bar.offsetWidth;
        const ms = beats * (60/80) * 1000;
        bar.style.transition = `width ${ms}ms linear`;
        bar.style.width = "100%";
        playTone(64, beats * 60/80);
      };
    });
  }
  if (id === "time") {
    document.getElementById("clap44").onclick = () => {
      const ans = document.getElementById("clapAns");
      const hits = [0,1,2,3];
      hits.forEach(i => setTimeout(() => {
        playTone(i===0 ? 67 : 60, 0.18);
        ans.textContent = "Beat " + (i+1) + (i===0 ? " — a little stronger" : "");
      }, i * (60/80)*1000));
    };
  }
  if (id === "scale") {
    document.getElementById("playScale").onclick = () => {
      [60,62,64,65,67,69,71,72].forEach((m,i) => setTimeout(() => playTone(m, 0.32), i*280));
    };
  }
  if (id === "chord") {
    document.getElementById("playC").onclick = () => playTone(60, 0.7);
    document.getElementById("playE").onclick = () => playTone(64, 0.7);
    document.getElementById("playG").onclick = () => playTone(67, 0.7);
    document.getElementById("playCEG").onclick = () => { playTone(60,1); playTone(64,1); playTone(67,1); };
  }
}
document.getElementById("theoryBack").onclick = () => {
  document.getElementById("theory").classList.remove("active");
  els.home.classList.add("active");
};
document.getElementById("theoryPrev").onclick = () => {
  theoryIndex = Math.max(0, theoryIndex-1); renderTheory();
};
document.getElementById("theoryNext").onclick = () => {
  if (theoryIndex >= THEORY.length-1) {
    document.getElementById("theory").classList.remove("active");
    openStudio("ode", "sheet");
    return;
  }
  theoryIndex += 1; renderTheory();
};

/* ========== Course engine ========== */
const STORE_KEY = "sparkkeys-progress-v2";
const TEST_UNLOCK_ALL = true;
function allLessonIds() { return ["l01","l02","l03","l04","l05","l06","l07","l08","l09","l10","l11","l12","l13","l14","l15","l16","l17","l18","l19","l20","l21","l22","l23","l24","l25"]; }
function defaultProgress() {
  return {
    version: 2,
    currentLesson: "l01",
    completed: [],
    unlocked: TEST_UNLOCK_ALL ? allLessonIds() : ["l01"],
    pieces: {},
    notesAttempted: 0,
    correct: 0,
    wrong: 0,
    practiceMs: 0,
    lastOpen: Date.now(),
    errors: [],
    started: false
  };
}
function loadProgress() {
  try {
    const raw = Object.assign(defaultProgress(), JSON.parse(localStorage.getItem(STORE_KEY) || "{}"));
    if (TEST_UNLOCK_ALL) raw.unlocked = Array.from(new Set([...(raw.unlocked||[]), ...allLessonIds()]));
    return raw;
  } catch { return defaultProgress(); }
}
function hasStartedCourse(p) {
  const rec = p || progress;
  if (rec.started === true) return true;
  if ((rec.completed || []).length > 0) return true;
  if ((rec.notesAttempted || 0) > 0) return true;
  if (rec.pieces && Object.keys(rec.pieces).length > 0) return true;
  return false;
}
function markCourseStarted() {
  if (progress.started) return;
  progress.started = true;
  saveProgress();
}
function saveProgress() {
  progress.lastOpen = Date.now();
  try { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); } catch {}
}
function resumeLessonId() {
  const id = progress.currentLesson || "l01";
  const les = lessonById(id);
  if (les && progress.completed.includes(les.id) && les.nextLesson) return les.nextLesson;
  return les ? les.id : "l01";
}
function rememberOpenLesson(id) {
  if (!id) return;
  progress.currentLesson = id;
  progress.started = true;
  saveProgress();
}

const PROFILE_KEY = "sparkkeys-profile-v1";
function defaultProfile() {
  return { name: "", email: "", provider: null, signedIn: false, updated: null };
}
function loadProfile() {
  try { return Object.assign(defaultProfile(), JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}")); }
  catch { return defaultProfile(); }
}
function saveProfile() {
  profile.updated = Date.now();
  try { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); } catch {}
  progress.profileEmail = profile.signedIn ? profile.email : "";
  progress.profileName = profile.signedIn ? profile.name : "";
  progress.profileProvider = profile.signedIn ? profile.provider : "";
  saveProgress();
  paintProfileChrome();
}
let profile = loadProfile();
function paintProfileChrome() {
  const hint = document.getElementById("profileNavHint");
  if (hint) hint.textContent = profile.signedIn ? (profile.name || profile.email) : "Email, Google, Facebook";
}
function renderProfile() {
  const signed = profile.signedIn;
  document.getElementById("profileTitle").textContent = signed ? "Your SparkKeys profile" : "Sign in to keep your place";
  document.getElementById("profileWho").textContent = signed
    ? (profile.name || "Student") + " · " + (profile.email || "no email") + " · " + (profile.provider || "email")
    : "Not signed in";
  document.getElementById("profileName").value = profile.name || "";
  document.getElementById("profileEmail").value = profile.email || "";
  document.getElementById("profileSignOut").style.display = signed ? "block" : "none";
  paintProfileChrome();
}
function signInWith(provider) {
  const name = (document.getElementById("profileName").value || "").trim();
  const email = (document.getElementById("profileEmail").value || "").trim().toLowerCase();
  if (provider === "email" && !email) {
    flashToast("Add an email first.");
    return;
  }
  profile.name = name || (provider === "google" ? "Google student" : provider === "facebook" ? "Facebook student" : "SparkKeys student");
  profile.email = email || (provider === "google" ? "google-user@sparkkeys.local" : provider === "facebook" ? "facebook-user@sparkkeys.local" : "");
  profile.provider = provider;
  profile.signedIn = true;
  saveProfile();
  renderProfile();
  flashToast("Profile saved on this device.");
}
document.getElementById("emailLogin").onclick = () => signInWith("email");
document.getElementById("googleLogin").onclick = () => signInWith("google");
document.getElementById("facebookLogin").onclick = () => signInWith("facebook");
document.getElementById("profileSignOut").onclick = () => {
  profile = defaultProfile();
  saveProfile();
  renderProfile();
  flashToast("Signed out. Lesson badges stay on this phone.");
};
document.getElementById("profileBack").onclick = () => showScreen("home");
paintProfileChrome();
let progress = loadProgress();

const ARR = {
  ode_disc: [n(0,1,64,3,"R"), n(1,1,64,3,"R"), n(2,1,65,4,"R"), n(3,1,67,5,"R")],
  ode_p1: [n(0,1,64,3,"R"), n(1,1,64,3,"R"), n(2,1,65,4,"R"), n(3,1,67,5,"R"), n(4,1,67,5,"R"), n(5,1,65,4,"R"), n(6,1,64,3,"R"), n(7,1,62,2,"R")],
  ode_full: SONGS.ode.notes.filter(x => x.hand === "R"),
  ode_bass: SONGS.ode.notes,
  twinkle_head: [n(0,1,60,1,"R"), n(1,1,60,1,"R"), n(2,1,67,5,"R"), n(3,1,67,5,"R")],
  twinkle_full: SONGS.twinkle.notes.filter(x => x.hand === "R"),
  mary_p1: [n(0,1,64,3,"R"), n(1,1,62,2,"R"), n(2,1,60,1,"R"), n(3,1,62,2,"R"), n(4,1,64,3,"R"), n(5,1,64,3,"R"), n(6,2,64,3,"R")],
  mary_full: SONGS.mary.notes.filter(x => x.hand === "R"),
  c_walk: [n(0,1,60,1,"R"), n(1,1,62,2,"R"), n(2,1,64,3,"R")],
  scale_c: [n(0,1,60,1,"R"), n(1,1,62,2,"R"), n(2,1,64,3,"R"), n(3,1,65,4,"R"), n(4,1,67,5,"R"), n(5,1,69,5,"R"), n(6,1,71,4,"R"), n(7,2,72,5,"R")],
  lh_c: [n(0,2,48,5,"L"), n(2,2,48,5,"L")],
  ode_roots: [n(0,1,64,3,"R"), n(1,1,64,3,"R"), n(2,1,65,4,"R"), n(3,1,67,5,"R"), n(0,1,48,5,"L"), n(1,1,48,5,"L"), n(2,1,48,5,"L"), n(3,1,48,5,"L")],
  chord_c: [n(0,2,60,1,"R"), n(0,2,64,3,"R"), n(0,2,67,5,"R")],
  chord_fg: [n(0,2,53,1,"L"), n(0,2,57,3,"L"), n(0,2,60,5,"L"), n(4,2,55,1,"L"), n(4,2,59,3,"L"), n(4,2,62,5,"L")],
  canon_loop: [n(0,2,48,5,"L"), n(2,2,43,1,"L"), n(4,2,45,2,"L"), n(6,2,40,5,"L"), n(8,2,41,5,"L"), n(10,2,36,5,"L"), n(12,2,41,5,"L"), n(14,2,43,1,"L")],
  canon_mel: SONGS.canon.notes,
  clair_rock: [n(0,2,64,3,"R"), n(2,2,67,5,"R"), n(4,2,64,3,"R"), n(6,2,67,5,"R")],
  clair_full: SONGS.clair.notes,
  e_f_g: [n(0,1,64,3,"R"), n(1,1,65,4,"R"), n(2,1,67,5,"R"), n(3,1,65,4,"R"), n(4,1,64,3,"R")]
};

function L(id, stage, title, piece, arr, hands, objective, explain, unlocks, next, bpm, mode) {
  return { id, stage, title, pieceId: piece, arrangementId: arr, hands, learningObjective: objective, explanation: explain, unlocks, nextLesson: next, bpm: bpm || 76, mode: mode || "fall", requiredAccuracy: 70 };
}
const LESSONS = [
  L("l01",1,"Two black keys and E","ode","ode_disc","R","Play the first two notes of Ode to Joy.","Find the pair of black keys near the middle. The white house just to their right is E. Put finger 3 on E and play E, E. That is already the start of a real tune.","ode:discovery","l02",72),
  L("l02",1,"Finger numbers","ode","ode_disc","R","Use finger 3 on the opening E’s.","Thumb is 1. The middle finger is 3. Keep 3 on E and tap the same house twice — standing still.","ode:discovery","l03",72),
  L("l03",1,"A single step","ode","e_f_g","R","Step from E to F to G.","From E, the next white house is F (finger 4), then G (finger 5). Walking next door is a step.","ode:discovery","l04",74),
  L("l04",1,"Ode — first four notes","ode","ode_disc","R","Play E E F G.","Stand still on E, then two steps up. This is the opening of Ode to Joy.","ode:discovery","l05",74),
  L("l05",1,"Walk back toward C","ode","ode_p1","R","Play the first phrase down toward D.","After G G, walk back F E D. Middle C is waiting one more step below D — we will greet it next.","ode:guided","l06",76),
  L("l06",2,"Repeats and steps in music","ode","ode_p1","R","Play phrase 1 with eyes on the pattern.","Notice the shape: still, still, step, step — then the same idea coming down.","ode:guided","l07",76),
  L("l07",2,"Longer footsteps","twinkle","twinkle_head","R","Play Twinkle’s first four notes.","C C then a hop up to G G. The last of a pair can feel a little longer — stay on the key.","twinkle:discovery","l08",80),
  L("l08",2,"Breaths in the tune","ode","ode_full","R","Honour the rests in Ode to Joy.","Bars 4 and 8 lift the hand for one step. Silence is part of the walk, not a mistake.","ode:guided","l09",78,"fall"),
  L("l09",2,"Whole right-hand melody","ode","ode_full","R","Play the full beginner melody.","Same C-position house row. You already know every move — now they join into one song.","ode:guided","l10",80),
  L("l10",3,"The ladder shows what you played","ode","ode_p1","R","See phrase 1 on the staff.","The gold note is the house you just learned. Higher on the ladder = higher sound.","ode:guided","l11",76,"sheet"),
  L("l11",3,"Middle C on paper","keys","c_walk","R","Play C D E and spot Middle C on the ladder.","The tiny extra line under the ladder is your front door drawn on paper.","ode:guided","l12",70,"sheet"),
  L("l12",3,"Egg-carton 4/4","ode","ode_p1","R","Count 1-2-3-4 on phrase 1.","Each line of four footsteps is one carton. Beat 1 is the first egg.","ode:guided","l13",72,"sheet"),
  L("l13",3,"Read Mary","mary","mary_p1","R","Play Mary’s first line from the staff.","It starts on E (finger 3), steps down to C, then climbs back. You have already felt this skip.","mary:discovery","l14",84,"sheet"),
  L("l14",4,"Left hand finds low C","ode","lh_c","L","Play two calm low C’s.","Left little finger (5) sits on the C below Middle C. Soft arm. These are the sofa legs under a tune.","ode:melody_bass","l15",70),
  L("l15",4,"Melody plus one root","ode","ode_roots","B","Hold low C under E E F G.","Right hand tells the story. Left hand stays on C for the whole carton.","ode:melody_bass","l16",70),
  L("l16",4,"C and G pillars","ode","ode_bass","B","Add G when the phrase answers.","When the tune leans, the left hand can move to G (thumb). Two houses: C and G.","ode:melody_bass","l17",72),
  L("l17",4,"Two hands on Ode","ode","ode_bass","B","Play the beginner two-hand Ode.","Slow. Let the left hand land first if you need to. Coordination is a conversation, not a race.","ode:melody_bass","l18",72),
  L("l18",5,"Three friends: C E G","ode","chord_c","R","Play C, E and G together.","Skip a house each time. Together they are a C major chord — a comfy sofa.","ode:harmony","l19",68),
  L("l19",5,"Ode sitting on a chord","ode","ode_bass","B","Play Ode with C/G harmony in mind.","The left-hand notes you already know are pieces of that C chord.","ode:harmony","l20",74),
  L("l20",5,"Canon’s repeating walk","canon","canon_loop","L","Play the Canon bass loop.","C G A E F C F G. This circling walk is why people recognise Canon at once.","canon:discovery","l21",70),
  L("l21",5,"Canon melody over the walk","canon","canon_mel","B","Add a simple descending tune.","Right hand walks down the street while the left hand keeps the loop.","canon:melody_bass","l22",70),
  L("l22",5,"Filler chords F and G","ode","chord_fg","L","Hear F and G as neighbours of C.","F major is F–A–C. G major is G–B–D. Play each sofa, then go back to Ode.","ode:harmony","l23",74),
  L("l23",6,"Moonlight rocking","clair","clair_rock","R","Play Clair de Lune’s gentle E–G rock.","Slow. Soft. This swaying is the character of the piece, made small enough for your hand.","clair:discovery","l24",56),
  L("l24",6,"Moonlight with a bass","clair","clair_full","B","Add quiet left-hand C’s under the rock.","Keep the right hand singing. Left hand is moonlight on the water — barely there.","clair:harmony","l25",56),
  L("l25",6,"Independent performance","ode","ode_bass","B","Perform Ode in Challenge with both hands.","No glowing keys. You already live on this street. Play the arrangement as music, not as a test.","ode:performance",null,78)
];

function lessonById(id) { return LESSONS.find(x => x.id === id); }
function lessonIndex(id) { return LESSONS.findIndex(x => x.id === id); }

function applyAssist(mode) {
  state.assist = mode;
  document.getElementById("assistLearn").classList.toggle("on", mode === "learn");
  document.getElementById("assistPractice").classList.toggle("on", mode === "practice");
  document.getElementById("assistChallenge").classList.toggle("on", mode === "challenge");
  if (mode === "learn") {
    state.wait = true; state.showNames = true; state.showFingers = true; state.showGuides = true;
  } else if (mode === "practice") {
    state.wait = true; state.showNames = false; state.showFingers = true; state.showGuides = true;
  } else {
    state.wait = true; state.showNames = false; state.showFingers = false; state.showGuides = false;
  }
  els.waitChip.classList.toggle("on", state.wait);
  els.waitChip.textContent = state.wait ? "Waiting for you" : "Auto play";
  els.nameChip.classList.toggle("on", state.showNames);
  refreshNames();
}

function openLesson(id) {
  const les = lessonById(id);
  if (!les) return;
  if (!TEST_UNLOCK_ALL && !progress.unlocked.includes(id) && !progress.completed.includes(id) && id !== "l01") {
    flashToast && flashToast("Finish the previous lesson first.");
    return;
  }
  state.lessonId = id;
  state.lessonNotes = (ARR[les.arrangementId] || []).map(x => Object.assign({}, x));
  state.song = les.pieceId === "keys" ? "keys" : les.pieceId;
  if (!SONGS[state.song]) state.song = "ode";
  applyAssist(id === "l25" ? "challenge" : "learn");
  setHands(les.hands);
  openStudio(state.song, les.mode);
  els.lessonTitle.textContent = les.title;
  els.lessonSub.textContent = "Lesson " + (lessonIndex(id)+1) + " of 25 · " + les.learningObjective;
  const fs = document.getElementById("fallSong");
  const fl = document.getElementById("fallLesson");
  if (fs) fs.textContent = SONGS[state.song] ? SONGS[state.song].title : les.title;
  if (fl) fl.textContent = "Lesson " + (lessonIndex(id)+1);
  els.coach.innerHTML = les.explanation;
  els.bpm.value = les.bpm; state.bpm = les.bpm; els.bpmLabel.textContent = les.bpm + " BPM";
  document.getElementById("introKicker").textContent = "Lesson " + (lessonIndex(id)+1) + " · Stage " + les.stage;
  document.getElementById("introTitle").textContent = les.title;
  document.getElementById("introBody").textContent = "By the end you will: " + les.learningObjective + " " + les.explanation;
  document.getElementById("introOverlay").classList.add("show");
  rememberOpenLesson(id);
}

function finishLessonAttempt() {
  markCourseStarted();
  const les = lessonById(state.lessonId);
  const sc = state.score || { correct: 0, wrong: 0, times: [], bestStreak: 0, errors: [] };
  const total = sc.correct + sc.wrong;
  const acc = total ? Math.round(100 * sc.correct / total) : 100;
  const avg = sc.times.length ? Math.round(sc.times.reduce((a,b)=>a+b,0) / sc.times.length) : 0;
  const mastered = acc >= (les && les.requiredAccuracy || 70);
  progress.notesAttempted += total;
  progress.correct += sc.correct;
  progress.wrong += sc.wrong;
  progress.practiceMs += Math.max(0, performance.now() - (sc.started || performance.now()));
  progress.errors = (progress.errors || []).concat(sc.errors || []).slice(-80);
  const pid = les ? les.pieceId : state.song;
  progress.pieces[pid] = progress.pieces[pid] || { started: true, arrangements: [], best: 0, state: "Started" };
  progress.pieces[pid].best = Math.max(progress.pieces[pid].best || 0, acc);
  if (les && les.unlocks) {
    const [piece, arr] = les.unlocks.split(":");
    const bag = progress.pieces[piece] || (progress.pieces[piece] = { started: true, arrangements: [], best: 0, state: "Started" });
    if (arr && !bag.arrangements.includes(arr)) bag.arrangements.push(arr);
    bag.state = arr === "performance" ? "Independent Performance" : arr === "harmony" ? "Two Hands" : arr === "melody_bass" ? "Two Hands" : arr === "guided" ? "Guided Performance" : "Melody Learned";
  }
  if (les) {
    if (!progress.completed.includes(les.id)) progress.completed.push(les.id);
    if (les.nextLesson && !progress.unlocked.includes(les.nextLesson)) progress.unlocked.push(les.nextLesson);
    progress.currentLesson = les.nextLesson || les.id;
  }
  saveProgress();
  renderDashboard();
  const next = les && lessonById(les.nextLesson);
  document.getElementById("sumAcc").textContent = acc + "%";
  document.getElementById("sumOk").textContent = sc.correct;
  document.getElementById("sumBad").textContent = sc.wrong;
  document.getElementById("sumStreak").textContent = sc.bestStreak || 0;
  document.getElementById("sumTime").textContent = avg ? avg + "ms" : "—";
  document.getElementById("sumMaster").textContent = mastered ? "Yes" : "Passed";
  document.getElementById("sumTitle").textContent = next ? "Next: " + next.title : (les && les.learningObjective) || "Section complete";
  document.getElementById("sumRec").textContent = next
    ? (recommend(sc, acc, les) + " Opening lesson " + (lessonIndex(next.id)+1) + ".")
    : recommend(sc, acc, les);
  document.getElementById("sumNext").textContent = next ? "Next lesson ›" : "Back home";
  const badge = lessonBadge(les);
  const sumBadge = document.getElementById("sumBadge");
  if (sumBadge) sumBadge.textContent = badge.ico;
  document.getElementById("sumOverlay").classList.add("show");
  if (next) {
    clearTimeout(state._nextLessonTimer);
    state._nextLessonTimer = setTimeout(() => advanceToNextLesson(), 1600);
  }
}
function advanceToNextLesson() {
  clearTimeout(state._nextLessonTimer);
  document.getElementById("sumOverlay").classList.remove("show");
  const les = lessonById(state.lessonId);
  const nextId = les && les.nextLesson;
  if (nextId && lessonById(nextId)) {
    openLesson(nextId);
    return true;
  }
  showScreen("home");
  renderDashboard();
  return false;
}

function recommend(sc, acc, les) {
  const errs = (sc.errors || []);
  if (errs.length) {
    const pair = {};
    errs.forEach(e => { const k = NOTE_NAMES[e.expected % 12]; pair[k] = (pair[k]||0)+1; });
    const worst = Object.entries(pair).sort((a,b)=>b[1]-a[1])[0];
    if (worst) return "Most misses were looking for " + worst[0] + ". Hover over that house, then try the section again.";
  }
  if (acc >= 92 && state.assist === "learn") return "Note accuracy is strong. Try Practice — fewer labels, same music.";
  if (acc >= 90 && state.assist === "practice") return "Ready for Challenge: hide the glowing keys and play it as a performance.";
  if (acc < 70) return "Slow the tempo and stay in Learn. One clean pass teaches more than three rushed ones.";
  return "Solid. Play it once more, then continue to the next musical idea.";
}

function maybeDrill() {
  const recent = (progress.errors || []).slice(-12);
  const trans = {};
  recent.forEach(e => {
    const k = e.expected + ">" + e.actual;
    trans[k] = (trans[k]||0)+1;
  });
  const hit = Object.entries(trans).find(([,c]) => c >= 3);
  if (!hit) return null;
  return ARR.e_f_g;
}

const STAGE_BADGES = {
  1: { ico: "🔑", lbl: "Keys" },
  2: { ico: "🚶", lbl: "Steps" },
  3: { ico: "📜", lbl: "Reading" },
  4: { ico: "🎹", lbl: "Two hands" },
  5: { ico: "✦", lbl: "Harmony" },
  6: { ico: "★", lbl: "Perform" }
};
function lessonBadge(les) {
  return STAGE_BADGES[les && les.stage] || STAGE_BADGES[1];
}
function stageComplete(stage) {
  const pack = LESSONS.filter(x => x.stage === stage);
  return pack.length > 0 && pack.every(x => progress.completed.includes(x.id));
}
function renderBadgeStrip(el) {
  if (!el) return;
  el.innerHTML = [1,2,3,4,5,6].map(st => {
    const b = STAGE_BADGES[st];
    const on = stageComplete(st);
    return `<div class="sk-badge ${on?"on":""}" title="${b.lbl}"><span class="ico">${b.ico}</span><span class="lbl">${b.lbl}</span></div>`;
  }).join("");
}
function renderDashboard() {
  const started = hasStartedCourse(progress);
  const id = started ? resumeLessonId() : "l01";
  const les = lessonById(id) || LESSONS[0];
  const done = progress.completed.length;
  const pct = Math.round(done / LESSONS.length * 100);
  document.getElementById("dashKicker").textContent = started ? "CONTINUE LEARNING" : "GET STARTED";
  document.getElementById("continueBtn").textContent = started ? "Continue" : "Get Started";
  document.getElementById("dashPiece").textContent = (SONGS[les.pieceId] || SONGS.ode).title;
  document.getElementById("dashObj").textContent = les.learningObjective;
  document.getElementById("dashLesson").textContent = "Lesson " + (lessonIndex(les.id)+1) + " of 25";
  document.getElementById("dashPct").textContent = pct + "%";
  document.getElementById("dashBar").style.width = pct + "%";
  renderBadgeStrip(document.getElementById("dashBadges"));
}
function renderCourse() {
  const box = document.getElementById("courseList");
  box.innerHTML = LESSONS.map((les,i) => {
    const locked = !TEST_UNLOCK_ALL && !progress.unlocked.includes(les.id) && !progress.completed.includes(les.id) && les.id !== "l01";
    const done = progress.completed.includes(les.id);
    const b = lessonBadge(les);
    return `<button class="lesson-row ${locked?"lock":""}" data-lid="${les.id}">
      <div class="top"><span>${b.ico} Stage ${les.stage} · Lesson ${i+1}</span><span>${done?`<span class="done-pill">✓ Badge earned</span>`:locked?"Locked":"Ready"}</span></div>
      <h3>${les.title}</h3>
      <p style="margin:4px 0 0;font-size:12px;color:var(--muted)">${les.learningObjective}</p>
    </button>`;
  }).join("");
  box.querySelectorAll("button").forEach(b => b.onclick = () => openLesson(b.dataset.lid));
}
function renderMyMusic() {
  const order = ["ode","twinkle","mary","canon","clair"];
  const labels = { discovery:"Melody discovered", guided:"Guided performance", melody_bass:"Left hand added", harmony:"Harmony unlocked", performance:"Independent performance" };
  document.getElementById("musicList").innerHTML = order.map(id => {
    const p = progress.pieces[id] || { arrangements: [], best: 0, state: "Not Started" };
    const pct = Math.min(100, (p.arrangements.length / 5) * 100 || (p.state !== "Not Started" ? 10 : 0));
    const last = p.arrangements[p.arrangements.length-1];
    return `<div class="music-row">
      <div class="top" style="display:flex;justify-content:space-between"><b>${SONGS[id].title}</b><span>${p.state}</span></div>
      <div class="bar" style="margin:8px 0"><span style="width:${pct}%"></span></div>
      <p style="margin:0;font-size:12px;color:var(--muted)">${last ? labels[last] : "Not started yet"} · best ${p.best||0}%</p>
    </div>`;
  }).join("");
}
function renderProgress() {
  const acc = progress.notesAttempted ? Math.round(100*progress.correct/progress.notesAttempted) : 0;
  const mins = Math.round((progress.practiceMs||0)/60000);
  document.getElementById("progCard").innerHTML = `
    <h3>Your practice</h3>
    <p>Lessons complete: <b>${progress.completed.length}/25</b><br>
    Notes judged: <b>${progress.notesAttempted}</b> · Accuracy: <b>${acc}%</b><br>
    Practice time: <b>${mins} min</b></p>
    <p>This stays on this device. A future cloud login can copy the same object.</p>
    <p style="margin:12px 0 6px;font-size:12px;color:var(--muted)">Stage badges</p>
    <div class="badge-row" id="progBadges"></div>`;
  renderBadgeStrip(document.getElementById("progBadges"));
}

document.getElementById("continueBtn").onclick = () => openLesson(resumeLessonId());
document.getElementById("courseBack").onclick = () => showScreen("home");
document.getElementById("unlockAllBtn").onclick = () => {
  progress.unlocked = allLessonIds();
  saveProgress();
  renderCourse();
  flashToast("All 25 lessons unlocked for testing.");
};
document.getElementById("resetProgBtn").onclick = () => {
  progress = defaultProgress();
  saveProgress();
  renderCourse();
  renderDashboard();
  flashToast("Progress reset. Lessons stay open for testing.");
};
document.getElementById("introSkip").onclick = () => {
  document.getElementById("introOverlay").classList.remove("show");
  const les = lessonById(state.lessonId);
  if (les) {
    if (!progress.completed.includes(les.id)) progress.completed.push(les.id);
    if (les.nextLesson && !progress.unlocked.includes(les.nextLesson)) progress.unlocked.push(les.nextLesson);
    progress.currentLesson = les.nextLesson || les.id;
    saveProgress();
  }
  if (les && les.nextLesson) openLesson(les.nextLesson);
  else showScreen("home");
};
document.getElementById("musicBack").onclick = () => showScreen("home");
document.getElementById("progBack").onclick = () => showScreen("home");
document.getElementById("introStart").onclick = () => {
  markCourseStarted();
  document.getElementById("introOverlay").classList.remove("show");
  startPlay();
};
document.getElementById("introPreview").onclick = () => {
  ensureAudio();
  const notes = currentNotes();
  notes.forEach((x,i) => setTimeout(() => playTone(x.midi, Math.max(0.2, x.d*0.35)), i*280));
};
document.getElementById("sumNext").onclick = () => advanceToNextLesson();
document.getElementById("sumRetry").onclick = () => {
  clearTimeout(state._nextLessonTimer);
  document.getElementById("sumOverlay").classList.remove("show");
  const drill = maybeDrill();
  if (drill && (state.score && state.score.wrong >= 4)) {
    state.lessonNotes = drill.map(x => Object.assign({}, x));
    els.coach.innerHTML = "Short repair walk: E F G F E. Then we return to the piece.";
  }
  startPlay();
};
document.getElementById("assistLearn").onclick = () => applyAssist("learn");
document.getElementById("assistPractice").onclick = () => applyAssist("practice");
document.getElementById("assistChallenge").onclick = () => applyAssist("challenge");

document.getElementById("backBtn").onclick = leaveStudioToHome;
document.getElementById("theoryBack").onclick = () => showScreen("home");

async function setupMIDI() {
  const dot = document.getElementById("midiDot");
  const label = document.getElementById("midiStatus");
  if (!navigator.requestMIDIAccess) {
    label.lastChild && (label.innerHTML = `<span class="midi-dot" id="midiDot"></span>On-screen + computer keys · MIDI not in this browser`);
    return;
  }
  try {
    const access = await navigator.requestMIDIAccess();
    state.midi.access = access;
    const hook = input => {
      input.onmidimessage = ev => {
        const [s, note, vel] = ev.data;
        const cmd = s & 0xf0;
        if (cmd === 0xb0 && note === 64) PianoEngine.setSustain(vel >= 64);
        else if (cmd === 0x90 && vel > 0) InputProvider.note(note, true, vel);
        else if (cmd === 0x80 || (cmd === 0x90 && vel === 0)) InputProvider.note(note, false);
      };
    };
    access.inputs.forEach(hook);
    access.onstatechange = () => access.inputs.forEach(hook);
    const first = [...access.inputs.values()][0];
    state.midi.name = first ? first.name : null;
    if (dot) dot.classList.toggle("on", !!first);
    document.getElementById("midiStatus").innerHTML = `<span class="midi-dot ${first?"on":""}" id="midiDot"></span>` + (first ? first.name + " connected" : "MIDI ready — plug in a piano");
  } catch {
    document.getElementById("midiStatus").innerHTML = `<span class="midi-dot" id="midiDot"></span>On-screen keys ready · MIDI permission skipped`;
  }
}

renderDashboard();
setupMIDI();
