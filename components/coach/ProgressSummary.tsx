'use client';

import React, { useState } from 'react';
import { buildCoachContext } from '@/lib/coach/contextBuilder';

export function ProgressSummary() {
  const [isExpanded, setIsExpanded] = useState(false);
  const context = buildCoachContext();

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-700/50 transition-colors rounded-lg"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">📊</span>
          <div>
            <span className="text-sm font-medium text-white">Your Progress</span>
            <span className="text-xs text-slate-400 ml-2">
              {context.completedSkills.length} skills mastered
            </span>
          </div>
        </div>
        <span className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-700 pt-3">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-700/50 rounded-lg p-2">
              <div className="text-lg font-bold text-amber-400">
                {context.stats.quizzesPassed}
              </div>
              <div className="text-xs text-slate-400">Quizzes Passed</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-2">
              <div className="text-lg font-bold text-emerald-400">
                {context.stats.averageScore}%
              </div>
              <div className="text-xs text-slate-400">Avg Score</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-2">
              <div className="text-lg font-bold text-blue-400">
                {Math.round((context.stats.totalStudyTimeMinutes / 60) * 10) / 10}h
              </div>
              <div className="text-xs text-slate-400">Study Time</div>
            </div>
          </div>

          {/* Weak Areas */}
          {context.weakAreas.length > 0 && (
            <div>
              <div className="text-xs font-medium text-slate-400 mb-1">Needs Practice:</div>
              <div className="flex flex-wrap gap-1">
                {context.weakAreas.slice(0, 3).map((area) => (
                  <span
                    key={area.skillId}
                    className="px-2 py-0.5 text-xs bg-rose-500/20 text-rose-400 rounded"
                  >
                    {area.skillName} ({area.score}%)
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Strong Areas */}
          {context.strongAreas.length > 0 && (
            <div>
              <div className="text-xs font-medium text-slate-400 mb-1">Mastered:</div>
              <div className="flex flex-wrap gap-1">
                {context.strongAreas.slice(0, 3).map((area) => (
                  <span
                    key={area.skillId}
                    className="px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-400 rounded"
                  >
                    {area.skillName} ✓
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
