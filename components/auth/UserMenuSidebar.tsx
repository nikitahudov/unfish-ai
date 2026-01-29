'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';

export function UserMenuSidebar() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();

  if (isLoading) {
    return (
      <div className="p-4 border-t border-slate-700">
        <div className="h-10 bg-slate-700 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4 border-t border-slate-700 space-y-2">
        <Link
          href="/login"
          className="block w-full py-2 px-4 text-center text-sm bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="block w-full py-2 px-4 text-center text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
        >
          Create Account
        </Link>
      </div>
    );
  }

  const displayName = user?.profile?.display_name || user?.email?.split('@')[0] || 'User';
  const initials = displayName.slice(0, 2).toUpperCase();
  const avatarUrl = user?.profile?.avatar_url;

  return (
    <div className="p-4 border-t border-slate-700">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-medium">
            {initials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{displayName}</p>
          <p className="text-xs text-slate-400 truncate">{user?.email}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-1 mb-3">
        <Link
          href="/settings"
          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
        >
          <span>⚙️</span>
          Settings
        </Link>
      </div>

      {/* Sign Out */}
      <button
        onClick={() => signOut()}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-colors"
      >
        <span>🚪</span>
        Sign Out
      </button>
    </div>
  );
}
