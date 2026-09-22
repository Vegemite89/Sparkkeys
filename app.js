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
  minuet: {
    title: "Minuet in G",
    composer: "Petzold · SparkKeys melody (BWV Anh.114)",
    tip: "Right-hand tune only for mic and touch. Starts on D above Middle C. Feel the gentle dance pulse — longer notes on the downbeats.",
    bpm: 88,
    notes: [
      // SparkKeys melody-first RH (CLEAR: Petzold / Anna Magdalena Notebook tradition)
      n(0,2,74,4,"R"), n(2,1,67,1,"R"), n(3,1,69,2,"R"),
      n(4,2,71,3,"R"), n(6,1,72,4,"R"), n(7,1,74,5,"R"),
      n(8,2,76,5,"R"), n(10,1,74,4,"R"), n(11,1,72,3,"R"),
      n(12,2,71,2,"R"), n(14,1,69,1,"R"), n(15,1,67,1,"R"),
      n(16,2,69,2,"R"), n(18,1,71,3,"R"), n(19,1,72,4,"R"),
      n(20,2,74,5,"R"), n(22,1,72,4,"R"), n(23,1,71,3,"R"),
      n(24,2,69,2,"R"), n(26,1,67,1,"R"), n(27,1,66,1,"R"),
      n(28,4,67,1,"R"),
      n(32,2,74,4,"R"), n(34,1,67,1,"R"), n(35,1,69,2,"R"),
      n(36,2,71,3,"R"), n(38,1,72,4,"R"), n(39,1,74,5,"R"),
      n(40,2,76,5,"R"), n(42,1,74,4,"R"), n(43,1,72,3,"R"),
      n(44,2,71,2,"R"), n(46,1,69,1,"R"), n(47,1,67,1,"R"),
      n(48,2,69,2,"R"), n(50,1,71,3,"R"), n(51,1,67,1,"R"),
      n(52,2,69,2,"R"), n(54,1,66,1,"R"), n(55,1,64,1,"R"),
      n(56,4,62,1,"R")
    ]
  },
  prelude_c: {
    title: "Prelude in C",
    composer: "J.S. Bach · SparkKeys simplified (BWV 846)",
    tip: "Melody-first broken chords in C. Thumb on Middle C, then E G and the C above. Same shape repeats — listen for the floating C-major colour.",
    bpm: 72,
    notes: [
      // SparkKeys simplified RH arpeggio shape (CLEAR: BWV 846 contour)
      n(0,1,60,1,"R"), n(1,1,64,2,"R"), n(2,1,67,3,"R"), n(3,1,72,5,"R"),
      n(4,1,64,2,"R"), n(5,1,67,3,"R"), n(6,1,72,5,"R"), n(7,1,76,5,"R"),
      n(8,1,60,1,"R"), n(9,1,64,2,"R"), n(10,1,67,3,"R"), n(11,1,72,5,"R"),
      n(12,1,64,2,"R"), n(13,1,67,3,"R"), n(14,1,72,5,"R"), n(15,1,76,5,"R"),
      n(16,1,62,1,"R"), n(17,1,65,2,"R"), n(18,1,69,3,"R"), n(19,1,74,5,"R"),
      n(20,1,65,2,"R"), n(21,1,69,3,"R"), n(22,1,74,5,"R"), n(23,1,77,5,"R"),
      n(24,1,60,1,"R"), n(25,1,64,2,"R"), n(26,1,67,3,"R"), n(27,1,72,5,"R"),
      n(28,1,64,2,"R"), n(29,1,67,3,"R"), n(30,1,72,5,"R"), n(31,1,76,5,"R"),
      n(32,1,59,1,"R"), n(33,1,62,2,"R"), n(34,1,67,3,"R"), n(35,1,71,5,"R"),
      n(36,1,62,2,"R"), n(37,1,67,3,"R"), n(38,1,71,5,"R"), n(39,1,74,5,"R"),
      n(40,1,60,1,"R"), n(41,1,64,2,"R"), n(42,1,67,3,"R"), n(43,1,72,5,"R"),
      n(44,2,72,5,"R"), n(46,2,67,3,"R"), n(48,4,60,1,"R")
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
