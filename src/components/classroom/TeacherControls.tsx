import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Gauge,
  MessageSquarePlus,
  Sparkles,
  Send,
  Bot,
  Mic,
  MicOff,
  Volume1,
  Copy,
  Check,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { ApiService } from '../../services/apiService';
import { speechService } from '../../services/speechSynthesisService';

interface FormattedMessageProps {
  text: string;
}

const CleanFormattedTeacherMessage: React.FC<FormattedMessageProps> = ({ text }) => {
  // Strip any accidental markdown asterisks or code formatting
  const sanitizedText = text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\$([^\$]+)\$/g, '$1')
    .replace(/\\\(([^\)]+)\\\)/g, '$1')
    .replace(/\\propto/g, '∝')
    .replace(/\\Omega/g, 'Ω')
    .replace(/\\times/g, '×')
    .replace(/\*+/g, '');

  const paragraphs = sanitizedText.split(/\n\n+/).filter((p) => p.trim().length > 0);

  return (
    <div className="space-y-2.5 text-xs sm:text-sm text-slate-100 leading-relaxed">
      {paragraphs.map((para, idx) => {
        const trimmed = para.trim();

        // Check if paragraph is an Analogy
        const isAnalogy =
          trimmed.toLowerCase().startsWith('analogy:') ||
          trimmed.toLowerCase().startsWith('water pipe analogy') ||
          trimmed.toLowerCase().includes('ki tarah samjho') ||
          trimmed.toLowerCase().includes('crowded corridor');

        // Check if paragraph is a Formula / Rule
        const isFormula =
          trimmed.toLowerCase().startsWith('key formula:') ||
          trimmed.toLowerCase().startsWith('formula:') ||
          trimmed.toLowerCase().startsWith('मुख्य सूत्र:') ||
          trimmed.toLowerCase().startsWith('key rule:') ||
          trimmed.toLowerCase().startsWith('si unit:');

        // Check if paragraph is a Sub-heading/Key Point
        const isSubHeader =
          trimmed.toLowerCase().startsWith('kyun hota hai aisa?') ||
          trimmed.toLowerCase().startsWith('important difference:') ||
          trimmed.toLowerCase().startsWith('core concept:') ||
          trimmed.toLowerCase().startsWith('कारण:');

        if (isAnalogy) {
          return (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm my-1.5 shadow-sm"
            >
              <div className="flex items-center gap-1.5 font-bold text-amber-400 text-xs mb-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Real-World Physical Analogy</span>
              </div>
              <p className="text-amber-100/90 leading-relaxed">
                {trimmed.replace(/^analogy:\s*/i, '')}
              </p>
            </div>
          );
        }

        if (isFormula) {
          return (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-indigo-950/70 border border-indigo-500/30 text-indigo-200 text-xs sm:text-sm font-mono my-1.5 shadow-sm"
            >
              <div className="flex items-center gap-1.5 font-bold text-indigo-300 text-xs mb-1 font-sans">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Formula & Core Principle</span>
              </div>
              <p className="text-slate-100 font-semibold tracking-wide">
                {trimmed}
              </p>
            </div>
          );
        }

        if (isSubHeader) {
          return (
            <div key={idx} className="pt-1">
              <span className="inline-block font-bold text-purple-300 text-xs uppercase tracking-wider mb-1">
                {trimmed}
              </span>
            </div>
          );
        }

        // Bullet list item formatting
        if (trimmed.includes('\n- ') || trimmed.startsWith('- ') || trimmed.match(/^\d\.\s/)) {
          const lines = trimmed.split('\n');
          return (
            <div key={idx} className="space-y-1.5 pl-1">
              {lines.map((line, lIdx) => {
                const isBullet = line.trim().startsWith('- ') || line.trim().match(/^\d\.\s/);
                return (
                  <div
                    key={lIdx}
                    className={`flex items-start gap-2 ${
                      isBullet ? 'text-slate-200' : 'text-slate-300 font-medium'
                    }`}
                  >
                    {isBullet && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                    )}
                    <span className="flex-1 leading-relaxed">
                      {line.replace(/^-\s*/, '').replace(/^\d\.\s*/, '')}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        }

        // Default clean paragraph
        return (
          <p key={idx} className="text-slate-200 leading-relaxed font-normal">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
};

interface TeacherControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReplay: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  volume?: number;
  onChangeVolume?: (volume: number) => void;
  playbackSpeed: number;
  onChangeSpeed: (speed: number) => void;
  currentLanguage: string;
}

export const TeacherControls: React.FC<TeacherControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onReplay,
  isMuted,
  onToggleMute,
  volume = 0.85,
  onChangeVolume,
  playbackSpeed,
  onChangeSpeed,
  currentLanguage
}) => {
  const [isAskModalOpen, setIsAskModalOpen] = React.useState(false);
  const [askQuery, setAskQuery] = React.useState('');
  const [isAnswering, setIsAnswering] = React.useState(false);
  const [isListening, setIsListening] = React.useState(false);
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);
  const chatBottomRef = React.useRef<HTMLDivElement>(null);

  const [conversation, setConversation] = React.useState<
    { sender: 'student' | 'teacher'; text: string; time: string; concept?: string }[]
  >([
    {
      sender: 'teacher',
      text: 'Hi Tanya! I am your AI Teacher Ava / Nova. Ask me any conceptual doubt about Ohm’s Law, formulas, circuits, or physical analogies. You can type or click the microphone to speak!',
      time: 'Just now',
      concept: "Ohm's Law & Circuit Analysis"
    }
  ]);

  // Scroll to bottom when conversation updates
  React.useEffect(() => {
    if (isAskModalOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation, isAnswering, isAskModalOpen]);

  // Voice Speech-to-Text Recognition
  const handleToggleVoiceInput = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your question.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = currentLanguage === 'Hindi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        speechService.playSoundEffect('pop');
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setAskQuery(transcript);
          setIsListening(false);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleAskSubmit = async (customQuery?: string) => {
    const queryToSend = (customQuery || askQuery).trim();
    if (!queryToSend || isAnswering) return;

    setAskQuery('');
    setConversation((prev) => [
      ...prev,
      { sender: 'student', text: queryToSend, time: 'Now' }
    ]);
    setIsAnswering(true);

    try {
      const res = await ApiService.askTeacher(queryToSend, currentLanguage, "Ohm's Law & Electricity");
      setConversation((prev) => [
        ...prev,
        {
          sender: 'teacher',
          text: res.answer,
          time: 'Now',
          concept: res.relatedConcept
        }
      ]);
      if (!isMuted) {
        speechService.unlockAudio();
        speechService.speak(res.answer, currentLanguage);
      }
    } catch {
      const fallbackAns = 'According to Ohm’s Law (V = IR), electric current is directly proportional to voltage and inversely proportional to resistance.';
      setConversation((prev) => [
        ...prev,
        {
          sender: 'teacher',
          text: fallbackAns,
          time: 'Now',
          concept: "Ohm's Law (V = IR)"
        }
      ]);
      if (!isMuted) {
        speechService.unlockAudio();
        speechService.speak(fallbackAns, currentLanguage);
      }
    } finally {
      setIsAnswering(false);
    }
  };

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard?.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const speedOptions = [0.75, 1, 1.25, 1.5];

  const suggestedQuestions = [
    { label: 'Why length increases resistance?', query: 'Why does resistance increase when length of wire increases?' },
    { label: 'Explain with water pipe analogy', query: 'Can you explain Ohm\'s law using the water pipe and pump analogy?' },
    { label: 'Difference: Resistance vs Resistivity', query: 'What is the key difference between resistance and resistivity?' },
    { label: 'Why copper for wires?', query: 'Why are copper and aluminium preferred for electrical transmission wires?' },
    { label: 'SI units of V, I and R', query: 'What are the SI units of Voltage, Current, and Resistance?' }
  ];

  return (
    <>
      <div className="w-full rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        {/* Playback playback buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <button
            id="control-play-pause-btn"
            type="button"
            onClick={onTogglePlay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            id="control-replay-btn"
            type="button"
            onClick={onReplay}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1 cursor-pointer"
            title="Replay explanation voice"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs font-medium">Replay Voice</span>
          </button>

          {/* Volume Control Group (Mute button + Slider) */}
          <div
            id="teacher-volume-control-group"
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-950 border border-slate-800"
          >
            <button
              id="control-mute-btn"
              type="button"
              onClick={onToggleMute}
              className={`p-1 rounded-md transition-all cursor-pointer ${
                isMuted
                  ? 'text-rose-400 hover:text-rose-300'
                  : 'text-slate-300 hover:text-cyan-400'
              }`}
              title={isMuted ? 'Unmute Audio Voice' : 'Mute Audio Voice'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              ) : volume <= 0.5 ? (
                <Volume1 className="w-3.5 h-3.5 text-cyan-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              )}
            </button>

            <div className="flex items-center gap-1.5">
              <input
                id="control-volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (onChangeVolume) {
                    onChangeVolume(val);
                  }
                  if (isMuted && val > 0) {
                    onToggleMute();
                  }
                }}
                className="w-14 sm:w-20 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all focus:outline-none"
                title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
              />
              <span className="text-[10px] font-mono text-slate-400 w-7 text-right select-none">
                {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
            <Gauge className="w-3 h-3 text-slate-400 ml-1" />
            {speedOptions.map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => onChangeSpeed(spd)}
                className={`px-1.5 py-0.5 rounded transition-all font-mono font-medium ${
                  playbackSpeed === spd
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Ask Teacher CTA */}
        <button
          id="ask-teacher-btn"
          type="button"
          onClick={() => {
            speechService.unlockAudio();
            setIsAskModalOpen(true);
          }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition-all ml-auto cursor-pointer"
        >
          <MessageSquarePlus className="w-3.5 h-3.5" />
          <span>Ask AI Teacher (Nova / Ava)</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </button>
      </div>

      {/* Ask Teacher Live Modal */}
      {isAskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-4 sm:p-5 flex flex-col h-[560px] max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-0.5 shadow-md shadow-purple-600/20">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-purple-300" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">Ask AI Teacher Ava / Nova</h4>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live AI Grounded
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Voice & Text Adaptive Q&A • Calibrated in {currentLanguage}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAskModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Conversation Stream */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3.5 pr-1">
              {conversation.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${
                    msg.sender === 'student' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'teacher' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5 shadow-sm">
                      Ava
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'student'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-950 border border-slate-800/90 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.concept && msg.sender === 'teacher' && (
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-purple-400 mb-1.5 pb-1 border-b border-slate-800">
                        <Lightbulb className="w-3 h-3 text-purple-400" />
                        <span>{msg.concept}</span>
                      </div>
                    )}
                    {msg.sender === 'teacher' ? (
                      <CleanFormattedTeacherMessage text={msg.text} />
                    ) : (
                      <div className="whitespace-pre-line font-medium">{msg.text}</div>
                    )}
                    
                    <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-slate-800/60 text-[10px]">
                      <span className={msg.sender === 'student' ? 'text-indigo-200 font-mono' : 'text-slate-500 font-mono'}>
                        {msg.time}
                      </span>
                      {msg.sender === 'teacher' && (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleCopyText(msg.text, i)}
                            className="p-1 rounded text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                            title="Copy answer"
                          >
                            {copiedIndex === i ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              speechService.unlockAudio();
                              speechService.speak(msg.text, currentLanguage);
                            }}
                            className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                            title="Play Teacher Voice Audio"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span className="text-[9px] font-medium">Listen</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isAnswering && (
                <div className="flex items-center gap-2 text-xs text-indigo-400 p-3 bg-slate-950/80 rounded-xl border border-indigo-500/20 animate-pulse">
                  <Sparkles className="w-4 h-4 animate-spin text-purple-400" />
                  <span>AI Teacher is formulating intuitive explanation in {currentLanguage}...</span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick suggested chips */}
            <div className="py-2 flex items-center gap-1.5 overflow-x-auto text-[11px] border-t border-slate-800/80 scrollbar-none">
              <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1 text-[10px]">
                <HelpCircle className="w-3 h-3 text-indigo-400" />
                Doubt Ideas:
              </span>
              {suggestedQuestions.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAskSubmit(s.query)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white whitespace-nowrap cursor-pointer transition-all border border-slate-700/60"
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Input form with Mic Voice Input & Text Input */}
            <form onSubmit={(e) => { e.preventDefault(); handleAskSubmit(); }} className="pt-2.5 border-t border-slate-800 flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleVoiceInput}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isListening
                    ? 'bg-rose-600 border-rose-500 text-white animate-pulse shadow-lg shadow-rose-600/40'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300 hover:text-white'
                }`}
                title={isListening ? 'Listening... click to stop' : 'Speak your question (Voice Input)'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                id="ask-teacher-input"
                type="text"
                value={askQuery}
                onChange={(e) => setAskQuery(e.target.value)}
                placeholder={isListening ? 'Listening to your voice...' : `Ask any question or doubt in ${currentLanguage}...`}
                className="flex-1 rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
              />

              <button
                type="submit"
                disabled={!askQuery.trim() || isAnswering}
                className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white font-bold transition-all shadow-md shadow-indigo-600/30 cursor-pointer shrink-0"
                title="Send Question"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
