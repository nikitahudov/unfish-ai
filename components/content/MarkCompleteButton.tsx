'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useProgress } from '@/lib/hooks';
import Link from 'next/link';

interface MarkCompleteButtonProps {
  skillId: string;
  skillName: string;
  nextSkillId?: string;
  nextSkillName?: string;
}

export function MarkCompleteButton({
  skillId,
  skillName,
  nextSkillId,
  nextSkillName,
}: MarkCompleteButtonProps) {
  const { isAuthenticated } = useAuth();
  const { isSkillCompleted, markCompleted, updating } = useProgress();
  const [justCompleted, setJustCompleted] = useState(false);

  const isCompleted = isSkillCompleted(skillId);
  const isUpdating = updating === skillId;

  const handleComplete = async () => {
    await markCompleted(skillId);
    setJustCompleted(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 text-center">
        <p className="text-slate-400 mb-4">Sign in to track your progress</p>
        <Link
          href={`/login?returnUrl=${encodeURIComponent(`/wiki/${skillId}`)}`}
          className="inline-block px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (isCompleted || justCompleted) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-3xl">&#x2705;</span>
          <span className="text-lg font-semibold text-emerald-400">
            {justCompleted ? 'Lesson Completed!' : 'You\'ve completed this lesson'}
          </span>
        </div>

        {nextSkillId && (
          <div className="text-center">
            <p className="text-slate-400 mb-3">Ready for the next lesson?</p>
            <Link
              href={`/wiki/${nextSkillId}`}
              className="inline-flex items-center gap-2 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
            >
              Continue to {nextSkillName || 'Next Lesson'}
              <span>&rarr;</span>
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 text-center">
      <p className="text-slate-400 mb-4">Finished reading? Mark this lesson as complete.</p>
      <button
        onClick={handleComplete}
        disabled={isUpdating}
        className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors inline-flex items-center gap-2"
      >
        {isUpdating ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <span>&#x2713;</span>
            Mark as Complete
          </>
        )}
      </button>
    </div>
  );
}
