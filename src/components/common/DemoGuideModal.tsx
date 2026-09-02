import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, Play, ExternalLink, Bot, AlertTriangle, Layers } from 'lucide-react';
import { ViewRoute } from '../../types';

interface DemoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTo: (route: ViewRoute) => void;
}

export const DemoGuideModal: React.FC<DemoGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigateTo
}) => {
  if (!isOpen) return null;

  const demoSteps = [
    {
      step: 1,
      title: 'Upload Material / Document Ingestion',
      route: 'upload' as ViewRoute,
      desc: 'See the 5-stage document chunking and concept extraction animation for Class 10 Physics Chapter 4.',
      badge: 'Step 1'
    },
    {
      step: 2,
      title: 'Personalized Lesson Plan',
      route: 'lesson-plan' as ViewRoute,
      desc: 'Check the 7-part micro-curriculum tailored to Beginner · Hinglish · 20min profile.',
      badge: 'Step 2'
    },
    {
      step: 3,
      title: 'AI Teacher Classroom & Avatar',
      route: 'teacher' as ViewRoute,
      desc: 'Experience Ava explaining Ohm’s Law with synchronized voice, facial expressions, and live subtitles.',
      badge: 'Core Feature'
    },
    {
      step: 4,
      title: 'Intentional Misconception Trigger & WOW Moment',
      route: 'teacher' as ViewRoute,
      desc: 'Click "Option A: Current increases". Watch the Misconception Detection engine intervene, change strategy, and switch to the Water Pipe Analogy!',
      badge: 'WOW Interaction'
    },
    {
      step: 5,
      title: 'Adaptive Mastery Assessment',
      route: 'assessment' as ViewRoute,
      desc: 'Complete the 5-question adaptive quiz with Bloom taxonomy questions and instant feedback.',
      badge: 'Evaluation'
    },
    {
      step: 6,
      title: 'Learning Analytics Report',
      route: 'report' as ViewRoute,
      desc: 'Inspect the 82% mastery score, 43% ➔ 82% improvement chart, resolved misconceptions, and next steps.',
      badge: 'Analytics'
    },
    {
      step: 7,
      title: 'Personalized Learning Roadmap',
      route: 'learning-path' as ViewRoute,
      desc: 'View the electricity knowledge tree with mastery percentages and prerequisite tracking.',
      badge: 'Roadmap'
    },
    {
      step: 8,
      title: '7 AI Agents Engine Architecture',
      route: 'ai-engine' as ViewRoute,
      desc: 'Inspect the live 7-agent autonomous cognitive loop with real-time telemetry.',
      badge: 'AI Architecture'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                  EDUVISTA Hackathon Demo Walkthrough
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Preconfigured Demo
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Class 10 Physics (Electricity & Ohm's Law) • Tanya (Beginner · Hinglish)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        {/* Central Demo Flow Steps */}
        <div className="py-4 space-y-2.5">
          {demoSteps.map((s) => (
            <div
              key={s.step}
              className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-slate-800 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  0{s.step}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {s.title}
                    </h4>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {s.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onNavigateTo(s.route);
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold shrink-0 transition-all flex items-center gap-1"
              >
                <span>Jump</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer Quick Start */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            Tip: In the AI Teacher screen, choose the wrong option to trigger the adaptive misconception intervention!
          </div>
          <button
            type="button"
            onClick={() => {
              onNavigateTo('teacher');
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Launch Live Classroom</span>
          </button>
        </div>
      </div>
    </div>
  );
};
