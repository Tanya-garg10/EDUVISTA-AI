import React from 'react';
import {
  Settings,
  Volume2,
  Brain,
  ShieldCheck,
  Globe,
  Sliders,
  CheckCircle2,
  Trash2,
  Sparkles,
  Zap
} from 'lucide-react';
import { LearningLanguage, ViewRoute } from '../types';

interface SettingsViewProps {
  currentLanguage: LearningLanguage;
  onLanguageChange: (lang: LearningLanguage) => void;
  onNavigate: (route: ViewRoute) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentLanguage,
  onLanguageChange,
  onNavigate
}) => {
  const [savedSuccess, setSavedSuccess] = React.useState(false);
  const [teacherPersona, setTeacherPersona] = React.useState<'ava' | 'leo'>('ava');
  const [voiceRate, setVoiceRate] = React.useState('1.0');
  const [pedagogyRigor, setPedagogyRigor] = React.useState<'balanced' | 'rigorous' | 'socratic'>('balanced');
  const [autoAnalogies, setAutoAnalogies] = React.useState(true);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-extrabold text-white">
              Platform & AI Teacher Settings
            </h1>
            <p className="text-xs text-slate-400">
              Configure speech synthesis, pedagogical rigor, and learning preferences
            </p>
          </div>
        </div>

        {savedSuccess && (
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            Preferences Saved!
          </span>
        )}
      </div>

      {/* Voice & Persona */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Volume2 className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            AI Teacher Voice & Persona
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => setTeacherPersona('ava')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              teacherPersona === 'ava'
                ? 'bg-indigo-600/20 border-indigo-500 shadow-md ring-1 ring-indigo-500'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-white">Ava (Default)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-pink-500/20 text-pink-300">
                Warm & Empathetic
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Specialized in intuitive physical analogies, patient re-explanation, and adaptive praise.
            </p>
          </div>

          <div
            onClick={() => setTeacherPersona('leo')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              teacherPersona === 'leo'
                ? 'bg-indigo-600/20 border-indigo-500 shadow-md ring-1 ring-indigo-500'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-white">Leo</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                Rigorous & Technical
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Direct mathematical precision, competitive exam patterns (JEE/NEET), and concise theory.
            </p>
          </div>
        </div>

        {/* Language Selection */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 block">
            Default Delivery Language
          </label>
          <div className="flex flex-wrap gap-2">
            {(['English', 'Hindi', 'Hinglish'] as LearningLanguage[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onLanguageChange(lang)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  currentLanguage === lang
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pedagogical Rigor Settings */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Brain className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Pedagogical Engine & Misconception Handling
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <div>
              <div className="font-bold text-white">Automatic Analogy Pivot</div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                Automatically transition to physical water analogies upon misconception detection
              </div>
            </div>
            <input
              type="checkbox"
              checked={autoAnalogies}
              onChange={(e) => setAutoAnalogies(e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-white">AI Evaluation Mode</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {[
                { id: 'balanced', label: 'Balanced (Recommended)' },
                { id: 'rigorous', label: 'High Rigor & Derivations' },
                { id: 'socratic', label: 'Socratic Prompting Only' }
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setPedagogyRigor(r.id as any)}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    pedagogyRigor === r.id
                      ? 'bg-indigo-600/30 border-indigo-500 text-white font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-2 flex justify-end">
        <button
          id="save-settings-btn"
          type="button"
          onClick={handleSave}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all"
        >
          Save Platform Preferences
        </button>
      </div>
    </div>
  );
};
