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
   * Create or update progress for a skill
   */
  async upsert(skillId: string, updates: ProgressUpdate): Promise<SkillProgress> {
    console.log('[progressService.upsert] ENTER', skillId, JSON.stringify(updates));
    const supabase = createClient();
    console.log('[progressService.upsert] client created');

    // Get current user from session (getSession reads from memory, no lock contention)
    const { data: { session } } = await supabase.auth.getSession();
    console.log('[progressService.upsert] getSession returned');
    const user = session?.user;

    console.log('[progressService.upsert] User:', user?.id);

    if (!user) throw new Error('Not authenticated');

    // Check if record exists
    const existing = await this.getBySkillId(skillId);
    console.log('[progressService.upsert] Existing record for', skillId, ':', existing?.id || 'none');

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

      console.log('[progressService.upsert] Updating:', JSON.stringify(updateData));

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

      console.log('[progressService.upsert] Updated successfully:', data?.id);
      return data;
    } else {
      // Create new record
      const insertData = {
        user_id: user.id,
        skill_id: skillId,
        ...updates,
        first_viewed_at: now,
        last_viewed_at: now,
      };

      console.log('[progressService.upsert] Inserting:', JSON.stringify(insertData));

      const { data, error } = await supabase
        .from('skill_progress')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error('[progressService.upsert] Insert error:', error.message, error.details, error.hint);
        throw error;
      }

      console.log('[progressService.upsert] Inserted successfully:', data?.id);
      return data;
    }
  },

  /**
   * Mark content as viewed
   */
  async markViewed(skillId: string): Promise<SkillProgress> {
    console.log('[progressService.markViewed] ENTER', skillId);
    const result = await this.upsert(skillId, { content_viewed: true });
    console.log('[progressService.markViewed] EXIT', result?.id);
    return result;
  },

  /**
   * Mark content as completed
   */
  async markCompleted(skillId: string): Promise<SkillProgress> {
    console.log('[progressService.markCompleted] ENTER', skillId);
    const result = await this.upsert(skillId, {
      content_viewed: true,
      content_completed: true,
    });
    console.log('[progressService.markCompleted] EXIT', result?.id);
    return result;
  },

  /**
   * Add time spent on a skill
   */
  async addTimeSpent(skillId: string, seconds: number): Promise<SkillProgress> {
    return this.upsert(skillId, { time_spent_seconds: seconds });
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
