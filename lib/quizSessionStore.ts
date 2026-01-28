import { create } from 'zustand';
import type { QuizSessionState } from '@/types/coach';

export interface QuizSessionSummary {
  topic: string;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  finalDifficulty: 'easy' | 'medium' | 'hard';
  longestStreak: number;
}

interface QuizSessionStore extends QuizSessionState {
  // Actions
  startSession: (topic: string, difficulty?: 'easy' | 'medium' | 'hard') => void;
  recordAnswer: (question: string, userAnswer: string, wasCorrect: boolean) => void;
  adjustDifficulty: () => void;
  endSession: () => QuizSessionSummary;
  resetSession: () => void;
}

const initialState: QuizSessionState = {
  isActive: false,
  topic: null,
  difficulty: 'medium',
  questionsAsked: 0,
  correctAnswers: 0,
  streak: 0,
  history: [],
};

export const useQuizSessionStore = create<QuizSessionStore>((set, get) => ({
  ...initialState,

  startSession: (topic, difficulty = 'medium') => {
    set({
      isActive: true,
      topic,
      difficulty,
      questionsAsked: 0,
      correctAnswers: 0,
      streak: 0,
      history: [],
    });
  },

  recordAnswer: (question, userAnswer, wasCorrect) => {
    set(state => ({
      questionsAsked: state.questionsAsked + 1,
      correctAnswers: wasCorrect ? state.correctAnswers + 1 : state.correctAnswers,
      streak: wasCorrect ? state.streak + 1 : 0,
      history: [
        ...state.history,
        { question, userAnswer, wasCorrect },
      ],
    }));

    // Auto-adjust difficulty after each answer
    get().adjustDifficulty();
  },

  adjustDifficulty: () => {
    const { streak, history, difficulty } = get();

    // Get recent performance (last 3 questions)
    const recent = history.slice(-3);
    const recentCorrect = recent.filter(h => h.wasCorrect).length;

    // Increase difficulty after 3 correct in a row
    if (streak >= 3 && difficulty !== 'hard') {
      set({
        difficulty: difficulty === 'easy' ? 'medium' : 'hard',
        streak: 0, // Reset streak after difficulty change
      });
    }

    // Decrease difficulty after 2 wrong in last 3
    if (recent.length >= 3 && recentCorrect <= 1 && difficulty !== 'easy') {
      set({
        difficulty: difficulty === 'hard' ? 'medium' : 'easy',
      });
    }
  },

  endSession: () => {
    const state = get();

    // Calculate longest streak
    let longestStreak = 0;
    let currentStreak = 0;
    for (const h of state.history) {
      if (h.wasCorrect) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }

    const summary: QuizSessionSummary = {
      topic: state.topic || 'General',
      totalQuestions: state.questionsAsked,
      correctAnswers: state.correctAnswers,
      accuracy: state.questionsAsked > 0
        ? Math.round((state.correctAnswers / state.questionsAsked) * 100)
        : 0,
      finalDifficulty: state.difficulty,
      longestStreak,
    };

    set({ isActive: false });

    return summary;
  },

  resetSession: () => {
    set(initialState);
  },
}));
