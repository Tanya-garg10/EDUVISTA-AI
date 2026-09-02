// Browser Speech Synthesis & Web Audio Engine for EDUVISTA AI Teacher

class SpeechSynthesisService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.85; // 0.0 to 1.0
  private isAudioUnlocked: boolean = false;
  private voicesLoaded: boolean = false;
  private cachedVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.cachedVoices = this.synth.getVoices();
    if (this.cachedVoices.length > 0) {
      this.voicesLoaded = true;
    }
  }

  // Initialize and unlock audio context on user interaction
  public unlockAudio() {
    this.isAudioUnlocked = true;
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      if (this.synth && this.synth.paused) {
        this.synth.resume();
      }
    } catch (e) {
      console.warn('Audio unlock error:', e);
    }
  }

  // Play sound effect using Web Audio API
  public playSoundEffect(type: 'chime' | 'misconception' | 'celebrate' | 'pop' | 'voice_start') {
    if (this.isMuted) return;
    this.unlockAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === 'voice_start') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.08 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'chime' || type === 'celebrate') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
        gain.gain.setValueAtTime(0.12 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'misconception') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.25);
        gain.gain.setValueAtTime(0.1 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'pop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
        gain.gain.setValueAtTime(0.05 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {
      console.warn('Audio FX error:', e);
    }
  }

  // Get best voice match for language
  private getBestVoice(language: string): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return null;

    const langLower = language.toLowerCase();

    if (langLower.includes('hindi') || langLower === 'hindi') {
      // Look for Hindi voice
      const hindiVoice = voices.find(v => v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi') || v.lang.includes('IN'));
      if (hindiVoice) return hindiVoice;
    }

    if (langLower.includes('hinglish')) {
      // Look for Indian English or Hindi voice
      const inVoice = voices.find(v => v.lang === 'en-IN' || v.name.toLowerCase().includes('india') || v.lang.startsWith('hi'));
      if (inVoice) return inVoice;
    }

    // Default to natural female/English voice
    const femaleVoice = voices.find(v => 
      (v.name.toLowerCase().includes('ava') || 
       v.name.toLowerCase().includes('samantha') || 
       v.name.toLowerCase().includes('natural') || 
       v.name.toLowerCase().includes('google') ||
       v.name.toLowerCase().includes('zira')) && 
      v.lang.startsWith('en')
    );
    if (femaleVoice) return femaleVoice;

    // Fallback to any English voice or first available
    const enVoice = voices.find(v => v.lang.startsWith('en'));
    return enVoice || voices[0] || null;
  }

  // Clean text for speech synthesis (remove markdown, quotes, formulas, emojis)
  private cleanTextForSpeech(text: string): string {
    let clean = text;
    // Strip bold/italic markdown
    clean = clean.replace(/\*\*(.*?)\*\*/g, '$1');
    clean = clean.replace(/\*(.*?)\*/g, '$1');
    clean = clean.replace(/`([^`]+)`/g, '$1');
    // Pronounce common physics symbols naturally
    clean = clean.replace(/\\propto|∝/g, ' is proportional to ');
    clean = clean.replace(/\\Omega|Ω/g, ' Ohms ');
    clean = clean.replace(/\\rho|ρ/g, ' rho ');
    clean = clean.replace(/\\times|×/g, ' into ');
    clean = clean.replace(/V\s*=\s*I\s*[×*]?\s*R/gi, 'V equals I into R');
    clean = clean.replace(/P\s*=\s*V\s*[×*]?\s*I/gi, 'P equals V into I');
    clean = clean.replace(/H\s*=\s*I²\s*[×*]?\s*R\s*[×*]?\s*t/gi, 'H equals I squared R t');
    clean = clean.replace(/1\/A/g, ' 1 by A ');
    clean = clean.replace(/L\/A/g, ' L by A ');
    clean = clean.replace(/[*_#`~[\]()\\${}]/g, ' ');
    clean = clean.replace(/[""''«»]/g, '');
    clean = clean.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
    clean = clean.replace(/\s+/g, ' ');
    return clean.trim();
  }

  public speak(
    text: string,
    language: string = 'Hinglish',
    callbacks?: {
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: unknown) => void;
    }
  ) {
    if (this.isMuted || !text) {
      callbacks?.onEnd?.();
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported on this browser');
      callbacks?.onEnd?.();
      return;
    }

    try {
      this.unlockAudio();
      this.stop(); // Stop any active utterance

      const cleanText = this.cleanTextForSpeech(text);
      if (!cleanText) {
        callbacks?.onEnd?.();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      this.currentUtterance = utterance;
      utterance.volume = Math.max(0, Math.min(1, this.volume));

      const voice = this.getBestVoice(language);
      if (voice) {
        utterance.voice = voice;
      }

      // Configure rate and pitch for Ava's empathetic, warm tone
      if (language === 'Hindi') {
        utterance.lang = 'hi-IN';
        utterance.rate = 0.95;
        utterance.pitch = 1.05;
      } else if (language === 'Hinglish') {
        utterance.lang = voice?.lang || 'en-IN';
        utterance.rate = 0.98;
        utterance.pitch = 1.05;
      } else {
        utterance.lang = voice?.lang || 'en-US';
        utterance.rate = 1.0;
        utterance.pitch = 1.08;
      }

      utterance.onstart = () => {
        this.playSoundEffect('voice_start');
        callbacks?.onStart?.();
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        callbacks?.onEnd?.();
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        this.currentUtterance = null;
        callbacks?.onError?.(e);
        callbacks?.onEnd?.();
      };

      // Workaround for Chrome long utterance bug
      if (this.synth) {
        this.synth.speak(utterance);
      }
    } catch (err) {
      console.warn('Failed to speak text:', err);
      callbacks?.onEnd?.();
    }
  }

  public stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        console.warn('Speech cancel error:', e);
      }
    }
    this.currentUtterance = null;
  }

  public pause() {
    if (this.synth) {
      this.synth.pause();
    }
  }

  public resume() {
    if (this.synth) {
      this.synth.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stop();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.currentUtterance) {
      this.currentUtterance.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public isSpeaking(): boolean {
    return this.synth ? this.synth.speaking : false;
  }
}

export const speechService = new SpeechSynthesisService();
