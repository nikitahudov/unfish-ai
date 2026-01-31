import { createClient } from '@/lib/supabase/client';
import type { QuizAttempt } from '@/types/database';

export interface QuizSubmission {
  skillId: string;
  score: number;
  maxScore: number;
  answers: {
    questionId: string;
    selectedAnswer: string;
    isCorrect: boolean;
  }[];
  timeTakenSeconds?: number;
}

export const quizService = {
  /**
   * Get all quiz attempts for the current user
   */
  async getAll(): Promise<QuizAttempt[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .order('attempted_at', { ascending: false });

    if (error) {
      console.error('Error fetching quiz attempts:', error);
      throw error;
    }

    return data || [];
  },

  /**
   * Get all attempts for a specific skill
   */
  async getBySkillId(skillId: string): Promise<QuizAttempt[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('skill_id', skillId)
      .order('attempted_at', { ascending: false });

    if (error) {
      console.error('Error fetching skill quiz attempts:', error);
      throw error;
    }

    return data || [];
  },

  /**
   * Get the best attempt for a skill
   */
  async getBestAttempt(skillId: string): Promise<QuizAttempt | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('skill_id', skillId)
      .order('percentage', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching best attempt:', error);
      throw error;
    }

    return data;
  },

  /**
   * Get the most recent attempt for a skill
   */
  async getLatestAttempt(skillId: string): Promise<QuizAttempt | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('skill_id', skillId)
      .order('attempted_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching latest attempt:', error);
      throw error;
    }

    return data;
  },

  /**
   * Submit a quiz attempt
   */
  async submit(submission: QuizSubmission, userId?: string): Promise<QuizAttempt> {
    const supabase = createClient();

    // Use provided userId or fall back to session lookup
    let uid = userId;
    if (!uid) {
      const { data: { session } } = await supabase.auth.getSession();
      uid = session?.user?.id;
    }
    if (!uid) throw new Error('Not authenticated');

    const percentage = Math.round((submission.score / submission.maxScore) * 100);
    const passed = percentage >= 70; // 70% passing threshold

    const insertData = {
      user_id: uid,
      skill_id: submission.skillId,
      score: submission.score,
      max_score: submission.maxScore,
      percentage,
      passed,
      time_taken_seconds: submission.timeTakenSeconds,
      answers: submission.answers,
    };

    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('[quizService.submit] Insert error:', error.message, error.details, error.hint);
      throw error;
    }

    return data;
  },

  /**
   * Check if user has passed a skill's quiz
   */
  async hasPassed(skillId: string): Promise<boolean> {
    const best = await this.getBestAttempt(skillId);
    return best?.passed || false;
  },

  /**
   * Get quiz statistics
   */
  async getStats(): Promise<{
    totalAttempts: number;
    totalPassed: number;
    averageScore: number;
    skillsPassed: string[];
  }> {
    const attempts = await this.getAll();

    const totalAttempts = attempts.length;
    const totalPassed = attempts.filter(a => a.passed).length;
    const averageScore = totalAttempts > 0
      ? Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / totalAttempts)
      : 0;

    // Get unique skills that have been passed
    const skillsPassed = [...new Set(
      attempts
        .filter(a => a.passed)
        .map(a => a.skill_id)
    )];

    return {
      totalAttempts,
      totalPassed,
      averageScore,
      skillsPassed,
    };
  },

  /**
   * Get weak areas (skills with score < 75%)
   */
  async getWeakAreas(): Promise<{
    skillId: string;
    bestScore: number;
    attempts: number;
  }[]> {
    const attempts = await this.getAll();

    // Group by skill and find best score
    const skillScores = new Map<string, { bestScore: number; attempts: number }>();

    for (const attempt of attempts) {
      const existing = skillScores.get(attempt.skill_id);
      if (!existing) {
        skillScores.set(attempt.skill_id, {
          bestScore: attempt.percentage,
          attempts: 1,
        });
      } else {
        skillScores.set(attempt.skill_id, {
          bestScore: Math.max(existing.bestScore, attempt.percentage),
          attempts: existing.attempts + 1,
        });
      }
    }

    // Filter to weak areas (best score < 75%)
    const weakAreas: { skillId: string; bestScore: number; attempts: number }[] = [];

    skillScores.forEach((data, skillId) => {
      if (data.bestScore < 75) {
        weakAreas.push({ skillId, ...data });
      }
    });

    // Sort by score ascending (weakest first)
    return weakAreas.sort((a, b) => a.bestScore - b.bestScore);
  },
};
