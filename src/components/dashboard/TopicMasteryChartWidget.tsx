import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ReferenceLine,
  Cell
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Brain,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  Sparkles,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { ViewRoute } from '../../types';

export interface TopicMasteryData {
  id: string;
  topic: string;
  shortName: string;
  category: 'Fundamentals' | 'Circuit Laws' | 'Networks' | 'Power & Thermal';
  mastery: number;
  target: number;
  baseline: number;
  status: 'Mastered' | 'In Progress' | 'Needs Review' | 'Upcoming';
  difficulty: 'Foundational' | 'Core' | 'Advanced';
  timeSpentMin: number;
  questionsSolved: number;
  misconceptionsResolved: number;
}

const defaultTopicsData: TopicMasteryData[] = [
  {
    id: 'top-1',
    topic: 'Electric Charge & Drift Velocity (Q)',
    shortName: 'Charge & Current',
    category: 'Fundamentals',
    mastery: 96,
    target: 80,
    baseline: 42,
    status: 'Mastered',
    difficulty: 'Foundational',
    timeSpentMin: 45,
    questionsSolved: 14,
    misconceptionsResolved: 0
  },
  {
    id: 'top-2',
    topic: 'Potential Difference & Voltage (V)',
    shortName: 'Potential & Voltage',
    category: 'Fundamentals',
    mastery: 92,
    target: 80,
    baseline: 38,
    status: 'Mastered',
    difficulty: 'Foundational',
    timeSpentMin: 50,
    questionsSolved: 16,
    misconceptionsResolved: 1
  },
  {
    id: 'top-3',
    topic: 'Resistance & Material Resistivity (ρ)',
    shortName: 'Resistance & ρ',
    category: 'Circuit Laws',
    mastery: 86,
    target: 80,
    baseline: 45,
    status: 'Mastered',
    difficulty: 'Core',
    timeSpentMin: 65,
    questionsSolved: 20,
    misconceptionsResolved: 2
  },
  {
    id: 'top-4',
    topic: "Ohm's Law Masterclass (V = IR)",
    shortName: "Ohm's Law (V=IR)",
    category: 'Circuit Laws',
    mastery: 82,
    target: 80,
    baseline: 43,
    status: 'Mastered',
    difficulty: 'Core',
    timeSpentMin: 80,
    questionsSolved: 24,
    misconceptionsResolved: 2
  },
  {
    id: 'top-5',
    topic: 'Series Resistor Combinations',
    shortName: 'Series Circuits',
    category: 'Networks',
    mastery: 48,
    target: 80,
    baseline: 20,
    status: 'In Progress',
    difficulty: 'Core',
    timeSpentMin: 30,
    questionsSolved: 8,
    misconceptionsResolved: 1
  },
  {
    id: 'top-6',
    topic: 'Parallel Resistor Networks',
    shortName: 'Parallel Circuits',
    category: 'Networks',
    mastery: 28,
    target: 80,
    baseline: 15,
    status: 'Needs Review',
    difficulty: 'Advanced',
    timeSpentMin: 15,
    questionsSolved: 4,
    misconceptionsResolved: 2
  },
  {
    id: 'top-7',
    topic: "Joule's Heating Effect & Power (P=VI)",
    shortName: "Heating & Power",
    category: 'Power & Thermal',
    mastery: 12,
    target: 80,
    baseline: 0,
    status: 'Upcoming',
    difficulty: 'Advanced',
    timeSpentMin: 5,
    questionsSolved: 2,
    misconceptionsResolved: 0
  }
];

const cognitiveRadarData = [
  { skill: 'Conceptual Recall', score: 94, fullMark: 100, classAvg: 70 },
  { skill: 'Formula Application', score: 88, fullMark: 100, classAvg: 65 },
  { skill: 'Physical Analogy', score: 95, fullMark: 100, classAvg: 58 },
  { skill: 'Numerical Solving', score: 78, fullMark: 100, classAvg: 62 },
  { skill: 'Misconception Recovery', score: 92, fullMark: 100, classAvg: 50 },
  { skill: 'Circuit Schematic', score: 68, fullMark: 100, classAvg: 55 }
];

const trajectoryData = [
  { session: 'Day 1: Diagnostic', mastery: 38, comprehension: 42, target: 80 },
  { session: 'Day 3: Fundamentals', mastery: 52, comprehension: 58, target: 80 },
  { session: 'Day 6: Resistance', mastery: 64, comprehension: 69, target: 80 },
  { session: 'Day 9: Ohm’s Law', mastery: 75, comprehension: 81, target: 80 },
  { session: 'Day 12: Current Baseline', mastery: 82, comprehension: 88, target: 80 }
];

interface TopicMasteryChartWidgetProps {
  onNavigate?: (route: ViewRoute) => void;
}

