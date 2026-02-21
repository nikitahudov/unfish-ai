'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserMenuSidebar } from '@/components/auth/UserMenuSidebar';
import { useAuth } from '@/lib/auth/AuthContext';
import { useStats } from '@/lib/hooks/useStats';

// Navigation items configuration
const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '🏠',
    href: '/',
    description: 'Overview and quick actions'
  },
  {
    id: 'wiki',
    label: 'Curriculum',
    icon: '📚',
    href: '/wiki',
    description: 'Learn poker concepts'
  },
  {
    id: 'assess',
    label: 'Assessments',
    icon: '✅',
    href: '/assess',
    description: 'Test your knowledge'
  },
  {
    id: 'coach',
    label: 'AI Coach',
    icon: '🤖',
    href: '/coach',
    description: 'Get personalized help'
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: '🛠️',
    href: '/tools',
    description: 'GTO charts & calculators'
  },
  {
    id: 'progress',
    label: 'Progress',
    icon: '📈',
    href: '/progress',
    description: 'Track your journey'
  },
];

// Support section items
const supportItems = [
  {
    id: 'support',
    label: 'Contact Support',
    icon: '🎧',
    href: '/support',
    description: 'Submit a ticket',
  },
  {
    id: 'my-tickets',
    label: 'My Tickets',
    icon: '🎫',
    href: '/support/my-tickets',
    description: 'View your requests',
    authOnly: true,
  },
  {
    id: 'faq',
    label: 'FAQ',
    icon: '❓',
    href: '/faq',
    description: 'Common questions',
  },
];

export const Navigation = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { stats, progressPercentage } = useStats();

  const skillsCompleted = stats?.skills_completed || 0;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-slate-800 p-2 rounded-lg border border-slate-700"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800
          flex flex-col
          transform transition-transform duration-300 ease-in-out z-50
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="UnFish.ai" className="w-10 h-10 rounded-xl" />
            <div>
              <h1 className="font-bold text-white text-lg">UnFish.ai</h1>
              <p className="text-xs text-slate-500">From Fish to Shark</p>
            </div>
          </Link>
        </div>

        {/* Auth Section */}
        <UserMenuSidebar />

        {/* Navigation Links */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs opacity-70">{item.description}</div>
                </div>
              </Link>
            );
          })}

          {/* Help & Support Section */}
          <div className="mt-4 pt-4 border-t border-slate-800">
            <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Help & Support
            </h3>
            {supportItems
              .filter((item) => !item.authOnly || isAuthenticated)
              .map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all
                      ${isActive
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }
                    `}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{item.label}</div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </nav>

        {/* Progress Summary */}
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Overall Progress</span>
              <span className="text-amber-400 font-medium">{progressPercentage}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-slate-500">
              {isAuthenticated ? `${skillsCompleted} of 96 skills completed` : 'Sign in to track progress'}
            </div>
          </div>
        </div>

      </aside>
    </>
  );
};

export default Navigation;
