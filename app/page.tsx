'use client';

import React from 'react';
import Link from 'next/link';
import { skillsData, getSkillCount } from '@/data/skills';

export default function DashboardPage() {
  const skillCount = getSkillCount();
  
  // Quick actions for the dashboard
  const quickActions = [
    {
      title: 'Continue Learning',
      description: 'Pick up where you left off',
      icon: '📖',
      href: '/wiki',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Take a Quiz',
      description: 'Test your knowledge',
      icon: '✅',
      href: '/assess',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      title: 'Ask AI Coach',
      description: 'Get personalized help',
      icon: '🤖',
      href: '/coach',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Poker Tools',
      description: 'GTO charts & calculators',
      icon: '🛠️',
      href: '/tools',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  // Recent/recommended skills
  const recommendedSkills = [
    { id: '1.1', name: 'Pot Odds', category: 'Mathematical Foundations' },
    { id: '2.1', name: 'Starting Hand Selection', category: 'Pre-Flop Strategy' },
    { id: '6.1', name: 'Tilt Control', category: 'Mental Game' },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Welcome to 24P Academy 🎰
        </h1>
        <p className="text-slate-400 text-lg">
          Your journey to poker mastery starts here
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="text-3xl font-bold text-amber-400">{skillCount.total}</div>
          <div className="text-slate-400 text-sm">Total Skills</div>
        </div>
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="text-3xl font-bold text-emerald-400">{skillCount.fundamental}</div>
          <div className="text-slate-400 text-sm">Fundamental</div>
        </div>
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="text-3xl font-bold text-yellow-400">{skillCount.intermediate}</div>
          <div className="text-slate-400 text-sm">Intermediate</div>
        </div>
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="text-3xl font-bold text-rose-400">{skillCount.advanced}</div>
          <div className="text-slate-400 text-sm">Advanced</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all hover:scale-[1.02]"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <span className="text-2xl">{action.icon}</span>
              </div>
              <h3 className="font-semibold text-white mb-1">{action.title}</h3>
              <p className="text-slate-400 text-sm">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recommended Next */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-bold text-white mb-4">📌 Recommended Next</h2>
          <div className="space-y-3">
            {recommendedSkills.map((skill) => (
              <Link
                key={skill.id}
                href={`/wiki/${skill.id}`}
                className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-mono text-sm">
                  {skill.id}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">{skill.name}</div>
                  <div className="text-sm text-slate-400">{skill.category}</div>
                </div>
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
          <Link
            href="/wiki"
            className="mt-4 block text-center text-amber-400 hover:text-amber-300 text-sm font-medium"
          >
            View All Skills →
          </Link>
        </div>

        {/* Skill Categories Overview */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-bold text-white mb-4">📊 Skill Categories</h2>
          <div className="space-y-3">
            {Object.entries(skillsData).slice(0, 6).map(([name, category]) => (
              <div key={name} className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <span>{category.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{name}</div>
                  <div className="text-xs text-slate-400">{category.skills.length} skills</div>
                </div>
                <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      backgroundColor: category.color,
                      width: '0%' // Will be dynamic based on progress
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/progress"
            className="mt-4 block text-center text-amber-400 hover:text-amber-300 text-sm font-medium"
          >
            View Full Progress →
          </Link>
        </div>
      </div>

      {/* Learning Path Preview */}
      <div className="mt-8 bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
        <h2 className="text-xl font-bold text-white mb-4">🎯 Your Learning Path</h2>
        <div className="flex items-center gap-4 overflow-x-auto pb-4">
          {['Phase 1: Fundamentals', 'Phase 2: Intermediate', 'Phase 3: Advanced'].map((phase, index) => (
            <div
              key={phase}
              className={`flex-shrink-0 p-4 rounded-xl border ${
                index === 0
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-700/30 border-slate-600/30 text-slate-400'
              }`}
            >
              <div className="font-medium">{phase}</div>
              <div className="text-sm opacity-70">
                {index === 0 ? '26 skills' : index === 1 ? '43 skills' : '27 skills'}
              </div>
            </div>
          ))}
        </div>
        <p className="text-slate-400 text-sm">
          Start with the fundamentals to build a solid foundation. Each phase unlocks as you master the previous one.
        </p>
      </div>
    </div>
  );
}
