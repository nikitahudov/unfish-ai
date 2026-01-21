// ============================================
// PROGRESS STORE
// Zustand store for managing user progress with localStorage persistence
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProgressState, QuizAttempt, SkillProgress, UserStats } from '@/types/progress';

// Default initial stats
const defaultStats: UserStats = {
  totalQuizzesTaken: 0,
  totalQuizzesPassed: 0,
  averageScore: 0,
  totalStudyTime: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastStudyDate: null,
};

// Default skill progress
const defaultSkillProgress: SkillProgress = {
  status: 'not_started',
  bestScore: 0,
  attempts: 0,
  lastAttempt: null,
  totalTimeSpent: 0,
};

// Helper function to calculate streak
const calculateStreak = (lastStudyDate: string | null, currentStreak: number, longestStreak: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!lastStudyDate) {
    // First study session
    return { currentStreak: 1, longestStreak: Math.max(1, longestStreak) };
  }

  const lastDate = new Date(lastStudyDate);
  lastDate.setHours(0, 0, 0, 0);

  const daysDiff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

  if (daysDiff === 0) {
    // Same day - keep current streak
    return { currentStreak, longestStreak };
  } else if (daysDiff === 1) {
    // Consecutive day - increment streak
    const newStreak = currentStreak + 1;
    return { currentStreak: newStreak, longestStreak: Math.max(newStreak, longestStreak) };
  } else {
    // Streak broken - reset to 1
    return { currentStreak: 1, longestStreak };
  }
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      quizAttempts: {},
      skills: {},
      stats: defaultStats,
      contentProgress: {},

      addQuizAttempt: (moduleId, results) => {
        const state = get();
        const now = new Date().toISOString();

        // Create new attempt
        const newAttempt: QuizAttempt = {
          attemptId: `${moduleId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          date: now,
          score: results.score,
          weightedScore: results.weightedScore,
          passed: results.passed,
          timeSpent: results.timeSpent,
          mode: results.mode,
          sectionScores: results.sectionScores,
        };

        // Add attempt to history
        const moduleAttempts = state.quizAttempts[moduleId] || [];
        const updatedAttempts = [...moduleAttempts, newAttempt];

        // Calculate skill progress
        const allScores = updatedAttempts.map(a => a.score);
        const bestScore = Math.max(...allScores);
        const hasPassed = updatedAttempts.some(a => a.passed);
        const totalTimeSpent = updatedAttempts.reduce((sum, a) => sum + a.timeSpent, 0);

        const status: SkillProgress['status'] =
          updatedAttempts.length === 0 ? 'not_started' :
          hasPassed ? 'completed' : 'in_progress';

        const updatedSkillProgress: SkillProgress = {
          status,
          bestScore,
          attempts: updatedAttempts.length,
          lastAttempt: now,
          totalTimeSpent,
        };

        // Update user stats
        const allAttempts = Object.values({
          ...state.quizAttempts,
          [moduleId]: updatedAttempts,
        }).flat();

        const totalQuizzesTaken = allAttempts.length;
        const totalQuizzesPassed = allAttempts.filter(a => a.passed).length;
        const averageScore = totalQuizzesTaken > 0
          ? Math.round(allAttempts.reduce((sum, a) => sum + a.score, 0) / totalQuizzesTaken)
          : 0;
        const totalStudyTime = allAttempts.reduce((sum, a) => sum + a.timeSpent, 0);

        // Calculate streak
        const { currentStreak, longestStreak } = calculateStreak(
          state.stats.lastStudyDate,
          state.stats.currentStreak,
          state.stats.longestStreak
        );

        const updatedStats: UserStats = {
          totalQuizzesTaken,
          totalQuizzesPassed,
          averageScore,
          totalStudyTime,
          currentStreak,
          longestStreak,
          lastStudyDate: now,
        };

        set({
          quizAttempts: {
            ...state.quizAttempts,
            [moduleId]: updatedAttempts,
          },
          skills: {
            ...state.skills,
            [moduleId]: updatedSkillProgress,
          },
          stats: updatedStats,
        });
      },

      getSkillStatus: (moduleId) => {
        const state = get();
        return state.skills[moduleId] || defaultSkillProgress;
      },

      resetProgress: () => {
        set({
          quizAttempts: {},
          skills: {},
          stats: defaultStats,
          contentProgress: {},
        });
      },

      // Content progress actions
      initContentProgress: (skillId, exercisesTotal, scenariosTotal) => {
        set((state) => {
          const existing = state.contentProgress[skillId];
          if (existing) {
            // Already exists, just update lastViewedAt
            return {
              contentProgress: {
                ...state.contentProgress,
                [skillId]: {
                  ...existing,
                  lastViewedAt: new Date().toISOString(),
                }
              }
            };
          }
          // Create new entry
          return {
            contentProgress: {
              ...state.contentProgress,
              [skillId]: {
                viewed: true,
                firstViewedAt: new Date().toISOString(),
                lastViewedAt: new Date().toISOString(),
                timeSpentSeconds: 0,
                exercisesCompleted: 0,
                exercisesTotal,
                flashcardsReviewed: false,
                scenariosCompleted: 0,
                scenariosTotal,
              }
            }
          };
        });
      },

      updateTimeSpent: (skillId, additionalSeconds) => {
        set((state) => {
          const existing = state.contentProgress[skillId];
          if (!existing) return state;
          return {
            contentProgress: {
              ...state.contentProgress,
              [skillId]: {
                ...existing,
                timeSpentSeconds: existing.timeSpentSeconds + additionalSeconds,
                lastViewedAt: new Date().toISOString(),
              }
            }
          };
        });
      },

      recordExerciseComplete: (skillId) => {
        set((state) => {
          const existing = state.contentProgress[skillId];
          if (!existing) return state;
          return {
            contentProgress: {
              ...state.contentProgress,
              [skillId]: {
                ...existing,
                exercisesCompleted: Math.min(existing.exercisesCompleted + 1, existing.exercisesTotal),
              }
            }
          };
        });
      },

      recordScenarioComplete: (skillId) => {
        set((state) => {
          const existing = state.contentProgress[skillId];
          if (!existing) return state;
          return {
            contentProgress: {
              ...state.contentProgress,
              [skillId]: {
                ...existing,
                scenariosCompleted: Math.min(existing.scenariosCompleted + 1, existing.scenariosTotal),
              }
            }
          };
        });
      },

      markFlashcardsReviewed: (skillId) => {
        set((state) => {
          const existing = state.contentProgress[skillId];
          if (!existing) return state;
          return {
            contentProgress: {
              ...state.contentProgress,
              [skillId]: {
                ...existing,
                flashcardsReviewed: true,
              }
            }
          };
        });
      },

      getContentProgress: (skillId) => {
        return get().contentProgress[skillId] || null;
      },

      getContentStatus: (skillId) => {
        const progress = get().contentProgress[skillId];
        if (!progress) return 'not_started';
        if (progress.exercisesCompleted >= progress.exercisesTotal &&
            progress.scenariosCompleted >= progress.scenariosTotal) {
          return 'completed';
        }
        return 'in_progress';
      },
    }),
    {
      name: '24p-academy-progress',
    }
  )
);
