'use client';

import React from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { GuestPrompt } from './GuestPrompt';

interface RequireAuthProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  feature?: string;
}

export function RequireAuth({ children, fallback, feature }: RequireAuthProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || (
      <GuestPrompt
        title={feature ? `Sign In for ${feature}` : 'Sign In Required'}
        description={feature ? `Create a free account to access ${feature}.` : undefined}
      />
    );
  }

  return <>{children}</>;
}
