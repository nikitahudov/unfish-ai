// ============================================
// QUIZ REGISTRY
// Central registry for all quiz modules
// ============================================

import type { QuizData } from '@/types/quiz';
import { potOddsQuiz } from './quizzes/module_1_1_pot_odds';
import { equityCalculationQuiz } from './quizzes/module_1_2_equity_calculation';
import { startingHandsQuiz } from './quizzes/module_2_1_starting_hands';
import { positionQuiz } from './quizzes/module_2_2_position';
import { openRaisingQuiz } from './quizzes/module_2_3_open_raising';
import { cbetQuiz } from './quizzes/module_3_1_cbet';
import { valueBettingQuiz } from './quizzes/module_3_2_value_betting';

// Registry of all available quizzes
export const quizRegistry: Record<string, QuizData> = {
  '1.1': potOddsQuiz,
  '1.2': equityCalculationQuiz,
  '2.1': startingHandsQuiz,
  '2.2': positionQuiz,
  '2.3': openRaisingQuiz,
  '3.1': cbetQuiz,
  '3.2': valueBettingQuiz,
};

// Get quiz by module ID
export const getQuizById = (moduleId: string): QuizData | null => {
  return quizRegistry[moduleId] || null;
};

// Get all available quiz IDs
export const getAvailableQuizIds = (): string[] => {
  return Object.keys(quizRegistry);
};

// Check if quiz exists
export const hasQuiz = (moduleId: string): boolean => {
  return moduleId in quizRegistry;
};

// Get quiz metadata for listing
export const getQuizList = () => {
  return Object.entries(quizRegistry).map(([id, quiz]) => ({
    id,
    title: quiz.moduleInfo.title,
    category: quiz.moduleInfo.category,
    level: quiz.moduleInfo.level,
    phase: quiz.moduleInfo.phase,
    passingScore: quiz.moduleInfo.passingScore,
    estimatedTime: quiz.moduleInfo.estimatedTime,
    questionCount: quiz.sections.reduce((sum, s) => sum + s.questions.length, 0),
  }));
};
