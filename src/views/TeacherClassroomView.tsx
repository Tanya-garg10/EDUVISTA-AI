import React from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Globe,
  Sliders,
  Waves,
  Zap,
  HelpCircle,
  Award,
  Layers,
  Volume2,
  VolumeX,
  Play
} from 'lucide-react';
import { Lesson, LearningLanguage, ViewRoute } from '../types';
import { demoLessonData } from '../data/mockData';
import { AIAvatar, AvatarState } from '../components/classroom/AIAvatar';
import { TeacherVisualCanvas } from '../components/classroom/TeacherVisualCanvas';
import { QuestionCard } from '../components/classroom/QuestionCard';
import { MisconceptionAlert } from '../components/classroom/MisconceptionAlert';
import { AdaptiveTeachingPanel } from '../components/classroom/AdaptiveTeachingPanel';
import { RAGSourcesDrawer } from '../components/classroom/RAGSourcesDrawer';
import { TeacherControls } from '../components/classroom/TeacherControls';
import { ApiService } from '../services/apiService';
import { speechService } from '../services/speechSynthesisService';

interface TeacherClassroomViewProps {
  lesson?: Lesson;
  currentLanguage: LearningLanguage;
  onLanguageChange: (lang: LearningLanguage) => void;
  onNavigate: (route: ViewRoute) => void;
}

