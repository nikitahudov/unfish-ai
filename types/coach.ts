export type CoachMode = 'chat' | 'analyze' | 'quiz';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mode?: CoachMode;
}

export interface Conversation {
  id: string;
  messages: Message[];
  startedAt: string;
  lastMessageAt: string;
}

export interface CoachContextData {
  currentPhase: 'Fundamental' | 'Intermediate' | 'Advanced';
  completedSkills: string[];
  inProgressSkills: string[];
  notStartedSkills: string[];
  weakAreas: { skillId: string; skillName: string; score: number }[];
  strongAreas: { skillId: string; skillName: string; score: number }[];
  recentActivity: {
    type: 'content' | 'quiz';
    skillId: string;
    skillName: string;
    date: string;
    score?: number;
  }[];
  stats: {
    totalStudyTimeMinutes: number;
    quizzesPassed: number;
    quizzesAttempted: number;
    averageScore: number;
    currentStreak: number;
    lastActiveDate: string | null;
  };
}

export interface CoachState {
  conversations: Conversation[];
  currentConversationId: string | null;
  isLoading: boolean;
  error: string | null;
}
