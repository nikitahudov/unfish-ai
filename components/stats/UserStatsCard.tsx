'use client';

import React from 'react';
import { useStats } from '@/lib/hooks';

export function UserStatsCard() {
  const { stats, level, progressPercentage, formattedStudyTime, isLoading } = useStats();

  if (isLoading) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 animate-pulse">
        <div className="h-4 bg-slate-700 rounded w-1/3 mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-16 bg-slate-700 rounded" />
          <div className="h-16 bg-slate-700 rounded" />
          <div className="h-16 bg-slate-700 rounded" />
          <div className="h-16 bg-slate-700 rounded" />
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Your Progress</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          level === 'advanced' ? 'bg-purple-500/20 text-purple-400' :
          level === 'intermediate' ? 'bg-blue-500/20 text-blue-400' :
          'bg-emerald-500/20 text-emerald-400'
        }`}>
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-400">Overall Progress</span>
          <span className="text-white font-medium">{progressPercentage}%</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-700/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-white">{stats.skills_completed}</div>
          <div className="text-xs text-slate-400">Skills Mastered</div>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-white">{stats.quizzes_passed}</div>
          <div className="text-xs text-slate-400">Quizzes Passed</div>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-amber-400">{stats.current_streak}</div>
          <div className="text-xs text-slate-400">Day Streak</div>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-white">{formattedStudyTime}</div>
          <div className="text-xs text-slate-400">Study Time</div>
        </div>
      </div>

      {/* Average Score */}
      {stats.quizzes_attempted > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400">Average Quiz Score</span>
            <span className={`text-lg font-bold ${
              stats.average_quiz_score >= 80 ? 'text-emerald-400' :
              stats.average_quiz_score >= 60 ? 'text-amber-400' :
              'text-rose-400'
            }`}>
              {Math.round(stats.average_quiz_score)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
