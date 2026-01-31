'use client';

import React from 'react';
import type { SkillProgress, QuizAttempt } from '@/types/database';

interface SkillProgressBadgeProps {
  skillId: string;
  showScore?: boolean;
  /** All progress records (from parent useProgress hook) */
  progress?: SkillProgress[];
  /** All quiz attempts (from parent useQuizzes hook) */
  quizAttempts?: QuizAttempt[];
}

export function SkillProgressBadge({
  skillId,
  showScore = false,
  progress,
  quizAttempts,
}: SkillProgressBadgeProps) {
  // Derive status from passed-in data
  const skillProgress = progress?.find(p => p.skill_id === skillId);
  const completed = skillProgress?.content_completed || false;
  const viewed = skillProgress?.content_viewed || false;

  // Find best quiz attempt for this skill
  const skillQuizAttempts = quizAttempts?.filter(a => a.skill_id === skillId) || [];
  const bestAttempt = skillQuizAttempts.length > 0
    ? skillQuizAttempts.reduce((best, current) =>
        current.percentage > best.percentage ? current : best
      )
    : undefined;
  const isPassed = bestAttempt?.passed || false;
  const bestScore = bestAttempt?.percentage;

  if (completed && isPassed) {
    return (
      <div className="flex items-center gap-1">
        <span className="px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-400 rounded-full">
          &#x2713; Mastered
        </span>
        {showScore && bestScore && (
          <span className="text-xs text-emerald-400">{bestScore}%</span>
        )}
      </div>
    );
  }

  if (completed) {
    return (
      <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full">
        &#x2713; Read
      </span>
    );
  }

  if (viewed) {
    return (
      <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-400 rounded-full">
        In Progress
      </span>
    );
  }

  return null;
}
