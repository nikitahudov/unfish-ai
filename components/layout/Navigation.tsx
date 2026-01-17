'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    id: 'progress', 
    label: 'Progress', 
    icon: '📈', 
    href: '/progress',
    description: 'Track your journey'
  },
];

export const Navigation = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          transform transition-transform duration-300 ease-in-out z-50
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">🎰</span>
            </div>
            <div>
              <h1 className="font-bold text-white text-lg">24P Academy</h1>
              <p className="text-xs text-slate-500">Poker Mastery</p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
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
        </nav>

        {/* Progress Summary */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Overall Progress</span>
              <span className="text-amber-400 font-medium">0%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all"
                style={{ width: '0%' }}
              />
            </div>
            <div className="mt-2 text-xs text-slate-500">
              0 of 96 skills completed
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