export const TeacherClassroomView: React.FC<TeacherClassroomViewProps> = ({
  lesson = demoLessonData,
  currentLanguage,
  onLanguageChange,
  onNavigate
}) => {
  // Classroom interaction state
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(false);
  const [volume, setVolume] = React.useState<number>(0.85);
  const [isSpeakingNow, setIsSpeakingNow] = React.useState(false);
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1);
  const [avatarState, setAvatarState] = React.useState<AvatarState>('teaching');
  const [visualMode, setVisualMode] = React.useState<'analogy' | 'circuit' | 'graph'>('analogy');
  
  // Interactive Question & Misconception states
  const [showQuestion, setShowQuestion] = React.useState(true);
  const [selectedOptionId, setSelectedOptionId] = React.useState<string>('opt-a'); // pre-selected for demo ease
  const [isEvaluating, setIsEvaluating] = React.useState(false);
  const [evaluationResult, setEvaluationResult] = React.useState<{
    isCorrect: boolean;
    misconceptionDetected: boolean;
    explanation: string;
  } | null>(null);

  // Misconception recovery workflow state
  const [misconceptionActive, setMisconceptionActive] = React.useState(false);
  const [showAdaptiveEngine, setShowAdaptiveEngine] = React.useState(false);
  const [adaptiveStage, setAdaptiveStage] = React.useState(1);
  const [isRetestMode, setIsRetestMode] = React.useState(false);
  const [retestSelectedId, setRetestSelectedId] = React.useState<string>('');
  const [masteryScore, setMasteryScore] = React.useState(43);

  // RAG Sources Drawer
  const [isRAGOpen, setIsRAGOpen] = React.useState(false);

  // Voice recording simulation
  const [isVoiceRecording, setIsVoiceRecording] = React.useState(false);

  // Active section speech
  const currentSection = lesson.sections.find((s) => s.active) || lesson.sections[3];
  const currentSpeech = misconceptionActive
    ? lesson.misconceptionsMap['misc-direct-confusion'].teacherSpeechOverride[currentLanguage]
    : currentSection.speechText[currentLanguage];

  // Helper to trigger speech synthesis safely
  const triggerSpeech = React.useCallback(
    (textToSpeak: string) => {
      if (isMuted) return;
      speechService.unlockAudio();
      speechService.speak(textToSpeak, currentLanguage, {
        onStart: () => setIsSpeakingNow(true),
        onEnd: () => setIsSpeakingNow(false),
        onError: () => setIsSpeakingNow(false)
      });
    },
    [isMuted, currentLanguage]
  );

  // Update speech synthesis mute and volume state
  React.useEffect(() => {
    speechService.setMuted(isMuted);
  }, [isMuted]);

  React.useEffect(() => {
    speechService.setVolume(volume);
  }, [volume]);

  // Play speech whenever speech text or language changes
  React.useEffect(() => {
    if (isPlaying && !isMuted && currentSpeech) {
      const timer = setTimeout(() => {
        triggerSpeech(currentSpeech);
      }, 400);
      return () => {
        clearTimeout(timer);
        speechService.stop();
      };
    }
  }, [currentSpeech, currentLanguage, isPlaying, isMuted, triggerSpeech]);

  // Clean up speech on unmount
  React.useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, []);

  // Handler for question submission
  const handleQuestionSubmit = async () => {
    if (!selectedOptionId) return;
    setIsEvaluating(true);
    setAvatarState('analyzing');
    speechService.stop();

    const result = await ApiService.evaluateAnswer(
      lesson.id,
      lesson.questions[0].id,
      selectedOptionId
    );

    setIsEvaluating(false);
    setEvaluationResult(result);

    if (result.misconceptionDetected) {
      setAvatarState('misconception');
      setMisconceptionActive(true);
      setShowAdaptiveEngine(true);
      setAdaptiveStage(3);

      speechService.playSoundEffect('misconception');
      const misconceptionSpeech = lesson.misconceptionsMap['misc-direct-confusion'].teacherSpeechOverride[currentLanguage];
      triggerSpeech(misconceptionSpeech);

      // Animate adaptive stage progression
      setTimeout(() => {
        setAdaptiveStage(4);
        setAvatarState('adapting');
      }, 900);

      setTimeout(() => {
        setAdaptiveStage(5);
        setVisualMode('analogy'); // automatically pivot to Water Pipe Analogy!
      }, 1800);
    } else {
      setAvatarState('celebrating');
      setMasteryScore(78);
      speechService.playSoundEffect('celebrate');
      triggerSpeech(
        currentLanguage === 'Hinglish'
          ? 'Shabash Tanya! Bilkul sahi answer! Resistance aur Current inversely proportional hote hain.'
          : currentLanguage === 'Hindi'
          ? 'शाबाश तान्या! बिल्कुल सही उत्तर! प्रतिरोध और धारा व्युत्क्रमानुपाती होते हैं।'
          : 'Excellent job Tanya! That is completely correct. Current is inversely proportional to resistance.'
      );
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Handler for Retest submission
  const handleRetestSubmit = () => {
    if (!retestSelectedId) return;
    if (retestSelectedId === 'opt-re-b') {
      setAvatarState('celebrating');
      setAdaptiveStage(6);
      setMasteryScore(82);
      speechService.playSoundEffect('celebrate');
      triggerSpeech(
        currentLanguage === 'Hinglish'
          ? 'Wah Tanya! Concept crystal clear ho gaya! Wire ki length badhane se resistance badh jayegi.'
          : currentLanguage === 'Hindi'
          ? 'बहुत खूब तान्या! लंबाई बढ़ाने से प्रतिरोध बढ़ता है।'
          : 'Outstanding Tanya! You have fully mastered this concept.'
      );
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleVoiceAnswerTrigger = () => {
    setIsVoiceRecording(true);
    speechService.playSoundEffect('pop');
    setTimeout(() => {
      setIsVoiceRecording(false);
      setSelectedOptionId('opt-a');
    }, 2400);
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] p-3 sm:p-5 lg:p-6 max-w-7xl mx-auto space-y-4">
      {/* Top Classroom Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {lesson.topic}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Live Classroom
              </span>
            </div>
            <span className="text-xs text-slate-400">
              {lesson.subject} • {lesson.chapter}
            </span>
          </div>
        </div>

        {/* Action Controls & Voice Status & RAG grounded source badge */}
        <div className="flex items-center gap-2">
          {/* Quick Voice Replay CTA */}
          <button
            type="button"
            onClick={() => {
              setIsPlaying(true);
              setIsMuted(false);
              triggerSpeech(currentSpeech);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 hover:text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
            title="Play Teacher Voice Audio"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isSpeakingNow ? 'animate-bounce text-emerald-400' : ''}`} />
            <span>{isSpeakingNow ? 'Ava Speaking...' : '🔊 Play Teacher Voice (आवाज़)'}</span>
          </button>

          {/* Grounded Sources Trigger */}
          <button
            id="open-rag-sources-btn"
            type="button"
            onClick={() => setIsRAGOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-300 text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Grounded Sources ({lesson.groundedSources.length})</span>
          </button>

          {/* Quick Assessment CTA */}
          <button
            id="proceed-assessment-btn"
            type="button"
            onClick={() => {
              speechService.stop();
              onNavigate('assessment');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <span>Take Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main 2-Column Classroom Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Large AI Teacher Avatar & Voice (5 of 12 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="h-[420px] sm:h-[480px]">
            <AIAvatar
              state={avatarState}
              isMuted={isMuted}
              onToggleMute={() => {
                const nextMuted = !isMuted;
                setIsMuted(nextMuted);
                if (nextMuted) {
                  speechService.stop();
                } else {
                  triggerSpeech(currentSpeech);
                }
              }}
              currentSpeechText={currentSpeech}
              language={currentLanguage}
              isPaused={!isPlaying}
              onSpeakNow={() => {
                setIsPlaying(true);
                setIsMuted(false);
                triggerSpeech(currentSpeech);
              }}
              isSpeakingNow={isSpeakingNow}
            />
          </div>

          {/* Playback Controls Bar */}
          <TeacherControls
            isPlaying={isPlaying}
            onTogglePlay={() => {
              const nextPlay = !isPlaying;
              setIsPlaying(nextPlay);
              if (!nextPlay) {
                speechService.stop();
                setAvatarState('teaching');
              } else {
                setAvatarState('speaking');
                triggerSpeech(currentSpeech);
              }
            }}
            onReplay={() => {
              setIsPlaying(true);
              setIsMuted(false);
              setAvatarState('speaking');
              triggerSpeech(currentSpeech);
            }}
            isMuted={isMuted}
            onToggleMute={() => {
              const nextMuted = !isMuted;
              setIsMuted(nextMuted);
              if (nextMuted) {
                speechService.stop();
              } else {
                triggerSpeech(currentSpeech);
              }
            }}
            volume={volume}
            onChangeVolume={(vol) => {
              setVolume(vol);
              speechService.setVolume(vol);
              if (isMuted && vol > 0) {
                setIsMuted(false);
              }
            }}
            playbackSpeed={playbackSpeed}
            onChangeSpeed={(spd) => setPlaybackSpeed(spd)}
            currentLanguage={currentLanguage}
          />
        </div>

        {/* RIGHT COLUMN: Lesson Progress, Smart Visualizer & Question Interventions (7 of 12 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Top Progress & Concept Notes Strip */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Lesson Progress
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                Current: Section 04 (Resistance)
              </span>
            </div>

            {/* Checkmark progress track */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-medium">
                Introduction ✓
              </span>
              <span className="px-2 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-medium">
                Voltage ✓
              </span>
              <span className="px-2 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-medium">
                Current ✓
              </span>
              <span className="px-2 py-1 rounded-md bg-indigo-600/30 border border-indigo-500 text-indigo-200 font-bold ring-1 ring-indigo-400/40">
                Resistance ●
              </span>
              <span className="px-2 py-1 rounded-md bg-slate-950 text-slate-500 border border-slate-800">
                Ohm's Law ○
              </span>
              <span className="px-2 py-1 rounded-md bg-slate-950 text-slate-500 border border-slate-800">
                Assessment ○
              </span>
            </div>

            {/* Concept Key Idea */}
            <div className="pt-2 border-t border-slate-800 flex items-start gap-2">
              <div className="p-1 rounded bg-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs text-slate-300">
                <strong className="text-white">Current Concept: Resistance (R)</strong> —{' '}
                <em>“Resistance opposes the flow of current. (R = V / I)”</em>
              </div>
            </div>
          </div>

          {/* Interactive Visual Canvas (Water pipe & circuit simulation) */}
          <div className="min-h-[300px]">
            <TeacherVisualCanvas
              mode={visualMode}
              onModeChange={(m) => setVisualMode(m)}
              highlightConcept={misconceptionActive ? 'Water Pipe Friction Analogy' : 'Electrical Resistance'}
            />
          </div>

          {/* WOW Moment: Misconception Alert if triggered */}
          {misconceptionActive && (
            <MisconceptionAlert
              misconception={lesson.misconceptionsMap['misc-direct-confusion']}
              onExploreAnalogy={() => setVisualMode('analogy')}
              onTryAgain={() => {
                setIsRetestMode(true);
                setAdaptiveStage(5);
              }}
              language={currentLanguage}
            />
          )}

          {/* WOW Moment: Adaptive Teaching Engine Live Decision Panel */}
          {showAdaptiveEngine && (
            <AdaptiveTeachingPanel
              currentStage={adaptiveStage}
              studentAnswerText='Selected Option A: "Current increases"'
              detectedMisconception="Direct vs Inverse Ratio Confusion (I ∝ 1/R)"
              selectedStrategy="Formula → Water Pipe Analogy → Squeezed Pipe Re-test"
              previousMastery={43}
              newMastery={masteryScore}
            />
          )}

          {/* Retest Question Box after Misconception Adaptation */}
          {isRetestMode && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-900 border-2 border-cyan-500/40 shadow-2xl space-y-3 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Waves className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-bold text-white">
                    Adaptive Re-Test: Squeezed Pipe Analogy
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  Concept Re-evaluation
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 font-semibold">
                Now, using the water pipe analogy: If you pinch the pipe tighter (increasing Resistance) while tap pressure is unchanged (constant Voltage), what happens to the water flow rate (Current)?
              </p>

              <div className="space-y-2 pt-1">
                {[
                  { id: 'opt-re-a', text: 'A. Water flow rate increases' },
                  { id: 'opt-re-b', text: 'B. Water flow rate decreases (Correct)' },
                  { id: 'opt-re-c', text: 'C. Flow rate stays identical' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRetestSelectedId(opt.id)}
                    className={`w-full p-2.5 rounded-xl text-left text-xs font-medium border transition-all ${
                      retestSelectedId === opt.id
                        ? opt.id === 'opt-re-b'
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-indigo-600/30 border-indigo-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-emerald-300">
                  {retestSelectedId === 'opt-re-b' && '✓ Mastery validated! Mastery jumped from 43% ➔ 82%'}
                </span>

                <button
                  type="button"
                  onClick={handleRetestSubmit}
                  disabled={!retestSelectedId}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all"
                >
                  Verify Mastery & Proceed
                </button>
              </div>
            </div>
          )}

          {/* Live Interrupt Question Card */}
          {showQuestion && !misconceptionActive && !isRetestMode && (
            <QuestionCard
              question={lesson.questions[0]}
              selectedOptionId={selectedOptionId}
              onSelectOption={(optId) => setSelectedOptionId(optId)}
              onSubmit={handleQuestionSubmit}
              isEvaluating={isEvaluating}
              evaluationResult={evaluationResult}
              onVoiceAnswer={handleVoiceAnswerTrigger}
              isVoiceRecording={isVoiceRecording}
            />
          )}
        </div>
      </div>

      {/* RAG Knowledge Grounding Drawer */}
      <RAGSourcesDrawer
        sources={lesson.groundedSources}
        isOpen={isRAGOpen}
        onClose={() => setIsRAGOpen(false)}
      />
    </div>
  );
};
