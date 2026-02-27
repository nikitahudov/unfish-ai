'use client';

import React, { useState, useEffect } from 'react';
import { skillsData, getAllSkills } from '@/data/skills';
import { useProgressStore } from '@/lib/progressStore';
import { useAuth } from '@/lib/auth/AuthContext';
import { useProgress } from '@/lib/hooks/useProgress';
import { useStats } from '@/lib/hooks/useStats';
import { useActivity } from '@/lib/hooks/useActivity';
import { useQuizzes } from '@/lib/hooks/useQuizzes';
import { UserStatsCard } from '@/components/stats/UserStatsCard';
import { RecentActivity } from '@/components/stats/RecentActivity';

export default function ProgressPage() {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // LocalStorage store (fallback for guests)
  const storeStats = useProgressStore((state) => state.stats);
  const localSkills = useProgressStore((state) => state.skills);
  const quizAttempts = useProgressStore((state) => state.quizAttempts);
  const contentProgress = useProgressStore((state) => state.contentProgress);

  // Supabase hooks (for authenticated users)
  const { stats: progressStats, skillsByStatus } = useProgress();
  const { stats: userStats, progressPercentage, formattedStudyTime } = useStats();
  const { activities } = useActivity(10);
  const { stats: quizStats } = useQuizzes();

  useEffect(() => {
    setMounted(true);
  }, []);

  const allSkills = getAllSkills();

  // Use Supabase data when authenticated, localStorage otherwise
  const useSupabaseData = isAuthenticated && !authLoading;

  // Calculate content stats from localStorage (guest fallback)
  const localContentStats = Object.entries(contentProgress).reduce((acc, [, progress]) => {
    acc.totalViewed++;
    acc.totalTimeSeconds += progress.timeSpentSeconds;
    acc.totalExercisesCompleted += progress.exercisesCompleted;
    acc.totalExercises += progress.exercisesTotal;
    if (progress.exercisesCompleted >= progress.exercisesTotal &&
        progress.scenariosCompleted >= progress.scenariosTotal) {
      acc.fullyCompleted++;
    }
    return acc;
  }, {
    totalViewed: 0,
    fullyCompleted: 0,
    totalTimeSeconds: 0,
    totalExercisesCompleted: 0,
    totalExercises: 0
  });

  // Format time helper
  const formatStudyTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  // Unified stats (Supabase or localStorage)
  const skillsCompleted = useSupabaseData
    ? (userStats?.skills_completed || 0)
    : Object.values(localSkills).filter((s) => s.status === 'completed').length;

  const stats = {
    skillsCompleted,
    totalSkills: allSkills.length,
    quizzesCompleted: useSupabaseData
      ? (userStats?.quizzes_passed || 0)
      : storeStats.totalQuizzesPassed,
    averageScore: useSupabaseData
      ? (userStats?.average_quiz_score || 0)
      : storeStats.averageScore,
    studyHours: useSupabaseData
      ? Math.round((userStats?.total_study_time_seconds || 0) / 3600)
      : Math.round(storeStats.totalStudyTime / 3600),
    currentStreak: useSupabaseData
      ? (userStats?.current_streak || 0)
      : storeStats.currentStreak,
    longestStreak: useSupabaseData
      ? (userStats?.longest_streak || 0)
      : storeStats.longestStreak,
    handsPlayed: 0,
  };

  // Calculate category progress
  const categories = Object.entries(skillsData).map(([name, data]) => {
    const categorySkillIds = data.skills.map((s) => s.id);
    const completed = useSupabaseData
      ? categorySkillIds.filter((id) => skillsByStatus.completed.includes(id)).length
      : categorySkillIds.filter((id) => localSkills[id]?.status === 'completed').length;
    return {
      name,
      icon: data.icon,
      color: data.color,
      total: data.skills.length,
      completed,
      percentage: Math.round((completed / data.skills.length) * 100),
    };
  });

  // Phase breakdown
  const fundamentalSkills = allSkills.filter((s) => s.level === 'Fundamental');
  const intermediateSkills = allSkills.filter((s) => s.level === 'Intermediate');
  const advancedSkills = allSkills.filter((s) => s.level === 'Advanced');

  const isPhaseSkillCompleted = (skillId: string) => {
    if (useSupabaseData) {
      return skillsByStatus.completed.includes(skillId);
    }
    return localSkills[skillId]?.status === 'completed';
  };

  const phases = [
    {
      name: 'Fundamentals',
      completed: fundamentalSkills.filter((s) => isPhaseSkillCompleted(s.id)).length,
      total: fundamentalSkills.length,
      color: '#10B981',
    },
    {
      name: 'Intermediate',
      completed: intermediateSkills.filter((s) => isPhaseSkillCompleted(s.id)).length,
      total: intermediateSkills.length,
      color: '#EAB308',
    },
    {
      name: 'Advanced',
      completed: advancedSkills.filter((s) => isPhaseSkillCompleted(s.id)).length,
      total: advancedSkills.length,
      color: '#F43F5E',
    },
  ];

  // Get recent attempts from localStorage for guest users
  const recentAttempts = Object.entries(quizAttempts)
    .flatMap(([moduleId, attempts]) =>
      attempts.map((attempt) => ({
        moduleId,
        ...attempt,
      }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  // Content stats (Supabase or localStorage)
  const contentStats = useSupabaseData ? {
    totalViewed: progressStats?.viewedSkills || 0,
    fullyCompleted: progressStats?.completedSkills || 0,
    totalTimeSeconds: progressStats?.totalTimeSeconds || 0,
    totalExercisesCompleted: localContentStats.totalExercisesCompleted, // Exercises not tracked in Supabase yet
    totalExercises: localContentStats.totalExercises,
  } : localContentStats;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Your Progress
        </h1>
        <p className="text-slate-400 text-lg">Track your journey from fish to shark</p>
      </div>

      {/* Supabase-backed Stats Card for authenticated users */}
      {useSupabaseData && (
        <div className="mb-8">
          <UserStatsCard />
        </div>
      )}

      {/* Overall Progress Card (shown for guests or as supplement) */}
      {!useSupabaseData && (
        <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-2xl p-6 border border-amber-500/30 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Overall Mastery</h2>
            <span className="text-3xl font-bold text-amber-400">
              {Math.round((stats.skillsCompleted / stats.totalSkills) * 100)}%
            </span>
          </div>
          <div className="h-4 bg-slate-700 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${(stats.skillsCompleted / stats.totalSkills) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-slate-400">
            <span>{stats.skillsCompleted} skills completed</span>
            <span>{stats.totalSkills - stats.skillsCompleted} remaining</span>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="text-3xl font-bold text-emerald-400">{stats.quizzesCompleted}</div>
          <div className="text-slate-400 text-sm">Quizzes Passed</div>
        </div>
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="text-3xl font-bold text-blue-400">{Math.round(stats.averageScore)}%</div>
          <div className="text-slate-400 text-sm">Average Score</div>
        </div>
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="text-3xl font-bold text-purple-400">
            {useSupabaseData ? formattedStudyTime : `${stats.studyHours}h`}
          </div>
          <div className="text-slate-400 text-sm">Study Time</div>
        </div>
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="text-3xl font-bold text-amber-400">{stats.currentStreak}</div>
          <div className="text-slate-400 text-sm">Day Streak</div>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Learning Progress</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{contentStats.totalViewed}</div>
            <div className="text-slate-400 text-sm">Lessons Started</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{contentStats.fullyCompleted}</div>
            <div className="text-slate-400 text-sm">Lessons Completed</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">{formatStudyTime(contentStats.totalTimeSeconds)}</div>
            <div className="text-slate-400 text-sm">Study Time</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {contentStats.totalExercisesCompleted}/{contentStats.totalExercises}
            </div>
            <div className="text-slate-400 text-sm">Exercises Done</div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Phase Progress */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-bold text-white mb-4">Phase Progress</h2>
          <div className="space-y-6">
            {phases.map((phase) => (
              <div key={phase.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{phase.name}</span>
                  <span className="text-slate-400 text-sm">
                    {phase.completed}/{phase.total}
                  </span>
                </div>
                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(phase.completed / phase.total) * 100}%`,
                      backgroundColor: phase.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-bold text-white mb-4">Milestones</h2>
          <div className="space-y-3">
            {[
              { name: 'First Quiz', icon: '🎯', requirement: 'Complete your first quiz', done: stats.quizzesCompleted > 0 },
              { name: 'Foundation Builder', icon: '🧱', requirement: 'Complete 5 fundamental skills', done: phases[0].completed >= 5 },
              { name: 'Week Warrior', icon: '📅', requirement: '7 day study streak', done: stats.longestStreak >= 7 },
              { name: 'Math Master', icon: '🔢', requirement: 'Complete all Math skills', done: false },
              { name: 'Phase 1 Graduate', icon: '🎓', requirement: 'Complete all fundamentals', done: phases[0].completed >= phases[0].total },
              { name: 'Poker Scholar', icon: '📚', requirement: 'Complete 50 skills', done: stats.skillsCompleted >= 50 },
            ].map((milestone) => (
              <div
                key={milestone.name}
                className={`flex items-center gap-4 p-3 rounded-xl ${
                  milestone.done ? 'bg-emerald-500/10' : 'bg-slate-700/30'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    milestone.done ? 'bg-emerald-500/20' : 'bg-slate-600/50'
                  }`}
                >
                  <span className={milestone.done ? '' : 'opacity-50'}>{milestone.icon}</span>
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${milestone.done ? 'text-emerald-400' : 'text-white'}`}>
                    {milestone.name}
                  </div>
                  <div className="text-xs text-slate-400">{milestone.requirement}</div>
                </div>
                {milestone.done && (
                  <span className="text-emerald-400">✓</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Progress */}
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
        <h2 className="text-xl font-bold text-white mb-4">Progress by Category</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-xl">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${cat.color}20` }}
              >
                <span>{cat.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">{cat.name}</span>
                  <span className="text-xs text-slate-400">
                    {cat.completed}/{cat.total}
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity - Supabase version for authenticated users */}
      {useSupabaseData && (
        <div className="mt-8">
          <RecentActivity />
        </div>
      )}

      {/* Recent Activity - localStorage fallback for guests */}
      {!useSupabaseData && mounted && recentAttempts.length > 0 && (
        <div className="mt-8 bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentAttempts.map((attempt) => {
              const attemptDate = new Date(attempt.date);
              const skill = allSkills.find((s) => s.id === attempt.moduleId);
              return (
                <div
                  key={attempt.attemptId}
                  className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-xl"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      attempt.passed ? 'bg-emerald-500/20' : 'bg-slate-600/50'
                    }`}
                  >
                    <span className="text-2xl">{attempt.passed ? '✓' : '📝'}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">
                        {skill?.name || attempt.moduleId}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          attempt.passed
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-slate-600/50 text-slate-400'
                        }`}
                      >
                        {attempt.score}%
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      {attemptDate.toLocaleDateString()} at {attemptDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {' • '}
                      {Math.round(attempt.timeSpent / 60)} min
                    </div>
                  </div>
                  {attempt.passed && (
                    <span className="text-emerald-400 font-medium">Passed</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Hands Played Tracker */}
      <div className="mt-8 bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
        <h2 className="text-xl font-bold text-white mb-4">Hands Played</h2>
        <div className="flex items-center gap-8">
          <div>
            <div className="text-4xl font-bold text-amber-400">{stats.handsPlayed.toLocaleString()}</div>
            <div className="text-slate-400">Total hands logged</div>
          </div>
          <div className="flex-1">
            <div className="text-sm text-slate-400 mb-2">
              Phase requirements:
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-300 text-sm">Fundamentals: 5,000 hands</span>
                <span className="text-slate-500 text-sm ml-auto">
                  {Math.min(100, Math.round((stats.handsPlayed / 5000) * 100))}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-slate-300 text-sm">Intermediate: 25,000 hands</span>
                <span className="text-slate-500 text-sm ml-auto">
                  {Math.min(100, Math.round((stats.handsPlayed / 25000) * 100))}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="text-slate-300 text-sm">Advanced: 100,000 hands</span>
                <span className="text-slate-500 text-sm ml-auto">
                  {Math.min(100, Math.round((stats.handsPlayed / 100000) * 100))}%
                </span>
              </div>
            </div>
          </div>
          <button className="px-6 py-3 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl hover:bg-amber-500/30 transition-colors font-medium">
            Log Hands
          </button>
        </div>
      </div>
    </div>
  );
}
