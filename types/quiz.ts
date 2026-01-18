// ============================================
// QUIZ TYPES
// Type definitions for the quiz system
// ============================================

export interface ModuleInfo {
  id: string;
  title: string;
  category: string;
  phase: 1 | 2 | 3;
  level: 'Fundamental' | 'Intermediate' | 'Advanced';
  passingScore: number;
  estimatedTime: string;
  timedModeMinutes?: number;
  speedModeMinutes?: number;
  prerequisites?: string[];
  learningOutcomes: string[];
  nextModule?: {
    id: string;
    title: string;
  } | null;
}

export interface BaseQuestion {
  id: string;
  topic: string;
  question: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points?: number;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: number;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  correctAnswer: boolean;
}

export interface CalculationQuestion extends BaseQuestion {
  type: 'calculation';
  correctAnswer: number;
  acceptableRange: [number, number];
  unit?: string;
  showWorkspace?: boolean;
}

export interface ScenarioQuestion extends BaseQuestion {
  type: 'scenario';
  scenario: string;
  options: string[];
  correctAnswer: number;
}

export interface QuickCalcQuestion extends BaseQuestion {
  type: 'quick-calc';
  correctAnswer: string;
  acceptableAnswers: string[];
  timeLimit?: number;
}

export type Question = 
  | MultipleChoiceQuestion 
  | TrueFalseQuestion 
  | CalculationQuestion 
  | ScenarioQuestion 
  | QuickCalcQuestion;

export interface QuizSection {
  id: string;
  title: string;
  description: string;
  icon?: string;
  weight: number;
  timed?: boolean;
  timePerQuestion?: number;
  questions: Question[];
}

export interface QuizData {
  moduleInfo: ModuleInfo;
  sections: QuizSection[];
}

export interface SectionResult {
  correct: number;
  total: number;
  percentage: number;
  weight: number;
}

export interface QuizResults {
  totalCorrect: number;
  totalQuestions: number;
  percentage: number;
  weightedScore: number;
  sectionResults: Record<string, SectionResult>;
  passed: boolean;
  timeSpent?: number;
}

export type QuizMode = 'standard' | 'timed' | 'speed';

export interface QuizProgress {
  currentSectionIndex: number;
  currentQuestionIndex: number;
  answers: Record<string, unknown>;
  startTime: number;
  mode: QuizMode;
}
