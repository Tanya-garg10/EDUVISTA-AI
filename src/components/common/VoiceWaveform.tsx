import React from 'react';

interface VoiceWaveformProps {
  isPlaying?: boolean;
  barCount?: number;
  colorClass?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({
  isPlaying = true,
  barCount = 18,
  colorClass = 'bg-gradient-to-t from-indigo-500 to-cyan-400',
  size = 'md'
}) => {
  const heights = [
    'h-2', 'h-4', 'h-7', 'h-3', 'h-8', 'h-5', 'h-9', 'h-6', 'h-4',
    'h-8', 'h-5', 'h-7', 'h-3', 'h-6', 'h-8', 'h-4', 'h-6', 'h-2'
  ];

  const heightClasses = size === 'sm' 
    ? 'max-h-4' 
    : size === 'lg' 
      ? 'max-h-10' 
      : 'max-h-6';

  const widthClass = size === 'sm' ? 'w-0.5' : size === 'lg' ? 'w-1.5' : 'w-1';

  return (
    <div className={`flex items-center gap-1 h-8 ${heightClasses}`}>
      {Array.from({ length: barCount }).map((_, i) => {
        const defaultH = heights[i % heights.length];
        return (
          <div
            key={i}
            className={`${widthClass} rounded-full transition-all duration-300 ${colorClass} ${
              isPlaying ? defaultH : 'h-1 opacity-40'
            }`}
            style={{
              animation: isPlaying ? `wave-bar 1.2s ease-in-out ${i * 0.08}s infinite` : 'none'
            }}
          />
        );
      })}
    </div>
  );
};
