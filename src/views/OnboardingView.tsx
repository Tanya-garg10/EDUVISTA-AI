import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Clock,
  Target,
  Lightbulb,
  UploadCloud,
  FileText
} from 'lucide-react';
import {
  LearnerProfile,
  LearningLevel,
  LearningLanguage,
  LearningTime,
  LearningGoal,
  TeachingStyle,
  ViewRoute
} from '../types';
import { defaultLearnerProfile } from '../data/mockData';

interface OnboardingViewProps {
  profile?: LearnerProfile;
  onUpdateProfile: (updated: Partial<LearnerProfile>) => void;
  onNavigate: (route: ViewRoute) => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  profile = defaultLearnerProfile,
  onUpdateProfile,
  onNavigate
}) => {
  const [step, setStep] = React.useState<number>(1);
  const [learnType, setLearnType] = React.useState<'upload' | 'topic'>('upload');
  const [topicInput, setTopicInput] = React.useState('Class 10 Physics — Electricity & Ohm’s Law');
  const [level, setLevel] = React.useState<LearningLevel>(profile.level || 'beginner');
  const [language, setLanguage] = React.useState<LearningLanguage>(profile.language || 'Hinglish');
  const [time, setTime] = React.useState<LearningTime>(profile.availableTime || '20min');
  const [goal, setGoal] = React.useState<LearningGoal>(profile.goal || 'exam');
  const [style, setStyle] = React.useState<TeachingStyle>(profile.teachingStyle || 'visual_learning');

  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save and finish
      onUpdateProfile({
        level,
        language,
        availableTime: time,
        goal,
        teachingStyle: style
      });
      if (learnType === 'upload') {
        onNavigate('upload');
      } else {
        onNavigate('lesson-plan');
      }
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-slate-950">
      <div className="w-full max-w-2xl rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              Student Cognitive Profile Setup
            </span>
            <span className="font-mono text-slate-300">
              Step 0{step} of 0{totalSteps}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 transition-all duration-300 rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: What do you want to learn? */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                What do you want to learn today?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Choose how you want to provide your study content.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setLearnType('upload')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  learnType === 'upload'
                    ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/20'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 w-fit mb-2">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">Upload Material</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Upload textbook PDF, class notes, PPTX, or syllabus chapter.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setLearnType('topic')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  learnType === 'topic'
                    ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/20'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 w-fit mb-2">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">Enter a Topic</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Type any concept (e.g. Ohm's Law, Machine Learning, Circulatory System).
                </p>
              </button>
            </div>

            {learnType === 'topic' && (
              <div className="pt-2">
                <label className="text-xs text-slate-300 font-semibold mb-1.5 block">
                  Subject or Topic Name
                </label>
                <input
                  type="text"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  placeholder="e.g. Class 10 Physics — Electricity & Ohm’s Law"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}
          </div>
        )}

        {/* Step 2: What's your current level? */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                What's your current proficiency level?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Ava will calibrate analogies and vocabulary to match your baseline.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { id: 'beginner', title: 'Beginner', desc: 'Starting from scratch. Need simple everyday physical analogies.' },
                { id: 'intermediate', title: 'Intermediate', desc: 'Know the basics. Ready for mathematical formulas & circuit logic.' },
                { id: 'advanced', title: 'Advanced', desc: 'Targeting competitive exams (JEE/NEET). Fast-paced problem solving.' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLevel(item.id as LearningLevel)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    level === item.id
                      ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/20'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white">{item.title}</span>
                    {level === item.id && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: How do you want to learn? (Language) */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                How do you want to learn? (Language)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Choose the language for teacher avatar speech and subtitles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { id: 'English', flag: '🇬🇧', label: 'English', desc: 'Clear academic English with international standard terms.' },
                { id: 'Hindi', flag: '🇮🇳', label: 'Hindi (हिंदी)', desc: 'शुद्ध और स्पष्ट हिंदी माध्यम में संपूर्ण व्याख्यान।' },
                { id: 'Hinglish', flag: '✨', label: 'Hinglish', desc: 'Conversational friendly hybrid (Hindi explanation + English terms).' }
              ].map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setLanguage(lang.id as LearningLanguage)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    language === lang.id
                      ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/20'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-sm font-bold text-white">{lang.label}</span>
                    </div>
                    {language === lang.id && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{lang.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: How much time do you have? */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                How much time do you have?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                The AI Lesson Planner will compress or expand micro-modules accordingly.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { id: '5min', label: '5 Minutes', badge: 'Flash Sprint' },
                { id: '20min', label: '20 Minutes', badge: 'Optimal Depth' },
                { id: '60min', label: '60 Minutes', badge: 'Deep Mastery' },
                { id: '7days', label: '7 Days', badge: 'Full Roadmap' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTime(t.id as LearningTime)}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    time === t.id
                      ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/20'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Clock className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                  <div className="text-sm font-bold text-white">{t.label}</div>
                  <span className="text-[10px] text-slate-400 font-medium block mt-1">
                    {t.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: What's your goal? */}
        {step === 5 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                What is your primary goal?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                We'll weight quiz questions and examples towards your target outcome.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { id: 'concept', label: 'Understand a concept', desc: 'Intuitive grasp and core physical mechanics.' },
                { id: 'exam', label: 'Exam preparation', desc: 'Board exam patterns, formulas, and common pitfalls.' },
                { id: 'interview', label: 'Interview preparation', desc: 'Technical clarity and explanation fluency.' },
                { id: 'revision', label: 'Rapid Revision', desc: 'High-yield checkpoints and key concept formulas.' },
                { id: 'skills', label: 'Build practical skills', desc: 'Real-world problem solving and hands-on circuits.' }
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id as LearningGoal)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    goal === g.id
                      ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/20'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">{g.label}</span>
                    {goal === g.id && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <p className="text-xs text-slate-400">{g.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Teaching style */}
        {step === 6 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                Preferred Teaching Style
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                How should Ava deliver concepts to match your cognitive learning preference?
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              {[
                { id: 'simple_examples', title: 'Simple everyday examples', desc: 'Connecting science to daily life analogies.' },
                { id: 'visual_learning', title: 'Visual & diagrammatic learning', desc: 'Interactive pipe analogies, circuits, and flowcharts.' },
                { id: 'step_by_step', title: 'Rigorous step-by-step breakdowns', desc: 'Sequential deduction with derivation checkpoints.' },
                { id: 'socratic', title: 'Socratic questioning', desc: 'Guiding you through prompts rather than direct lecturing.' },
                { id: 'practical', title: 'Practical problem solving', desc: 'Direct application to numerical problems and questions.' }
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setStyle(st.id as TeachingStyle)}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    style === st.id
                      ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/20'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-white">{st.title}</h4>
                    <p className="text-xs text-slate-400">{st.desc}</p>
                  </div>
                  {style === st.id && <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 ml-2" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={() => step > 1 && setStep(step - 1)}
            disabled={step === 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            id="onboarding-next-btn"
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all"
          >
            <span>{step === totalSteps ? 'Generate My Lesson Plan' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
