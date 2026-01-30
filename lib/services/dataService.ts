import { progressService } from './progressService';
import { quizService, QuizSubmission } from './quizService';
import { statsService } from './statsService';
import { activityService } from './activityService';

/**
 * Unified data service that coordinates between different services
 * and handles complex operations that span multiple tables
 */
export const dataService = {
  /**
   * Record viewing content (updates progress, stats, and activity)
   */
  async recordContentView(skillId: string, skillName?: string): Promise<void> {
    try {
      // Update progress
      await progressService.markViewed(skillId);

      // Update stats
      await statsService.increment('skills_viewed');
      await statsService.updateStreak();

      // Log activity
      await activityService.logContentViewed(skillId, skillName);
    } catch (error) {
      console.error('Error recording content view:', error);
      throw error;
    }
  },

  /**
   * Record completing content (updates progress, stats, and activity)
   */
  async recordContentCompletion(skillId: string, skillName?: string): Promise<void> {
    try {
      // Update progress
      await progressService.markCompleted(skillId);

      // Update stats
      await statsService.increment('skills_completed');
      await statsService.updateStreak();

      // Log activity
      await activityService.logContentCompleted(skillId, skillName);
    } catch (error) {
      console.error('Error recording content completion:', error);
      throw error;
    }
  },

  /**
   * Submit a quiz (updates quiz attempts, progress, stats, and activity)
   */
  async submitQuiz(submission: QuizSubmission, skillName?: string): Promise<{
    attempt: Awaited<ReturnType<typeof quizService.submit>>;
    passed: boolean;
  }> {
    try {
      // Submit quiz
      const attempt = await quizService.submit(submission);

      // Update stats
      await statsService.recordQuizCompletion(attempt.percentage, attempt.passed);
      await statsService.updateStreak();

      // Log activity
      if (attempt.passed) {
        await activityService.logQuizPassed(submission.skillId, attempt.percentage, skillName);
      } else {
        await activityService.logQuizAttempted(submission.skillId, attempt.percentage, skillName);
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
  async addStudyTime(skillId: string, seconds: number): Promise<void> {
    try {
      await progressService.addTimeSpent(skillId, seconds);
      await statsService.increment('total_study_time_seconds', seconds);
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
  async recordLogin(): Promise<void> {
    try {
      await statsService.updateStreak();
      await activityService.logLogin();
    } catch (error) {
      console.error('Error recording login:', error);
      // Don't throw - login recording shouldn't break the app
    }
  },
};
