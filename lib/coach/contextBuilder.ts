import { createClient } from '@/lib/supabase/client';
import { getAllSkills, getSkillById } from '@/data/skills';
import type { CoachContextData } from '@/types/coach';

function getSkillName(skillId: string): string {
  const skill = getSkillById(skillId);
  return skill?.name || skillId;
}

function getEmptyContext(): CoachContextData {
  return {
    currentPhase: 'Fundamental',
    completedSkills: [],
    inProgressSkills: [],
    notStartedSkills: [],
    weakAreas: [],
    strongAreas: [],
    recentActivity: [],
    stats: {
      totalStudyTimeMinutes: 0,
      quizzesPassed: 0,
      quizzesAttempted: 0,
      averageScore: 0,
      currentStreak: 0,
      lastActiveDate: null,
    },
  };
}

/**
 * Build coach context from Supabase data (async version)
 * This is the primary method - uses live database data
 */
export async function buildCoachContextAsync(): Promise<CoachContextData> {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return getEmptyContext();
  }

  try {
    // Fetch all data in parallel
    const [progressResult, quizResult, statsResult, activityResult] = await Promise.all([
      supabase.from('skill_progress').select('*').eq('user_id', user.id),
      supabase.from('quiz_attempts').select('*').eq('user_id', user.id),
      supabase.from('user_stats').select('*').eq('user_id', user.id).single(),
      supabase.from('activity_log').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10),
    ]);

    const progress = progressResult.data || [];
    const quizzes = quizResult.data || [];
    const stats = statsResult.data;
    const activities = activityResult.data || [];
    const allSkills = getAllSkills();

    // Categorize skills by status
    const completedSkillIds = new Set(
      progress.filter(p => p.content_completed).map(p => p.skill_id)
    );
    const viewedSkillIds = new Set(
      progress.filter(p => p.content_viewed).map(p => p.skill_id)
    );

    const completedSkills: string[] = [];
    const inProgressSkills: string[] = [];
    const notStartedSkills: string[] = [];

    allSkills.forEach(skill => {
      if (completedSkillIds.has(skill.id)) {
        completedSkills.push(skill.id);
      } else if (viewedSkillIds.has(skill.id)) {
        inProgressSkills.push(skill.id);
      } else {
        notStartedSkills.push(skill.id);
      }
    });

    // Calculate weak and strong areas from quiz attempts
    const skillScores = new Map<string, number>();
    for (const quiz of quizzes) {
      const existing = skillScores.get(quiz.skill_id);
      if (!existing || quiz.percentage > existing) {
        skillScores.set(quiz.skill_id, quiz.percentage);
      }
    }

    const weakAreas: { skillId: string; skillName: string; score: number }[] = [];
    const strongAreas: { skillId: string; skillName: string; score: number }[] = [];

    skillScores.forEach((bestScore, skillId) => {
      const area = {
        skillId,
        skillName: getSkillName(skillId),
        score: bestScore,
      };

      if (bestScore < 75) {
        weakAreas.push(area);
      } else if (bestScore >= 85) {
        strongAreas.push(area);
      }
    });

    weakAreas.sort((a, b) => a.score - b.score);
    strongAreas.sort((a, b) => b.score - a.score);

    // Map recent activity
    const recentActivity: CoachContextData['recentActivity'] = activities.map(a => ({
      type: a.activity_type.includes('quiz') ? 'quiz' as const : 'content' as const,
      skillId: a.reference_id || '',
      skillName: getSkillName(a.reference_id || ''),
      date: a.created_at,
      score: (a.metadata as Record<string, unknown>)?.score as number | undefined,
    }));

    // Determine current phase
    const skillsCompleted = stats?.skills_completed || 0;
    let currentPhase: 'Fundamental' | 'Intermediate' | 'Advanced' = 'Fundamental';
    if (skillsCompleted >= 66) currentPhase = 'Advanced';
    else if (skillsCompleted >= 23) currentPhase = 'Intermediate';

    return {
      currentPhase,
      completedSkills,
      inProgressSkills,
      notStartedSkills,
      weakAreas: weakAreas.slice(0, 5),
      strongAreas: strongAreas.slice(0, 5),
      recentActivity,
      stats: {
        totalStudyTimeMinutes: Math.round((stats?.total_study_time_seconds || 0) / 60),
        quizzesPassed: stats?.quizzes_passed || 0,
        quizzesAttempted: stats?.quizzes_attempted || 0,
        averageScore: stats?.average_quiz_score || 0,
        currentStreak: stats?.current_streak || 0,
        lastActiveDate: activities[0]?.created_at || null,
      },
    };
  } catch (error) {
    console.error('Error building coach context:', error);
    return getEmptyContext();
  }
}

/**
 * Sync fallback - returns empty context
 * Prefer using buildCoachContextAsync when possible
 */
export function buildCoachContext(): CoachContextData {
  return getEmptyContext();
}

// Helper to get days since last activity
export function getDaysSinceLastActivity(context: CoachContextData): number | null {
  if (!context.stats.lastActiveDate) return null;
  const lastActive = new Date(context.stats.lastActiveDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - lastActive.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}
