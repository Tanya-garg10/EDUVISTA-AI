import React from 'react';
import confetti from 'canvas-confetti';
import {
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Volume2,
  AlertCircle,
  Brain,
  Award,
  HelpCircle,
  Zap
} from 'lucide-react';
import { AssessmentQuestion, ViewRoute } from '../types';
import { assessmentQuestionsData } from '../data/mockData';

interface AssessmentViewProps {
  questions?: AssessmentQuestion[];
  onNavigate: (route: ViewRoute) => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  questions = assessmentQuestionsData,
  onNavigate
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({
    'aq-1': 'opt-aq-1-b',
    'aq-2': 'opt-aq-2-b'
  });
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = React.useState(225); // 3:45

  // Timer countdown
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQ = questions[currentIndex];
  const selectedOpt = answers[currentQ.id];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelectOption = (optId: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optId }));
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      onNavigate('report');
    } else {
      setCurrentIndex(currentIndex + 1);
      setShowFeedback(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Top Header with Timer and Progress */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white font-heading">
                Adaptive Mastery Assessment
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                Class 10 Physics
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Evaluates Bloom Taxonomy (Recall, Understanding, Application & Analysis)
            </p>
          </div>
        </div>

        {/* Timer & Question Counter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(timeLeftSeconds)} remaining</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300 font-mono">
            Question {currentIndex + 1} of {questions.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Main Question Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800 shadow-2xl space-y-6">
        {/* Question Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
              {currentQ.type.replace('_', ' ').toUpperCase()}
            </span>
            <span className="text-xs text-slate-400">
              Diagnostic: <strong className="text-slate-200">Adaptive Checkpoint</strong>
            </span>
          </div>
          <span className="text-xs text-indigo-400 font-mono">Concept: {currentQ.concept}</span>
        </div>

        {/* Question Text */}
        <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {(currentQ.options || []).map((opt) => {
            const isSelected = selectedOpt === opt.id;
            const isCorrect = opt.id === currentQ.correctAnswer;

            let optionStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-indigo-500/50 hover:bg-slate-800/80';
            if (showFeedback && isSelected) {
              optionStyle = isCorrect
                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500'
                : 'bg-rose-950/70 border-rose-500 text-rose-200 ring-1 ring-rose-500';
            } else if (showFeedback && isCorrect) {
              optionStyle = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300';
            } else if (isSelected) {
              optionStyle = 'bg-indigo-600/30 border-indigo-500 text-white';
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${optionStyle}`}
              >
                <span className="text-xs sm:text-sm font-medium">{opt.text}</span>
                {showFeedback && isSelected && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {showFeedback && isSelected && !isCorrect && (
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Instant Adaptive Feedback Box */}
        {showFeedback && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Instant Adaptive Explanation
              </span>
              <button
                type="button"
                onClick={() => {}}
                className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen to Ava</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Navigation & Submit CTA */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            id="assessment-next-btn"
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <span>{isLastQuestion ? 'Analyze My Learning' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
