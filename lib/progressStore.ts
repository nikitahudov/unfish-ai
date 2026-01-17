// ============================================
// PROGRESS STORE
// Global state management with Zustand
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface SkillProgress {
  status: 'not_started' | 'in_progress' | 'completed' | 'mastered';
  quizScores: number[];
  bestScore: number;
  lastAccessed: string;
  timeSpent: number; // minutes
  notes: string[];
}

export interface UserStats {
  totalHandsPlayed: number;
  studyHours: number;
  quizzesCompleted: number;
  averageScore: number;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
}

export interface CoachContext {
  recentTopics: string[];
  weakAreas: string[];
  conversationHistory: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>;
}

export interface UserSettings {
  learningStyle: 'visual' | 'conceptual' | 'practical' | 'balanced';
  sessionLength: 'short' | 'medium' | 'long';
  notifications: boolean;
  theme: 'dark' | 'light';
}

export interface ProgressState {
  skills: Record<string, SkillProgress>;
  stats: UserStats;
  coachContext: CoachContext;
  settings: UserSettings;
  
  // Actions
  updateSkillProgress: (skillId: string, data: Partial<SkillProgress>) => void;
  addQuizScore: (skillId: string, score: number) => void;
  updateStats: (updates: Partial<UserStats>) => void;
  addCoachMessage: (role: 'user' | 'assistant', content: string) => void;
  updateSettings: (updates: Partial<UserSettings>) => void;
  resetProgress: () => void;
}

// Initial state
const initialStats: UserStats = {
  totalHandsPlayed: 0,
  studyHours: 0,
  quizzesCompleted: 0,
  averageScore: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastStudyDate: null,
};

const initialCoachContext: CoachContext = {
  recentTopics: [],
  weakAreas: [],
  conversationHistory: [],
};

const initialSettings: UserSettings = {
  learningStyle: 'balanced',
  sessionLength: 'medium',
  notifications: true,
  theme: 'dark',
};

// Create the store
export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      skills: {},
      stats: initialStats,
      coachContext: initialCoachContext,
      settings: initialSettings,

      updateSkillProgress: (skillId, data) => {
        set((state) => ({
          skills: {
            ...state.skills,
            [skillId]: {
              ...state.skills[skillId],
              ...data,
              lastAccessed: new Date().toISOString(),
            },
          },
        }));
      },

      addQuizScore: (skillId, score) => {
        set((state) => {
          const existingScores = state.skills[skillId]?.quizScores || [];
          const newScores = [...existingScores, score];
          const avgScore = newScores.reduce((a, b) => a + b, 0) / newScores.length;
          
          // Update streak
          const today = new Date().toDateString();
          const lastStudy = state.stats.lastStudyDate;
          const yesterday = new Date(Date.now() - 86400000).toDateString();
          
          let newStreak = state.stats.currentStreak;
          if (lastStudy === yesterday || lastStudy === today) {
            if (lastStudy !== today) {
              newStreak += 1;
            }
          } else {
            newStreak = 1;
          }

          return {
            skills: {
              ...state.skills,
              [skillId]: {
                ...state.skills[skillId],
                quizScores: newScores,
                bestScore: Math.max(...newScores),
                status: score >= 80 ? 'completed' : 'in_progress',
                lastAccessed: new Date().toISOString(),
              },
            },
            stats: {
              ...state.stats,
              quizzesCompleted: state.stats.quizzesCompleted + 1,
              averageScore: avgScore,
              currentStreak: newStreak,
              longestStreak: Math.max(newStreak, state.stats.longestStreak),
              lastStudyDate: today,
            },
          };
        });
      },

      updateStats: (updates) => {
        set((state) => ({
          stats: { ...state.stats, ...updates },
        }));
      },

      addCoachMessage: (role, content) => {
        set((state) => ({
          coachContext: {
            ...state.coachContext,
            conversationHistory: [
              ...state.coachContext.conversationHistory,
              {
                role,
                content,
                timestamp: new Date().toISOString(),
              },
            ].slice(-50), // Keep last 50 messages
          },
        }));
      },

      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
        }));
      },

      resetProgress: () => {
        set({
          skills: {},
          stats: initialStats,
          coachContext: initialCoachContext,
        });
      },
    }),
    {
      name: 'poker-mastery-progress',
    }
  )
);

// Selector hooks for convenience
export const useSkillProgress = (skillId: string) => {
  return useProgressStore((state) => state.skills[skillId]);
};

export const useStats = () => {
  return useProgressStore((state) => state.stats);
};

export const useSettings = () => {
  return useProgressStore((state) => state.settings);
};
