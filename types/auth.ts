import type { User, Session } from '@supabase/supabase-js';
import type { UserProfile, UserStats } from './database';

export interface AuthUser {
  id: string;
  email: string;
  profile: UserProfile | null;
  stats: UserStats | null;
}

export interface AuthState {
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  // Auth actions
  signInWithEmail: (email: string, password: string) => Promise<AuthResult>;
  signUpWithEmail: (email: string, password: string) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<AuthResult>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<AuthResult>;
  updatePassword: (newPassword: string) => Promise<AuthResult>;

  // Profile actions
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<AuthResult>;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  data?: any;
}

export type AuthError = {
  message: string;
  code?: string;
};
