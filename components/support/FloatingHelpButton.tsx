'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';

export function FloatingHelpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute bottom-16 right-0 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
            <div className="p-4 border-b border-slate-700">
              <h3 className="font-medium text-white">Need Help?</h3>
              <p className="text-sm text-slate-400">We&apos;re here to assist you</p>
            </div>
            <div className="p-2">
              <Link
                href="/support"
                prefetch={false}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <span className="text-lg">🎧</span>
                <div>
                  <p className="text-sm font-medium">Contact Support</p>
                  <p className="text-xs text-slate-500">Submit a ticket</p>
                </div>
              </Link>

              {user && (
                <Link
                  href="/support/my-tickets"
                  prefetch={false}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <span className="text-lg">🎫</span>
                  <div>
                    <p className="text-sm font-medium">My Tickets</p>
                    <p className="text-xs text-slate-500">View your requests</p>
                  </div>
                </Link>
              )}

              <Link
                href="/faq"
                prefetch={false}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <span className="text-lg">❓</span>
                <div>
                  <p className="text-sm font-medium">FAQ</p>
                  <p className="text-xs text-slate-500">Common questions</p>
                </div>
              </Link>

              <Link
                href="/wiki"
                prefetch={false}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <span className="text-lg">📖</span>
                <div>
                  <p className="text-sm font-medium">Knowledge Base</p>
                  <p className="text-xs text-slate-500">Learn poker concepts</p>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
          isOpen
            ? 'bg-slate-700 rotate-45'
            : 'bg-amber-500 hover:bg-amber-600 hover:scale-105'
        }`}
        aria-label="Help"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
    </div>
  );
}
