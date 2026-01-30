'use client';

import { useCallback } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { activityService, ActivityType, ActivityMetadata } from '@/lib/services';
import { useAsyncData } from './useAsyncData';
import type { ActivityLog } from '@/types/database';

export function useActivity(limit: number = 20) {
  const { isAuthenticated } = useAuth();

  const {
    data: activities,
    isLoading,
    error,
    refetch,
    mutate,
  } = useAsyncData<ActivityLog[]>(
    () => activityService.getRecent(limit),
    [isAuthenticated, limit],
    { enabled: isAuthenticated, initialData: [] }
  );

  // Log an activity
  const logActivity = useCallback(async (
    type: ActivityType,
    referenceId?: string,
    metadata?: ActivityMetadata
  ): Promise<void> => {
    if (!isAuthenticated) return;

    const activity = await activityService.log(type, referenceId, metadata);

    // Add to local state
    mutate(prev => prev ? [activity, ...prev].slice(0, limit) : [activity]);
  }, [isAuthenticated, mutate, limit]);

  // Convenience methods
  const logContentViewed = useCallback(async (skillId: string, skillName?: string) => {
    await logActivity('content_viewed', skillId, { skillId, skillName });
  }, [logActivity]);

  const logContentCompleted = useCallback(async (skillId: string, skillName?: string) => {
    await logActivity('content_completed', skillId, { skillId, skillName });
  }, [logActivity]);

  const logQuizAttempted = useCallback(async (skillId: string, score: number, skillName?: string) => {
    await logActivity('quiz_attempted', skillId, { skillId, skillName, score });
  }, [logActivity]);

  const logQuizPassed = useCallback(async (skillId: string, score: number, skillName?: string) => {
    await logActivity('quiz_passed', skillId, { skillId, skillName, score });
  }, [logActivity]);

  const logCoachMessage = useCallback(async (conversationId: string) => {
    await logActivity('coach_message', conversationId, { conversationId });
  }, [logActivity]);

  return {
    activities,
    isLoading,
    error,
    refetch,

    // Actions
    logActivity,
    logContentViewed,
    logContentCompleted,
    logQuizAttempted,
    logQuizPassed,
    logCoachMessage,
  };
}

// Hook for weekly activity summary
export function useWeeklyActivity() {
  const { isAuthenticated } = useAuth();

  const {
    data: summary,
    isLoading,
    error,
    refetch,
  } = useAsyncData(
    () => activityService.getDailySummary(7),
    [isAuthenticated],
    { enabled: isAuthenticated, initialData: [] }
  );

  // Calculate totals
  const totals = summary?.reduce(
    (acc, day) => ({
      totalActivities: acc.totalActivities + day.activities,
      daysActive: day.activities > 0 ? acc.daysActive + 1 : acc.daysActive,
    }),
    { totalActivities: 0, daysActive: 0 }
  ) || { totalActivities: 0, daysActive: 0 };

  return {
    summary,
    isLoading,
    error,
    refetch,
    totals,
  };
}
