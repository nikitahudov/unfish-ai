'use client';

import React from 'react';
import Link from 'next/link';
import { skillsData, getAllSkills } from '@/data/skills';

export default function AssessPage() {
  const allSkills = getAllSkills();
  const skillsWithQuiz = allSkills.filter((s) => s.hasQuiz);

  // Group by phase
  const phases = [
    {
      id: 1,
      name: 'Phase 1: Fundamentals',
      color: 'emerald',
      skills: allSkills.filter((s) => s.level === 'Fundamental'),
    },
    {
      id: 2,
      name: 'Phase 2: Intermediate',
      color: 'yellow',
      skills: allSkills.filter((s) => s.level === 'Intermediate'),
    },
    {
      id: 3,
      name: 'Phase 3: Advanced',
      color: 'rose',
      skills: allSkills.filter((s) => s.level === 'Advanced'),
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          ✅ Skill Assessments
        </h1>
        <p className="text-slate-400 text-lg">
          Test your knowledge and track your mastery progress
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="text-3xl font-bold text-amber-400">{allSkills.length}</div>
          <div className="text-slate-400 text-sm">Total Quizzes</div>
        </div>
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="text-3xl font-bold text-emerald-400">{skillsWithQuiz.length}</div>
          <div className="text-slate-400 text-sm">Available Now</div>
        </div>
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="text-3xl font-bold text-blue-400">0</div>
          <div className="text-slate-400 text-sm">Completed</div>
        </div>
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="text-3xl font-bold text-purple-400">0%</div>
          <div className="text-slate-400 text-sm">Avg. Score</div>
        </div>
      </div>

      {/* Featured Quiz */}
      <div className="mb-8 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-2xl p-6 border border-amber-500/30">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-amber-400 text-sm font-medium mb-2">📌 RECOMMENDED</div>
            <h2 className="text-2xl font-bold text-white mb-2">1.1 Pot Odds</h2>
            <p className="text-slate-300 mb-4">
              Master the fundamental skill of calculating pot odds. This quiz covers
              ratio calculations, percentage conversions, and practical application.
            </p>
            <div className="flex gap-4 text-sm text-slate-400">
              <span>📝 24 questions</span>
              <span>⏱️ 20-30 minutes</span>
              <span>🎯 80% to pass</span>
            </div>
          </div>
          <Link
            href="/assess/quiz/1.1"
            className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors whitespace-nowrap"
          >
            Start Quiz
          </Link>
        </div>
      </div>

      {/* Quizzes by Phase */}
      <div className="space-y-8">
        {phases.map((phase) => (
          <div key={phase.id}>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span
                className={`w-3 h-3 rounded-full bg-${phase.color}-500`}
                style={{
                  backgroundColor:
                    phase.color === 'emerald'
                      ? '#10B981'
                      : phase.color === 'yellow'
                      ? '#EAB308'
                      : '#F43F5E',
                }}
              />
              {phase.name}
              <span className="text-sm font-normal text-slate-500">
                ({phase.skills.length} skills)
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {phase.skills.map((skill) => {
                const hasQuiz = skill.hasQuiz;
                return (
                  <div
                    key={skill.id}
                    className={`bg-slate-800/50 rounded-xl p-4 border transition-all ${
                      hasQuiz
                        ? 'border-slate-700/50 hover:border-slate-600'
                        : 'border-slate-800/50 opacity-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-mono text-xs text-slate-500">{skill.id}</div>
                        <h3 className="font-medium text-white">{skill.name}</h3>
                      </div>
                      {hasQuiz ? (
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                          Available
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-slate-700/50 text-slate-500 text-xs rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {skill.description}
                    </p>
                    {hasQuiz ? (
                      <Link
                        href={`/assess/quiz/${skill.id}`}
                        className="block w-full text-center py-2 bg-slate-700/50 text-amber-400 rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium"
                      >
                        Start Quiz →
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="block w-full text-center py-2 bg-slate-800/50 text-slate-600 rounded-lg text-sm cursor-not-allowed"
                      >
                        Not Available
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Quiz Modes Info */}
      <div className="mt-12 bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
        <h2 className="text-xl font-bold text-white mb-4">📋 Quiz Modes</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-slate-700/30 rounded-xl">
            <div className="text-2xl mb-2">📝</div>
            <h3 className="font-semibold text-white mb-1">Standard Mode</h3>
            <p className="text-slate-400 text-sm">
              No time pressure. See explanations after each question. Best for learning.
            </p>
          </div>
          <div className="p-4 bg-slate-700/30 rounded-xl">
            <div className="text-2xl mb-2">⏱️</div>
            <h3 className="font-semibold text-white mb-1">Timed Mode</h3>
            <p className="text-slate-400 text-sm">
              Complete the quiz within a time limit. Tests recall under pressure.
            </p>
          </div>
          <div className="p-4 bg-slate-700/30 rounded-xl">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-white mb-1">Speed Mode</h3>
            <p className="text-slate-400 text-sm">
              Fast-paced questions with countdown timers. Simulates real game decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
