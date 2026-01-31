'use client';

import { useCallback } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { statsService } from '@/lib/services';
import { useAsyncData } from './useAsyncData';
import type { UserStats } from '@/types/database';

export function useStats() {
  const { isAuthenticated, user } = useAuth();

  const {
    data: stats,
    isLoading,
    error,
    refetch,
    mutate,
  } = useAsyncData<UserStats | null>(
    () => statsService.get(user?.id),
    [isAuthenticated, user?.id],
    { enabled: isAuthenticated }
  );

  // Update streak
  const updateStreak = useCallback(async (): Promise<void> => {
    if (!isAuthenticated || !user?.id) return;

    const updated = await statsService.updateStreak(user.id);
    mutate(updated);
  }, [isAuthenticated, user?.id, mutate]);

  // Increment a stat
  const incrementStat = useCallback(async (
    field: 'total_study_time_seconds' | 'skills_viewed' | 'skills_completed' |
           'quizzes_attempted' | 'quizzes_passed' | 'coach_conversations_count' | 'coach_messages_sent',
    amount: number = 1
  ): Promise<void> => {
    if (!isAuthenticated || !user?.id || !stats) return;

    // Optimistic update
    mutate({
      ...stats,
      [field]: (stats[field] as number) + amount,
    });

    try {
      const updated = await statsService.increment(field, amount, user.id);
      mutate(updated);
    } catch (error) {
      // Revert on error
      refetch();
      throw error;
    }
  }, [isAuthenticated, user?.id, stats, mutate, refetch]);

  // Computed values
  const level = stats ? (
    stats.skills_completed >= 66 ? 'advanced' as const :
    stats.skills_completed >= 23 ? 'intermediate' as const : 'beginner' as const
  ) : 'beginner' as const;

  const progressPercentage = stats ? Math.round((stats.skills_completed / 96) * 100) : 0;

  const formattedStudyTime = stats ? formatStudyTime(stats.total_study_time_seconds) : '0m';

  return {
    stats,
    isLoading,
    error,
    refetch,

    // Computed
    level,
    progressPercentage,
    formattedStudyTime,

    // Actions
    updateStreak,
    incrementStat,
  };
}

// Helper function to format study time
function formatStudyTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours < 24) {
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
}
