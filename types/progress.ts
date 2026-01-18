// ============================================
// PROGRESS TYPES
// Type definitions for the progress tracking system
// ============================================

export interface QuizAttempt {
  attemptId: string;
  date: string; // ISO string
  score: number; // percentage
  weightedScore: number;
  passed: boolean;
  timeSpent: number; // seconds
  mode: 'standard' | 'timed' | 'speed';
  sectionScores: Record<string, {
    correct: number;
    total: number;
    percentage: number;
  }>;
}

export interface SkillProgress {
  status: 'not_started' | 'in_progress' | 'completed';
  bestScore: number;
  attempts: number;
  lastAttempt: string | null; // ISO string
  totalTimeSpent: number; // seconds
}

export interface UserStats {
  totalQuizzesTaken: number;
  totalQuizzesPassed: number;
  averageScore: number;
  totalStudyTime: number; // seconds
  currentStreak: number; // days
  longestStreak: number; // days
  lastStudyDate: string | null; // ISO string
}

export interface ProgressState {
  // Quiz attempts keyed by moduleId
  quizAttempts: Record<string, QuizAttempt[]>;

  // Skill progress keyed by moduleId
  skills: Record<string, SkillProgress>;

  // Overall user statistics
  stats: UserStats;

  // Actions
  addQuizAttempt: (moduleId: string, results: {
    score: number;
    weightedScore: number;
    passed: boolean;
    timeSpent: number;
    mode: 'standard' | 'timed' | 'speed';
    sectionScores: Record<string, {
      correct: number;
      total: number;
      percentage: number;
    }>;
  }) => void;

  getSkillStatus: (moduleId: string) => SkillProgress;

  resetProgress: () => void;
}
