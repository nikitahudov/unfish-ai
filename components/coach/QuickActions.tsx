'use client';

import React from 'react';
import type { CoachMode } from '@/types/coach';
import { useCoachContext } from '@/lib/hooks';
import { useQuizSessionStore } from '@/lib/quizSessionStore';
import { getSkillById } from '@/data/skills';

interface QuickActionsProps {
  onAction: (message: string, mode?: CoachMode) => void;
  currentMode: CoachMode;
}

export function QuickActions({ onAction, currentMode }: QuickActionsProps) {
  const { weakAreas, inProgressSkills } = useCoachContext();

  // Generate contextual suggestions
  const suggestions: { label: string; message: string; mode?: CoachMode }[] = [];

  if (currentMode === 'chat') {
    // Suggest based on weak areas
    if (weakAreas.length > 0) {
      const weakSkill = getSkillById(weakAreas[0].skillId);
      const weakSkillName = weakSkill?.name || weakAreas[0].skillId;
      suggestions.push({
        label: `Review ${weakSkillName}`,
        message: `Can you help me understand ${weakSkillName} better? I scored ${weakAreas[0].score}% on the quiz.`,
      });
    }

    // Suggest next skill if in progress
    if (inProgressSkills.length > 0) {
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
      label: 'Enter a hand',
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
    // Get quiz session state
    const quizState = useQuizSessionStore.getState();

    if (quizState.isActive) {
      // Options during active quiz
      suggestions.push({
        label: 'Hint please',
        message: 'Can you give me a hint for this question?',
      });
      suggestions.push({
        label: 'Explain more',
        message: 'Can you explain this concept in more detail?',
      });
      suggestions.push({
        label: 'Skip question',
        message: "I don't know this one, can you tell me the answer and move on?",
      });
    } else {
      // Options when no quiz is active
      if (weakAreas.length > 0) {
        const quizWeakSkill = getSkillById(weakAreas[0].skillId);
        suggestions.push({
          label: `Quiz: ${quizWeakSkill?.name || weakAreas[0].skillId}`,
          message: '__SHOW_QUIZ_PANEL__',
        });
      }

      suggestions.push({
        label: 'Start a quiz',
        message: '__SHOW_QUIZ_PANEL__',
      });

      suggestions.push({
        label: 'Quick random quiz',
        message: "Give me 5 quick questions on random topics from what I've learned",
      });
    }
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
