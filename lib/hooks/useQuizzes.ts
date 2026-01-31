'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { quizService, QuizSubmission } from '@/lib/services';
import { useAsyncData } from './useAsyncData';
import type { QuizAttempt } from '@/types/database';

export function useQuizzes() {
  const { isAuthenticated, user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  // Fetch all quiz attempts
  const {
    data: attempts,
    isLoading,
    error,
    refetch,
    mutate,
  } = useAsyncData<QuizAttempt[]>(
    () => quizService.getAll(),
    [isAuthenticated],
    { enabled: isAuthenticated, initialData: [] }
  );

  // Get attempts for a specific skill
  const getSkillAttempts = useCallback((skillId: string): QuizAttempt[] => {
    return attempts?.filter(a => a.skill_id === skillId) || [];
  }, [attempts]);

  // Get best attempt for a skill
  const getBestAttempt = useCallback((skillId: string): QuizAttempt | undefined => {
    const skillAttempts = getSkillAttempts(skillId);
    if (skillAttempts.length === 0) return undefined;
    return skillAttempts.reduce((best: QuizAttempt, current: QuizAttempt) =>
      current.percentage > best.percentage ? current : best
    );
  }, [getSkillAttempts]);

  // Check if skill quiz is passed
  const isQuizPassed = useCallback((skillId: string): boolean => {
    const best = getBestAttempt(skillId);
    return best?.passed || false;
  }, [getBestAttempt]);

  // Get best score for a skill
  const getBestScore = useCallback((skillId: string): number | undefined => {
    const best = getBestAttempt(skillId);
    return best?.percentage;
  }, [getBestAttempt]);

  // Submit a quiz
  const submitQuiz = useCallback(async (submission: QuizSubmission): Promise<QuizAttempt> => {
    if (!isAuthenticated || !user?.id) throw new Error('Not authenticated');

    setSubmitting(true);
    try {
      const attempt = await quizService.submit(submission, user.id);

      // Optimistically update local state
      mutate(prev => prev ? [attempt, ...prev] : [attempt]);

      return attempt;
    } finally {
      setSubmitting(false);
    }
  }, [isAuthenticated, user?.id, mutate]);

  // Calculate stats
  const stats = {
    totalAttempts: attempts?.length || 0,
    totalPassed: attempts?.filter(a => a.passed).length || 0,
    averageScore: attempts && attempts.length > 0
      ? Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length)
      : 0,
    uniqueSkillsPassed: [...new Set(attempts?.filter(a => a.passed).map(a => a.skill_id) || [])].length,
  };

  // Get weak areas (best score < 75%)
  const weakAreas = useCallback((): { skillId: string; bestScore: number }[] => {
    if (!attempts) return [];

    const skillScores = new Map<string, number>();
    for (const attempt of attempts) {
      const existing = skillScores.get(attempt.skill_id);
      if (!existing || attempt.percentage > existing) {
        skillScores.set(attempt.skill_id, attempt.percentage);
      }
    }

    const weak: { skillId: string; bestScore: number }[] = [];
    skillScores.forEach((score, skillId) => {
      if (score < 75) {
        weak.push({ skillId, bestScore: score });
      }
    });

    return weak.sort((a, b) => a.bestScore - b.bestScore);
  }, [attempts]);

  return {
    attempts,
    isLoading,
    error,
    refetch,
    submitting,

    // Getters
    getSkillAttempts,
    getBestAttempt,
    getBestScore,
    isQuizPassed,
    stats,
    weakAreas,

    // Actions
    submitQuiz,
  };
}

// Hook for single skill's quiz attempts
export function useSkillQuizzes(skillId: string) {
  const { isAuthenticated } = useAuth();

  const {
    data: attempts,
    isLoading,
    error,
    refetch,
  } = useAsyncData<QuizAttempt[]>(
    () => quizService.getBySkillId(skillId),
    [skillId, isAuthenticated],
    { enabled: isAuthenticated && !!skillId, initialData: [] }
  );

  const bestAttempt = attempts && attempts.length > 0
    ? attempts.reduce((best, current) => current.percentage > best.percentage ? current : best)
    : undefined;

  return {
    attempts,
    isLoading,
    error,
    refetch,
    bestAttempt,
    bestScore: bestAttempt?.percentage,
    isPassed: bestAttempt?.passed || false,
    attemptCount: attempts?.length || 0,
  };
}
