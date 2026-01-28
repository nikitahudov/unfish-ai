'use client';

import React from 'react';
import { buildCoachContext } from '@/lib/coach/contextBuilder';
import type { QuizTopic } from '@/types/coach';

interface QuizTopicSelectorProps {
  onSelectTopic: (topic: QuizTopic, difficulty: 'easy' | 'medium' | 'hard') => void;
  onCustomTopic: () => void;
}

// Core quiz topics mapped to curriculum
const QUIZ_TOPICS: QuizTopic[] = [
  { id: 'pot-odds', name: 'Pot Odds', skillId: '1.1', description: 'Calculate pot odds and make calling decisions', icon: '🔢' },
  { id: 'equity', name: 'Equity', skillId: '1.2', description: 'Hand vs hand and hand vs range equity', icon: '📊' },
  { id: 'position', name: 'Position', skillId: '2.2', description: 'Positional awareness and advantages', icon: '🎯' },
  { id: 'starting-hands', name: 'Starting Hands', skillId: '2.1', description: 'Hand selection and categories', icon: '🃏' },
  { id: 'cbetting', name: 'C-Betting', skillId: '3.1', description: 'Continuation betting strategy', icon: '💰' },
  { id: 'value-betting', name: 'Value Betting', skillId: '3.2', description: 'Extracting value from strong hands', icon: '💎' },
  { id: 'bluffing', name: 'Bluffing', skillId: '4.1', description: 'Semi-bluffs and bluff spots', icon: '🎭' },
  { id: 'board-texture', name: 'Board Texture', skillId: '5.1', description: 'Reading and categorizing boards', icon: '🎲' },
  { id: 'player-types', name: 'Player Types', skillId: '7.1', description: 'Profiling and adjusting to opponents', icon: '👥' },
  { id: 'bankroll', name: 'Bankroll Management', skillId: '8.1', description: 'Stakes and bankroll decisions', icon: '🏦' },
  { id: 'mental-game', name: 'Mental Game', skillId: '6.1', description: 'Tilt, focus, and mindset', icon: '🧠' },
  { id: 'mixed', name: 'Mixed Topics', description: 'Random questions from all areas', icon: '🎰' },
];

export function QuizTopicSelector({ onSelectTopic, onCustomTopic }: QuizTopicSelectorProps) {
  const [selectedTopic, setSelectedTopic] = React.useState<QuizTopic | null>(null);
  const [difficulty, setDifficulty] = React.useState<'easy' | 'medium' | 'hard'>('medium');

  const context = buildCoachContext();

  // Sort topics: weak areas first, then completed, then not started
  const sortedTopics = [...QUIZ_TOPICS].sort((a, b) => {
    const aWeak = context.weakAreas.find(w => w.skillId === a.skillId);
    const bWeak = context.weakAreas.find(w => w.skillId === b.skillId);
    const aCompleted = a.skillId && context.completedSkills.includes(a.skillId);
    const bCompleted = b.skillId && context.completedSkills.includes(b.skillId);

    // Weak areas first
    if (aWeak && !bWeak) return -1;
    if (!aWeak && bWeak) return 1;

    // Then completed
    if (aCompleted && !bCompleted) return -1;
    if (!aCompleted && bCompleted) return 1;

    return 0;
  });

  const handleStart = () => {
    if (selectedTopic) {
      onSelectTopic(selectedTopic, difficulty);
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-2">📝 Quiz Mode</h3>
      <p className="text-slate-400 text-sm mb-6">
        Test your knowledge with adaptive questions. I&apos;ll adjust difficulty based on how you&apos;re doing.
      </p>

      {/* Recommended Section */}
      {context.weakAreas.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-amber-400 mb-2">💡 Recommended for you:</h4>
          <div className="flex flex-wrap gap-2">
            {context.weakAreas.slice(0, 3).map(area => {
              const topic = QUIZ_TOPICS.find(t => t.skillId === area.skillId);
              if (!topic) return null;
              return (
                <button
                  key={area.skillId}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    selectedTopic?.id === topic.id
                      ? 'bg-amber-500 text-white'
                      : 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30'
                  }`}
                >
                  {topic.icon} {topic.name} ({area.score}%)
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* All Topics Grid */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-300 mb-3">Choose a topic:</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {sortedTopics.map(topic => {
            const isWeak = context.weakAreas.find(w => w.skillId === topic.skillId);
            const isCompleted = topic.skillId && context.completedSkills.includes(topic.skillId);
            const isSelected = selectedTopic?.id === topic.id;

            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`p-3 rounded-lg text-left transition-all border ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-white'
                    : 'bg-slate-700/50 border-slate-600 hover:border-slate-500 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{topic.icon}</span>
                  <span className="font-medium text-sm">{topic.name}</span>
                  {isWeak && <span className="text-xs text-rose-400">⚠️</span>}
                  {isCompleted && !isWeak && <span className="text-xs text-emerald-400">✓</span>}
                </div>
                <p className="text-xs text-slate-500 line-clamp-1">{topic.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty Selector */}
      {selectedTopic && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-300 mb-3">Starting difficulty:</h4>
          <div className="flex gap-2">
            {(['easy', 'medium', 'hard'] as const).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`flex-1 py-2 rounded-lg capitalize transition-all ${
                  difficulty === d
                    ? d === 'easy'
                      ? 'bg-emerald-500 text-white'
                      : d === 'medium'
                        ? 'bg-amber-500 text-white'
                        : 'bg-rose-500 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Difficulty will automatically adjust based on your performance.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleStart}
          disabled={!selectedTopic}
          className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          {selectedTopic ? `Start ${selectedTopic.name} Quiz` : 'Select a topic'}
        </button>
        <button
          onClick={onCustomTopic}
          className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
        >
          Custom
        </button>
      </div>
    </div>
  );
}
