import React from 'react';
import { Globe, Check } from 'lucide-react';
import { LearningLanguage } from '../../types';

interface LanguageSelectorProps {
  currentLanguage: LearningLanguage;
  onLanguageChange: (lang: LearningLanguage) => void;
  className?: string;
  variant?: 'compact' | 'full';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  className = '',
  variant = 'compact'
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const languages: { id: LearningLanguage; label: string; sub: string; flag: string }[] = [
    { id: 'English', label: 'English', sub: 'Standard Academic', flag: '🇬🇧' },
    { id: 'Hindi', label: 'हिंदी (Hindi)', sub: 'शुद्ध हिंदी माध्यम', flag: '🇮🇳' },
    { id: 'Hinglish', label: 'Hinglish (हिंदी + Eng)', sub: 'Conversational Hybrid', flag: '✨' }
  ];

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <button
        id="language-selector-trigger"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 text-slate-200 text-xs font-medium transition-all shadow-sm"
      >
        <Globe className="w-3.5 h-3.5 text-indigo-400" />
        <span>
          {currentLanguage === 'Hinglish'
            ? 'Hinglish'
            : currentLanguage === 'Hindi'
            ? 'हिंदी'
            : 'English'}
        </span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
          AI Voice
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 p-1.5 rounded-xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800/60 mb-1">
            Teacher Subtitles & Voice
          </div>
          {languages.map((lang) => (
            <button
              key={lang.id}
              id={`lang-select-${lang.id.toLowerCase()}`}
              type="button"
              onClick={() => {
                onLanguageChange(lang.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left text-xs transition-all ${
                currentLanguage === lang.id
                  ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30'
                  : 'text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{lang.flag}</span>
                <div>
                  <div className="text-slate-200">{lang.label}</div>
                  {variant === 'full' && (
                    <div className="text-[10px] text-slate-400">{lang.sub}</div>
                  )}
                </div>
              </div>
              {currentLanguage === lang.id && (
                <Check className="w-3.5 h-3.5 text-indigo-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
