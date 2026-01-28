'use client';

import React from 'react';
import type { CoachMode } from '@/types/coach';

interface ModeSelectorProps {
  currentMode: CoachMode;
  onModeChange: (mode: CoachMode) => void;
}

const modes: { id: CoachMode; label: string; icon: string; description: string }[] = [
  { id: 'chat', label: 'Chat', icon: 'Chat', description: 'General Q&A' },
  { id: 'analyze', label: 'Analyze', icon: 'Search', description: 'Hand review' },
  { id: 'quiz', label: 'Quiz', icon: 'Quiz', description: 'Practice' },
];

export function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="flex gap-2">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            currentMode === mode.id
              ? 'bg-amber-500 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          <span className="font-medium">{mode.label}</span>
        </button>
      ))}
    </div>
  );
}
