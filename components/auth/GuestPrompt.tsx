'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface GuestPromptProps {
  title?: string;
  description?: string;
  features?: string[];
}

export function GuestPrompt({
  title = 'Sign In Required',
  description = 'Create a free account to access this feature.',
  features = [
    'Track your learning progress',
    'Take quizzes and save scores',
    'Get personalized AI coaching',
    'Sync across all your devices',
  ],
}: GuestPromptProps) {
  const pathname = usePathname();
  const returnUrl = encodeURIComponent(pathname);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl border border-slate-700 p-8 text-center">
        {/* Icon */}
        <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🔒</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-slate-400 mb-6">{description}</p>

        {/* Features */}
        <div className="text-left bg-slate-700/50 rounded-xl p-4 mb-6">
          <p className="text-sm font-medium text-slate-300 mb-3">
            With a free account you can:
          </p>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-slate-400">
                <span className="text-emerald-400">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href={`/signup?returnUrl=${returnUrl}`}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
          >
            Create Free Account
          </Link>
          <Link
            href={`/login?returnUrl=${returnUrl}`}
            className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>

        {/* Back Link */}
        <Link
          href="/wiki"
          className="inline-block mt-4 text-sm text-slate-500 hover:text-slate-300 transition-colors"
        >
          ← Back to Curriculum
        </Link>
      </div>
    </div>
  );
}
