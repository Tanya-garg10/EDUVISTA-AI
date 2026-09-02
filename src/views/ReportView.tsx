import React from 'react';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Download,
  RotateCcw,
  BookOpen,
  Layers,
  Zap,
  Target
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid
} from 'recharts';
import { LearningReport, ViewRoute } from '../types';
import { demoLearningReportData } from '../data/mockData';
import { ProgressRing } from '../components/common/ProgressRing';

interface ReportViewProps {
  report?: LearningReport;
  onNavigate: (route: ViewRoute) => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  report = demoLearningReportData,
  onNavigate
}) => {
  const chartData = [
    { name: 'Initial Baseline', score: report.initialScore, fill: '#f43f5e' },
    { name: 'Mid Checkpoint', score: 62, fill: '#818cf8' },
    { name: 'Post-Analogy Re-test', score: 74, fill: '#38bdf8' },
    { name: 'Final Assessment', score: report.finalScore, fill: '#10b981' }
  ];

  const handleDownloadReport = () => {
    alert('Generating personalized EDUVISTA PDF Learning Dossier for Class 10 Physics: Electricity & Ohm’s Law...');
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-emerald-500/30 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 uppercase tracking-wider">
                  Adaptive Learning Dossier
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Lesson Completed
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-0.5">
                {report.lessonTopic}
              </h1>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              id="download-report-btn"
              type="button"
              onClick={handleDownloadReport}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Summary</span>
            </button>
          </div>
        </div>

        {/* Big Metric Badges Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-4">
            <ProgressRing
              progress={report.finalScore}
              size={64}
              strokeWidth={6}
              circleColor="text-slate-800"
              progressColor="text-emerald-500"
              textClassName="text-sm font-extrabold text-emerald-300"
            />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Final Mastery Score
              </span>
              <span className="text-base font-extrabold text-white">
                {report.comprehensionLevel}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Learning Growth
              </span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-0.5">
                +{report.improvementDelta}%
              </div>
              <span className="text-[10px] text-slate-400">
                43% Baseline ➔ 82% Final
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Misconceptions Resolved
              </span>
              <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-0.5">
                {report.misconceptionsResolved.length} of 1
              </div>
              <span className="text-[10px] text-cyan-400/80">
                Via Water Analogy
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Learning Improvement Chart */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white">
              Cognitive Trajectory & Mastery Progression
            </h3>
            <p className="text-xs text-slate-400">
              Quantifiable evaluation showing jump following the adaptive teacher intervention
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
            +39% Net Comprehension Increase
          </span>
        </div>

        <div className="h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="scoreGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#scoreGlow)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Concept Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Concepts Mastered */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">Concepts Mastered</h4>
          </div>
          <div className="space-y-2">
            {report.conceptsMastered.map((c, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <span className="font-semibold text-slate-200">{c}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                  Mastered (90%+)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Needs Improvement */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white">Needs Future Practice</h4>
          </div>
          <div className="space-y-2">
            {report.needsImprovement.map((c, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <span className="font-semibold text-slate-200">{c}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300">
                  Needs Review (45%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Misconception Resolution Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <h4 className="text-sm font-bold text-white">
            Cognitive Misconceptions Resolved
          </h4>
        </div>
        {report.misconceptionsResolved.map((m, i) => (
          <div
            key={i}
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-300">{m.concept}</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Resolved Successfully
              </span>
            </div>
            <div className="text-slate-400">
              Trigger: <span className="text-rose-300 font-medium">"{m.description}"</span>
            </div>
            <div className="text-slate-300 font-medium pt-1">
              ➔ Strategy: {m.strategyUsed}
            </div>
          </div>
        ))}
      </div>

      {/* AI Next Steps & CTAs */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Target className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Next Recommended Step
            </span>
          </div>
          <h3 className="text-base font-bold text-white">
            {report.recommendedNextTopic}
          </h3>
          <p className="text-xs text-slate-300 max-w-lg">
            {report.aiFeedback}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            id="practice-more-btn"
            type="button"
            onClick={() => onNavigate('teacher')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
          >
            Practice More
          </button>

          <button
            id="start-next-topic-btn"
            type="button"
            onClick={() => onNavigate('learning-path')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <span>View Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
