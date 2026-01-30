import { createClient } from '@/lib/supabase/client';
import type { ActivityLog } from '@/types/database';

export type ActivityType =
  | 'content_viewed'
  | 'content_completed'
  | 'quiz_attempted'
  | 'quiz_passed'
  | 'coach_message'
  | 'login';

export interface ActivityMetadata {
  skillId?: string;
  skillName?: string;
  score?: number;
  quizId?: string;
  conversationId?: string;
  [key: string]: unknown;
}

export const activityService = {
  /**
   * Log an activity
   */
  async log(
    type: ActivityType,
    referenceId?: string,
    metadata?: ActivityMetadata
  ): Promise<ActivityLog> {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('activity_log')
      .insert({
        user_id: user.id,
        activity_type: type,
        reference_id: referenceId,
        metadata: metadata || {},
      })
      .select()
      .single();

    if (error) {
      console.error('Error logging activity:', error);
      throw error;
    }

    return data;
  },

  /**
   * Get recent activity
   */
  async getRecent(limit: number = 20): Promise<ActivityLog[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('activity_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent activity:', error);
      throw error;
    }

    return data || [];
  },

  /**
   * Get activity by type
   */
  async getByType(type: ActivityType, limit: number = 20): Promise<ActivityLog[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('activity_log')
      .select('*')
      .eq('activity_type', type)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching activity by type:', error);
      throw error;
    }

    return data || [];
  },

  /**
   * Get activity for a specific date range
   */
  async getByDateRange(startDate: Date, endDate: Date): Promise<ActivityLog[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('activity_log')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching activity by date range:', error);
      throw error;
    }

    return data || [];
  },

  /**
   * Get today's activity
   */
  async getToday(): Promise<ActivityLog[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.getByDateRange(today, tomorrow);
  },

  /**
   * Check if user was active today
   */
  async wasActiveToday(): Promise<boolean> {
    const today = await this.getToday();
    return today.length > 0;
  },

  /**
   * Get activity summary for the past N days
   */
  async getDailySummary(days: number = 7): Promise<{
    date: string;
    activities: number;
    types: Record<ActivityType, number>;
  }[]> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const activities = await this.getByDateRange(startDate, endDate);

    // Group by date
    const summary = new Map<string, { activities: number; types: Record<string, number> }>();

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      summary.set(dateStr, { activities: 0, types: {} });
    }

    for (const activity of activities) {
      const dateStr = activity.created_at.split('T')[0];
      const day = summary.get(dateStr);

      if (day) {
        day.activities++;
        day.types[activity.activity_type] = (day.types[activity.activity_type] || 0) + 1;
      }
    }

    return Array.from(summary.entries())
      .map(([date, data]) => ({
        date,
        activities: data.activities,
        types: data.types as Record<ActivityType, number>,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  },

  // Convenience methods for common activities

  async logContentViewed(skillId: string, skillName?: string): Promise<ActivityLog> {
    return this.log('content_viewed', skillId, { skillId, skillName });
  },

  async logContentCompleted(skillId: string, skillName?: string): Promise<ActivityLog> {
    return this.log('content_completed', skillId, { skillId, skillName });
  },

  async logQuizAttempted(skillId: string, score: number, skillName?: string): Promise<ActivityLog> {
    return this.log('quiz_attempted', skillId, { skillId, skillName, score });
  },

  async logQuizPassed(skillId: string, score: number, skillName?: string): Promise<ActivityLog> {
    return this.log('quiz_passed', skillId, { skillId, skillName, score });
  },

  async logCoachMessage(conversationId: string): Promise<ActivityLog> {
    return this.log('coach_message', conversationId, { conversationId });
  },

  async logLogin(): Promise<ActivityLog> {
    return this.log('login');
  },
};
