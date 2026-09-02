import React from 'react';
import {
  User,
  GraduationCap,
  Award,
  Flame,
  Clock,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { LearnerProfile, ViewRoute } from '../types';
import { learningHistoryData, defaultLearnerProfile } from '../data/mockData';
import { ProgressRing } from '../components/common/ProgressRing';

interface ProfileViewProps {
  profile?: LearnerProfile;
  onNavigate: (route: ViewRoute) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile = defaultLearnerProfile,
  onNavigate
}) => {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-1 shadow-xl shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white text-2xl font-bold font-heading">
              {profile.name.charAt(0)}
            </div>
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-heading font-extrabold text-white">
                {profile.name}
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Class 10 CBSE Student
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Level: <strong className="text-slate-200 capitalize">{profile.level}</strong> • Language:{' '}
              <strong className="text-slate-200">{profile.language}</strong> • Primary Goal:{' '}
              <strong className="text-slate-200 capitalize">{profile.goal} Preparation</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('onboarding')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
          >
            Reconfigure Profile
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-xl font-extrabold text-orange-400 font-heading">
              {profile.streakDays} Days
            </div>
            <div className="text-[11px] text-slate-400">Learning Streak</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-xl font-extrabold text-indigo-400 font-heading">
              {profile.conceptsMastered}
            </div>
            <div className="text-[11px] text-slate-400">Mastered Concepts</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-xl font-extrabold text-emerald-400 font-heading">
              {profile.averageScore}%
            </div>
            <div className="text-[11px] text-slate-400">Average Mastery</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-xl font-extrabold text-cyan-400 font-mono">
              14h 32m
            </div>
            <div className="text-[11px] text-slate-400">AI Teacher Time</div>
          </div>
        </div>
      </div>

      {/* Recent Learning Activity History */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Recent Learning Sessions</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">3 sessions logged</span>
        </div>

        <div className="space-y-3">
          {learningHistoryData.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {item.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  {item.date} • Duration: {item.duration} • Score: {item.score}%
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">
                    Score
                  </span>
                  <span className="text-sm font-extrabold text-emerald-400 font-mono">
                    {item.score}%
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('report')}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-semibold transition-all"
                >
                  View Dossier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
