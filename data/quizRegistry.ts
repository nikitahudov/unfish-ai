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
import { semiBluffingQuiz } from './quizzes/module_4_1_semi_bluffing';
import { boardTextureQuiz } from './quizzes/module_5_1_board_texture';
import { showdownAnalysisQuiz } from './quizzes/module_5_2_showdown_analysis';
import { tiltControlQuiz } from './quizzes/module_6_1_tilt_control';
import { focusQuiz } from './quizzes/module_6_2_focus';
import { motivationQuiz } from './quizzes/module_6_3_motivation';
import { growthMindsetQuiz } from './quizzes/module_6_4_growth_mindset';
import { playerProfilingQuiz } from './quizzes/module_7_1_player_profiling';
import { tableSelectionQuiz } from './quizzes/module_7_2_table_selection';
import { bankrollQuiz } from './quizzes/module_8_1_bankroll';
import { gameSelectionQuiz } from './quizzes/module_8_2_game_selection';
import { recordKeepingQuiz } from './quizzes/module_8_3_record_keeping';
import { handReviewQuiz } from './quizzes/module_9_1_hand_review';
import { videoStudyQuiz } from './quizzes/module_9_2_video_study';
import { bookStudyQuiz } from './quizzes/module_9_3_book_study';
import { cashGameQuiz } from './quizzes/module_10_1_cash_game';

// Registry of all available quizzes
export const quizRegistry: Record<string, QuizData> = {
  '1.1': potOddsQuiz,
  '1.2': equityCalculationQuiz,
  '2.1': startingHandsQuiz,
  '2.2': positionQuiz,
  '2.3': openRaisingQuiz,
  '3.1': cbetQuiz,
  '3.2': valueBettingQuiz,
  '4.1': semiBluffingQuiz,
  '5.1': boardTextureQuiz,
  '5.2': showdownAnalysisQuiz,
  '6.1': tiltControlQuiz,
  '6.2': focusQuiz,
  '6.3': motivationQuiz,
  '6.4': growthMindsetQuiz,
  '7.1': playerProfilingQuiz,
  '7.2': tableSelectionQuiz,
  '8.1': bankrollQuiz,
  '8.2': gameSelectionQuiz,
  '8.3': recordKeepingQuiz,
  '9.1': handReviewQuiz,
  '9.2': videoStudyQuiz,
  '9.3': bookStudyQuiz,
  '10.1': cashGameQuiz,
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