export const TopicMasteryChartWidget: React.FC<TopicMasteryChartWidgetProps> = ({
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'topics' | 'radar' | 'trajectory'>('topics');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('top-4');

  const filteredTopics = defaultTopicsData.filter((item) => {
    if (categoryFilter === 'All') return true;
    return item.category === categoryFilter;
  });

  const selectedTopic = defaultTopicsData.find((t) => t.id === selectedTopicId) || defaultTopicsData[3];

  const masteredCount = defaultTopicsData.filter((t) => t.mastery >= 80).length;
  const inProgressCount = defaultTopicsData.filter((t) => t.mastery >= 40 && t.mastery < 80).length;
  const needsReviewCount = defaultTopicsData.filter((t) => t.mastery < 40).length;
  const averageMastery = Math.round(
    defaultTopicsData.reduce((acc, curr) => acc + curr.mastery, 0) / defaultTopicsData.length
  );

  const getBarColor = (mastery: number) => {
    if (mastery >= 80) return '#10b981'; // Emerald
    if (mastery >= 50) return '#6366f1'; // Indigo
    if (mastery >= 30) return '#f59e0b'; // Amber
    return '#f43f5e'; // Rose
  };

  // Custom Tooltip for Bar Chart
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: TopicMasteryData = payload[0].payload;
      return (
        <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-xl shadow-2xl backdrop-blur-md text-xs space-y-1.5 min-w-[200px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <span className="font-bold text-white text-xs truncate max-w-[140px]">{data.topic}</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                data.mastery >= 80
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : data.mastery >= 40
                  ? 'bg-indigo-500/20 text-indigo-400'
                  : 'bg-rose-500/20 text-rose-400'
              }`}
            >
              {data.status}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-0.5">
            <div>
              <span className="text-slate-400">Current Mastery:</span>
              <div className="font-bold font-mono text-white text-sm" style={{ color: getBarColor(data.mastery) }}>
                {data.mastery}%
              </div>
            </div>
            <div>
              <span className="text-slate-400">Target Level:</span>
              <div className="font-bold font-mono text-slate-300 text-sm">{data.target}%</div>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-1 flex justify-between">
            <span>Solved: {data.questionsSolved} Qs</span>
            <span>Time: {data.timeSpentMin}m</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      id="topic-mastery-recharts-widget"
      className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800 shadow-2xl space-y-5"
    >
      {/* Top Header & View Switches */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-heading font-bold text-white flex items-center gap-2">
                Learner Topic Mastery & Progress
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-normal">
                  Recharts Analytics
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Cognitive mastery diagnostics across Grade 10 Physics modules
              </p>
            </div>
          </div>
        </div>

        {/* View Mode Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            id="tab-topic-breakdown"
            type="button"
            onClick={() => setActiveTab('topics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === 'topics'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Topics Breakdown</span>
          </button>
          <button
            id="tab-cognitive-radar"
            type="button"
            onClick={() => setActiveTab('radar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === 'radar'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-purple-400" />
            <span>Cognitive Radar</span>
          </button>
          <button
            id="tab-trajectory-curve"
            type="button"
            onClick={() => setActiveTab('trajectory')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === 'trajectory'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Growth Curve</span>
          </button>
        </div>
      </div>

      {/* KPI Badges Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Subject Mastery</span>
            <div className="text-xl font-heading font-extrabold text-white mt-0.5">{averageMastery}%</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs">
            AVG
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-400">Mastered (≥80%)</span>
            <div className="text-xl font-heading font-extrabold text-emerald-400 mt-0.5">{masteredCount} Topics</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-400">In Progress (40-79%)</span>
            <div className="text-xl font-heading font-extrabold text-indigo-400 mt-0.5">{inProgressCount} Topic</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-mono text-xs font-bold">
            48%
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-400">Need Review (&lt;40%)</span>
            <div className="text-xl font-heading font-extrabold text-amber-400 mt-0.5">{needsReviewCount} Topics</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <AlertCircle className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Chart Canvas Area */}
      {activeTab === 'topics' && (
        <div className="space-y-4">
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs py-1">
              <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1 shrink-0">
                <Filter className="w-3 h-3 text-indigo-400" /> Filter:
              </span>
              {['All', 'Fundamentals', 'Circuit Laws', 'Networks', 'Power & Thermal'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-slate-800 text-white border border-indigo-500/40 shadow-sm'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> Mastered (≥80%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 inline-block" /> In Progress
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block" /> Review
              </span>
            </div>
          </div>

          {/* Recharts Bar Chart */}
          <div className="w-full h-72 sm:h-80 bg-slate-950/60 rounded-xl p-2 sm:p-4 border border-slate-800/60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredTopics}
                margin={{ top: 15, right: 15, left: -20, bottom: 25 }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload.length) {
                    setSelectedTopicId(e.activePayload[0].payload.id);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="shortName"
                  stroke="#64748b"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  height={40}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="#64748b"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.08)' }} />
                <ReferenceLine
                  y={80}
                  stroke="#10b981"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{
                    value: 'Target 80%',
                    fill: '#10b981',
                    fontSize: 10,
                    position: 'insideTopRight'
                  }}
                />
                <Bar
                  dataKey="mastery"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={48}
                  animationDuration={800}
                >
                  {filteredTopics.map((entry) => (
                    <Cell
                      key={entry.id}
                      fill={getBarColor(entry.mastery)}
                      stroke={entry.id === selectedTopicId ? '#ffffff' : 'transparent'}
                      strokeWidth={entry.id === selectedTopicId ? 2 : 0}
                      className="cursor-pointer transition-opacity hover:opacity-85"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Selected Topic Interactive Focus Drawer */}
          {selectedTopic && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{selectedTopic.topic}</span>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold"
                    style={{
                      backgroundColor: `${getBarColor(selectedTopic.mastery)}20`,
                      color: getBarColor(selectedTopic.mastery)
                    }}
                  >
                    {selectedTopic.mastery}% Mastery · {selectedTopic.status}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {selectedTopic.difficulty}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {selectedTopic.mastery >= 80
                    ? `Excellent work! You have resolved ${selectedTopic.misconceptionsResolved} misconceptions and solved ${selectedTopic.questionsSolved} practice items.`
                    : selectedTopic.mastery >= 40
                    ? `In active learning mode. AI Teacher Ava is ready to guide you through numerical practice and circuit analogies.`
                    : `Upcoming milestone. Master prerequisite modules to unlock full adaptive simulations.`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('teacher')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  <span>Practice in AI Classroom</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cognitive Radar View */}
      {activeTab === 'radar' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 h-72 sm:h-80 bg-slate-950/60 rounded-xl p-2 border border-slate-800/60 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={cognitiveRadarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis domain={[0, 100]} stroke="#475569" tick={{ fill: '#64748b', fontSize: 9 }} />
                <Radar
                  name="Tanya's Mastery"
                  dataKey="score"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Class Average"
                  dataKey="classAvg"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.15}
                />
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  content={({ active, payload }: any) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-xl shadow-xl text-xs space-y-1">
                          <div className="font-bold text-white">{payload[0].payload.skill}</div>
                          <div className="text-indigo-400 font-semibold">Tanya: {payload[0].value}%</div>
                          <div className="text-cyan-400">Class Avg: {payload[1]?.value}%</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="md:col-span-5 space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Top Cognitive Strengths</span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Physical Analogy Intuition:</span>
                  <span className="font-bold font-mono text-emerald-400">95%</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Conceptual Recall:</span>
                  <span className="font-bold font-mono text-emerald-400">94%</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Misconception Self-Recovery:</span>
                  <span className="font-bold font-mono text-indigo-400">92%</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Recommended Focus Area
              </span>
              <h4 className="text-xs font-bold text-white">Circuit Schematic Decoding (68%)</h4>
              <p className="text-[11px] text-slate-400">
                Practice mapping multi-resistor schematics to physical branch currents with Ava’s interactive diagram editor.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Trajectory Growth Curve View */}
      {activeTab === 'trajectory' && (
        <div className="space-y-4">
          <div className="w-full h-72 sm:h-80 bg-slate-950/60 rounded-xl p-2 sm:p-4 border border-slate-800/60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trajectoryData} margin={{ top: 15, right: 15, left: -20, bottom: 15 }}>
                <defs>
                  <linearGradient id="colorMastery" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="session" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis
                  domain={[0, 100]}
                  stroke="#64748b"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  content={({ active, payload }: any) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-xl shadow-xl text-xs space-y-1">
                          <div className="font-bold text-white">{payload[0].payload.session}</div>
                          <div className="text-indigo-400 font-semibold">Mastery: {payload[0].value}%</div>
                          <div className="text-emerald-400 font-semibold">Comprehension: {payload[1]?.value}%</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine y={80} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Target 80%', fill: '#10b981', fontSize: 10 }} />
                <Area
                  type="monotone"
                  dataKey="mastery"
                  name="Mastery Score"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorMastery)"
                />
                <Area
                  type="monotone"
                  dataKey="comprehension"
                  name="Comprehension"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorComp)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">
                Mastery velocity: <strong className="text-emerald-400">+44% improvement</strong> over 12 days of adaptive instruction.
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">100% Grounded in CBSE Grade 10</span>
          </div>
        </div>
      )}
    </div>
  );
};
