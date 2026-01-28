'use client';

import React from 'react';
import type { QuizSessionSummary } from '@/lib/quizSessionStore';

interface QuizSummaryModalProps {
  summary: QuizSessionSummary;
  onClose: () => void;
  onRestart: () => void;
}

export function QuizSummaryModal({ summary, onClose, onRestart }: QuizSummaryModalProps) {
  const getGrade = (accuracy: number) => {
    if (accuracy >= 90) return { letter: 'A', color: 'text-emerald-400', message: 'Excellent!' };
    if (accuracy >= 80) return { letter: 'B', color: 'text-emerald-400', message: 'Great job!' };
    if (accuracy >= 70) return { letter: 'C', color: 'text-amber-400', message: 'Good work!' };
    if (accuracy >= 60) return { letter: 'D', color: 'text-amber-400', message: 'Keep practicing!' };
    return { letter: 'F', color: 'text-rose-400', message: 'More study needed' };
  };

  const grade = getGrade(summary.accuracy);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-1">Quiz Complete!</h2>
          <p className="text-slate-400">{summary.topic}</p>
        </div>

        {/* Results */}
        <div className="p-6">
          {/* Big Grade */}
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold ${grade.color}`}>{grade.letter}</div>
            <div className="text-slate-400 mt-1">{grade.message}</div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{summary.accuracy}%</div>
              <div className="text-sm text-slate-400">Accuracy</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {summary.correctAnswers}/{summary.totalQuestions}
              </div>
              <div className="text-sm text-slate-400">Correct</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-amber-400">🔥 {summary.longestStreak}</div>
              <div className="text-sm text-slate-400">Best Streak</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className={`text-2xl font-bold capitalize ${
                summary.finalDifficulty === 'hard' ? 'text-rose-400' :
                summary.finalDifficulty === 'medium' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {summary.finalDifficulty}
              </div>
              <div className="text-sm text-slate-400">Final Level</div>
            </div>
          </div>

          {/* Recommendations */}
          {summary.accuracy < 70 && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
              <p className="text-amber-400 text-sm">
                💡 <strong>Tip:</strong> Consider reviewing the {summary.topic} lesson before trying again.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
            >
              Done
            </button>
            <button
              onClick={onRestart}
              className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
