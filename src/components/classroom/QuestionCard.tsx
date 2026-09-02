import React from 'react';
import { HelpCircle, Mic, Keyboard, CheckCircle2, XCircle, Send, Sparkles, Volume2 } from 'lucide-react';
import { Question, QuestionOption } from '../../types';

interface QuestionCardProps {
  question: Question;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
  onSubmit: () => void;
  isEvaluating?: boolean;
  evaluationResult?: {
    isCorrect: boolean;
    misconceptionDetected: boolean;
    explanation: string;
  } | null;
  onVoiceAnswer?: () => void;
  isVoiceRecording?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOptionId,
  onSelectOption,
  onSubmit,
  isEvaluating = false,
  evaluationResult = null,
  onVoiceAnswer,
  isVoiceRecording = false
}) => {
  const [inputMode, setInputMode] = React.useState<'mcq' | 'voice' | 'type'>('mcq');
  const [typedAnswer, setTypedAnswer] = React.useState('');

  const handleTypeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedAnswer.trim()) return;
    // Map typed answer roughly to closest option
    const lower = typedAnswer.toLowerCase();
    if (lower.includes('increase')) {
      onSelectOption('opt-a');
    } else if (lower.includes('decrease') || lower.includes('kam') || lower.includes('drop')) {
      onSelectOption('opt-b');
    } else {
      onSelectOption('opt-c');
    }
    onSubmit();
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-indigo-500/30 p-4 sm:p-5 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      {/* Glow Accent Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500" />

      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">
              {question.title || 'Check Your Understanding'}
            </h4>
            <span className="text-[10px] text-indigo-300 font-medium">
              Target: {question.conceptTarget}
            </span>
          </div>
        </div>

        {/* Input Mode Tabs */}
        <div className="flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setInputMode('mcq')}
            className={`px-2 py-1 rounded-md transition-all ${
              inputMode === 'mcq'
                ? 'bg-indigo-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Options
          </button>
          <button
            type="button"
            onClick={() => {
              setInputMode('voice');
              onVoiceAnswer?.();
            }}
            className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
              inputMode === 'voice'
                ? 'bg-indigo-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mic className="w-3 h-3 text-cyan-300" />
            <span>Voice</span>
          </button>
          <button
            type="button"
            onClick={() => setInputMode('type')}
            className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
              inputMode === 'type'
                ? 'bg-indigo-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Keyboard className="w-3 h-3 text-slate-300" />
            <span>Type</span>
          </button>
        </div>
      </div>

      {/* Main Question Text */}
      <div className="py-3">
        <p className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
          {question.questionText}
        </p>
      </div>

      {/* MCQ Mode */}
      {inputMode === 'mcq' && (
        <div className="space-y-2 py-1">
          {question.options.map((option: QuestionOption) => {
            const isSelected = selectedOptionId === option.id;
            const showEvaluated = evaluationResult !== null && isSelected;

            return (
              <button
                key={option.id}
                id={`option-btn-${option.id}`}
                type="button"
                onClick={() => onSelectOption(option.id)}
                disabled={isEvaluating}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs sm:text-sm font-medium transition-all ${
                  showEvaluated
                    ? evaluationResult?.isCorrect
                      ? 'bg-emerald-950/60 border-2 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/10'
                      : 'bg-rose-950/60 border-2 border-rose-500 text-rose-200 shadow-lg shadow-rose-500/10'
                    : isSelected
                    ? 'bg-indigo-600/20 border-2 border-indigo-500 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-slate-950/80 border border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isSelected
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {option.label}
                  </div>
                  <span>{option.text}</span>
                </div>

                {showEvaluated && (
                  <div>
                    {evaluationResult?.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400 animate-bounce" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Voice Mode */}
      {inputMode === 'voice' && (
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col items-center justify-center text-center space-y-3">
          <div
            onClick={onVoiceAnswer}
            className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all ${
              isVoiceRecording
                ? 'bg-rose-500/30 text-rose-400 border-2 border-rose-500 animate-pulse scale-110'
                : 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40 hover:bg-indigo-600/30'
            }`}
          >
            <Mic className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200">
              {isVoiceRecording ? 'Listening... Speak your answer now' : 'Click microphone to answer via voice'}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Supports English, Hindi, and conversational Hinglish
            </p>
          </div>
          {isVoiceRecording && (
            <div className="flex items-center gap-2 text-xs text-rose-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Transcribing: "I think current will increase because..."</span>
            </div>
          )}
        </div>
      )}

      {/* Type Mode */}
      {inputMode === 'type' && (
        <form onSubmit={handleTypeSubmit} className="space-y-2 py-1">
          <textarea
            value={typedAnswer}
            onChange={(e) => setTypedAnswer(e.target.value)}
            placeholder="Type your explanation or answer in your own words (e.g., Current will increase because...)"
            rows={2}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all resize-none"
          />
        </form>
      )}

      {/* Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Adaptive AI detects underlying conceptual reasoning</span>
        </div>

        <button
          id="submit-question-btn"
          type="button"
          onClick={onSubmit}
          disabled={!selectedOptionId || isEvaluating}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-500/25 transition-all"
        >
          {isEvaluating ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing understanding...</span>
            </>
          ) : (
            <>
              <span>Submit Answer</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
