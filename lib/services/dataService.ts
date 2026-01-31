import { progressService } from './progressService';
import { quizService, QuizSubmission } from './quizService';
import { statsService } from './statsService';
import { activityService } from './activityService';

/**
 * Unified data service that coordinates between different services
 * and handles complex operations that span multiple tables.
 *
 * Write methods accept an optional userId parameter to avoid calling
 * supabase.auth.getSession() which can deadlock in React hook contexts.
 */
export const dataService = {
  /**
   * Record viewing content (updates progress, stats, and activity)
   */
  async recordContentView(skillId: string, skillName?: string, userId?: string): Promise<void> {
    try {
      await progressService.markViewed(skillId, userId);
      await statsService.increment('skills_viewed', 1, userId);
      await statsService.updateStreak(userId);
      await activityService.logContentViewed(skillId, skillName, userId);
    } catch (error) {
      console.error('Error recording content view:', error);
      throw error;
    }
  },

  /**
   * Record completing content (updates progress, stats, and activity)
   */
  async recordContentCompletion(skillId: string, skillName?: string, userId?: string): Promise<void> {
    try {
      await progressService.markCompleted(skillId, userId);
      await statsService.increment('skills_completed', 1, userId);
      await statsService.updateStreak(userId);
      await activityService.logContentCompleted(skillId, skillName, userId);
    } catch (error) {
      console.error('Error recording content completion:', error);
      throw error;
    }
  },

  /**
   * Submit a quiz (updates quiz attempts, progress, stats, and activity)
   */
  async submitQuiz(submission: QuizSubmission, skillName?: string, userId?: string): Promise<{
    attempt: Awaited<ReturnType<typeof quizService.submit>>;
    passed: boolean;
  }> {
    try {
      const attempt = await quizService.submit(submission, userId);
      await statsService.recordQuizCompletion(attempt.percentage, attempt.passed, userId);
      await statsService.updateStreak(userId);

      if (attempt.passed) {
        await activityService.logQuizPassed(submission.skillId, attempt.percentage, skillName, userId);
      } else {
        await activityService.logQuizAttempted(submission.skillId, attempt.percentage, skillName, userId);
      }

      return { attempt, passed: attempt.passed };
    } catch (error) {
      console.error('Error submitting quiz:', error);
      throw error;
    }
  },

  /**
   * Add study time (updates progress and stats)
   */
  async addStudyTime(skillId: string, seconds: number, userId?: string): Promise<void> {
    try {
      await progressService.addTimeSpent(skillId, seconds, userId);
      await statsService.increment('total_study_time_seconds', seconds, userId);
    } catch (error) {
      console.error('Error adding study time:', error);
      throw error;
    }
  },

  /**
   * Get comprehensive dashboard data
   */
  async getDashboardData(): Promise<{
    stats: Awaited<ReturnType<typeof statsService.getSummary>>;
    recentActivity: Awaited<ReturnType<typeof activityService.getRecent>>;
    weeklyActivity: Awaited<ReturnType<typeof activityService.getDailySummary>>;
    weakAreas: Awaited<ReturnType<typeof quizService.getWeakAreas>>;
    skillStatus: Awaited<ReturnType<typeof progressService.getSkillsByStatus>>;
  }> {
    const [stats, recentActivity, weeklyActivity, weakAreas, skillStatus] = await Promise.all([
      statsService.getSummary(),
      activityService.getRecent(10),
      activityService.getDailySummary(7),
      quizService.getWeakAreas(),
      progressService.getSkillsByStatus(),
    ]);

    return {
      stats,
      recentActivity,
      weeklyActivity,
      weakAreas,
      skillStatus,
    };
  },

  /**
   * Get data needed for AI coach context
   */
  async getCoachContext(): Promise<{
    completedSkills: string[];
    inProgressSkills: string[];
    weakAreas: { skillId: string; score: number }[];
    strongAreas: { skillId: string; score: number }[];
    stats: Awaited<ReturnType<typeof statsService.get>>;
    recentActivity: Awaited<ReturnType<typeof activityService.getRecent>>;
  }> {
    const [skillStatus, quizAttempts, stats, recentActivity] = await Promise.all([
      progressService.getSkillsByStatus(),
      quizService.getAll(),
      statsService.get(),
      activityService.getRecent(10),
    ]);

    // Calculate weak and strong areas from quiz attempts
    const skillScores = new Map<string, number>();
    for (const attempt of quizAttempts) {
      const existing = skillScores.get(attempt.skill_id);
      if (!existing || attempt.percentage > existing) {
        skillScores.set(attempt.skill_id, attempt.percentage);
      }
    }

    const weakAreas: { skillId: string; score: number }[] = [];
    const strongAreas: { skillId: string; score: number }[] = [];

    skillScores.forEach((score, skillId) => {
      if (score < 75) {
        weakAreas.push({ skillId, score });
      } else if (score >= 85) {
        strongAreas.push({ skillId, score });
      }
    });

    // Sort weak areas by score ascending, strong areas by score descending
    weakAreas.sort((a, b) => a.score - b.score);
    strongAreas.sort((a, b) => b.score - a.score);

    return {
      completedSkills: skillStatus.completed,
      inProgressSkills: skillStatus.inProgress,
      weakAreas,
      strongAreas,
      stats,
      recentActivity,
    };
  },

  /**
   * Record login (updates streak and logs activity)
   */
  async recordLogin(userId?: string): Promise<void> {
    try {
      await statsService.updateStreak(userId);
      await activityService.logLogin(userId);
    } catch (error) {
      console.error('Error recording login:', error);
      // Don't throw - login recording shouldn't break the app
    }
  },
};
