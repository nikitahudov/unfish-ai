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

export interface ContentProgress {
  viewed: boolean;
  firstViewedAt: string | null;
  lastViewedAt: string | null;
  timeSpentSeconds: number;
  exercisesCompleted: number;
  exercisesTotal: number;
  flashcardsReviewed: boolean;
  scenariosCompleted: number;
  scenariosTotal: number;
}

export interface ProgressState {
  // Quiz attempts keyed by moduleId
  quizAttempts: Record<string, QuizAttempt[]>;

  // Skill progress keyed by moduleId
  skills: Record<string, SkillProgress>;

  // Overall user statistics
  stats: UserStats;

  // Content progress keyed by skillId like "1.1"
  contentProgress: Record<string, ContentProgress>;

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

  // Content progress actions
  initContentProgress: (skillId: string, exercisesTotal: number, scenariosTotal: number) => void;
  updateTimeSpent: (skillId: string, additionalSeconds: number) => void;
  recordExerciseComplete: (skillId: string) => void;
  recordScenarioComplete: (skillId: string) => void;
  markFlashcardsReviewed: (skillId: string) => void;
  getContentProgress: (skillId: string) => ContentProgress | null;
  getContentStatus: (skillId: string) => 'not_started' | 'in_progress' | 'completed';
}
