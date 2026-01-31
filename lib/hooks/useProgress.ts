'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { progressService, ProgressUpdate } from '@/lib/services';
import { useAsyncData } from './useAsyncData';
import type { SkillProgress } from '@/types/database';

export function useProgress() {
  const { isAuthenticated, user } = useAuth();
  const [updating, setUpdating] = useState<string | null>(null);

  // Fetch all progress
  const {
    data: progress,
    isLoading,
    error,
    refetch,
    mutate,
  } = useAsyncData<SkillProgress[]>(
    () => progressService.getAll(),
    [isAuthenticated],
    { enabled: isAuthenticated, initialData: [] }
  );

  // Get progress for a specific skill
  const getSkillProgress = useCallback((skillId: string): SkillProgress | undefined => {
    return progress?.find(p => p.skill_id === skillId);
  }, [progress]);

  // Check if skill is completed
  const isSkillCompleted = useCallback((skillId: string): boolean => {
    return progress?.some(p => p.skill_id === skillId && p.content_completed) || false;
  }, [progress]);

  // Check if skill is viewed
  const isSkillViewed = useCallback((skillId: string): boolean => {
    return progress?.some(p => p.skill_id === skillId && p.content_viewed) || false;
  }, [progress]);

  // Mark skill as viewed
  const markViewed = useCallback(async (skillId: string): Promise<void> => {
    if (!isAuthenticated || !user?.id) return;

    setUpdating(skillId);
    try {
      const updated = await progressService.markViewed(skillId, user.id);

      // Optimistically update local state
      mutate(prev => {
        if (!prev) return [updated];
        const existing = prev.findIndex(p => p.skill_id === skillId);
        if (existing >= 0) {
          const newProgress = [...prev];
          newProgress[existing] = updated;
          return newProgress;
        }
        return [...prev, updated];
      });
    } finally {
      setUpdating(null);
    }
  }, [isAuthenticated, user?.id, mutate]);

  // Mark skill as completed
  const markCompleted = useCallback(async (skillId: string): Promise<void> => {
    if (!isAuthenticated || !user?.id) return;

    setUpdating(skillId);
    try {
      const updated = await progressService.markCompleted(skillId, user.id);

      mutate(prev => {
        if (!prev) return [updated];
        const existing = prev.findIndex(p => p.skill_id === skillId);
        if (existing >= 0) {
          const newProgress = [...prev];
          newProgress[existing] = updated;
          return newProgress;
        }
        return [...prev, updated];
      });
    } finally {
      setUpdating(null);
    }
  }, [isAuthenticated, user?.id, mutate]);

  // Update progress
  const updateProgress = useCallback(async (
    skillId: string,
    updates: ProgressUpdate
  ): Promise<void> => {
    if (!isAuthenticated || !user?.id) return;

    setUpdating(skillId);
    try {
      const updated = await progressService.upsert(skillId, updates, user.id);

      mutate(prev => {
        if (!prev) return [updated];
        const existing = prev.findIndex(p => p.skill_id === skillId);
        if (existing >= 0) {
          const newProgress = [...prev];
          newProgress[existing] = updated;
          return newProgress;
        }
        return [...prev, updated];
      });
    } finally {
      setUpdating(null);
    }
  }, [isAuthenticated, user?.id, mutate]);

  // Get completion stats
  const stats = {
    totalSkills: 96,
    viewedSkills: progress?.filter(p => p.content_viewed).length || 0,
    completedSkills: progress?.filter(p => p.content_completed).length || 0,
    totalTimeSeconds: progress?.reduce((sum, p) => sum + (p.time_spent_seconds || 0), 0) || 0,
  };

  // Get skills by status
  const skillsByStatus = {
    completed: progress?.filter(p => p.content_completed).map(p => p.skill_id) || [],
    inProgress: progress?.filter(p => p.content_viewed && !p.content_completed).map(p => p.skill_id) || [],
  };

  return {
    progress,
    isLoading,
    error,
    refetch,
    updating,

    // Getters
    getSkillProgress,
    isSkillCompleted,
    isSkillViewed,
    stats,
    skillsByStatus,

    // Actions
    markViewed,
    markCompleted,
    updateProgress,
  };
}

// Hook for single skill progress
export function useSkillProgress(skillId: string) {
  const { isAuthenticated } = useAuth();

  const {
    data: progress,
    isLoading,
    error,
    refetch,
  } = useAsyncData<SkillProgress | null>(
    () => progressService.getBySkillId(skillId),
    [skillId, isAuthenticated],
    { enabled: isAuthenticated && !!skillId }
  );

  return {
    progress,
    isLoading,
    error,
    refetch,
    isViewed: progress?.content_viewed || false,
    isCompleted: progress?.content_completed || false,
    timeSpent: progress?.time_spent_seconds || 0,
  };
}
