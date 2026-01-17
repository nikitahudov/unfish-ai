'use client';

import React from 'react';
import { skillsData } from '@/data/skills';

export default function ProgressPage() {
  // Calculate category progress (mock data for now)
  const categories = Object.entries(skillsData).map(([name, data]) => {
    const completed = 0; // Will come from store
    return {
      name,
      icon: data.icon,
      color: data.color,
      total: data.skills.length,
      completed,
      percentage: Math.round((completed / data.skills.length) * 100),
    };
  });

  // Mock stats (will come from store)
  const stats = {
    skillsCompleted: 0,
    totalSkills: 96,
    quizzesCompleted: 0,
    averageScore: 0,
    studyHours: 0,
    currentStreak: 0,
    longestStreak: 0,
    handsPlayed: 0,
  };

  // Phase breakdown
  const phases = [
    { name: 'Fundamentals', completed: 0, total: 26, color: '#10B981' },
    { name: 'Intermediate', completed: 0, total: 43, color: '#EAB308' },
    { name: 'Advanced', completed: 0, total: 27, color: '#F43F5E' },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          📈 Your Progress
        </h1>
        <p className="text-slate-400 text-lg">Track your journey to poker mastery</p>
      </div>

      {/* Overall Progress Card */}
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

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="text-3xl font-bold text-emerald-400">{stats.quizzesCompleted}</div>
          <div className="text-slate-400 text-sm">Quizzes Passed</div>
        </div>
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="text-3xl font-bold text-blue-400">{stats.averageScore}%</div>
          <div className="text-slate-400 text-sm">Average Score</div>
        </div>
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="text-3xl font-bold text-purple-400">{stats.studyHours}</div>
          <div className="text-slate-400 text-sm">Study Hours</div>
        </div>
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="text-3xl font-bold text-amber-400">{stats.currentStreak}</div>
          <div className="text-slate-400 text-sm">Day Streak 🔥</div>
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
          <h2 className="text-xl font-bold text-white mb-4">🏆 Milestones</h2>
          <div className="space-y-3">
            {[
              { name: 'First Quiz', icon: '🎯', requirement: 'Complete your first quiz', done: false },
              { name: 'Foundation Builder', icon: '🧱', requirement: 'Complete 5 fundamental skills', done: false },
              { name: 'Week Warrior', icon: '📅', requirement: '7 day study streak', done: false },
              { name: 'Math Master', icon: '🔢', requirement: 'Complete all Math skills', done: false },
              { name: 'Phase 1 Graduate', icon: '🎓', requirement: 'Complete all fundamentals', done: false },
              { name: 'Poker Scholar', icon: '📚', requirement: 'Complete 50 skills', done: false },
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

      {/* Hands Played Tracker */}
      <div className="mt-8 bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
        <h2 className="text-xl font-bold text-white mb-4">🃏 Hands Played</h2>
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
