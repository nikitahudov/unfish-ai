'use client';

import React from 'react';
import { useQuizSessionStore } from '@/lib/quizSessionStore';

interface QuizSessionHeaderProps {
  onEndQuiz: () => void;
}

export function QuizSessionHeader({ onEndQuiz }: QuizSessionHeaderProps) {
  const { isActive, topic, difficulty, questionsAsked, correctAnswers, streak } = useQuizSessionStore();

  if (!isActive) return null;

  const accuracy = questionsAsked > 0
    ? Math.round((correctAnswers / questionsAsked) * 100)
    : 0;

  const difficultyColors = {
    easy: 'bg-emerald-500/20 text-emerald-400',
    medium: 'bg-amber-500/20 text-amber-400',
    hard: 'bg-rose-500/20 text-rose-400',
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">📝</span>
            <span className="font-medium text-white">{topic}</span>
          </div>

          <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Stats */}
          <div className="flex items-center gap-3 text-sm">
            <div className="text-slate-400">
              <span className="text-white font-medium">{correctAnswers}</span>
              <span>/{questionsAsked}</span>
            </div>

            <div className={`font-medium ${accuracy >= 70 ? 'text-emerald-400' : accuracy >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
              {accuracy}%
            </div>

            {streak >= 2 && (
              <div className="flex items-center gap-1 text-amber-400">
                <span>🔥</span>
                <span className="font-medium">{streak}</span>
              </div>
            )}
          </div>

          {/* End Quiz Button */}
          <button
            onClick={onEndQuiz}
            className="px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
          >
            End Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
