'use client';

import React from 'react';
import { RequireAuth } from '@/components/auth';
import { CoachInterface } from '@/components/coach/CoachInterface';

export default function CoachPage() {
  console.log('[PAGE RENDER: coach]', new Date().toISOString())
  return (
    <RequireAuth feature="AI Coach">
      <div className="min-h-screen bg-slate-900">
        <CoachInterface />
      </div>
    </RequireAuth>
  );
}
