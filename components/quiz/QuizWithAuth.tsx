'use client';

import React from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useData } from '@/lib/hooks';
import { RequireAuth } from '@/components/auth/RequireAuth';

interface QuizAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
}

interface QuizWithAuthProps {
  skillId: string;
  skillName: string;
  children: (props: {
    onSubmit: (score: number, maxScore: number, answers: QuizAnswer[]) => Promise<{ passed: boolean; percentage: number }>;
    isSubmitting: boolean;
  }) => React.ReactNode;
}

export function QuizWithAuth({ skillId, skillName, children }: QuizWithAuthProps) {
  const { isAuthenticated } = useAuth();
  const { submitQuiz } = useData();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (score: number, maxScore: number, answers: QuizAnswer[]) => {
    if (!isAuthenticated) {
      throw new Error('Not authenticated');
    }

    setIsSubmitting(true);
    try {
      const result = await submitQuiz({
        skillId,
        score,
        maxScore,
        answers,
      }, skillName);

      return {
        passed: result.passed,
        percentage: result.attempt.percentage,
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RequireAuth feature="Quizzes">
      {children({ onSubmit: handleSubmit, isSubmitting })}
    </RequireAuth>
  );
}
