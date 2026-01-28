'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { CoachMode } from '@/types/coach';

interface CoachInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  mode: CoachMode;
}

export function CoachInput({ onSend, isLoading, mode }: CoachInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const placeholders: Record<CoachMode, string> = {
    chat: 'Ask me anything about poker...',
    analyze: 'Describe a hand you want me to analyze...',
    quiz: 'Say "quiz me" or ask for a specific topic...',
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholders[mode]}
          disabled={isLoading}
          rows={1}
          className="w-full px-4 py-3 bg-slate-700 text-white rounded-xl border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none resize-none max-h-32 disabled:opacity-50"
        />
      </div>
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className="px-4 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
      >
        {isLoading ? (
          <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          'Send'
        )}
      </button>
    </form>
  );
}
