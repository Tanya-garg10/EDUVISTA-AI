import React from 'react';
import {
  Flame,
  Award,
  Clock,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle2,
  Brain,
  Zap,
  GraduationCap
} from 'lucide-react';
import { LearnerProfile, ViewRoute } from '../types';
import { ProgressRing } from '../components/common/ProgressRing';
import { weakConceptsData, learningHistoryData, defaultLearnerProfile } from '../data/mockData';
import { TopicMasteryChartWidget } from '../components/dashboard/TopicMasteryChartWidget';

interface DashboardViewProps {
  profile?: LearnerProfile;
  onNavigate: (route: ViewRoute) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile = defaultLearnerProfile,
  onNavigate
}) => {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
            Good morning, {profile.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Ready to continue learning with your adaptive AI teacher?
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="dash-launch-teacher-btn"
            type="button"
            onClick={() => onNavigate('teacher')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Launch AI Teacher</span>
          </button>
        </div>
      </div>

      {/* Top 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Learning Streak
            </span>
            <div className="text-2xl font-heading font-extrabold text-orange-400 mt-0.5">
              {profile.streakDays} Days
            </div>
            <span className="text-[10px] text-orange-400/80 font-medium">
              🔥 Top 5% consistency
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Flame className="w-5 h-5 fill-orange-400 text-orange-400" />
          </div>
        </div>

        {/* Concepts Mastered */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Concepts Mastered
            </span>
            <div className="text-2xl font-heading font-extrabold text-indigo-400 mt-0.5">
              {profile.conceptsMastered}
            </div>
            <span className="text-[10px] text-indigo-400/80 font-medium">
              ✓ 6 in CBSE Physics
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Award className="w-5 h-5" />
          </div>
        </div>

        {/* Average Score */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Average Score
            </span>
            <div className="text-2xl font-heading font-extrabold text-emerald-400 mt-0.5">
              {profile.averageScore}%
            </div>
            <span className="text-[10px] text-emerald-400/80 font-medium">
              ↑ +14% after adaptive tutor
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Learning Time */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Learning Time
            </span>
            <div className="text-2xl font-heading font-extrabold text-cyan-400 mt-0.5 font-mono">
              14h 32m
            </div>
            <span className="text-[10px] text-cyan-400/80 font-medium">
              ⏱ 22 mins today
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Interactive Recharts Topic Mastery & Cognitive Progress Widget */}
      <TopicMasteryChartWidget onNavigate={onNavigate} />

      {/* Main Grid: Continue Learning + Weak Concepts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Continue Learning Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-indigo-500/30 shadow-2xl space-y-4 relative overflow-hidden">
            {/* Top Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-blue-500" />

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 uppercase tracking-wider border border-indigo-500/30">
                  Current In-Progress Module
                </span>
                <span className="text-xs text-slate-400 font-mono">Class 10 Physics</span>
              </div>
              <span className="text-xs font-bold text-emerald-400">
                72% Completed
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                Electricity — Chapter 4
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Next concept: <strong className="text-indigo-400">Ohm's Law & Electrical Resistance</strong>
              </p>
            </div>

            {/* Micro Progress Track */}
            <div className="space-y-1.5">
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 w-[72%] rounded-full" />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Completed: V & I Basics</span>
                <span>Remaining: Resistance & Practice</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Brain className="w-4 h-4 text-indigo-400" />
                <span>AI Teacher Ava is calibrated in <strong>Hinglish (20 min)</strong></span>
              </div>

              <button
                id="dash-continue-lesson-btn"
                type="button"
                onClick={() => onNavigate('teacher')}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/30 transition-all hover:scale-105"
              >
                <span>Continue Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Recommended Next Box */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Recommended Next Milestone
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                Series & Parallel Circuit Networks
              </h3>
              <p className="text-xs text-slate-400">
                Recommended based on your high mastery in individual potential and current loops.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('lesson-plan')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
            >
              Preview Lesson
            </button>
          </div>
        </div>

        {/* Right 5 Columns: Weak Concepts + Quick Revision */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  Weak Concepts Requiring Revision
                </h3>
              </div>
              <span className="text-[10px] text-slate-400">Diagnostic</span>
            </div>

            <div className="space-y-3">
              {weakConceptsData.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-white">{item.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {item.tag} • Priority: {item.priority}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold font-mono text-rose-400">
                      {item.mastery}%
                    </span>
                    <button
                      type="button"
                      onClick={() => onNavigate('teacher')}
                      className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-[11px] font-semibold border border-rose-500/20 transition-all"
                    >
                      Revise
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              id="dash-start-revision-btn"
              type="button"
              onClick={() => onNavigate('teacher')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition-all"
            >
              Start Adaptive Revision Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
