/* SparkKeys concert-grand sampler — web prototype
   Single PianoEngine used by app.js.

   Current web audio:
   - Recorded acoustic-grand samples, one dynamic per pitch (C1–C8).
   - Velocity is gain + low-pass shaping of that one recording.
   - Not four different hammer recordings.

   Optional later (web): drop licensed files into
     samples/soft/C4.mp3  samples/medium/C4.mp3  samples/hard/C4.mp3
   The loader will pick them up without rewriting SparkKeys.

   Native Flutter target (deferred): bundled pp/mp/mf/ff, offline.
*/
const GRAND_SPEC = {
  id: "sparkkeys-grand-v1",
  polyphony: 64,
  targetLatencyMs: 20,
  sampleRoot: "https://cdn.jsdelivr.net/gh/nbrosowsky/tonejs-instruments@master/samples/piano/",
  localRoot: "samples/",
  format: "mp3",
  compass: [24, 108],
  currentVelocityLayers: 1,
  plannedNativeVelocityLayers: 4,
  optionalWebLayers: ["soft", "medium", "hard"],
  velocityMap: { soft: [1, 54], medium: [55, 96], hard: [97, 127] },
  maxConcurrentLoads: 3,
  reverb: 0.14,
  resonance: 0.06
};

const PianoEngine = {
  maxVoices: GRAND_SPEC.polyphony,
  voices: [],
  held: new Map(),
  buffers: new Map(),
  loading: new Map(),
  queue: [],
  activeLoads: 0,
  discoveredLayers: null,
  ready: false,
  nextId: 1,
  pressGen: new Map(),

  sampleName(midi) {
    const n = ["C", "Cs", "D", "Ds", "E", "F", "Fs", "G", "Gs", "A", "As", "B"][midi % 12];
    return n + (Math.floor(midi / 12) - 1);
  },
  nearestSampleMidi(midi) {
    const lo = GRAND_SPEC.compass[0], hi = GRAND_SPEC.compass[1];
    return Math.max(lo, Math.min(hi, midi | 0));
  },
  layerForVelocity(vel) {
    const layers = this.discoveredLayers;
    if (!layers || layers.length <= 1) return "medium";
    const v = Math.max(1, Math.min(127, vel | 0));
    if (v <= 54 && layers.includes("soft")) return "soft";
    if (v >= 97 && layers.includes("hard")) return "hard";
    if (layers.includes("medium")) return "medium";
    return layers[Math.floor(layers.length / 2)];
  },
  cacheKey(midi, layer) {
    return this.nearestSampleMidi(midi) + ":" + (layer || "medium");
  },
  urlsFor(midi, layer) {
    const name = this.sampleName(this.nearestSampleMidi(midi)) + "." + GRAND_SPEC.format;
    const list = [];
    if (layer && layer !== "medium") list.push(GRAND_SPEC.localRoot + layer + "/" + name);
    list.push(GRAND_SPEC.localRoot + "medium/" + name);
    list.push(GRAND_SPEC.sampleRoot + name);
    return list;
  },

  ensure() {
    if (state.audio) {
      if (state.audio.ctx.state === "suspended") state.audio.ctx.resume();
      return state.audio;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    const ctx = new AC({ latencyHint: "interactive" });
    const master = ctx.createGain();
    master.gain.value = state.volume == null ? 0.7 : state.volume;
    const dry = ctx.createGain();
    dry.gain.value = 1 - GRAND_SPEC.reverb;
    const wet = ctx.createGain();
    wet.gain.value = GRAND_SPEC.reverb;
    const conv = ctx.createConvolver();
    conv.buffer = this._hall(ctx);
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.knee.value = 10;
    comp.ratio.value = 1.6;
    comp.attack.value = 0.003;
    comp.release.value = 0.18;
    dry.connect(comp);
    wet.connect(conv);
    conv.connect(comp);
    comp.connect(master);
    master.connect(ctx.destination);
    state.audio = { ctx, master, dry, wet };
    this._probeLayers();
    return state.audio;
  },

  _hall(ctx) {
    const rate = ctx.sampleRate;
    const len = Math.floor(rate * 0.72);
    const buf = ctx.createBuffer(2, len, rate);
    for (let c = 0; c < 2; c++) {
      const data = buf.getChannelData(c);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.2) * (c ? 0.8 : 1);
      }
    }
    return buf;
  },

  _probeLayers() {
    if (this.discoveredLayers) return;
    this.discoveredLayers = ["medium"];
    const tryLayer = name => fetch(GRAND_SPEC.localRoot + name + "/C4." + GRAND_SPEC.format, { method: "HEAD" })
      .then(r => {
        if (r.ok && !this.discoveredLayers.includes(name)) {
          this.discoveredLayers.push(name);
          this.discoveredLayers.sort((a, b) =>
            GRAND_SPEC.optionalWebLayers.indexOf(a) - GRAND_SPEC.optionalWebLayers.indexOf(b));
        }
      })
      .catch(() => {});
    tryLayer("soft");
    tryLayer("hard");
    tryLayer("medium");
  },

  prioritize(midi) {
    this.ensure();
    this.load(midi, this.layerForVelocity(82), true);
    [midi - 2, midi - 1, midi + 1, midi + 2].forEach(m => {
      if (m >= GRAND_SPEC.compass[0] && m <= GRAND_SPEC.compass[1]) this.load(m, "medium", false);
    });
  },

  warmVisible(from, to) {
    this.ensure();
    const a = from == null ? 36 : from;
    const b = to == null ? 76 : to;
    const midis = [];
    for (let m = a; m <= b; m++) midis.push(m);
    midis.sort((x, y) => Math.abs(x - 60) - Math.abs(y - 60));
    midis.forEach(m => this.load(m, "medium", false));
  },

  load(midi, layer, urgent) {
    const use = layer || "medium";
    const key = this.cacheKey(midi, use);
    if (this.buffers.has(key)) return Promise.resolve(this.buffers.get(key));
    if (this.loading.has(key)) return this.loading.get(key);
    let resolve, reject;
    const job = new Promise((res, rej) => { resolve = res; reject = rej; });
    job._run = () => this._fetch(midi, use, key).then(resolve).catch(reject);
    this.loading.set(key, job);
    if (urgent) this.queue.unshift(job);
    else this.queue.push(job);
    this._pump();
    return job;
  },

  _pump() {
    while (this.activeLoads < GRAND_SPEC.maxConcurrentLoads && this.queue.length) {
      const job = this.queue.shift();
      this.activeLoads += 1;
      Promise.resolve()
        .then(() => job._run())
        .finally(() => {
          this.activeLoads -= 1;
          this._pump();
        });
    }
  },

  _fetch(midi, layer, key) {
    const { ctx } = this.ensure();
    const tryUrl = urls => {
      if (!urls.length) return Promise.resolve(null);
      return fetch(urls[0]).then(r => {
        if (!r.ok) return tryUrl(urls.slice(1));
        return r.arrayBuffer();
      }).catch(() => tryUrl(urls.slice(1)));
    };
    return tryUrl(this.urlsFor(midi, layer))
      .then(raw => raw ? ctx.decodeAudioData(raw.slice(0)) : null)
      .then(buf => {
        if (buf) this.buffers.set(key, buf);
        this.loading.delete(key);
        this.ready = this.buffers.size > 0;
        this._paintLoad();
        return buf;
      })
      .catch(err => {
        this.loading.delete(key);
        console.warn("Grand sample failed", key, err);
        return null;
      });
  },

  _paintLoad() {
    const el = document.getElementById("midiStatus");
    if (!el) return;
    const t = el.textContent || "";
    if (t.indexOf("connected") >= 0 || t.indexOf("MIDI ready") >= 0) return;
    const n = this.buffers.size;
    const layers = (this.discoveredLayers && this.discoveredLayers.length > 1)
      ? this.discoveredLayers.length + " recorded layers"
      : "1 recorded dynamic";
    const dot = `<span class="midi-dot ${n ? "on" : ""}" id="midiDot"></span>`;
    el.innerHTML = n
      ? dot + "Concert grand · " + layers + " · hold to sustain · MIDI optional"
      : dot + "Loading grand samples…";
  },

  layerGain(vel) {
    const v = Math.max(1, Math.min(127, vel | 0)) / 127;
    return 0.28 + v * 0.72;
  },
  layerCutoff(midi, vel) {
    const v = Math.max(1, Math.min(127, vel | 0)) / 127;
    return 1800 + Math.max(0, midi - 36) * 22 + v * 5400;
  },

  noteOn(midi, velocity = 82) {
    const { ctx, dry, wet } = this.ensure();
    const vel = Math.max(1, Math.min(127, velocity | 0));
    const layer = this.layerForVelocity(vel);
    const t = ctx.currentTime;
    const existing = this.held.get(midi);
    if (existing) {
      const prev = this.voices.find(v => v.id === existing);
      if (prev && !prev.dead) this._kill(prev, 0.02);
    }
    const amp = ctx.createGain();
    const send = ctx.createGain();
    send.gain.value = 0.24;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = this.layerCutoff(midi, vel);
    filter.Q.value = 0.55;
    filter.connect(amp);
    amp.connect(dry);
    amp.connect(send);
    send.connect(wet);
    const peak = 0.34 * this.layerGain(vel);
    amp.gain.setValueAtTime(0.0001, t);
    amp.gain.exponentialRampToValueAtTime(peak, t + 0.005);
    const voice = {
      id: this.nextId++,
      midi,
      amp,
      filter,
      nodes: [],
      keyDown: true,
      pedal: false,
      preview: false,
      born: t,
      dead: false,
      layer,
      vel
    };
    this.voices.push(voice);
    this.held.set(midi, voice.id);
    const gen = (this.pressGen.get(midi) || 0) + 1;
    this.pressGen.set(midi, gen);
    const buf = this.buffers.get(this.cacheKey(midi, layer)) || this.buffers.get(this.cacheKey(midi, "medium"));
    if (buf) this._startBuf(voice, buf, midi);
    else {
      this.load(midi, layer, true).then(loaded => {
        if (this.pressGen.get(midi) !== gen) return;
        if (voice.dead || !voice.keyDown && !voice.pedal && !voice.preview) return;
        const use = loaded || this.buffers.get(this.cacheKey(midi, "medium"));
        if (use) this._startBuf(voice, use, midi);
      });
    }
    this.prioritize(midi);
    if (state.sustainPedal) this._resonate(midi, vel, t);
    this._cull();
    return voice.id;
  },

  _startBuf(voice, buf, midi) {
    if (!voice || voice.dead || voice.nodes.length) return;
    const { ctx } = this.ensure();
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const srcMidi = this.nearestSampleMidi(midi);
    src.playbackRate.value = Math.pow(2, (midi - srcMidi) / 12);
    src.connect(voice.filter);
    try { src.start(ctx.currentTime); } catch {}
    voice.nodes.push(src);
  },

  _resonate(midi, vel, t) {
    const { wet } = this.ensure();
    [midi + 12, midi + 19].forEach(m => {
      const buf = this.buffers.get(this.cacheKey(m, "medium"));
      if (!buf) return;
      const g = this.ensure().ctx.createGain();
      g.gain.value = GRAND_SPEC.resonance * (vel / 127);
      const src = this.ensure().ctx.createBufferSource();
      src.buffer = buf;
      src.connect(g);
      g.connect(wet);
      try { src.start(t); } catch {}
      this.voices.push({
        id: this.nextId++, midi: m, amp: g, nodes: [src],
        keyDown: false, pedal: true, preview: true, born: t, dead: false, resonance: true
      });
    });
  },

  noteOff(midi) {
    const id = this.held.get(midi);
    const voice = this.voices.find(v => v.id === id);
    if (!voice || voice.dead) {
      this.held.delete(midi);
      return;
    }
    voice.keyDown = false;
    if (state.sustainPedal) {
      voice.pedal = true;
      return;
    }
    this._release(voice);
  },

  _release(voice) {
    if (!voice || voice.dead) return;
    const rel = voice.midi < 50 ? 1.05 : voice.midi < 72 ? 0.7 : 0.38;
    this._kill(voice, rel);
  },

  _kill(voice, rel) {
    if (!voice || voice.dead) return;
    const { ctx } = this.ensure();
    const t = ctx.currentTime;
    try {
      const cur = Math.max(0.0001, voice.amp.gain.value || 0.0001);
      voice.amp.gain.cancelScheduledValues(t);
      voice.amp.gain.setValueAtTime(cur, t);
      voice.amp.gain.exponentialRampToValueAtTime(0.0001, t + rel);
    } catch {}
    voice.nodes.forEach(n => { try { n.stop(t + rel + 0.06); } catch {} });
    voice.dead = true;
    if (this.held.get(voice.midi) === voice.id) this.held.delete(voice.midi);
  },

  _cull() {
    const live = this.voices.filter(v => !v.dead);
    if (live.length <= this.maxVoices) {
      this.voices = live;
      return;
    }
    live.filter(v => !v.keyDown && !v.pedal).sort((a, b) => a.born - b.born)
      .slice(0, live.length - this.maxVoices)
      .forEach(v => this._kill(v, 0.03));
    const still = this.voices.filter(v => !v.dead);
    if (still.length > this.maxVoices) {
      still.sort((a, b) => a.born - b.born)
        .slice(0, still.length - this.maxVoices)
        .forEach(v => this._kill(v, 0.02));
    }
    this.voices = this.voices.filter(v => !v.dead);
  },

  setSustain(on) {
    state.sustainPedal = !!on;
    if (on) return;
    this.voices.forEach(v => {
      if (!v.dead && v.pedal && !v.keyDown) this._release(v);
    });
  },

  stopAll() {
    this.voices.forEach(v => this._kill(v, 0.08));
    this.voices = [];
    this.held.clear();
    state.sustainPedal = false;
  }
};
