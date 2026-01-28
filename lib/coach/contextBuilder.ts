import { useProgressStore } from '@/lib/progressStore';
import { getAllSkills, getSkillById } from '@/data/skills';
import type { CoachContextData } from '@/types/coach';

export function buildCoachContext(): CoachContextData {
  const { contentProgress, skills: quizProgress, stats } = useProgressStore.getState();
  const allSkills = getAllSkills();

  // Categorize skills by status
  const completedSkills: string[] = [];
  const inProgressSkills: string[] = [];
  const notStartedSkills: string[] = [];
  const weakAreas: { skillId: string; skillName: string; score: number }[] = [];
  const strongAreas: { skillId: string; skillName: string; score: number }[] = [];

  allSkills.forEach(skill => {
    const content = contentProgress[skill.id];
    const quiz = quizProgress[skill.id];

    // Determine completion status
    const contentDone = content?.exercisesCompleted >= content?.exercisesTotal &&
                        content?.exercisesTotal > 0;
    const quizPassed = quiz?.status === 'completed';

    if (contentDone && quizPassed) {
      completedSkills.push(skill.id);
    } else if (content?.viewed || quiz?.attempts > 0) {
      inProgressSkills.push(skill.id);
    } else {
      notStartedSkills.push(skill.id);
    }

    // Track weak and strong areas based on quiz scores
    if (quiz?.bestScore !== undefined) {
      const area = {
        skillId: skill.id,
        skillName: skill.name,
        score: quiz.bestScore,
      };

      if (quiz.bestScore < 75) {
        weakAreas.push(area);
      } else if (quiz.bestScore >= 85) {
        strongAreas.push(area);
      }
    }
  });

  // Sort weak areas by score (lowest first)
  weakAreas.sort((a, b) => a.score - b.score);
  strongAreas.sort((a, b) => b.score - a.score);

  // Build recent activity
  const recentActivity: CoachContextData['recentActivity'] = [];

  // Add recent quiz attempts
  Object.entries(quizProgress).forEach(([skillId, progress]) => {
    if (progress.lastAttempt) {
      const skill = getSkillById(skillId);
      if (skill) {
        recentActivity.push({
          type: 'quiz',
          skillId,
          skillName: skill.name,
          date: progress.lastAttempt,
          score: progress.bestScore,
        });
      }
    }
  });

  // Add recent content views
  Object.entries(contentProgress).forEach(([skillId, progress]) => {
    if (progress.lastViewedAt) {
      const skill = getSkillById(skillId);
      if (skill) {
        recentActivity.push({
          type: 'content',
          skillId,
          skillName: skill.name,
          date: progress.lastViewedAt,
        });
      }
    }
  });

  // Sort by date (most recent first) and take top 10
  recentActivity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  recentActivity.splice(10);

  // Determine current phase based on progress
  const fundamentalSkills = allSkills.filter(s => s.level === 'Fundamental');
  const fundamentalCompleted = fundamentalSkills.filter(s =>
    completedSkills.includes(s.id)
  ).length;

  let currentPhase: 'Fundamental' | 'Intermediate' | 'Advanced' = 'Fundamental';
  if (fundamentalCompleted >= fundamentalSkills.length * 0.8) {
    currentPhase = 'Intermediate';
  }

  // Calculate total study time
  const totalStudyTimeMinutes = Math.round(
    Object.values(contentProgress).reduce(
      (sum, p) => sum + (p.timeSpentSeconds || 0), 0
    ) / 60
  );

  return {
    currentPhase,
    completedSkills,
    inProgressSkills,
    notStartedSkills,
    weakAreas: weakAreas.slice(0, 5), // Top 5 weak areas
    strongAreas: strongAreas.slice(0, 5), // Top 5 strong areas
    recentActivity,
    stats: {
      totalStudyTimeMinutes,
      quizzesPassed: Object.values(quizProgress).filter(q => q.status === 'completed').length,
      quizzesAttempted: Object.values(quizProgress).filter(q => q.attempts > 0).length,
      averageScore: stats.averageScore || 0,
      currentStreak: stats.currentStreak || 0,
      lastActiveDate: recentActivity[0]?.date || null,
    },
  };
}

// Helper to get days since last activity
export function getDaysSinceLastActivity(context: CoachContextData): number | null {
  if (!context.stats.lastActiveDate) return null;
  const lastActive = new Date(context.stats.lastActiveDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - lastActive.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}
