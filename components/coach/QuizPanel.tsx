'use client';

import React from 'react';
import { QuizTopicSelector } from './QuizTopicSelector';
import { useQuizSessionStore } from '@/lib/quizSessionStore';
import type { QuizTopic } from '@/types/coach';

interface QuizPanelProps {
  onStartQuiz: (prompt: string) => void;
  onCustomQuiz: () => void;
}

export function QuizPanel({ onStartQuiz, onCustomQuiz }: QuizPanelProps) {
  const { isActive } = useQuizSessionStore();

  const handleSelectTopic = (topic: QuizTopic, difficulty: 'easy' | 'medium' | 'hard') => {
    useQuizSessionStore.getState().startSession(topic.name, difficulty);

    const prompt = `Start a ${difficulty} difficulty quiz on ${topic.name}. ${topic.description}.

Ask me one question at a time. After I answer, tell me if I'm correct and explain why, then ask the next question. Keep track of my score. Use this format for questions:

**Question [number]:** [Topic area]
[Clear question]

A) [Option]
B) [Option]
C) [Option]
D) [Option]

Start now with question 1.`;

    onStartQuiz(prompt);
  };

  // Show topic selector if no active session
  if (!isActive) {
    return (
      <div className="p-4">
        <QuizTopicSelector
          onSelectTopic={handleSelectTopic}
          onCustomTopic={onCustomQuiz}
        />
      </div>
    );
  }

  // During active quiz, the QuizSessionHeader handles the UI
  return null;
}
