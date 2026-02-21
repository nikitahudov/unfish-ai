'use client';

import React, { useState } from 'react';
import { RequireAuth } from '@/components/auth';
import { useAuth } from '@/lib/auth/AuthContext';
import { useStats, useProgress, useQuizzes, useCoachConversations } from '@/lib/hooks';
import { createClient } from '@/lib/supabase/client';

export default function DataSettingsPage() {
  return (
    <RequireAuth feature="Settings">
      <DataSettings />
    </RequireAuth>
  );
}

function DataSettings() {
  const { user, signOut } = useAuth();
  const { stats } = useStats();
  const { progress } = useProgress();
  const { attempts } = useQuizzes();
  const { conversations } = useCoachConversations();

  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExportData = async () => {
    setIsExporting(true);
    setMessage(null);

    try {
      const exportData = {
        exportedAt: new Date().toISOString(),
        user: {
          email: user?.email,
          profile: user?.profile,
        },
        stats,
        progress,
        quizAttempts: attempts,
        conversations: conversations?.map(c => ({
          ...c,
          messages: c.messages,
        })),
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `unfish-ai-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setMessage({ type: 'success', text: 'Data exported successfully!' });
    } catch (error) {
      console.error('Export error:', error);
      setMessage({ type: 'error', text: 'Failed to export data' });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') {
      setMessage({ type: 'error', text: 'Please type DELETE to confirm' });
      return;
    }

    setIsDeleting(true);
    setMessage(null);

    try {
      const supabase = createClient();

      const userId = user?.id;
      if (!userId) return;

      // Delete all user data (RLS will ensure only user's data is deleted)
      await Promise.all([
        supabase.from('activity_log').delete().eq('user_id', userId),
        supabase.from('coach_conversations').delete().eq('user_id', userId),
        supabase.from('quiz_attempts').delete().eq('user_id', userId),
        supabase.from('skill_progress').delete().eq('user_id', userId),
        supabase.from('user_stats').delete().eq('user_id', userId),
        supabase.from('user_profiles').delete().eq('id', userId),
      ]);

      setMessage({ type: 'success', text: 'Account deleted. Signing out...' });

      setTimeout(() => {
        signOut();
      }, 2000);
    } catch (error) {
      console.error('Delete error:', error);
      setMessage({ type: 'error', text: 'Failed to delete account. Please contact support.' });
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success'
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
            : 'bg-red-500/10 border border-red-500/30 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      {/* Data Summary */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Your Data Summary</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{progress?.length || 0}</div>
            <div className="text-sm text-slate-400">Skills Tracked</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{attempts?.length || 0}</div>
            <div className="text-sm text-slate-400">Quiz Attempts</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{conversations?.length || 0}</div>
            <div className="text-sm text-slate-400">Conversations</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {Math.round((stats?.total_study_time_seconds || 0) / 3600 * 10) / 10}h
            </div>
            <div className="text-sm text-slate-400">Study Time</div>
          </div>
        </div>
      </div>

      {/* Export Data */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Export Your Data</h2>
        <p className="text-slate-400 mb-4">
          Download all your data including progress, quiz results, and conversation history.
        </p>
        <button
          onClick={handleExportData}
          disabled={isExporting}
          className="px-6 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          {isExporting ? 'Exporting...' : 'Export All Data (JSON)'}
        </button>
      </div>

      {/* Clear Progress */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Clear Progress</h2>
        <p className="text-slate-400 mb-4">
          Reset your learning progress while keeping your account. This will clear all skill progress and quiz results.
        </p>
        <button
          onClick={() => {
            if (confirm('Are you sure? This will reset all your progress but keep your account.')) {
              alert('Coming soon!');
            }
          }}
          className="px-6 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-medium rounded-lg transition-colors"
        >
          Reset Progress
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/5 rounded-xl border border-red-500/20 p-6">
        <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>
        <p className="text-slate-400 mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Type <span className="font-mono text-red-400">DELETE</span> to confirm
            </label>
            <input
              type="text"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              className="w-full max-w-xs px-4 py-2 bg-slate-800 text-white rounded-lg border border-red-500/30 focus:border-red-500 outline-none"
              placeholder="DELETE"
            />
          </div>
          <button
            onClick={handleDeleteAccount}
            disabled={deleteConfirm !== 'DELETE' || isDeleting}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            {isDeleting ? 'Deleting...' : 'Delete My Account'}
          </button>
        </div>
      </div>
    </div>
  );
}
