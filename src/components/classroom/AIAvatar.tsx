import React from 'react';
import { Sparkles, Bot, Volume2, VolumeX, Eye, ShieldCheck, HeartHandshake, AlertTriangle, RefreshCw, PlayCircle } from 'lucide-react';
import { VoiceWaveform } from '../common/VoiceWaveform';
import { speechService } from '../../services/speechSynthesisService';

export type AvatarState = 'teaching' | 'speaking' | 'listening' | 'analyzing' | 'misconception' | 'adapting' | 'celebrating';

interface AIAvatarProps {
  state?: AvatarState;
  isMuted?: boolean;
  onToggleMute?: () => void;
  currentSpeechText?: string;
  language?: string;
  isPaused?: boolean;
  onSpeakNow?: () => void;
  isSpeakingNow?: boolean;
}

export const AIAvatar: React.FC<AIAvatarProps> = ({
  state = 'teaching',
  isMuted = false,
  onToggleMute,
  currentSpeechText,
  language = 'Hinglish',
  isPaused = false,
  onSpeakNow,
  isSpeakingNow = false
}) => {
  const [blink, setBlink] = React.useState(false);
  const [mouthOpen, setMouthOpen] = React.useState(false);

  // Natural eye blinking timer
  React.useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Speech mouth movement timer
  React.useEffect(() => {
    if (isPaused || state === 'listening' || state === 'analyzing') {
      setMouthOpen(false);
      return;
    }
    const mouthInterval = setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, 220);
    return () => clearInterval(mouthInterval);
  }, [state, isPaused, isSpeakingNow]);

  // Badge configuration based on state
  const stateConfig = {
    teaching: {
      label: 'Teaching Concept',
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      dot: 'bg-emerald-400',
      glow: 'shadow-emerald-500/10',
      icon: <Sparkles className="w-3 h-3 text-emerald-400" />
    },
    speaking: {
      label: 'Explaining Step-by-Step',
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      dot: 'bg-blue-400',
      glow: 'shadow-blue-500/10',
      icon: <Volume2 className="w-3 h-3 text-blue-400" />
    },
    listening: {
      label: 'Listening to Student',
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      dot: 'bg-amber-400',
      glow: 'shadow-amber-500/10',
      icon: <Eye className="w-3 h-3 text-amber-400" />
    },
    analyzing: {
      label: 'Analyzing Understanding...',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      dot: 'bg-purple-400 animate-ping',
      glow: 'shadow-purple-500/20',
      icon: <Bot className="w-3 h-3 text-purple-400 animate-spin" />
    },
    misconception: {
      label: 'Misconception Detected',
      color: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      dot: 'bg-rose-400',
      glow: 'shadow-rose-500/20',
      icon: <AlertTriangle className="w-3 h-3 text-rose-400" />
    },
    adapting: {
      label: 'Adapting Teaching Strategy',
      color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      dot: 'bg-indigo-400 animate-spin',
      glow: 'shadow-indigo-500/20',
      icon: <RefreshCw className="w-3 h-3 text-indigo-400" />
    },
    celebrating: {
      label: 'Mastery Confirmed! 🎉',
      color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40',
      dot: 'bg-emerald-300',
      glow: 'shadow-emerald-500/20',
      icon: <ShieldCheck className="w-3 h-3 text-emerald-300" />
    }
  }[state];

  const handleManualPlayVoice = () => {
    if (onSpeakNow) {
      onSpeakNow();
    } else if (currentSpeechText) {
      speechService.unlockAudio();
      speechService.speak(currentSpeechText, language);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[360px] sm:min-h-[420px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800 flex flex-col justify-between p-4 shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      {/* Top Header inside Avatar Screen */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
            <Bot className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-tight">
                Ava
              </h3>
              <span className="text-[10px] text-slate-400 font-medium">
                EDUVISTA AI Teacher
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`w-1.5 h-1.5 rounded-full ${stateConfig.dot}`} />
              <span className="text-[11px] text-slate-300 font-medium">
                {stateConfig.label}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Active Voice Play Trigger Button */}
          <button
            id="avatar-quick-speak-btn"
            type="button"
            onClick={handleManualPlayVoice}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-500/50 hover:border-indigo-400 text-indigo-200 hover:text-white text-[11px] font-semibold transition-all shadow-sm active:scale-95"
            title="Listen to Teacher's Voice (आवाज़ सुनें)"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isSpeakingNow ? 'animate-pulse text-cyan-400' : 'text-indigo-300'}`} />
            <span>{isSpeakingNow ? 'Speaking...' : 'Play Voice'}</span>
          </button>

          {/* Mute button */}
          {onToggleMute && (
            <button
              id="avatar-mute-toggle"
              type="button"
              onClick={onToggleMute}
              className={`p-1.5 rounded-lg border transition-all ${
                isMuted
                  ? 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
              }`}
              title={isMuted ? 'Unmute Teacher Audio' : 'Mute Teacher Audio'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Avatar Center Stage */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-4">
        {/* Glow Ring Around Avatar */}
        <div className="relative">
          <div
            className={`absolute -inset-2 rounded-full blur-xl opacity-60 transition-all duration-700 ${
              state === 'misconception'
                ? 'bg-rose-500/40'
                : state === 'adapting'
                ? 'bg-indigo-500/40'
                : state === 'celebrating'
                ? 'bg-emerald-500/40'
                : 'bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400'
            }`}
          />

          {/* Avatar Realistic Portrait Visualizer Container */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1 bg-gradient-to-b from-indigo-500/50 via-slate-800 to-cyan-500/40 shadow-2xl overflow-hidden cursor-pointer" onClick={handleManualPlayVoice} title="Click to hear Ava speak">
            <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden relative flex items-center justify-center">
              {/* Teacher Avatar Photorealistic Face Layer */}
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80"
                alt="Ava AI Teacher"
                className={`w-full h-full object-cover object-top scale-105 transition-transform duration-700 ${
                  !isPaused && (state !== 'listening' || isSpeakingNow) ? 'scale-110' : 'scale-100'
                }`}
              />

              {/* Dynamic Overlay for Blinking and Expressions */}
              <div className="absolute inset-0 bg-indigo-950/15 mix-blend-color-dodge pointer-events-none" />

              {/* Facial AI Mesh Grid & Aura */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              {/* Lip-sync speech indicator aura */}
              {!isPaused && (state === 'speaking' || state === 'teaching' || state === 'adapting' || isSpeakingNow) && (
                <div
                  className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-4 rounded-full blur-[2px] transition-all duration-200 ${
                    mouthOpen ? 'bg-cyan-400/40 scale-125' : 'bg-transparent scale-90'
                  }`}
                />
              )}

              {/* Blinking eyes simulation overlay */}
              {blink && (
                <div className="absolute top-14 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-950/85 backdrop-blur-[1px] rounded-full transition-opacity duration-150" />
              )}
            </div>
          </div>

          {/* Floating live indicator tag */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/95 border border-slate-700 shadow-xl">
            <span className={`w-2 h-2 rounded-full ${isSpeakingNow ? 'bg-cyan-400 animate-ping' : stateConfig.dot}`} />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">
              {language} Voice {isMuted ? '(Muted)' : isSpeakingNow ? '(Playing)' : '(Ready)'}
            </span>
          </div>
        </div>

        {/* Live Voice Audio Waveform */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <VoiceWaveform
            isPlaying={!isPaused && !isMuted && (state !== 'listening' || isSpeakingNow)}
            barCount={24}
            size="md"
          />
        </div>
      </div>

      {/* Bottom Subtitle / Speech Caption Bar */}
      <div className="relative z-10 mt-auto bg-slate-900/90 backdrop-blur-md rounded-xl p-3.5 border border-slate-800/90 shadow-inner">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-400">
            <Sparkles className="w-3 h-3" />
            <span>AI Teacher Speech & Transcript ({language})</span>
          </div>
          
          <button
            type="button"
            onClick={handleManualPlayVoice}
            className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 hover:border-cyan-500/60 transition-all cursor-pointer"
          >
            <Volume2 className="w-3 h-3" />
            <span>🔊 Replay Voice (आवाज़ सुनें)</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-100 font-normal leading-relaxed">
          {currentSpeechText ||
            '“Think of resistance like a narrow water pipe. The narrower the pipe, the harder it is for water to flow through.”'}
        </p>
      </div>
    </div>
  );
};
