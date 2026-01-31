export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          avatar_url: string | null;
          subscription_tier: 'free' | 'premium' | 'lifetime';
          subscription_status: 'active' | 'cancelled' | 'past_due' | 'trialing';
          subscription_started_at: string | null;
          subscription_ends_at: string | null;
          stripe_customer_id: string | null;
          current_phase: 'fundamental' | 'intermediate' | 'advanced';
          onboarding_completed: boolean;
          preferences: Json;
          timezone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: 'free' | 'premium' | 'lifetime';
          subscription_status?: 'active' | 'cancelled' | 'past_due' | 'trialing';
          subscription_started_at?: string | null;
          subscription_ends_at?: string | null;
          stripe_customer_id?: string | null;
          current_phase?: 'fundamental' | 'intermediate' | 'advanced';
          onboarding_completed?: boolean;
          preferences?: Json;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: 'free' | 'premium' | 'lifetime';
          subscription_status?: 'active' | 'cancelled' | 'past_due' | 'trialing';
          subscription_started_at?: string | null;
          subscription_ends_at?: string | null;
          stripe_customer_id?: string | null;
          current_phase?: 'fundamental' | 'intermediate' | 'advanced';
          onboarding_completed?: boolean;
          preferences?: Json;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      skill_progress: {
        Row: {
          id: string;
          user_id: string;
          skill_id: string;
          content_viewed: boolean;
          content_completed: boolean;
          exercises_completed: number;
          exercises_total: number;
          scenarios_completed: number;
          scenarios_total: number;
          flashcards_reviewed: boolean;
          time_spent_seconds: number;
          first_viewed_at: string | null;
          last_viewed_at: string | null;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          skill_id: string;
          content_viewed?: boolean;
          content_completed?: boolean;
          exercises_completed?: number;
          exercises_total?: number;
          scenarios_completed?: number;
          scenarios_total?: number;
          flashcards_reviewed?: boolean;
          time_spent_seconds?: number;
          first_viewed_at?: string | null;
          last_viewed_at?: string | null;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          skill_id?: string;
          content_viewed?: boolean;
          content_completed?: boolean;
          exercises_completed?: number;
          exercises_total?: number;
          scenarios_completed?: number;
          scenarios_total?: number;
          flashcards_reviewed?: boolean;
          time_spent_seconds?: number;
          first_viewed_at?: string | null;
          last_viewed_at?: string | null;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      quiz_attempts: {
        Row: {
          id: string;
          user_id: string;
          skill_id: string;
          score: number;
          max_score: number;
          percentage: number;
          passed: boolean;
          time_taken_seconds: number | null;
          answers: Json;
          attempted_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          skill_id: string;
          score: number;
          max_score: number;
          percentage: number;
          passed: boolean;
          time_taken_seconds?: number | null;
          answers?: Json;
          attempted_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          skill_id?: string;
          score?: number;
          max_score?: number;
          percentage?: number;
          passed?: boolean;
          time_taken_seconds?: number | null;
          answers?: Json;
          attempted_at?: string;
          created_at?: string;
        };
      };
      coach_conversations: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          mode: 'chat' | 'analyze' | 'quiz';
          messages: Json;
          message_count: number;
          started_at: string;
          last_message_at: string;
          is_archived: boolean;
          is_starred: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string | null;
          mode?: 'chat' | 'analyze' | 'quiz';
          messages?: Json;
          message_count?: number;
          started_at?: string;
          last_message_at?: string;
          is_archived?: boolean;
          is_starred?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string | null;
          mode?: 'chat' | 'analyze' | 'quiz';
          messages?: Json;
          message_count?: number;
          started_at?: string;
          last_message_at?: string;
          is_archived?: boolean;
          is_starred?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_stats: {
        Row: {
          user_id: string;
          total_study_time_seconds: number;
          skills_viewed: number;
          skills_completed: number;
          quizzes_attempted: number;
          quizzes_passed: number;
          average_quiz_score: number;
          current_streak: number;
          longest_streak: number;
          last_activity_date: string | null;
          coach_conversations_count: number;
          coach_messages_sent: number;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          total_study_time_seconds?: number;
          skills_viewed?: number;
          skills_completed?: number;
          quizzes_attempted?: number;
          quizzes_passed?: number;
          average_quiz_score?: number;
          current_streak?: number;
          longest_streak?: number;
          last_activity_date?: string | null;
          coach_conversations_count?: number;
          coach_messages_sent?: number;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          total_study_time_seconds?: number;
          skills_viewed?: number;
          skills_completed?: number;
          quizzes_attempted?: number;
          quizzes_passed?: number;
          average_quiz_score?: number;
          current_streak?: number;
          longest_streak?: number;
          last_activity_date?: string | null;
          coach_conversations_count?: number;
          coach_messages_sent?: number;
          updated_at?: string;
        };
      };
      activity_log: {
        Row: {
          id: string;
          user_id: string;
          activity_type: 'content_viewed' | 'content_completed' | 'quiz_attempted' | 'quiz_passed' | 'coach_message' | 'login';
          reference_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          activity_type: 'content_viewed' | 'content_completed' | 'quiz_attempted' | 'quiz_passed' | 'coach_message' | 'login';
          reference_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          activity_type?: 'content_viewed' | 'content_completed' | 'quiz_attempted' | 'quiz_passed' | 'coach_message' | 'login';
          reference_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
};

// Helper types
export type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
export type SkillProgress = Database['public']['Tables']['skill_progress']['Row'];
export type QuizAttempt = Database['public']['Tables']['quiz_attempts']['Row'];
export type CoachConversation = Database['public']['Tables']['coach_conversations']['Row'];
export type UserStats = Database['public']['Tables']['user_stats']['Row'];
export type ActivityLog = Database['public']['Tables']['activity_log']['Row'];

export interface UserPreferences {
  theme?: 'dark' | 'light';
  emailNotifications?: boolean;
  streakReminders?: boolean;
  coachPersonality?: 'encouraging' | 'balanced' | 'strict';
  quizDifficulty?: 'easier' | 'adaptive' | 'harder';
}
