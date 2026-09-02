import React from 'react';
import {
  Sparkles,
  BookOpen,
  LayoutDashboard,
  UploadCloud,
  GraduationCap,
  Activity,
  Settings,
  Flame,
  Brain,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { ViewRoute, LearnerProfile, LearningLanguage } from '../../types';
import { defaultLearnerProfile } from '../../data/mockData';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  currentRoute: ViewRoute;
  onNavigate?: (route: ViewRoute) => void;
  onRouteChange?: (route: ViewRoute) => void;
  profile?: LearnerProfile;
  currentLanguage?: LearningLanguage;
  onLanguageChange: (lang: LearningLanguage) => void;
  onOpenDemoGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onRouteChange,
  profile,
  currentLanguage,
  onLanguageChange,
  onOpenDemoGuide
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const handleNav = onNavigate || onRouteChange || (() => { });
  const safeProfile = profile || defaultLearnerProfile;
  const activeLanguage = currentLanguage || safeProfile.language || 'Hinglish';

  const mainNavItems: { route: ViewRoute; label: string; icon: React.ReactNode }[] = [
    { route: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { route: 'upload', label: 'Upload', icon: <UploadCloud className="w-3.5 h-3.5" /> },
    { route: 'lesson-plan', label: 'Lesson', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { route: 'teacher', label: 'AI Teacher', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { route: 'assessment', label: 'Assessment', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { route: 'report', label: 'Report', icon: <Activity className="w-3.5 h-3.5" /> },
    { route: 'learning-path', label: 'Roadmap', icon: <Sparkles className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl shadow-sm">
      {/* Single-row container — h-14 keeps everything tight */}
      <div className="w-full px-3 sm:px-4 h-14 flex items-center gap-2 overflow-hidden">

        {/* ── Logo ── */}
        <button
          id="nav-logo-btn"
          type="button"
          onClick={() => handleNav('landing')}
          className="flex items-center gap-2 group shrink-0 focus:outline-none cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Brain className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <span className="font-heading font-extrabold text-sm text-white tracking-tight hidden sm:inline">
            EDUVISTA<span className="text-indigo-400">.AI</span>
          </span>
        </button>

        {/* ── Center Nav (desktop) — flex-1 so it takes remaining space ── */}
        <nav className="hidden lg:flex items-center gap-0.5 bg-slate-900/80 px-1 py-1 rounded-xl border border-slate-800/80 flex-1 mx-2">
          {mainNavItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                id={`nav-link-${item.route}`}
                type="button"
                onClick={() => handleNav(item.route)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap flex-1 justify-center ${isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.route === 'teacher' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* ── Right controls ── */}
        <div className="flex items-center gap-1.5 shrink-0 ml-auto lg:ml-0">

          {/* Demo button */}
          <button
            id="nav-demo-guide-btn"
            type="button"
            onClick={onOpenDemoGuide}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-semibold transition-all cursor-pointer"
            title="Demo walkthrough"
          >
            <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">Demo</span>
          </button>

          {/* AI Engine button — only on xl+ */}
          <button
            id="nav-ai-engine-btn"
            type="button"
            onClick={() => handleNav('ai-engine')}
            className={`hidden xl:flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${currentRoute === 'ai-engine'
                ? 'bg-purple-600/30 border border-purple-500/50 text-purple-200'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            title="AI Agent Engine"
          >
            <Brain className="w-3 h-3 text-purple-400" />
            <span>Engine</span>
          </button>

          {/* Language selector */}
          <LanguageSelector
            currentLanguage={activeLanguage}
            onLanguageChange={onLanguageChange}
          />

          {/* Streak badge */}
          <div className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-bold select-none">
            <Flame className="w-3 h-3 fill-orange-400 text-orange-400" />
            <span>{safeProfile.streakDays}d</span>
          </div>

          {/* Profile */}
          <button
            id="nav-profile-btn"
            type="button"
            onClick={() => handleNav('profile')}
            className="flex items-center gap-1.5 px-1.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
            title="Profile"
          >
            <img
              src={safeProfile.avatar}
              alt={safeProfile.name}
              className="w-5 h-5 rounded-full object-cover ring-1 ring-indigo-500/40"
            />
            <span className="text-[11px] font-semibold text-slate-200 hidden md:inline">
              {safeProfile.name}
            </span>
          </button>

          {/* Settings */}
          <button
            id="nav-settings-btn"
            type="button"
            onClick={() => handleNav('settings')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Settings"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            id="nav-mobile-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 py-3 space-y-1">
          <div className="grid grid-cols-2 gap-1.5 pb-2 border-b border-slate-800">
            {mainNavItems.map((item) => (
              <button
                key={item.route}
                type="button"
                onClick={() => { handleNav(item.route); setMobileMenuOpen(false); }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer ${currentRoute === item.route
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-800'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => { handleNav('ai-engine'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-xs text-purple-300 py-1.5 cursor-pointer"
            >
              <Brain className="w-4 h-4 text-purple-400" />
              <span>AI Agents Engine</span>
            </button>
            <button
              type="button"
              onClick={() => { handleNav('onboarding'); setMobileMenuOpen(false); }}
              className="flex items-center gap-1.5 text-xs text-indigo-400 py-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Setup Flow</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
