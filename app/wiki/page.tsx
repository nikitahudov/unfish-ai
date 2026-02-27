'use client';

import React from 'react';
import { SkillsWheel } from '@/components/wiki/SkillsWheel';

export default function WikiPage() {
  console.log('[PAGE RENDER: wiki]', new Date().toISOString())
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          📚 Poker Curriculum
        </h1>
        <p className="text-slate-400 text-lg">
          Master 96 essential poker skills across 12 categories
        </p>
      </div>

      {/* Phase Navigation */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          { id: 'all', label: 'All Skills', count: 96, active: true },
          { id: 'phase1', label: 'Phase 1: Fundamentals', count: 26, color: 'emerald' },
          { id: 'phase2', label: 'Phase 2: Intermediate', count: 43, color: 'yellow' },
          { id: 'phase3', label: 'Phase 3: Advanced', count: 27, color: 'rose' },
        ].map((phase) => (
          <button
            key={phase.id}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              phase.active
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600'
            }`}
          >
            {phase.label}
            <span className="ml-2 opacity-70">({phase.count})</span>
          </button>
        ))}
      </div>

      {/* Skills Wheel */}
      <SkillsWheel />

      {/* Learning Path Info */}
      <div className="mt-8 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-2xl p-6 border border-amber-500/20">
        <h2 className="text-xl font-bold text-white mb-4">🎯 How to Use This Curriculum</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">1</span>
              <h3 className="font-semibold text-white">Start with Fundamentals</h3>
            </div>
            <p className="text-slate-400 text-sm">
              Begin with Phase 1 skills. These form the foundation of solid poker play.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold">2</span>
              <h3 className="font-semibold text-white">Take Assessments</h3>
            </div>
            <p className="text-slate-400 text-sm">
              Test your knowledge with quizzes. Score 80% or higher to mark a skill as complete.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold">3</span>
              <h3 className="font-semibold text-white">Practice & Progress</h3>
            </div>
            <p className="text-slate-400 text-sm">
              Apply skills at the table. Track your hands played to unlock advanced content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
