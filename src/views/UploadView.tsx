import React from 'react';
import {
  UploadCloud,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Layers,
  Zap,
  Bot,
  ShieldCheck
} from 'lucide-react';
import { UploadedMaterialMeta, ViewRoute } from '../types';
import { defaultUploadMaterialMeta } from '../data/mockData';
import { ApiService } from '../services/apiService';

interface UploadViewProps {
  onNavigate: (route: ViewRoute) => void;
  onMaterialReady: (meta: UploadedMaterialMeta) => void;
}

export const UploadView: React.FC<UploadViewProps> = ({
  onNavigate,
  onMaterialReady
}) => {
  const [topicInput, setTopicInput] = React.useState('Class 10 Physics — Electricity & Ohm’s Law');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processingStage, setProcessingStage] = React.useState(1);
  const [stageText, setStageText] = React.useState('');
  const [materialMeta, setMaterialMeta] = React.useState<UploadedMaterialMeta | null>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);

  const stagesList = [
    'Reading document & structural hierarchy',
    'Detecting chapters & subtopics',
    'Extracting fundamental concepts & mathematical formulas',
    'Building vector knowledge base & RAG indices',
    'Creating personalized micro-curriculum & checkpoints'
  ];

  const handleStartProcess = async (topicOrFile?: { file?: File; topic?: string }) => {
    setIsProcessing(true);
    setMaterialMeta(null);

    const result = await ApiService.uploadMaterial(
      topicOrFile || { topic: topicInput },
      (stage, text) => {
        setProcessingStage(stage);
        setStageText(text);
      }
    );

    setIsProcessing(false);
    setMaterialMeta(result);
    onMaterialReady(result);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleStartProcess({ file: e.dataTransfer.files[0] });
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] p-4 sm:p-8 bg-slate-950 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl space-y-6">
        {/* Page Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Document Ingestion & Neural Concept Chunking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Upload Learning Material
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Drop your textbook, PDF, notes, lecture slides, or simply enter any topic to begin.
          </p>
        </div>

        {/* Upload Dropzone Container */}
        {!isProcessing && !materialMeta && (
          <div className="space-y-4">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`p-8 sm:p-10 rounded-2xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                isDragOver
                  ? 'border-indigo-500 bg-indigo-600/10 scale-[1.01]'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
              onClick={() => handleStartProcess({ topic: 'Class 10 Physics - Chapter 4 Electricity' })}
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                Drop your learning material here
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Supported formats: PDF, DOC/DOCX, PPT/PPTX, Notes, Research Papers, Books
              </p>

              <button
                type="button"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/30 transition-all"
              >
                Browse Files (Demo: Chapter 4 Electricity)
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-slate-950 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Or Teach Me A Topic
              </span>
              <div className="border-t border-slate-800 w-full" />
            </div>

            {/* Topic Input Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-300 block">
                Enter any subject or concept:
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  id="topic-input-field"
                  type="text"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  placeholder="e.g. Teach me Machine Learning from the beginning"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                />
                <button
                  id="create-lesson-btn"
                  type="button"
                  onClick={() => handleStartProcess({ topic: topicInput })}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 whitespace-nowrap transition-all"
                >
                  Create Lesson
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] text-slate-500">Popular demos:</span>
                {[
                  'Class 10 Physics — Electricity',
                  'Machine Learning Fundamentals',
                  'Human Heart & Circulatory System',
                  'World War II Timeline'
                ].map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => {
                      setTopicInput(sample);
                      handleStartProcess({ topic: sample });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-[11px] text-indigo-300 border border-slate-800 transition-colors"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Processing Animation */}
        {isProcessing && (
          <div className="p-8 sm:p-10 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 mx-auto flex items-center justify-center text-indigo-400">
              <Bot className="w-8 h-8 animate-spin" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Autonomous Knowledge Ingestion
              </h3>
              <p className="text-xs text-indigo-300 font-mono mt-1">
                {stageText || stagesList[processingStage - 1]}
              </p>
            </div>

            {/* Stage Progress Pills */}
            <div className="space-y-2 max-w-md mx-auto text-left">
              {stagesList.map((stg, i) => {
                const stepNum = i + 1;
                const isDone = processingStage > stepNum;
                const isCurrent = processingStage === stepNum;

                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs transition-all ${
                      isCurrent
                        ? 'bg-indigo-600/20 border border-indigo-500 text-white font-semibold'
                        : isDone
                        ? 'bg-slate-950 text-emerald-300 border border-slate-800'
                        : 'bg-slate-950/40 text-slate-600 border border-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] opacity-70">
                        0{stepNum}
                      </span>
                      <span>{stg}</span>
                    </div>
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="w-3.5 h-3.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Material Ready Card */}
        {materialMeta && !isProcessing && (
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-emerald-500/40 shadow-2xl space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 uppercase tracking-wider">
                      Material Ready
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {materialMeta.fileSize}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                    {materialMeta.subject} — {materialMeta.chapter}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>RAG Verified</span>
              </div>
            </div>

            {/* Metadata Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-xl font-extrabold text-white font-mono">
                  {materialMeta.pageCount}
                </div>
                <div className="text-[11px] text-slate-400">Pages Processed</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-xl font-extrabold text-indigo-400 font-mono">
                  {materialMeta.conceptsDetected}
                </div>
                <div className="text-[11px] text-slate-400">Concepts Extracted</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-xl font-extrabold text-cyan-400 font-mono">
                  {materialMeta.examplesDetected}
                </div>
                <div className="text-[11px] text-slate-400">Examples & Analogies</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-xl font-extrabold text-emerald-400 font-mono">
                  100%
                </div>
                <div className="text-[11px] text-slate-400">Vector Grounding</div>
              </div>
            </div>

            {/* Extracted Key Topics */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Extracted Concept Hierarchy:
              </span>
              <div className="flex flex-wrap gap-2">
                {materialMeta.keyTopics.map((topic, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 text-xs border border-slate-800"
                  >
                    • {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Final CTA Button */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMaterialMeta(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ← Upload different file
              </button>

              <button
                id="create-my-lesson-btn"
                type="button"
                onClick={() => onNavigate('lesson-plan')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02]"
              >
                <span>Create My Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
