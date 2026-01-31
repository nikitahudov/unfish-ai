import { createClient } from '@/lib/supabase/client';
import type { UserStats } from '@/types/database';

export const statsService = {
  /**
   * Get current user's stats.
   * userId can be provided to avoid calling getSession().
   */
  async get(userId?: string): Promise<UserStats | null> {
    const supabase = createClient();

    let uid = userId;
    if (!uid) {
      const { data: { session } } = await supabase.auth.getSession();
      uid = session?.user?.id;
    }
    if (!uid) return null;

    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', uid)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user stats:', error);
      throw error;
    }

    return data;
  },

  /**
   * Update user stats
   */
  async update(updates: Partial<UserStats>, userId?: string): Promise<UserStats> {
    const supabase = createClient();

    let uid = userId;
    if (!uid) {
      const { data: { session } } = await supabase.auth.getSession();
      uid = session?.user?.id;
    }
    if (!uid) throw new Error('Not authenticated');

    const updatePayload = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('user_stats')
      .update(updatePayload)
      .eq('user_id', uid)
      .select()
      .single();

    if (error) {
      console.error('[statsService.update] Error:', error.message, error.details, error.hint);
      throw error;
    }

    return data;
  },

  /**
   * Increment a numeric stat
   */
  async increment(
    field: keyof Pick<UserStats,
      'total_study_time_seconds' | 'skills_viewed' | 'skills_completed' |
      'quizzes_attempted' | 'quizzes_passed' | 'coach_conversations_count' | 'coach_messages_sent'
    >,
    amount: number = 1,
    userId?: string
  ): Promise<UserStats> {
    const current = await this.get(userId);
    if (!current) throw new Error('Stats not found');

    const newValue = (current[field] as number) + amount;

    return this.update({ [field]: newValue }, userId);
  },

  /**
   * Update streak based on activity
   */
  async updateStreak(userId?: string): Promise<UserStats> {
    const current = await this.get(userId);
    if (!current) throw new Error('Stats not found');

    const today = new Date().toISOString().split('T')[0];
    const lastActivity = current.last_activity_date;

    let newStreak = current.current_streak;

    if (!lastActivity) {
      // First activity ever
      newStreak = 1;
    } else if (lastActivity === today) {
      // Already active today, no change
      return current;
    } else {
      // Check if yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastActivity === yesterdayStr) {
        // Consecutive day - increment streak
        newStreak = current.current_streak + 1;
      } else {
        // Streak broken - reset to 1
        newStreak = 1;
      }
    }

    const longestStreak = Math.max(newStreak, current.longest_streak);

    return this.update({
      current_streak: newStreak,
      longest_streak: longestStreak,
      last_activity_date: today,
    }, userId);
  },

  /**
   * Update average quiz score
   */
  async updateAverageScore(newScore: number, userId?: string): Promise<UserStats> {
    const current = await this.get(userId);
    if (!current) throw new Error('Stats not found');

    const totalAttempts = current.quizzes_attempted;
    const currentAverage = current.average_quiz_score;

    // Calculate new running average
    const newAverage = totalAttempts > 0
      ? ((currentAverage * (totalAttempts - 1)) + newScore) / totalAttempts
      : newScore;

    return this.update({
      average_quiz_score: Math.round(newAverage * 100) / 100,
    }, userId);
  },

  /**
   * Record a quiz completion (updates multiple stats)
   */
  async recordQuizCompletion(score: number, passed: boolean, userId?: string): Promise<UserStats> {
    // Get current stats
    const current = await this.get(userId);
    if (!current) throw new Error('Stats not found');

    const newAttempts = current.quizzes_attempted + 1;
    const newPassed = passed ? current.quizzes_passed + 1 : current.quizzes_passed;

    // Calculate new average
    const newAverage = ((current.average_quiz_score * current.quizzes_attempted) + score) / newAttempts;

    return this.update({
      quizzes_attempted: newAttempts,
      quizzes_passed: newPassed,
      average_quiz_score: Math.round(newAverage * 100) / 100,
    }, userId);
  },

  /**
   * Get a summary of user progress
   */
  async getSummary(userId?: string): Promise<{
    stats: UserStats | null;
    level: 'beginner' | 'intermediate' | 'advanced';
    progressPercentage: number;
  }> {
    const stats = await this.get(userId);

    if (!stats) {
      return {
        stats: null,
        level: 'beginner',
        progressPercentage: 0,
      };
    }

    // Determine level based on skills completed
    let level: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
    if (stats.skills_completed >= 23) level = 'intermediate'; // Fundamentals complete
    if (stats.skills_completed >= 66) level = 'advanced'; // Fundamentals + Intermediate

    // Calculate overall progress (out of 96 skills)
    const progressPercentage = Math.round((stats.skills_completed / 96) * 100);

    return {
      stats,
      level,
      progressPercentage,
    };
  },
};
