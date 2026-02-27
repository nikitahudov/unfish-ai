'use client';

import { useCallback } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { dataService } from '@/lib/services/dataService';
import { useProgress } from './useProgress';
import { useQuizzes } from './useQuizzes';
import { useStats } from './useStats';
import { useActivity } from './useActivity';
import type { QuizSubmission } from '@/lib/services';

/**
 * Unified hook that coordinates data operations across services
 * Use this when you need to perform operations that affect multiple data stores
 */
export function useData() {
  const { isAuthenticated, user } = useAuth();
  const progress = useProgress();
  const quizzes = useQuizzes();
  const stats = useStats();
  const activity = useActivity();

  // Extract stable refetch references — the full hook return objects are
  // recreated every render, but refetch (from useAsyncData's useCallback)
  // is stable.  Using the objects as deps caused every callback below to
  // get a new identity on every render, which cascaded into infinite
  // re-render loops via DataProvider's useEffect.
  const progressRefetch = progress.refetch;
  const quizzesRefetch = quizzes.refetch;
  const statsRefetch = stats.refetch;
  const activityRefetch = activity.refetch;

  // Record content view (coordinates progress, stats, activity)
  const recordContentView = useCallback(async (skillId: string, skillName?: string) => {
    if (!isAuthenticated || !user?.id) return;

    try {
      await dataService.recordContentView(skillId, skillName, user.id);

      // Refresh relevant data
      await Promise.all([
        progressRefetch(),
        statsRefetch(),
        activityRefetch(),
      ]);
    } catch (error) {
      console.error('Error recording content view:', error);
      throw error;
    }
  }, [isAuthenticated, user?.id, progressRefetch, statsRefetch, activityRefetch]);

  // Record content completion
  const recordContentCompletion = useCallback(async (skillId: string, skillName?: string) => {
    if (!isAuthenticated || !user?.id) return;

    try {
      await dataService.recordContentCompletion(skillId, skillName, user.id);

      await Promise.all([
        progressRefetch(),
        statsRefetch(),
        activityRefetch(),
      ]);
    } catch (error) {
      console.error('Error recording content completion:', error);
      throw error;
    }
  }, [isAuthenticated, user?.id, progressRefetch, statsRefetch, activityRefetch]);

  // Submit quiz (coordinates quiz, stats, activity)
  const submitQuiz = useCallback(async (submission: QuizSubmission, skillName?: string) => {
    if (!isAuthenticated || !user?.id) throw new Error('Not authenticated');

    try {
      const result = await dataService.submitQuiz(submission, skillName, user.id);

      await Promise.all([
        quizzesRefetch(),
        statsRefetch(),
        activityRefetch(),
      ]);

      return result;
    } catch (error) {
      console.error('Error submitting quiz:', error);
      throw error;
    }
  }, [isAuthenticated, user?.id, quizzesRefetch, statsRefetch, activityRefetch]);

  // Add study time
  const addStudyTime = useCallback(async (skillId: string, seconds: number) => {
    if (!isAuthenticated || !user?.id) return;

    try {
      await dataService.addStudyTime(skillId, seconds, user.id);

      await Promise.all([
        progressRefetch(),
        statsRefetch(),
      ]);
    } catch (error) {
      console.error('Error adding study time:', error);
      throw error;
    }
  }, [isAuthenticated, user?.id, progressRefetch, statsRefetch]);

  // Record login
  const recordLogin = useCallback(async () => {
    if (!isAuthenticated || !user?.id) return;

    try {
      await dataService.recordLogin(user.id);
      await statsRefetch();
    } catch (error) {
      // Don't throw - login recording shouldn't break the app
      console.error('Error recording login:', error);
    }
  }, [isAuthenticated, user?.id, statsRefetch]);

  // Refresh all data
  const refreshAll = useCallback(async () => {
    await Promise.all([
      progressRefetch(),
      quizzesRefetch(),
      statsRefetch(),
      activityRefetch(),
    ]);
  }, [progressRefetch, quizzesRefetch, statsRefetch, activityRefetch]);

  return {
    // Individual hook data
    progress,
    quizzes,
    stats,
    activity,

    // Combined loading state
    isLoading: progress.isLoading || quizzes.isLoading || stats.isLoading || activity.isLoading,

    // Coordinated actions
    recordContentView,
    recordContentCompletion,
    submitQuiz,
    addStudyTime,
    recordLogin,
    refreshAll,
  };
}
