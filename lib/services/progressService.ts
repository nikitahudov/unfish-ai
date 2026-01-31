import { createClient } from '@/lib/supabase/client';
import type { SkillProgress } from '@/types/database';

export interface ProgressUpdate {
  content_viewed?: boolean;
  content_completed?: boolean;
  exercises_completed?: number;
  exercises_total?: number;
  scenarios_completed?: number;
  scenarios_total?: number;
  flashcards_reviewed?: boolean;
  time_spent_seconds?: number;
}

export const progressService = {
  /**
   * Get all progress records for the current user
   */
  async getAll(): Promise<SkillProgress[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('skill_progress')
      .select('*')
      .order('last_viewed_at', { ascending: false });

    if (error) {
      console.error('Error fetching progress:', error);
      throw error;
    }

    return data || [];
  },

  /**
   * Get progress for a specific skill
   */
  async getBySkillId(skillId: string): Promise<SkillProgress | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('skill_progress')
      .select('*')
      .eq('skill_id', skillId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
      console.error('Error fetching skill progress:', error);
      throw error;
    }

    return data;
  },

  /**
   * Create or update progress for a skill.
   * userId is required for inserts. If omitted, falls back to getSession().
   */
  async upsert(skillId: string, updates: ProgressUpdate, userId?: string): Promise<SkillProgress> {
    const supabase = createClient();

    // Use provided userId or fall back to session lookup
    let uid = userId;
    if (!uid) {
      const { data: { session } } = await supabase.auth.getSession();
      uid = session?.user?.id;
    }
    if (!uid) throw new Error('Not authenticated');

    // Check if record exists
    const existing = await this.getBySkillId(skillId);

    const now = new Date().toISOString();

    if (existing) {
      // Update existing record
      const updateData: Record<string, unknown> = {
        ...updates,
        last_viewed_at: now,
        updated_at: now,
      };

      // If completing content, set completed_at
      if (updates.content_completed && !existing.completed_at) {
        updateData.completed_at = now;
      }

      // Accumulate time spent
      if (updates.time_spent_seconds) {
        updateData.time_spent_seconds = existing.time_spent_seconds + updates.time_spent_seconds;
      }

      const { data, error } = await supabase
        .from('skill_progress')
        .update(updateData)
        .eq('id', existing.id)
        .select()
        .single();

      if (error) {
        console.error('[progressService.upsert] Update error:', error.message, error.details, error.hint);
        throw error;
      }

      return data;
    } else {
      // Create new record
      const insertData = {
        user_id: uid,
        skill_id: skillId,
        ...updates,
        first_viewed_at: now,
        last_viewed_at: now,
      };

      const { data, error } = await supabase
        .from('skill_progress')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error('[progressService.upsert] Insert error:', error.message, error.details, error.hint);
        throw error;
      }

      return data;
    }
  },

  /**
   * Mark content as viewed
   */
  async markViewed(skillId: string, userId?: string): Promise<SkillProgress> {
    return this.upsert(skillId, { content_viewed: true }, userId);
  },

  /**
   * Mark content as completed
   */
  async markCompleted(skillId: string, userId?: string): Promise<SkillProgress> {
    return this.upsert(skillId, {
      content_viewed: true,
      content_completed: true,
    }, userId);
  },

  /**
   * Add time spent on a skill
   */
  async addTimeSpent(skillId: string, seconds: number, userId?: string): Promise<SkillProgress> {
    return this.upsert(skillId, { time_spent_seconds: seconds }, userId);
  },

  /**
   * Get completion statistics
   */
  async getCompletionStats(): Promise<{
    totalSkills: number;
    viewedSkills: number;
    completedSkills: number;
    totalTimeSeconds: number;
  }> {
    const progress = await this.getAll();

    return {
      totalSkills: 96, // Total skills in curriculum
      viewedSkills: progress.filter(p => p.content_viewed).length,
      completedSkills: progress.filter(p => p.content_completed).length,
      totalTimeSeconds: progress.reduce((sum, p) => sum + (p.time_spent_seconds || 0), 0),
    };
  },

  /**
   * Get skills by status
   */
  async getSkillsByStatus(): Promise<{
    completed: string[];
    inProgress: string[];
    notStarted: string[];
  }> {
    const progress = await this.getAll();

    const completed = progress
      .filter(p => p.content_completed)
      .map(p => p.skill_id);

    const inProgress = progress
      .filter(p => p.content_viewed && !p.content_completed)
      .map(p => p.skill_id);

    return {
      completed,
      inProgress,
      notStarted: [], // Would need full skill list to calculate
    };
  },
};
