import React from 'react';
import { Cpu, Sparkles, Layers, ShieldCheck, Activity, Terminal, ArrowRight } from 'lucide-react';
import { AgentFlow } from '../components/engine/AgentFlow';
import { ViewRoute } from '../types';

interface AIEngineViewProps {
  onNavigate: (route: ViewRoute) => void;
}

export const AIEngineView: React.FC<AIEngineViewProps> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-purple-500/30 shadow-2xl space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
              7-Agent Cognitive Architecture Engine
            </h1>
            <p className="text-xs text-slate-400">
              Autonomous multi-agent orchestration powering personalized tutoring & live misconception intervention
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Agent Flow Graph */}
      <AgentFlow />

      {/* Technical Specifications Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
            <Activity className="w-4 h-4" />
            <span>Sub-Second Latency</span>
          </div>
          <div className="text-sm font-bold text-white">
            Pipelined LLM Streaming
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Speech audio and facial blendshapes stream synchronously with text token generation for lag-free conversation.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Strict RAG Grounding</span>
          </div>
          <div className="text-sm font-bold text-white">
            Zero Hallucination Guardrails
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            All curriculum definitions are anchored to uploaded textbook chapter vector embeddings with citations.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <Sparkles className="w-4 h-4" />
            <span>Dynamic Pedagogy Adaptation</span>
          </div>
          <div className="text-sm font-bold text-white">
            Cognitive Misconception Isolation
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Diagnoses the underlying faulty schema and swaps teaching modality from formula to tactile physical analogy.
          </p>
        </div>
      </div>
    </div>
  );
};
