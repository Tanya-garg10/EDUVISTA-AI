import React from 'react';
import {
  UserCheck,
  FileText,
  CalendarRange,
  Mic,
  Activity,
  AlertTriangle,
  Award,
  Sparkles,
  ArrowDown,
  ArrowRight,
  Zap,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { aiAgentsList } from '../../data/mockData';

export const AgentFlow: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = React.useState<string>('agent-6');

  const getIcon = (name: string) => {
    switch (name) {
      case 'UserCheck':
        return <UserCheck className="w-5 h-5" />;
      case 'FileText':
        return <FileText className="w-5 h-5" />;
      case 'CalendarRange':
        return <CalendarRange className="w-5 h-5" />;
      case 'Mic':
        return <Mic className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-5 h-5" />;
      case 'Award':
        return <Award className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const selectedAgent = aiAgentsList.find((a) => a.id === selectedAgentId) || aiAgentsList[5];

  return (
    <div className="w-full space-y-6">
      {/* Visual Pipeline Architecture Graph */}
      <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Graph Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Cpu className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight font-heading">
                EDUVISTA 7-Agent Autonomous Orchestration Pipeline
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Synchronous multi-agent cognitive loop executing in real-time
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              All 7 Agents Active & Synchronized
            </span>
          </div>
        </div>

        {/* Interactive Agent Flow Grid */}
        <div className="relative z-10 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiAgentsList.map((agent, index) => {
              const isSelected = selectedAgentId === agent.id;
              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgentId(agent.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 relative group ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/20 ring-1 ring-indigo-400'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${agent.color} p-0.5 shadow-md`}
                    >
                      <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white">
                        {getIcon(agent.iconName)}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Stage 0{index + 1}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {agent.name}
                  </h4>
                  <div className="text-[11px] font-semibold text-indigo-400 mb-1.5">
                    {agent.role}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {agent.description}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-emerald-400 font-medium font-mono">
                      {agent.metrics}
                    </span>
                    <span className="text-slate-500 font-semibold group-hover:text-slate-300 transition-colors">
                      Inspect ➔
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Agent Deep-Dive Panel */}
        <div className="relative z-10 mt-4 p-4 sm:p-5 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Inspecting Active Subsystem:
              </span>
              <span className="text-sm font-bold text-white font-heading">
                {selectedAgent.name}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedAgent.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Telemetry</div>
              <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">
                {selectedAgent.metrics}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
