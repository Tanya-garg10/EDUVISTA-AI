import React from 'react';
import { AlertTriangle, RefreshCw, Sparkles, ArrowRight, Lightbulb, Compass, Waves } from 'lucide-react';
import { Misconception } from '../../types';

interface MisconceptionAlertProps {
  misconception: Misconception;
  onExploreAnalogy: () => void;
  onTryAgain: () => void;
  language?: string;
}

export const MisconceptionAlert: React.FC<MisconceptionAlertProps> = ({
  misconception,
  onExploreAnalogy,
  onTryAgain,
  language = 'Hinglish'
}) => {
  const teacherText = misconception.teacherSpeechOverride[
    (language as keyof typeof misconception.teacherSpeechOverride) || 'Hinglish'
  ];

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-rose-950/40 via-slate-900 to-slate-900 border-2 border-rose-500/40 p-4 sm:p-5 shadow-2xl shadow-rose-950/30 animate-in fade-in slide-in-from-bottom-3 duration-300">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-rose-500/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center animate-bounce">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wide">
                ⚠ Misconception Detected
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Concept: {misconception.concept}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-heading font-bold text-white mt-0.5">
              Let's rethink this together.
            </h3>
          </div>
        </div>

        {/* AI Adaptation Tag */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
          <span>AI Adapting Teaching Strategy</span>
        </div>
      </div>

      {/* Misunderstanding Diagnosis Card */}
      <div className="my-3.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
        <div className="flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              Cognitive Diagnosis:
            </span>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5 leading-relaxed">
              {misconception.detectedMisunderstanding}
            </p>
          </div>
        </div>

        {/* Strategy Flow Pipeline */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            New Pedagogy Route:
          </span>
          <div className="flex flex-wrap items-center gap-1 font-mono text-[11px] text-indigo-300">
            <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/30">Formula</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
              💧 Water Pipe Analogy
            </span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/30">Example</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300">
              Re-test
            </span>
          </div>
        </div>
      </div>

      {/* Teacher Empathetic Voice Subtitle Box */}
      <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 mb-4">
        <div className="text-[11px] font-semibold text-indigo-300 flex items-center gap-1 mb-1">
          <Sparkles className="w-3 h-3" />
          <span>Ava (Teacher Voice):</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-100 italic">
          “{teacherText}”
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          id="explore-analogy-btn"
          type="button"
          onClick={onExploreAnalogy}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-500/40 text-xs sm:text-sm font-semibold transition-all shadow-md shadow-cyan-500/10"
        >
          <Waves className="w-4 h-4 text-cyan-300" />
          <span>Show {misconception.analogyTitle}</span>
        </button>

        <button
          id="try-again-btn"
          type="button"
          onClick={onTryAgain}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-600/30 transition-all ml-auto"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again & Re-Evaluate</span>
        </button>
      </div>
    </div>
  );
};
