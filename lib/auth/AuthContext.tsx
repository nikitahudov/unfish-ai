'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Session, AuthChangeEvent } from '@supabase/supabase-js';
import type { AuthContextType, AuthUser, AuthResult } from '@/types/auth';
import type { UserProfile, UserStats } from '@/types/database';
import { useToastStore } from '@/lib/hooks/useToast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Returns the base app URL for OAuth redirects.
 * Uses NEXT_PUBLIC_APP_URL to ensure redirects always go to the production
 * domain, not a Vercel preview deployment URL.
 */
function getAppUrl(): string {
  let url =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    'http://localhost:3000';
  url = url.startsWith('http') ? url : `https://${url}`;
  url = url.endsWith('/') ? url : `${url}/`;
  return url;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // Stable client reference — createBrowserClient is a singleton but calling
  // createClient() on every render produced a new wrapper reference which
  // cascaded through useCallback/useEffect deps and caused an infinite loop.
  const supabase = useMemo(() => createClient(), []);
  const addToast = useToastStore(state => state.addToast);

  // Keep refs to values used inside callbacks / effects so we can avoid
  // including them in dependency arrays and keep function references stable.
  const routerRef = useRef(router);
  routerRef.current = router;
  const addToastRef = useRef(addToast);
  addToastRef.current = addToast;
  const sessionRef = useRef(session);
  sessionRef.current = session;
  const userRef = useRef(user);
  userRef.current = user;

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

  const fetchUserDataRef = useRef(fetchUserData);
  fetchUserDataRef.current = fetchUserData;

  // Track the current user ID so onAuthStateChange can skip redundant updates.
  const userIdRef = useRef<string | null>(null);

  // Initialize auth state — runs ONCE on mount.
  // All mutable helpers are accessed via refs so this effect never re-runs.
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session: initialSession } } = await supabase.auth.getSession();

        if (initialSession?.user) {
          const userData = await fetchUserDataRef.current(
            initialSession.user.id,
            initialSession.user.email || ''
          );
          userIdRef.current = initialSession.user.id;
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

    // Listen for auth changes.
    // CRITICAL: Do NOT call router.refresh() or router.push() here.
    // router.refresh() triggers a server request → middleware getUser() →
    // token refresh → new cookies → browser fires SIGNED_IN again → loop.
    // Server components already get fresh data on the initial page load
    // because middleware refreshes the session on every navigation.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, currentSession: Session | null) => {
        console.log('Auth state changed:', event);

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          const newUserId = currentSession?.user?.id ?? null;

          // Only update state if the user actually changed (login/logout).
          // TOKEN_REFRESHED and INITIAL_SESSION fire with the same user —
          // calling setUser/setSession would create new object references,
          // trigger React re-renders, re-fire RSC fetches, and loop.
          if (newUserId === userIdRef.current) {
            return; // Same user, skip — no re-render needed
          }

          if (currentSession?.user) {
            // Set userIdRef BEFORE the async call so concurrent SIGNED_IN
            // events are rejected by the guard above
            userIdRef.current = currentSession.user.id;
            const userData = await fetchUserDataRef.current(
              currentSession.user.id,
              currentSession.user.email || ''
            );
            setUser(userData);
            setSession(currentSession);
          }
          if (event === 'SIGNED_IN') {
            addToastRef.current({ type: 'success', message: 'Welcome back!' });
          }
        } else if (event === 'SIGNED_OUT') {
          userIdRef.current = null;
          setUser(null);
          setSession(null);
        } else if (event === 'PASSWORD_RECOVERY') {
          routerRef.current.push('/reset-password');
        }

        setIsLoading(prev => prev ? false : prev);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

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
          emailRedirectTo: `${getAppUrl()}auth/callback`,
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
          redirectTo: `${getAppUrl()}auth/callback`,
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

  // Sign out — uses refs for addToast/router to keep reference stable.
  const signOut = useCallback(async (): Promise<void> => {
    // Clear app localStorage data to prevent stale data on next login
    const appKeys = [
      '24p-academy-progress',
      '24p-coach-conversations',
    ];
    appKeys.forEach(key => {
      try { localStorage.removeItem(key); } catch {}
    });

    // 1. Server-side sign-out: revokes the session and explicitly clears
    //    ALL sb-* cookies (including stale chunked fragments from a
    //    previous session that the client SDK might not know about).
    try {
      await fetch('/auth/signout', { method: 'POST' });
    } catch (e) {
      console.error('Server signout failed, falling back to client-only:', e);
    }

    // 2. Client-side sign-out: clears in-memory state and local storage.
    await supabase.auth.signOut();

    addToastRef.current({ type: 'success', message: 'Signed out successfully' });

    // 3. Navigate to home. We do this here (not in onAuthStateChange)
    //    to avoid racing with a subsequent SIGNED_IN event.
    routerRef.current.push('/');
  }, [supabase]);

  // Reset password
  const resetPassword = useCallback(async (email: string): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${getAppUrl()}auth/callback?type=recovery`,
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

  // Refresh profile data — uses refs to keep reference stable.
  const refreshProfile = useCallback(async (): Promise<void> => {
    if (!sessionRef.current?.user) return;

    const userData = await fetchUserDataRef.current(
      sessionRef.current.user.id,
      sessionRef.current.user.email || ''
    );
    setUser(userData);
  }, []);

  // Update profile — uses refs to keep reference stable.
  const updateProfile = useCallback(async (
    updates: Partial<UserProfile>
  ): Promise<AuthResult> => {
    if (!userRef.current?.id) {
      return { success: false, error: 'Not authenticated' };
    }

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', userRef.current.id);

      if (error) {
        return { success: false, error: error.message };
      }

      // Refresh profile data
      await refreshProfile();

      return { success: true };
    } catch {
      return { success: false, error: 'An unexpected error occurred' };
    }
  }, [supabase, refreshProfile]);

  const isAuthenticated = !!user && !!session;

  const value: AuthContextType = useMemo(() => ({
    user,
    session,
    isLoading,
    isAuthenticated,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
    refreshProfile,
    updateProfile,
  }), [
    user,
    session,
    isLoading,
    isAuthenticated,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
    refreshProfile,
    updateProfile,
  ]);

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
