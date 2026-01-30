'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Session, AuthChangeEvent } from '@supabase/supabase-js';
import type { AuthContextType, AuthUser, AuthResult } from '@/types/auth';
import type { UserProfile, UserStats } from '@/types/database';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  // Fetch user profile and stats
  const fetchUserData = useCallback(async (userId: string, email: string): Promise<AuthUser> => {
    const [profileResult, statsResult] = await Promise.all([
      supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single(),
      supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', userId)
        .single(),
    ]);

    return {
      id: userId,
      email,
      profile: profileResult.data as UserProfile | null,
      stats: statsResult.data as UserStats | null,
    };
  }, [supabase]);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session: initialSession } } = await supabase.auth.getSession();

        if (initialSession?.user) {
          const userData = await fetchUserData(
            initialSession.user.id,
            initialSession.user.email || ''
          );
          setUser(userData);
          setSession(initialSession);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, currentSession: Session | null) => {
        console.log('Auth state changed:', event);

        if (currentSession?.user) {
          const userData = await fetchUserData(
            currentSession.user.id,
            currentSession.user.email || ''
          );
          setUser(userData);
          setSession(currentSession);
        } else {
          setUser(null);
          setSession(null);
        }

        setIsLoading(false);

        // Handle specific auth events
        if (event === 'SIGNED_IN') {
          router.refresh();
        } else if (event === 'SIGNED_OUT') {
          router.push('/');
          router.refresh();
        } else if (event === 'PASSWORD_RECOVERY') {
          router.push('/reset-password');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, fetchUserData, router]);

  // Sign in with email
  const signInWithEmail = useCallback(async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch {
      return { success: false, error: 'An unexpected error occurred' };
    }
  }, [supabase]);

  // Sign up with email
  const signUpWithEmail = useCallback(async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Signup error:', error);
        return { success: false, error: error.message };
      }

      // Supabase may return a fake user with no identities when signup
      // is silently blocked (e.g. redirect URL not whitelisted, or
      // duplicate email with email confirmation still pending).
      if (data.user && data.user.identities?.length === 0) {
        return {
          success: false,
          error: 'An account with this email may already exist. Try signing in instead.',
        };
      }

      // Check if email confirmation is required
      if (data.user && !data.session) {
        return {
          success: true,
          data,
          error: 'Please check your email to confirm your account',
        };
      }

      return { success: true, data };
    } catch (err) {
      console.error('Signup exception:', err);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }, [supabase]);

  // Sign in with Google
  const signInWithGoogle = useCallback(async (): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch {
      return { success: false, error: 'An unexpected error occurred' };
    }
  }, [supabase]);

  // Sign out
  const signOut = useCallback(async (): Promise<void> => {
    await supabase.auth.signOut();
  }, [supabase]);

  // Reset password
  const resetPassword = useCallback(async (email: string): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch {
      return { success: false, error: 'An unexpected error occurred' };
    }
  }, [supabase]);

  // Update password
  const updatePassword = useCallback(async (newPassword: string): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch {
      return { success: false, error: 'An unexpected error occurred' };
    }
  }, [supabase]);

  // Refresh profile data
  const refreshProfile = useCallback(async (): Promise<void> => {
    if (!session?.user) return;

    const userData = await fetchUserData(
      session.user.id,
      session.user.email || ''
    );
    setUser(userData);
  }, [session, fetchUserData]);

  // Update profile
  const updateProfile = useCallback(async (
    updates: Partial<UserProfile>
  ): Promise<AuthResult> => {
    if (!user?.id) {
      return { success: false, error: 'Not authenticated' };
    }

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        return { success: false, error: error.message };
      }

      // Refresh profile data
      await refreshProfile();

      return { success: true };
    } catch {
      return { success: false, error: 'An unexpected error occurred' };
    }
  }, [user, supabase, refreshProfile]);

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user && !!session,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
    refreshProfile,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
