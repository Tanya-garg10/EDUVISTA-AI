import React from 'react';
import {
  Brain,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Zap,
  Activity,
  Layers,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { ProgressRing } from '../common/ProgressRing';

interface AdaptiveTeachingPanelProps {
  currentStage?: number; // 1 to 6
  studentAnswerText?: string;
  isCorrect?: boolean;
  detectedMisconception?: string;
  selectedStrategy?: string;
  previousMastery?: number; // 43
  newMastery?: number; // 71
  onDismiss?: () => void;
}

export const AdaptiveTeachingPanel: React.FC<AdaptiveTeachingPanelProps> = ({
  currentStage = 6,
  studentAnswerText = 'Selected: "Current increases"',
  isCorrect = false,
  detectedMisconception = 'Inverse Relationship Confusion (I ∝ 1/R)',
  selectedStrategy = 'Analogy Pivot (Squeezed Water Pipe)',
  previousMastery = 43,
  newMastery = 71,
  onDismiss
}) => {
  const steps = [
    {
      step: 1,
      name: 'Student Answer',
      desc: studentAnswerText,
      icon: <HelpCircle className="w-3.5 h-3.5" />
    },
    {
      step: 2,
      name: 'Concept Analysis',
      desc: 'Checking Ohm’s Law V=IR mental schema',
      icon: <Activity className="w-3.5 h-3.5" />
    },
    {
      step: 3,
      name: 'Misconception Detection',
      desc: detectedMisconception,
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
    },
    {
      step: 4,
      name: 'Strategy Selection',
      desc: selectedStrategy,
      icon: <Brain className="w-3.5 h-3.5 text-purple-400" />
    },
    {
      step: 5,
      name: 'Re-explanation',
      desc: 'Multimodal delivery (Analogy + Visual Sliders)',
      icon: <Zap className="w-3.5 h-3.5 text-cyan-400" />
    },
    {
      step: 6,
      name: 'Re-evaluation',
      desc: 'Mastery validated through follow-up application',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
    }
  ];

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-indigo-500/30 p-4 sm:p-5 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-md shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Brain className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white tracking-tight">
                Adaptive Teaching Engine
              </h4>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Decision Pipeline
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Autonomous cognitive diagnosis & micro-pedagogical adaptation
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Teaching strategy adapted successfully</span>
        </div>
      </div>

      {/* 6-Step Decision Pipeline Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {steps.map((item, idx) => {
          const isPassed = currentStage >= item.step;
          const isCurrent = currentStage === item.step;

          return (
            <div
              key={item.step}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                isCurrent
                  ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/20 ring-1 ring-indigo-400/50'
                  : isPassed
                  ? 'bg-slate-900/90 border-slate-800 text-slate-200'
                  : 'bg-slate-950/50 border-slate-900 text-slate-600 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  0{item.step}
                </span>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    isPassed ? 'text-indigo-400' : 'text-slate-600'
                  }`}
                >
                  {item.icon}
                </div>
              </div>

              <div className="text-xs font-bold text-white truncate mb-0.5">
                {item.name}
              </div>
              <div className="text-[10px] text-slate-400 line-clamp-2 leading-tight">
                {item.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mastery Growth Comparison Card */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Previous */}
          <div className="flex items-center gap-2">
            <ProgressRing
              progress={previousMastery}
              size={54}
              strokeWidth={5}
              circleColor="text-slate-800"
              progressColor="text-rose-500"
              textClassName="text-xs font-bold text-rose-300"
            />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Initial Mastery
              </span>
              <span className="text-sm font-extrabold text-slate-300">{previousMastery}%</span>
            </div>
          </div>

          <div className="flex items-center text-indigo-400">
            <ArrowRight className="w-5 h-5" />
          </div>

          {/* After Adaptation */}
          <div className="flex items-center gap-2">
            <ProgressRing
              progress={newMastery}
              size={54}
              strokeWidth={5}
              circleColor="text-slate-800"
              progressColor="text-emerald-500"
              textClassName="text-xs font-bold text-emerald-300"
            />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Adapted Mastery
              </span>
              <span className="text-sm font-extrabold text-emerald-400 flex items-center gap-1">
                {newMastery}%
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded">
                  +{newMastery - previousMastery}%
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>
            Misconception resolved through <strong>tactile analogy</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
