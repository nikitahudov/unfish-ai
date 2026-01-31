'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { dataService } from '@/lib/services/dataService';
import { useAsyncData } from './useAsyncData';
import type { UserPreferences } from '@/types/database';

export function useDashboard() {
  const { isAuthenticated } = useAuth();

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useAsyncData(
    () => dataService.getDashboardData(),
    [isAuthenticated],
    { enabled: isAuthenticated }
  );

  return {
    stats: data?.stats,
    recentActivity: data?.recentActivity || [],
    weeklyActivity: data?.weeklyActivity || [],
    weakAreas: data?.weakAreas || [],
    skillStatus: data?.skillStatus || { completed: [], inProgress: [], notStarted: [] },
    isLoading,
    error,
    refetch,
  };
}

// Hook for coach context data
export function useCoachContext() {
  const { isAuthenticated, user } = useAuth();

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useAsyncData(
    () => dataService.getCoachContext(),
    [isAuthenticated],
    { enabled: isAuthenticated }
  );

  // Get preferences from user profile
  const userPrefs = (user?.profile?.preferences as UserPreferences) || {};

  return {
    completedSkills: data?.completedSkills || [],
    inProgressSkills: data?.inProgressSkills || [],
    weakAreas: data?.weakAreas || [],
    strongAreas: data?.strongAreas || [],
    stats: data?.stats,
    recentActivity: data?.recentActivity || [],
    preferences: {
      personality: userPrefs.coachPersonality || 'balanced',
      quizDifficulty: userPrefs.quizDifficulty || 'adaptive',
    },
    isLoading,
    error,
    refetch,
  };
}
