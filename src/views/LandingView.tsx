import React from 'react';
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Brain,
  UploadCloud,
  Layers,
  Activity,
  ShieldCheck,
  Globe,
  Compass,
  Play,
  CheckCircle2,
  AlertTriangle,
  Zap,
  TrendingUp,
  Cpu,
  BookOpen,
  Code,
  Dna,
  History,
  Calculator
} from 'lucide-react';
import { ViewRoute } from '../types';

interface LandingViewProps {
  onNavigate: (route: ViewRoute) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Upload or Choose Topic',
      desc: 'Upload any textbook, PDF, lecture notes, or enter a subject from scratch.',
      icon: <UploadCloud className="w-5 h-5 text-blue-400" />
    },
    {
      num: '02',
      title: 'Understand Your Profile',
      desc: 'AI evaluates your current mastery, preferred language, available time, and learning style.',
      icon: <Brain className="w-5 h-5 text-indigo-400" />
    },
    {
      num: '03',
      title: 'Generate Personalized Lesson',
      desc: 'Generates a micro-curriculum with interactive checkpoints and pacing.',
      icon: <Layers className="w-5 h-5 text-purple-400" />
    },
    {
      num: '04',
      title: 'Learn from AI Teacher',
      desc: 'Watch Ava explain concepts with expressive facial avatar, audio voice, and live visual simulations.',
      icon: <GraduationCap className="w-5 h-5 text-pink-400" />
    },
    {
      num: '05',
      title: 'Ask & Get Evaluated',
      desc: 'Answer live concept checkpoints and ask clarifying questions via voice or text in real-time.',
      icon: <Activity className="w-5 h-5 text-amber-400" />
    },
    {
      num: '06',
      title: 'Adapt & Improve',
      desc: 'If a misconception occurs, AI immediately adapts teaching strategy using intuitive analogies.',
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />
    }
  ];

  const features = [
    {
      title: 'AI Teacher Avatar & Voice',
      desc: 'Hyper-realistic pedagogical avatar with dynamic lip-sync, tone variation, and empathetic expressions.',
      icon: <GraduationCap className="w-5 h-5 text-indigo-400" />
    },
    {
      title: 'PDF & Textbook Ingestion',
      desc: 'Upload syllabus books, research papers, or classroom notes with automatic chapter & formula extraction.',
      icon: <UploadCloud className="w-5 h-5 text-blue-400" />
    },
    {
      title: 'RAG Knowledge Grounding',
      desc: 'Strict textbook-grounded answers with page number citations and zero model hallucinations.',
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />
    },
    {
      title: 'Personalized Micro-Lessons',
      desc: 'Custom pacing adjusted whether you have 5 minutes for quick review or 60 minutes for deep mastery.',
      icon: <Layers className="w-5 h-5 text-purple-400" />
    },
    {
      title: 'Real-Time Adaptive Teaching',
      desc: 'Does not just tell you "Wrong"—pivots explanation strategy on the fly using intuitive physical analogies.',
      icon: <Zap className="w-5 h-5 text-amber-400" />
    },
    {
      title: 'Misconception Detection',
      desc: 'Diagnoses the exact cognitive root cause behind errors (e.g. direct vs inverse relationship confusion).',
      icon: <AlertTriangle className="w-5 h-5 text-rose-400" />
    },
    {
      title: 'Multilingual Voice & Subtitles',
      desc: 'Seamless real-time switching between English, Hindi, and conversational Hinglish while preserving context.',
      icon: <Globe className="w-5 h-5 text-emerald-400" />
    },
    {
      title: 'Smart Dynamic Visualizations',
      desc: 'Interactive physical models—like water pipes for electrical resistance and live circuit sliders.',
      icon: <Activity className="w-5 h-5 text-cyan-400" />
    },
    {
      title: 'Bloom-Taxonomy Assessments',
      desc: 'Adaptive multi-format quizzes evaluating Recall, Understanding, Application, and Analysis.',
      icon: <CheckCircle2 className="w-5 h-5 text-teal-400" />
    },
    {
      title: 'Actionable Learning Analytics',
      desc: 'Quantifiable comprehension tracking, concept mastery matrices, and next-topic roadmaps.',
      icon: <TrendingUp className="w-5 h-5 text-indigo-400" />
    }
  ];

  const subjects = [
    {
      name: 'Mathematics',
      detail: 'Dynamic Graphs & Equation Proofs',
      icon: <Calculator className="w-5 h-5 text-blue-400" />,
      tag: 'Calculus, Geometry & Algebra'
    },
    {
      name: 'Physics',
      detail: 'Interactive Circuit Schematics & Vector Simulations',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      tag: 'Electricity, Mechanics & Optics'
    },
    {
      name: 'Biology',
      detail: '3D Labeled Anatomical & Cellular Structures',
      icon: <Dna className="w-5 h-5 text-emerald-400" />,
      tag: 'Genetics, Physiology & Ecology'
    },
    {
      name: 'History',
      detail: 'Interactive Timelines & Geopolitical Maps',
      icon: <History className="w-5 h-5 text-purple-400" />,
      tag: 'World History, Civilizations & Eras'
    },
    {
      name: 'Programming',
      detail: 'Live Code Execution & Memory Flow Visualizer',
      icon: <Code className="w-5 h-5 text-cyan-400" />,
      tag: 'Algorithms, Data Structures & Python'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
        {/* Background glow flares */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-indigo-600/20 via-blue-600/15 to-cyan-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-xs font-semibold text-indigo-300 shadow-xl backdrop-blur-xl animate-float">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>“Your AI Teacher That Understands How You Learn.”</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white leading-[1.12]">
              Learn Anything. Your Way. <br />
              <span className="bg-gradient-to-r from-indigo-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                With an AI Teacher That Adapts to You.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Upload a textbook, PDF, notes, or simply enter a topic. EDUVISTA AI plans, teaches, questions, evaluates, and adapts every lesson to your learning needs.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <button
                id="hero-start-learning-btn"
                type="button"
                onClick={() => onNavigate('upload')}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02]"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-see-how-it-works-btn"
                type="button"
                onClick={() => onNavigate('teacher')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm sm:text-base shadow-md transition-all"
              >
                <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                <span>See How It Works</span>
              </button>
            </div>
          </div>

          {/* Hero Visual Mockup Classroom Showcase */}
          <div className="mt-14 relative max-w-5xl mx-auto">
            {/* Floating Animated Reaction Badges */}
            <div className="hidden md:flex absolute -top-5 left-4 z-20 items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/95 border border-rose-500/40 text-rose-300 text-xs font-bold shadow-2xl shadow-rose-950/40 animate-float">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Misconception Detected</span>
            </div>

            <div className="hidden md:flex absolute -top-5 right-4 z-20 items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/95 border border-indigo-500/40 text-indigo-300 text-xs font-bold shadow-2xl shadow-indigo-950/40 animate-float" style={{ animationDelay: '1.5s' }}>
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Teaching Strategy Adapted</span>
            </div>

            <div className="hidden md:flex absolute -bottom-5 left-10 z-20 items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/95 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-2xl shadow-emerald-950/40 animate-float" style={{ animationDelay: '2.5s' }}>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Mastery +24%</span>
            </div>

            <div className="hidden md:flex absolute -bottom-5 right-10 z-20 items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/95 border border-cyan-500/40 text-cyan-300 text-xs font-bold shadow-2xl shadow-cyan-950/40 animate-float" style={{ animationDelay: '0.8s' }}>
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Lesson personalized for you</span>
            </div>

            {/* Frame Container */}
            <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800 p-3 sm:p-5 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-slate-300 ml-2">EDUVISTA AI Teacher Classroom • Class 10 Physics: Ohm’s Law</span>
                </div>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Adaptive Session
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left Mini Avatar */}
                <div className="lg:col-span-5 rounded-xl bg-slate-950 border border-slate-800 p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-indigo-500 to-cyan-400 mb-3 shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
                      alt="Ava AI Teacher"
                      className="w-full h-full rounded-full object-cover object-top"
                    />
                  </div>
                  <div className="text-sm font-bold text-white">Ava — AI Teacher</div>
                  <div className="text-[11px] text-indigo-400 font-medium">Hinglish Voice Active</div>
                  <p className="text-xs text-slate-300 mt-2 italic bg-slate-900 p-2 rounded-lg border border-slate-800">
                    “Think of resistance like a narrow water pipe. Squeezing it makes current flow harder!”
                  </p>
                </div>

                {/* Right Interactive Visual Explanation Preview */}
                <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 p-4 flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      Dynamic Resistance Simulation
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">I = V / R = 3.0 Amps</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="text-slate-300">
                      <strong>Check Your Understanding:</strong> If resistance increases at constant voltage, current...
                    </div>
                    <span className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                      Option Selected: A ➔ Misconception
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between text-xs">
                    <span className="text-indigo-300 font-medium">
                      ⚡ AI Triggered Strategy Pivot: <strong>Water Pipe Analogy</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => onNavigate('teacher')}
                      className="px-2.5 py-1 rounded bg-indigo-600 text-white font-bold text-[11px]"
                    >
                      Experience Live
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How EDUVISTA Works (6 Steps) */}
      <section className="py-16 sm:py-20 border-t border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Pedagogical Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
              How EDUVISTA Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              A systematic 6-step loop engineered around cognitive science and adaptive mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((step) => (
              <div
                key={step.num}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-indigo-500/40 transition-all hover:translate-y-[-2px] shadow-lg group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-indigo-500/40 transition-colors">
                    {step.icon}
                  </div>
                  <span className="font-mono font-bold text-sm text-slate-500 group-hover:text-indigo-400 transition-colors">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-16 sm:py-20 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Enterprise AI Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
              Built for Real Learning, Not Generic Chat
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Every component works synchronously to teach you step-by-step.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all hover:bg-slate-900/90"
              >
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 w-fit mb-3">
                  {f.icon}
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subject-Aware Learning Section */}
      <section className="py-16 sm:py-20 border-t border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              Domain Modality Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
              Subject-Aware Visual Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              The AI automatically switches visual models based on the academic subject.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((sub, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      {sub.icon}
                    </div>
                    <h3 className="text-base font-bold text-white">{sub.name}</h3>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {sub.tag}
                  </span>
                </div>
                <div className="text-xs font-semibold text-indigo-300 pt-1">
                  ➔ {sub.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 border-t border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            “Stop watching. Start learning with a teacher that adapts.”
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Experience the future of education with full pedagogical intelligence, live avatar voice, and misconception recovery.
          </p>
          <div className="pt-2">
            <button
              id="final-cta-btn"
              type="button"
              onClick={() => onNavigate('upload')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-base shadow-2xl shadow-indigo-600/40 transition-all hover:scale-105"
            >
              Create My First Lesson
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
