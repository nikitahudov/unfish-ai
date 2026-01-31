'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useProgress } from '@/lib/hooks/useProgress';
import { useQuizzes } from '@/lib/hooks/useQuizzes';
import { useStats } from '@/lib/hooks/useStats';
import { useActivity } from '@/lib/hooks/useActivity';
import { RequireAuth } from '@/components/auth';

export default function TestDataPage() {
  return (
    <RequireAuth>
      <TestDataContent />
    </RequireAuth>
  );
}

function TestDataContent() {
  const { user, isAuthenticated } = useAuth();
  const {
    progress,
    isLoading: progressLoading,
    markViewed,
    markCompleted,
    refetch: refetchProgress,
  } = useProgress();
  const {
    attempts,
    isLoading: quizLoading,
    submitQuiz,
    refetch: refetchQuizzes,
  } = useQuizzes();
  const { stats, isLoading: statsLoading, refetch: refetchStats } = useStats();
  const { activities, isLoading: activityLoading, refetch: refetchActivity } = useActivity(10);

  const [log, setLog] = useState<string[]>([]);
  const [debugData, setDebugData] = useState<Record<string, unknown> | null>(null);

  const addLog = (message: string) => {
    setLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Fetch debug user data on mount
  useEffect(() => {
    fetch('/api/debug/user')
      .then(r => r.json())
      .then(data => setDebugData(data))
      .catch(err => setDebugData({ error: err.message }));
  }, []);

  const testMarkViewed = async () => {
    addLog('Testing markViewed("1.1")...');
    addLog(`  isAuthenticated=${isAuthenticated}, userId=${user?.id}`);
    try {
      await markViewed('1.1');
      addLog('markViewed returned (check console for [progressService] logs)');
      await refetchProgress();
      addLog(`Refetched progress: ${progress?.length || 0} items`);
    } catch (error) {
      addLog(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const testMarkCompleted = async () => {
    addLog('Testing markCompleted("1.1")...');
    addLog(`  isAuthenticated=${isAuthenticated}`);
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('TIMEOUT after 10s')), 10000)
      );
      await Promise.race([markCompleted('1.1'), timeoutPromise]);
      addLog('markCompleted succeeded');
      await refetchProgress();
      addLog('Refetched progress');
    } catch (error) {
      addLog(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const testQuizSubmit = async () => {
    addLog('Testing submitQuiz...');
    addLog(`  isAuthenticated=${isAuthenticated}`);
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('TIMEOUT after 10s')), 10000)
      );
      const result = await Promise.race([
        submitQuiz({
          skillId: '1.1',
          score: 8,
          maxScore: 10,
          answers: [
            { questionId: 'q1', selectedAnswer: 'A', isCorrect: true },
            { questionId: 'q2', selectedAnswer: 'B', isCorrect: true },
          ],
        }),
        timeoutPromise,
      ]);
      addLog(`submitQuiz succeeded: ${JSON.stringify(result)}`);
      await refetchQuizzes();
      addLog('Refetched quizzes');
    } catch (error) {
      addLog(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // Direct service call test - bypasses hooks entirely
  const testDirectServiceCall = async () => {
    addLog('Testing DIRECT service calls (no hooks)...');

    // Test 1: Direct markViewed
    try {
      const { progressService } = await import('@/lib/services');
      addLog('  [1/3] Calling progressService.markViewed("1.2")...');
      const t1 = Date.now();
      const result = await Promise.race([
        progressService.markViewed('1.2'),
        new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT 10s')), 10000)),
      ]) as Awaited<ReturnType<typeof progressService.markViewed>>;
      addLog(`  [1/3] Direct markViewed SUCCESS (${Date.now() - t1}ms): ${result.id}`);
    } catch (error) {
      addLog(`  [1/3] Direct markViewed ERROR: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Test 2: Direct markCompleted (this is the one that hangs via hook)
    try {
      const { progressService } = await import('@/lib/services');
      addLog('  [2/3] Calling progressService.markCompleted("1.2")...');
      const t2 = Date.now();
      const result = await Promise.race([
        progressService.markCompleted('1.2'),
        new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT 10s')), 10000)),
      ]) as Awaited<ReturnType<typeof progressService.markCompleted>>;
      addLog(`  [2/3] Direct markCompleted SUCCESS (${Date.now() - t2}ms): ${result.id}`);
    } catch (error) {
      addLog(`  [2/3] Direct markCompleted ERROR: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Test 3: Direct quiz submit
    try {
      const { quizService } = await import('@/lib/services');
      addLog('  [3/3] Calling quizService.submit("1.2")...');
      const t3 = Date.now();
      const result = await Promise.race([
        quizService.submit({
          skillId: '1.2',
          score: 7,
          maxScore: 10,
          answers: [{ questionId: 'q1', selectedAnswer: 'A', isCorrect: true }],
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT 10s')), 10000)),
      ]) as Awaited<ReturnType<typeof quizService.submit>>;
      addLog(`  [3/3] Direct submit SUCCESS (${Date.now() - t3}ms): ${result.id}, ${result.percentage}%`);
    } catch (error) {
      addLog(`  [3/3] Direct submit ERROR: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const testCreateUserData = async () => {
    addLog('Creating missing user profile/stats...');
    try {
      const res = await fetch('/api/debug/create-user-data', { method: 'POST' });
      const data = await res.json();
      addLog(`Result: ${JSON.stringify(data)}`);
      // Re-fetch debug data
      const debugRes = await fetch('/api/debug/user');
      const newDebug = await debugRes.json();
      setDebugData(newDebug);
    } catch (error) {
      addLog(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const testServerWrite = async () => {
    addLog('Testing server-side writes (bypasses browser client)...');
    try {
      const res = await fetch('/api/debug/test-write', { method: 'POST' });
      const data = await res.json();
      addLog(`Server write results:`);
      for (const [table, result] of Object.entries(data)) {
        if (table === 'userId') continue;
        const r = result as Record<string, unknown>;
        if (r.success) {
          addLog(`  ${table}: SUCCESS`);
        } else {
          addLog(`  ${table}: FAILED - ${r.error} (code: ${r.code})`);
        }
      }
    } catch (error) {
      addLog(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const refreshAll = async () => {
    addLog('Refreshing all data...');
    await Promise.all([refetchProgress(), refetchQuizzes(), refetchStats(), refetchActivity()]);
    addLog('All data refreshed');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Data Saving Debug Page</h1>

      {/* User Info */}
      <div className="bg-slate-800 rounded-lg p-4 mb-6 border border-slate-700">
        <h2 className="font-semibold text-white mb-2">User Info</h2>
        <p className="text-slate-400 text-sm">ID: {user?.id}</p>
        <p className="text-slate-400 text-sm">Email: {user?.email}</p>
      </div>

      {/* Debug Data from API */}
      <div className="bg-slate-800 rounded-lg p-4 mb-6 border border-slate-700">
        <h2 className="font-semibold text-white mb-2">Debug: Server-Side User Data (/api/debug/user)</h2>
        {debugData ? (
          <div className="space-y-1 text-sm">
            <p className={debugData.authenticated ? 'text-emerald-400' : 'text-red-400'}>
              Authenticated: {String(debugData.authenticated)}
            </p>
            <p className={debugData.profile ? 'text-emerald-400' : 'text-red-400'}>
              Profile: {debugData.profile ? 'EXISTS' : `MISSING (${debugData.profileError || 'null'})`}
            </p>
            <p className={debugData.stats ? 'text-emerald-400' : 'text-red-400'}>
              Stats: {debugData.stats ? 'EXISTS' : `MISSING (${debugData.statsError || 'null'})`}
            </p>
            <p className="text-slate-400">Progress rows: {String(debugData.progressCount)}</p>
            <p className="text-slate-400">Quiz rows: {String(debugData.quizCount)}</p>
            <p className="text-slate-400">Activity rows: {String(debugData.activityCount)}</p>
          </div>
        ) : (
          <p className="text-slate-500 text-sm">Loading...</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={testServerWrite}
          className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-sm font-medium"
        >
          Test Server-Side Writes (RLS check)
        </button>
        <button
          onClick={testCreateUserData}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium"
        >
          Create Missing Profile/Stats
        </button>
        <button
          onClick={testMarkViewed}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium"
        >
          Test: Mark Viewed (1.1)
        </button>
        <button
          onClick={testMarkCompleted}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium"
        >
          Test: Mark Completed (1.1)
        </button>
        <button
          onClick={testQuizSubmit}
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium"
        >
          Test: Submit Quiz (1.1)
        </button>
        <button
          onClick={testDirectServiceCall}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium"
        >
          Test Direct Service Calls (no hooks)
        </button>
        <button
          onClick={refreshAll}
          className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-sm font-medium"
        >
          Refresh All Data
        </button>
      </div>

      {/* Log */}
      <div className="bg-slate-800 rounded-lg p-4 mb-6 border border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-white">Action Log</h2>
          <button onClick={() => setLog([])} className="text-xs text-slate-400 hover:text-white">
            Clear
          </button>
        </div>
        <div className="font-mono text-xs space-y-0.5 max-h-48 overflow-y-auto">
          {log.length === 0 ? (
            <p className="text-slate-500">Click a button above to test...</p>
          ) : (
            log.map((entry, i) => (
              <p key={i} className={entry.includes('ERROR') ? 'text-red-400' : 'text-emerald-400'}>
                {entry}
              </p>
            ))
          )}
        </div>
      </div>

      {/* Current Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <h2 className="font-semibold text-white mb-2">
            Progress ({progressLoading ? '...' : progress?.length || 0})
          </h2>
          <pre className="text-xs text-slate-400 overflow-auto max-h-48 whitespace-pre-wrap">
            {progressLoading ? 'Loading...' : JSON.stringify(progress, null, 2)}
          </pre>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <h2 className="font-semibold text-white mb-2">
            Quiz Attempts ({quizLoading ? '...' : attempts?.length || 0})
          </h2>
          <pre className="text-xs text-slate-400 overflow-auto max-h-48 whitespace-pre-wrap">
            {quizLoading ? 'Loading...' : JSON.stringify(attempts, null, 2)}
          </pre>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <h2 className="font-semibold text-white mb-2">
            User Stats {statsLoading && '(loading...)'}
          </h2>
          <pre className="text-xs text-slate-400 overflow-auto max-h-48 whitespace-pre-wrap">
            {statsLoading ? 'Loading...' : JSON.stringify(stats, null, 2)}
          </pre>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <h2 className="font-semibold text-white mb-2">
            Recent Activity ({activityLoading ? '...' : activities?.length || 0})
          </h2>
          <pre className="text-xs text-slate-400 overflow-auto max-h-48 whitespace-pre-wrap">
            {activityLoading ? 'Loading...' : JSON.stringify(activities, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
