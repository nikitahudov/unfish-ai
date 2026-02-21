import React from 'react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col overflow-y-auto">
      {/* Simple Header */}
      <header className="p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <span>&larr;</span>
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Centered Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <img src="/logo.png" alt="UnFish.ai" className="w-10 h-10 rounded-xl" />
              <span className="text-2xl font-bold text-white">UnFish.ai</span>
            </Link>
          </div>

          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} UnFish.ai. All rights reserved.</p>
      </footer>
    </div>
  );
}
