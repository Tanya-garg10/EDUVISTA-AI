import React from 'react';
import {
  BookOpen,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Activity,
  Layers,
  Zap,
  ShieldCheck,
  CalendarRange
} from 'lucide-react';
import { Lesson, ViewRoute } from '../types';
import { demoLessonData } from '../data/mockData';

interface LessonPlanViewProps {
  lesson?: Lesson;
  onNavigate: (route: ViewRoute) => void;
}

export const LessonPlanView: React.FC<LessonPlanViewProps> = ({
  lesson = demoLessonData,
  onNavigate
}) => {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-indigo-500/30 shadow-2xl space-y-4 relative overflow-hidden">
        {/* Decorative flair */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Autonomous Micro-Curriculum</span>
          </div>

          <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Total: 20 Minutes Pacing
          </span>
        </div>

        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Your Personalized Lesson: <span className="text-indigo-400">{lesson.topic}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {lesson.subject} • {lesson.chapter}
          </p>
        </div>

        {/* Student Profile Tag Pill */}
        <div className="relative z-10 p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">Calibrated Profile:</span>
            <span className="font-bold text-slate-200">{lesson.studentProfileSummary}</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">
            ✓ Optimized for high recall retention
          </span>
        </div>
      </div>

      {/* 7-Step Timeline Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <CalendarRange className="w-4 h-4 text-indigo-400" />
            Lesson Timeline & Interaction Architecture
          </h3>
          <span className="text-xs text-slate-500">7 Structured Modules</span>
        </div>

        <div className="space-y-2.5">
          {lesson.sections.map((sec, idx) => {
            const isCompleted = sec.completed;
            const isActive = sec.active;

            return (
              <div
                key={sec.id}
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isActive
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-400/40'
                    : isCompleted
                    ? 'bg-slate-900/80 border-slate-800'
                    : 'bg-slate-950/60 border-slate-900'
                }`}
              >
                {/* Left side details */}
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? '✓' : sec.indexNumber}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-bold text-white">
                        {sec.title}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        {sec.durationMinutes} min
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          sec.difficulty === 'Easy'
                            ? 'bg-blue-500/10 text-blue-400'
                            : sec.difficulty === 'Medium'
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-rose-500/10 text-rose-400'
                        }`}
                      >
                        {sec.difficulty}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {sec.summary}
                    </p>
                  </div>
                </div>

                {/* Right side tags & badges */}
                <div className="flex flex-wrap sm:flex-col items-start sm:items-end justify-between gap-1.5 shrink-0 pl-11 sm:pl-0">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-cyan-300">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{sec.visualType}</span>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {sec.interactionIndicator}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Sticky Action Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>AI-generated specifically for your learning profile</strong> (Ohm’s Law • Hinglish • 20m)
          </span>
        </div>

        <button
          id="start-ai-teacher-btn"
          type="button"
          onClick={() => onNavigate('teacher')}
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/40 transition-all hover:scale-105"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Start AI Teacher</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
