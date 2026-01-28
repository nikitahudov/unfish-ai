'use client';

import React from 'react';
import type { CoachMode } from '@/types/coach';
import { buildCoachContext } from '@/lib/coach/contextBuilder';

interface QuickActionsProps {
  onAction: (message: string, mode?: CoachMode) => void;
  currentMode: CoachMode;
}

export function QuickActions({ onAction, currentMode }: QuickActionsProps) {
  const context = buildCoachContext();

  // Generate contextual suggestions
  const suggestions: { label: string; message: string; mode?: CoachMode }[] = [];

  if (currentMode === 'chat') {
    // Suggest based on weak areas
    if (context.weakAreas.length > 0) {
      suggestions.push({
        label: `Review ${context.weakAreas[0].skillName}`,
        message: `Can you help me understand ${context.weakAreas[0].skillName} better? I scored ${context.weakAreas[0].score}% on the quiz.`,
      });
    }

    // Suggest next skill if in progress
    if (context.inProgressSkills.length > 0) {
      suggestions.push({
        label: 'Continue learning',
        message: 'What should I focus on next in my studies?',
      });
    }

    // Always available
    suggestions.push({
      label: 'Study plan',
      message: 'Can you create a study plan for me based on my progress?',
    });

    suggestions.push({
      label: 'Quick quiz',
      message: 'Quiz me on something I should practice.',
      mode: 'quiz',
    });
  }

  if (currentMode === 'analyze') {
    // Special flag to show the hand input form
    suggestions.push({
      label: '📝 Enter a hand',
      message: '__SHOW_FORM__',
    });
    suggestions.push({
      label: 'Example hand',
      message: 'Can you show me an example of how to describe a hand for analysis?',
    });
    suggestions.push({
      label: 'Common mistakes',
      message: 'What are common mistakes you see in hands you analyze?',
    });
    suggestions.push({
      label: 'Hand format',
      message: 'What information do you need to analyze a hand?',
    });
  }

  if (currentMode === 'quiz') {
    // Suggest quizzing on weak areas
    if (context.weakAreas.length > 0) {
      suggestions.push({
        label: `Quiz: ${context.weakAreas[0].skillName}`,
        message: `Quiz me on ${context.weakAreas[0].skillName}`,
      });
    }

    suggestions.push({
      label: 'Pot odds drill',
      message: 'Give me 5 pot odds calculation questions',
    });

    suggestions.push({
      label: 'Random topic',
      message: "Quiz me on a random topic from what I've learned",
    });

    suggestions.push({
      label: 'Challenge me',
      message: 'Give me some hard questions to test my knowledge',
    });
  }

  // Limit to 4 suggestions
  const displaySuggestions = suggestions.slice(0, 4);

  if (displaySuggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {displaySuggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onAction(suggestion.message, suggestion.mode)}
          className="px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-full transition-colors border border-slate-600 hover:border-slate-500"
        >
          {suggestion.label}
        </button>
      ))}
    </div>
  );
}
