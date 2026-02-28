'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { Avatar } from '@/components/ui/Avatar';

export function UserMenu() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="w-8 h-8 bg-slate-700 rounded-full animate-pulse" />
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          prefetch={false}
          className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          prefetch={false}
          className="px-4 py-2 text-sm bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  const displayName = user?.profile?.display_name || user?.email?.split('@')[0] || 'User';
  const avatarUrl = user?.profile?.avatar_url;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-700 transition-colors"
      >
        {/* Avatar */}
        <Avatar
          src={avatarUrl}
          name={displayName}
          size="sm"
        />

        {/* Name (hidden on mobile) */}
        <span className="hidden md:block text-sm text-slate-300 max-w-[120px] truncate">
          {displayName}
        </span>

        {/* Dropdown arrow */}
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-slate-800 rounded-xl border border-slate-700 shadow-xl py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <Avatar src={avatarUrl} name={displayName} size="md" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{displayName}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>
            {user?.profile?.subscription_tier && user.profile.subscription_tier !== 'free' && (
              <span className="inline-block mt-2 px-2 py-0.5 text-xs bg-amber-500/20 text-amber-400 rounded">
                {user.profile.subscription_tier}
              </span>
            )}
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/progress"
              prefetch={false}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
            >
              <span>📊</span>
              My Progress
            </Link>
            <Link
              href="/coach"
              prefetch={false}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
            >
              <span>🎓</span>
              AI Coach
            </Link>
            <Link
              href="/settings"
              prefetch={false}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
            >
              <span>⚙️</span>
              Settings
            </Link>
          </div>

          {/* Sign Out */}
          <div className="border-t border-slate-700 pt-2">
            <button
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors"
            >
              <span>🚪</span>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
