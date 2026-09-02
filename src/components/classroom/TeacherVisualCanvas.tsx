import React from 'react';
import { Sparkles, Sliders, Waves, Zap, Activity, Info, ArrowRight } from 'lucide-react';

interface TeacherVisualCanvasProps {
  mode?: 'analogy' | 'circuit' | 'graph';
  onModeChange?: (mode: 'analogy' | 'circuit' | 'graph') => void;
  highlightConcept?: string;
  voltage?: number;
  resistance?: number;
  onVoltageChange?: (v: number) => void;
  onResistanceChange?: (r: number) => void;
}

export const TeacherVisualCanvas: React.FC<TeacherVisualCanvasProps> = ({
  mode = 'analogy',
  onModeChange,
  highlightConcept = 'Resistance',
  voltage = 12,
  resistance = 4,
  onVoltageChange,
  onResistanceChange
}) => {
  const [localMode, setLocalMode] = React.useState<'analogy' | 'circuit' | 'graph'>(mode);
  const [v, setV] = React.useState(voltage);
  const [r, setR] = React.useState(resistance);

  React.useEffect(() => {
    setLocalMode(mode);
  }, [mode]);

  const handleVChange = (val: number) => {
    setV(val);
    onVoltageChange?.(val);
  };

  const handleRChange = (val: number) => {
    setR(val);
    onResistanceChange?.(val);
  };

  // Calculate current (I = V / R)
  const current = Number((v / (r || 0.1)).toFixed(2));
  const power = Number((v * current).toFixed(1));

  const activeMode = onModeChange ? mode : localMode;
  const setMode = (m: 'analogy' | 'circuit' | 'graph') => {
    setLocalMode(m);
    onModeChange?.(m);
  };

  return (
    <div className="w-full h-full rounded-2xl bg-slate-900/90 border border-slate-800 p-4 flex flex-col justify-between shadow-xl">
      {/* Header with Visual Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            {activeMode === 'analogy' ? (
              <Waves className="w-4 h-4 text-cyan-400" />
            ) : activeMode === 'circuit' ? (
              <Zap className="w-4 h-4 text-amber-400" />
            ) : (
              <Activity className="w-4 h-4 text-indigo-400" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">Smart Visualizer:</span>
              <span className="text-xs font-semibold text-indigo-400">{highlightConcept}</span>
            </div>
            <span className="text-[10px] text-slate-400">
              Interactive physical simulation & dynamic formulas
            </span>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setMode('analogy')}
            className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
              activeMode === 'analogy'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Waves className="w-3 h-3" />
            <span>Water Pipe Analogy</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('circuit')}
            className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
              activeMode === 'circuit'
                ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>Circuit Model</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('graph')}
            className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
              activeMode === 'graph'
                ? 'bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3 h-3" />
            <span>V-I Graph</span>
          </button>
        </div>
      </div>

      {/* Main Simulation Viewport */}
      <div className="my-auto py-3">
        {activeMode === 'analogy' && (
          <div className="space-y-4">
            {/* Water Pipe Visual Schematic */}
            <div className="relative h-44 sm:h-48 w-full rounded-xl bg-slate-950/80 border border-slate-800 p-3 overflow-hidden flex flex-col justify-center">
              {/* Background grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

              {/* Water Pipe Container Graphic */}
              <div className="relative z-10 w-full flex items-center justify-between px-2">
                {/* Water Reservoir / Pump (Voltage) */}
                <div className="flex flex-col items-center gap-1 w-20">
                  <div className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-center shadow-lg">
                    <div className="text-[10px] text-blue-300 font-bold uppercase">Pump Pressure</div>
                    <div className="text-sm font-extrabold text-blue-400">{v} Volts</div>
                  </div>
                  <span className="text-[9px] text-slate-400 text-center">Tap / Battery</span>
                </div>

                {/* The Pipe Connection with Narrow Constriction in middle */}
                <div className="flex-1 mx-3 relative flex items-center">
                  {/* Left Wide Pipe */}
                  <div className="h-10 w-1/3 bg-cyan-950/60 border-y-2 border-cyan-500/50 relative overflow-hidden flex items-center">
                    <div className="w-full flex items-center gap-2 animate-shimmer">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="w-2.5 h-2.5 rounded-full bg-cyan-400/80 shadow-md shadow-cyan-400/50 animate-pulse" />
                      ))}
                    </div>
                  </div>

                  {/* Constriction / Pinch (Resistance) */}
                  <div
                    className="relative transition-all duration-500 border-2 border-rose-500/70 bg-rose-950/40 rounded-sm flex items-center justify-center px-1 overflow-hidden"
                    style={{
                      width: '34%',
                      height: `${Math.max(12, 40 - r * 3)}px`
                    }}
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-rose-500 animate-pulse" />
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-rose-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-rose-300 z-10 whitespace-nowrap">
                      {r}Ω Pinch
                    </span>
                  </div>

                  {/* Right Exit Pipe */}
                  <div className="h-10 w-1/3 bg-cyan-950/60 border-y-2 border-cyan-500/50 relative overflow-hidden flex items-center">
                    <div className="w-full flex items-center gap-2">
                      {Array.from({ length: Math.max(1, Math.min(5, Math.round(current))) }).map((_, i) => (
                        <div
                          key={i}
                          className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/50"
                          style={{
                            animation: `wave-bar 0.8s ease-in-out ${i * 0.1}s infinite`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Flow Rate Meter (Current Output) */}
                <div className="flex flex-col items-center gap-1 w-24">
                  <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-center shadow-lg">
                    <div className="text-[10px] text-emerald-300 font-bold uppercase">Flow Rate</div>
                    <div className="text-sm font-extrabold text-emerald-400">{current} Amps</div>
                  </div>
                  <span className="text-[9px] text-slate-400 text-center">Output Current</span>
                </div>
              </div>

              {/* Analogy takeaway banner */}
              <div className="relative z-10 mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-300 px-2">
                <div className="flex items-center gap-1 text-cyan-300 font-semibold">
                  <Info className="w-3.5 h-3.5" />
                  <span>Key Insight:</span>
                </div>
                <span>
                  {r > 5 ? (
                    <strong className="text-rose-300">
                      Narrower pipe (Higher R) = Slower water flow (Lower I)
                    </strong>
                  ) : (
                    <strong className="text-emerald-300">
                      Wider pipe (Lower R) = Massive water flow (Higher I)
                    </strong>
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'circuit' && (
          <div className="h-44 sm:h-48 w-full rounded-xl bg-slate-950/80 border border-slate-800 p-3 relative flex items-center justify-center">
            {/* SVG Circuit Schematic */}
            <svg className="w-full h-36" viewBox="0 0 400 160">
              {/* Circuit loop wire */}
              <rect x="40" y="30" width="320" height="100" rx="12" fill="none" stroke="#475569" strokeWidth="3" strokeDasharray="6 4" />
              
              {/* Animated Electrons moving along the path */}
              <circle cx="100" cy="30" r="4" fill="#38bdf8" className="animate-ping" />
              <circle cx="200" cy="30" r="4" fill="#38bdf8" />
              <circle cx="300" cy="30" r="4" fill="#38bdf8" />
              <circle cx="360" cy="80" r="4" fill="#38bdf8" />
              <circle cx="280" cy="130" r="4" fill="#38bdf8" />
              <circle cx="140" cy="130" r="4" fill="#38bdf8" />

              {/* Battery on Left (Voltage) */}
              <g transform="translate(40, 65)">
                <line x1="0" y1="0" x2="0" y2="30" stroke="#3b82f6" strokeWidth="5" />
                <line x1="-8" y1="8" x2="8" y2="8" stroke="#60a5fa" strokeWidth="3" />
                <line x1="-14" y1="22" x2="14" y2="22" stroke="#60a5fa" strokeWidth="4" />
                <text x="-25" y="18" fill="#93c5fd" fontSize="10" fontWeight="bold">+ {v}V -</text>
              </g>

              {/* Resistor on Top (Zigzag) */}
              <g transform="translate(170, 30)">
                <path d="M 0 0 L 10 -8 L 20 8 L 30 -8 L 40 8 L 50 -8 L 60 0" fill="none" stroke="#f43f5e" strokeWidth="3" />
                <text x="15" y="-12" fill="#fda4af" fontSize="11" fontWeight="bold">R = {r} Ω</text>
              </g>

              {/* Light Bulb / Load on Right */}
              <g transform="translate(360, 80)">
                <circle cx="0" cy="0" r="14" fill={current > 3 ? '#fef08a' : '#854d0e'} fillOpacity={Math.min(1, current / 4)} stroke="#eab308" strokeWidth="2" />
                <text x="-12" y="24" fill="#fde047" fontSize="10">💡 {power}W</text>
              </g>

              {/* Current Ammeter at bottom */}
              <g transform="translate(200, 130)">
                <circle cx="0" cy="0" r="12" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="-5" y="4" fill="#6ee7b7" fontSize="9" fontWeight="bold">A</text>
                <text x="-20" y="20" fill="#a7f3d0" fontSize="10">I = {current} A</text>
              </g>
            </svg>
          </div>
        )}

        {activeMode === 'graph' && (
          <div className="h-44 sm:h-48 w-full rounded-xl bg-slate-950/80 border border-slate-800 p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-semibold text-slate-200">Linear V-I Characteristics (Ohmic Conductor)</span>
              <span className="font-mono text-indigo-400">Slope = 1 / R = {(1 / r).toFixed(3)} Ω⁻¹</span>
            </div>

            {/* SVG Graph */}
            <svg className="w-full h-28" viewBox="0 0 300 100">
              {/* Axes */}
              <line x1="30" y1="85" x2="280" y2="85" stroke="#475569" strokeWidth="1.5" />
              <line x1="30" y1="15" x2="30" y2="85" stroke="#475569" strokeWidth="1.5" />
              
              {/* Labels */}
              <text x="260" y="98" fill="#94a3b8" fontSize="9">V (Volts)</text>
              <text x="5" y="20" fill="#94a3b8" fontSize="9">I (Amps)</text>

              {/* Linear Line */}
              <line
                x1="30"
                y1="85"
                x2="260"
                y2={Math.max(20, 85 - (230 / (r * 1.5)))}
                stroke="#6366f1"
                strokeWidth="3"
              />

              {/* Active Current Point */}
              <circle
                cx={Math.min(260, 30 + (v * 18))}
                cy={Math.max(20, 85 - (current * 14))}
                r="5"
                fill="#38bdf8"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            </svg>

            <div className="text-[10px] text-slate-400 text-center font-mono">
              Formula: V = I × R ⟹ Current (I) = {v}V ÷ {r}Ω = {current}A
            </div>
          </div>
        )}
      </div>

      {/* Interactive Controls Sliders */}
      <div className="pt-3 border-t border-slate-800 space-y-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Voltage Slider */}
          <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium flex items-center gap-1">
                <Zap className="w-3 h-3 text-blue-400" />
                Voltage (Push Pressure)
              </span>
              <span className="font-bold text-blue-400 font-mono">{v} V</span>
            </div>
            <input
              id="slider-voltage"
              type="range"
              min="2"
              max="24"
              step="1"
              value={v}
              onChange={(e) => handleVChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Resistance Slider */}
          <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium flex items-center gap-1">
                <Sliders className="w-3 h-3 text-rose-400" />
                Resistance (Opposition / Pipe Pinch)
              </span>
              <span className="font-bold text-rose-400 font-mono">{r} Ω</span>
            </div>
            <input
              id="slider-resistance"
              type="range"
              min="1"
              max="12"
              step="1"
              value={r}
              onChange={(e) => handleRChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>
        </div>

        {/* Live Calculation Banner */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-xs">
          <span className="text-slate-300 font-medium">Resulting Current:</span>
          <div className="flex items-center gap-2">
            <span className="text-indigo-300 font-mono">
              I = {v}V ÷ {r}Ω
            </span>
            <ArrowRight className="w-3 h-3 text-indigo-400" />
            <span className="font-extrabold text-emerald-400 font-mono text-sm">
              {current} Amperes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
