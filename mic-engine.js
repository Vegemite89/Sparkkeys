/* MicPitch — single-note microphone recognition for SparkKeys.
   Loads after grand-engine.js, before app.js.
   Emits through InputProvider.note when app.js has defined it. */
(function (global) {
  "use strict";

  const MIC_STORE = "sparkkeys-mic-v1";
  const MIDI_MIN = 24;
  const MIDI_MAX = 108;
  const STABLE_FRAMES = 4;
  const SILENT_FRAMES = 6;
  const AMP_THRESHOLD = 0.018;
  const CLARITY_MIN = 0.88;
  const HYSTERESIS_CENTS = 45;

  function freqToMidi(freq) {
    if (!freq || freq <= 0) return null;
    return Math.round(69 + 12 * Math.log2(freq / 440));
  }

  function midiToFreq(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function centsOff(freq, midi) {
    const target = midiToFreq(midi);
    return 1200 * Math.log2(freq / target);
  }

  /** Autocorrelation pitch detector (YIN-flavoured clarity gate). */
  function detectPitch(buf, sampleRate) {
    const size = buf.length;
    let rms = 0;
    for (let i = 0; i < size; i++) rms += buf[i] * buf[i];
    rms = Math.sqrt(rms / size);
    if (rms < AMP_THRESHOLD) return { freq: null, rms, clarity: 0 };

    const minLag = Math.floor(sampleRate / midiToFreq(MIDI_MAX));
    const maxLag = Math.min(Math.floor(sampleRate / midiToFreq(MIDI_MIN)), size - 1);
    if (minLag >= maxLag) return { freq: null, rms, clarity: 0 };

    let bestLag = -1;
    let bestCorr = 0;
    let norm = 0;
    for (let i = 0; i < size; i++) norm += buf[i] * buf[i];
    if (norm < 1e-8) return { freq: null, rms, clarity: 0 };

    for (let lag = minLag; lag <= maxLag; lag++) {
      let corr = 0;
      for (let i = 0; i < size - lag; i++) corr += buf[i] * buf[i + lag];
      corr /= norm;
      if (corr > bestCorr) {
        bestCorr = corr;
        bestLag = lag;
      }
    }

    if (bestLag < 0 || bestCorr < CLARITY_MIN) {
      return { freq: null, rms, clarity: bestCorr };
    }

    // Parabolic interpolation around peak lag
    let lag = bestLag;
    if (bestLag > minLag && bestLag < maxLag) {
      let c0 = 0, c1 = 0, c2 = 0;
      for (let i = 0; i < size - (bestLag - 1); i++) c0 += buf[i] * buf[i + bestLag - 1];
      for (let i = 0; i < size - bestLag; i++) c1 += buf[i] * buf[i + bestLag];
      for (let i = 0; i < size - (bestLag + 1); i++) c2 += buf[i] * buf[i + bestLag + 1];
      c0 /= norm; c1 /= norm; c2 /= norm;
      const denom = 2 * (2 * c1 - c0 - c2);
      if (Math.abs(denom) > 1e-9) {
        const delta = (c0 - c2) / denom;
        if (Math.abs(delta) < 1) lag = bestLag + delta;
      }
    }

    return { freq: sampleRate / lag, rms, clarity: bestCorr };
  }

  const MicPitch = {
    enabled: false,
    starting: false,
    stream: null,
    ctx: null,
    analyser: null,
    source: null,
    buf: null,
    raf: 0,
    candidate: null,
    stableCount: 0,
    silentCount: 0,
    activeMidi: null,
    micHeld: new Set(),
    status: "off",
    _statusEl: null,
    _chipEl: null,

    preferEnabled() {
      try {
        return localStorage.getItem(MIC_STORE) === "1";
      } catch {
        return false;
      }
    },

    persist(on) {
      try {
        localStorage.setItem(MIC_STORE, on ? "1" : "0");
      } catch {}
    },

    setStatus(status, label) {
      this.status = status;
      const el = this._statusEl || document.getElementById("micStatus");
      const chip = this._chipEl || document.getElementById("micChip");
      if (el) {
        const on = status === "listening";
        el.innerHTML =
          `<span class="midi-dot ${on ? "on" : ""}" id="micDot"></span>` +
          (label || this.defaultLabel(status));
      }
      if (chip) {
        chip.classList.toggle("on", status === "listening");
        chip.textContent = status === "listening" ? "Mic on" : "Mic";
      }
    },

    defaultLabel(status) {
      switch (status) {
        case "listening":
          return "Mic listening — play one note in a quiet room";
        case "denied":
          return "Mic permission denied";
        case "unsupported":
          return "Mic not supported in this browser";
        case "error":
          return "Mic error — tap Mic to retry";
        default:
          return "Mic off";
      }
    },

    bindUi(chipEl, statusEl) {
      this._chipEl = chipEl || document.getElementById("micChip");
      this._statusEl = statusEl || document.getElementById("micStatus");
      if (this._chipEl && !this._chipEl._micBound) {
        this._chipEl._micBound = true;
        this._chipEl.addEventListener("click", () => {
          if (this.enabled || this.starting) this.stop();
          else this.start();
        });
      }
      this.setStatus(this.enabled ? "listening" : "off");
    },

    emit(midi, on, velocity) {
      const sink = (typeof InputProvider !== "undefined" && InputProvider)
        || global.InputProvider;
      if (sink && typeof sink.note === "function") sink.note(midi, on, velocity);
    },

    feedbackBlocked(midi) {
      const eng = (typeof PianoEngine !== "undefined" && PianoEngine)
        || global.PianoEngine;
      if (!eng || !eng.held) return false;
      if (!eng.held.has(midi)) return false;
      return !this.micHeld.has(midi);
    },

    noteOn(midi, rms) {
      if (this.activeMidi === midi) return;
      if (this.feedbackBlocked(midi)) return;
      if (this.activeMidi != null) this.noteOff(this.activeMidi);
      const vel = Math.max(40, Math.min(110, Math.round(40 + rms * 900)));
      this.micHeld.add(midi);
      this.activeMidi = midi;
      this.emit(midi, true, vel);
    },

    noteOff(midi) {
      if (midi == null) return;
      if (!this.micHeld.has(midi)) {
        if (this.activeMidi === midi) this.activeMidi = null;
        return;
      }
      this.micHeld.delete(midi);
      if (this.activeMidi === midi) this.activeMidi = null;
      this.emit(midi, false);
    },

    releaseAll() {
      const held = [...this.micHeld];
      held.forEach(m => this.noteOff(m));
      this.micHeld.clear();
      this.activeMidi = null;
      this.candidate = null;
      this.stableCount = 0;
      this.silentCount = 0;
    },

    async start() {
      if (this.enabled || this.starting) return;
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        this.setStatus("unsupported");
        return;
      }
      this.starting = true;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
        const Ctx = global.AudioContext || global.webkitAudioContext;
        const ctx = new Ctx();
        if (ctx.state === "suspended") await ctx.resume();
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.2;
        source.connect(analyser);
        this.stream = stream;
        this.ctx = ctx;
        this.source = source;
        this.analyser = analyser;
        this.buf = new Float32Array(analyser.fftSize);
        this.enabled = true;
        this.starting = false;
        this.persist(true);
        this.setStatus("listening");
        this.loop();
      } catch (err) {
        this.starting = false;
        const denied =
          err && (err.name === "NotAllowedError" || err.name === "PermissionDeniedError");
        this.setStatus(denied ? "denied" : "error");
        this.persist(false);
      }
    },

    stop() {
      this.enabled = false;
      this.starting = false;
      if (this.raf) {
        cancelAnimationFrame(this.raf);
        this.raf = 0;
      }
      this.releaseAll();
      if (this.source) {
        try { this.source.disconnect(); } catch {}
        this.source = null;
      }
      this.analyser = null;
      if (this.stream) {
        this.stream.getTracks().forEach(t => t.stop());
        this.stream = null;
      }
      if (this.ctx) {
        try { this.ctx.close(); } catch {}
        this.ctx = null;
      }
      this.persist(false);
      this.setStatus("off");
    },

    loop() {
      if (!this.enabled || !this.analyser) return;
      this.analyser.getFloatTimeDomainData(this.buf);
      const { freq, rms, clarity } = detectPitch(this.buf, this.ctx.sampleRate);

      if (!freq || rms < AMP_THRESHOLD || clarity < CLARITY_MIN) {
        this.silentCount += 1;
        this.stableCount = 0;
        this.candidate = null;
        if (this.activeMidi != null && this.silentCount >= SILENT_FRAMES) {
          this.noteOff(this.activeMidi);
        }
      } else {
        this.silentCount = 0;
        let midi = freqToMidi(freq);
        if (midi == null || midi < MIDI_MIN || midi > MIDI_MAX) {
          this.stableCount = 0;
          this.candidate = null;
        } else {
          if (
            this.activeMidi != null &&
            Math.abs(centsOff(freq, this.activeMidi)) < HYSTERESIS_CENTS
          ) {
            midi = this.activeMidi;
            this.stableCount = STABLE_FRAMES;
          } else if (this.candidate === midi) {
            this.stableCount += 1;
          } else {
            this.candidate = midi;
            this.stableCount = 1;
          }

          if (this.stableCount >= STABLE_FRAMES) {
            if (this.activeMidi !== midi) this.noteOn(midi, rms);
          }
        }
      }

      this.raf = requestAnimationFrame(() => this.loop());
    }
  };

  global.MicPitch = MicPitch;
})(typeof window !== "undefined" ? window : globalThis);
