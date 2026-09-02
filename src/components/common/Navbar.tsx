import React from 'react';
import {
  Sparkles,
  BookOpen,
  LayoutDashboard,
  UploadCloud,
  GraduationCap,
  Activity,
  User,
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
  const handleNav = onNavigate || onRouteChange || (() => {});
  const safeProfile = profile || defaultLearnerProfile;
  const activeLanguage = currentLanguage || safeProfile.language || 'Hinglish';

  const mainNavItems: { route: ViewRoute; label: string; icon: React.ReactNode }[] = [
    { route: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { route: 'upload', label: 'Upload & Create', icon: <UploadCloud className="w-4 h-4" /> },
    { route: 'lesson-plan', label: 'Lesson Plan', icon: <BookOpen className="w-4 h-4" /> },
    { route: 'teacher', label: 'AI Teacher', icon: <GraduationCap className="w-4 h-4" /> },
    { route: 'assessment', label: 'Assessment', icon: <CheckCircle2 className="w-4 h-4" /> },
    { route: 'report', label: 'Report', icon: <Activity className="w-4 h-4" /> },
    { route: 'learning-path', label: 'Roadmap', icon: <Sparkles className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            id="nav-logo-btn"
            type="button"
            onClick={() => handleNav('landing')}
            className="flex items-center gap-2.5 group text-left focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Brain className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-heading font-extrabold text-base sm:text-lg text-white tracking-tight">
                  EDUVISTA<span className="text-indigo-400">.AI</span>
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Adaptive
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium hidden xl:block mt-1 tracking-tight">
                AI Teacher That Understands How You Learn
              </span>
            </div>
          </button>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800/80 shadow-inner">
          {mainNavItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                id={`nav-link-${item.route}`}
                type="button"
                onClick={() => handleNav(item.route)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.route === 'teacher' && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Side Control Bar */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Quick Demo Scenario Guide Button */}
          <button
            id="nav-demo-guide-btn"
            type="button"
            onClick={onOpenDemoGuide}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold shadow-sm transition-all cursor-pointer"
            title="Step-by-step hackathon demo walkthrough"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">Demo Scenario</span>
            <span className="sm:hidden text-[10px]">Demo</span>
          </button>

          {/* AI Multi-Agent Engine View Button */}
          <button
            id="nav-ai-engine-btn"
            type="button"
            onClick={() => handleNav('ai-engine')}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              currentRoute === 'ai-engine'
                ? 'bg-purple-600/30 border border-purple-500/50 text-purple-200 shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="7 AI Multi-Agent Pipeline & Pedagogical Architecture"
          >
            <Brain className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden xl:inline">7 AI Agents</span>
            <span className="xl:hidden">Engine</span>
          </button>

          {/* Multilingual Selector */}
          <LanguageSelector
            currentLanguage={activeLanguage}
            onLanguageChange={onLanguageChange}
          />

          {/* Streak badge */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold select-none">
            <Flame className="w-3.5 h-3.5 fill-orange-400 text-orange-400 animate-bounce" />
            <span>{safeProfile.streakDays}d</span>
          </div>

          {/* Profile link */}
          <button
            id="nav-profile-btn"
            type="button"
            onClick={() => handleNav('profile')}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
            title="Student Profile & Mastery"
          >
            <img
              src={safeProfile.avatar}
              alt={safeProfile.name}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-indigo-500/40"
            />
            <span className="text-xs font-semibold text-slate-200 hidden md:inline">
              {safeProfile.name}
            </span>
          </button>

          {/* Settings */}
          <button
            id="nav-settings-btn"
            type="button"
            onClick={() => handleNav('settings')}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            id="nav-mobile-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 py-3 space-y-1 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-1.5 pb-2 border-b border-slate-800">
            {mainNavItems.map((item) => (
              <button
                key={item.route}
                type="button"
                onClick={() => {
                  handleNav(item.route);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer ${
                  currentRoute === item.route
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
              onClick={() => {
                handleNav('ai-engine');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs text-purple-300 py-1.5 cursor-pointer"
            >
              <Brain className="w-4 h-4 text-purple-400" />
              <span>7 AI Agents Engine</span>
            </button>
            <button
              type="button"
              onClick={() => {
                handleNav('onboarding');
                setMobileMenuOpen(false);
              }}
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
