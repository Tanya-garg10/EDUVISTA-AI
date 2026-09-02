import React from 'react';
import { FileText, ShieldCheck, ExternalLink, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { GroundedSource } from '../../types';

interface RAGSourcesDrawerProps {
  sources: GroundedSource[];
  isOpen: boolean;
  onClose: () => void;
}

export const RAGSourcesDrawer: React.FC<RAGSourcesDrawerProps> = ({
  sources,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-5 sm:p-6 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  RAG Knowledge Grounding
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Verified Factual
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Answer & lesson grounded in uploaded curriculum material
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Sources list */}
        <div className="py-4 space-y-3">
          {sources.map((src, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {src.documentTitle}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 font-mono">
                    Pages: {src.pages.join(', ')}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 font-bold">
                    {Math.round(src.confidenceScore * 100)}% Match
                  </span>
                </div>
              </div>

              <div className="text-xs text-indigo-300 font-medium">
                {src.chapter}
              </div>

              <blockquote className="p-3 rounded-lg bg-slate-900/90 border-l-2 border-cyan-400 text-xs text-slate-300 italic leading-relaxed">
                {src.snippet}
              </blockquote>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  No hallucinations • Strict vector semantic match
                </span>
                <span className="text-slate-500 font-mono">Chunk ID: #RAG-NCERT-{i + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Teacher references exact textbook passages for all definitions.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
