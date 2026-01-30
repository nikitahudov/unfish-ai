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
  const { isAuthenticated } = useAuth();
  const progress = useProgress();
  const quizzes = useQuizzes();
  const stats = useStats();
  const activity = useActivity();

  // Record content view (coordinates progress, stats, activity)
  const recordContentView = useCallback(async (skillId: string, skillName?: string) => {
    if (!isAuthenticated) return;

    try {
      await dataService.recordContentView(skillId, skillName);

      // Refresh relevant data
      await Promise.all([
        progress.refetch(),
        stats.refetch(),
        activity.refetch(),
      ]);
    } catch (error) {
      console.error('Error recording content view:', error);
      throw error;
    }
  }, [isAuthenticated, progress, stats, activity]);

  // Record content completion
  const recordContentCompletion = useCallback(async (skillId: string, skillName?: string) => {
    if (!isAuthenticated) return;

    try {
      await dataService.recordContentCompletion(skillId, skillName);

      await Promise.all([
        progress.refetch(),
        stats.refetch(),
        activity.refetch(),
      ]);
    } catch (error) {
      console.error('Error recording content completion:', error);
      throw error;
    }
  }, [isAuthenticated, progress, stats, activity]);

  // Submit quiz (coordinates quiz, stats, activity)
  const submitQuiz = useCallback(async (submission: QuizSubmission, skillName?: string) => {
    if (!isAuthenticated) throw new Error('Not authenticated');

    try {
      const result = await dataService.submitQuiz(submission, skillName);

      await Promise.all([
        quizzes.refetch(),
        stats.refetch(),
        activity.refetch(),
      ]);

      return result;
    } catch (error) {
      console.error('Error submitting quiz:', error);
      throw error;
    }
  }, [isAuthenticated, quizzes, stats, activity]);

  // Add study time
  const addStudyTime = useCallback(async (skillId: string, seconds: number) => {
    if (!isAuthenticated) return;

    try {
      await dataService.addStudyTime(skillId, seconds);

      await Promise.all([
        progress.refetch(),
        stats.refetch(),
      ]);
    } catch (error) {
      console.error('Error adding study time:', error);
      throw error;
    }
  }, [isAuthenticated, progress, stats]);

  // Record login
  const recordLogin = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      await dataService.recordLogin();
      await stats.refetch();
    } catch (error) {
      // Don't throw - login recording shouldn't break the app
      console.error('Error recording login:', error);
    }
  }, [isAuthenticated, stats]);

  // Refresh all data
  const refreshAll = useCallback(async () => {
    await Promise.all([
      progress.refetch(),
      quizzes.refetch(),
      stats.refetch(),
      activity.refetch(),
    ]);
  }, [progress, quizzes, stats, activity]);

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
