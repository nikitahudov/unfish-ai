'use client';

import React from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useProgress, useSkillQuizzes } from '@/lib/hooks';

interface SkillProgressBadgeProps {
  skillId: string;
  showScore?: boolean;
}

export function SkillProgressBadge({ skillId, showScore = false }: SkillProgressBadgeProps) {
  const { isAuthenticated } = useAuth();
  const { isSkillCompleted, isSkillViewed } = useProgress();
  const { isPassed, bestScore } = useSkillQuizzes(skillId);

  if (!isAuthenticated) {
    return null;
  }

  const completed = isSkillCompleted(skillId);
  const viewed = isSkillViewed(skillId);

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
