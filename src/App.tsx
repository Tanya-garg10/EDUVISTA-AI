import React from 'react';
import {
  ViewRoute,
  LearnerProfile,
  LearningLanguage,
  UploadedMaterialMeta
} from './types';
import { defaultLearnerProfile, demoLessonData } from './data/mockData';
import { Navbar } from './components/common/Navbar';
import { DemoGuideModal } from './components/common/DemoGuideModal';

// Views
import { LandingView } from './views/LandingView';
import { OnboardingView } from './views/OnboardingView';
import { DashboardView } from './views/DashboardView';
import { UploadView } from './views/UploadView';
import { LessonPlanView } from './views/LessonPlanView';
import { TeacherClassroomView } from './views/TeacherClassroomView';
import { AssessmentView } from './views/AssessmentView';
import { ReportView } from './views/ReportView';
import { LearningPathView } from './views/LearningPathView';
import { ProfileView } from './views/ProfileView';
import { SettingsView } from './views/SettingsView';
import { AIEngineView } from './views/AIEngineView';

export function App() {
  const [currentRoute, setCurrentRoute] = React.useState<ViewRoute>('landing');
  const [profile, setProfile] = React.useState<LearnerProfile>(defaultLearnerProfile);
  const [currentLanguage, setCurrentLanguage] = React.useState<LearningLanguage>('Hinglish');
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(true);
  const [isDemoGuideOpen, setIsDemoGuideOpen] = React.useState<boolean>(false);

  // Sync profile language changes
  const handleLanguageChange = (lang: LearningLanguage) => {
    setCurrentLanguage(lang);
    setProfile((prev) => ({ ...prev, language: lang }));
  };

  const handleUpdateProfile = (updated: Partial<LearnerProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white ${isDarkMode ? 'dark' : ''}`}>
      {/* Top Main Navigation Bar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={(route) => setCurrentRoute(route)}
        profile={profile}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onOpenDemoGuide={() => setIsDemoGuideOpen(true)}
      />

      {/* Main View Router Content */}
      <main className="flex-1 w-full flex flex-col">
        {currentRoute === 'landing' && (
          <LandingView onNavigate={(route) => setCurrentRoute(route)} />
        )}

        {currentRoute === 'onboarding' && (
          <OnboardingView
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onNavigate={(route) => setCurrentRoute(route)}
          />
        )}

        {currentRoute === 'dashboard' && (
          <DashboardView
            profile={profile}
            onNavigate={(route) => setCurrentRoute(route)}
          />
        )}

        {currentRoute === 'upload' && (
          <UploadView
            onNavigate={(route) => setCurrentRoute(route)}
            onMaterialReady={() => {}}
          />
        )}

        {currentRoute === 'lesson-plan' && (
          <LessonPlanView
            lesson={demoLessonData}
            onNavigate={(route) => setCurrentRoute(route)}
          />
        )}

        {currentRoute === 'teacher' && (
          <TeacherClassroomView
            lesson={demoLessonData}
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            onNavigate={(route) => setCurrentRoute(route)}
          />
        )}

        {currentRoute === 'assessment' && (
          <AssessmentView onNavigate={(route) => setCurrentRoute(route)} />
        )}

        {currentRoute === 'report' && (
          <ReportView onNavigate={(route) => setCurrentRoute(route)} />
        )}

        {currentRoute === 'learning-path' && (
          <LearningPathView onNavigate={(route) => setCurrentRoute(route)} />
        )}

        {currentRoute === 'profile' && (
          <ProfileView
            profile={profile}
            onNavigate={(route) => setCurrentRoute(route)}
          />
        )}

        {currentRoute === 'settings' && (
          <SettingsView
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            onNavigate={(route) => setCurrentRoute(route)}
          />
        )}

        {currentRoute === 'ai-engine' && (
          <AIEngineView onNavigate={(route) => setCurrentRoute(route)} />
        )}
      </main>

      {/* Persistent Bottom Hackathon Demo Floating Bar (when not in full teacher screen) */}
      {currentRoute !== 'teacher' && (
        <div className="sticky bottom-4 z-40 max-w-xl mx-auto px-4 w-full pointer-events-none">
          <div className="p-3 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-indigo-500/40 shadow-2xl flex items-center justify-between gap-3 pointer-events-auto">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-300 font-medium hidden sm:inline">
                Demo: <strong>Class 10 Physics (Ohm’s Law)</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsDemoGuideOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
              >
                Demo Steps Guide
              </button>

              <button
                type="button"
                onClick={() => setCurrentRoute('teacher')}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all"
              >
                Launch AI Teacher
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Demo Guide Walkthrough Modal */}
      <DemoGuideModal
        isOpen={isDemoGuideOpen}
        onClose={() => setIsDemoGuideOpen(false)}
        onNavigate={(route) => setCurrentRoute(route)}
      />
    </div>
  );
}

export default App;
