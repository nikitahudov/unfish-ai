'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { RequireAuth } from '@/components/auth';
import { QuizEngine } from '@/components/quiz/QuizEngine';
import { getQuizById, hasQuiz } from '@/data/quizRegistry';
import { getSkillById } from '@/data/skills';
import { useProgressStore } from '@/lib/progressStore';
import { useData } from '@/lib/hooks';
import type { QuizResults } from '@/types/quiz';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;
  const addQuizAttempt = useProgressStore((state) => state.addQuizAttempt);
  const { submitQuiz } = useData();

  // Check if quiz exists
  if (!hasQuiz(moduleId)) {
    return (
      <div className="p-6 md:p-8 max-w-3xl mx-auto">
        <div className="bg-slate-800/50 rounded-2xl p-8 text-center border border-slate-700/50">
          <div className="text-6xl mb-4">🚧</div>
          <h1 className="text-2xl font-bold text-white mb-2">Quiz Not Available</h1>
          <p className="text-slate-400 mb-6">
            The quiz for Module {moduleId} is coming soon. Check back later!
          </p>
          <Link
            href="/assess"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors"
          >
            ← Back to Assessments
          </Link>
        </div>
      </div>
    );
  }

  const quizData = getQuizById(moduleId);

  if (!quizData) {
    return null;
  }

  const handleComplete = (results: QuizResults) => {
    console.log('Quiz completed:', results);

    // Convert sectionResults to the format expected by the store
    const sectionScores: Record<string, { correct: number; total: number; percentage: number }> = {};
    Object.entries(results.sectionResults).forEach(([sectionId, result]) => {
      sectionScores[sectionId] = {
        correct: result.correct,
        total: result.total,
        percentage: result.percentage,
      };
    });

    // Save to localStorage progress store
    addQuizAttempt(moduleId, {
      score: results.percentage,
      weightedScore: results.weightedScore,
      passed: results.passed,
      timeSpent: results.timeSpent || 0,
      mode: 'standard', // Default to standard mode
      sectionScores,
    });

    // Also save to Supabase (user is always authenticated behind RequireAuth)
    const skill = getSkillById(moduleId);
    const answers = Object.entries(results.sectionResults).map(([sectionId, result]) => ({
      questionId: sectionId,
      selectedAnswer: String(result.correct),
      isCorrect: result.percentage >= 70,
    }));

    submitQuiz({
      skillId: moduleId,
      score: results.totalCorrect,
      maxScore: results.totalQuestions,
      answers,
      timeTakenSeconds: results.timeSpent,
    }, skill?.name).catch((error) => {
      console.error('Failed to save quiz to Supabase:', error);
    });
  };

  const handleExit = () => {
    router.push('/assess');
  };

  return (
    <RequireAuth feature="Quizzes">
      <div className="p-6 md:p-8">
        <QuizEngine
          quizData={quizData}
          onComplete={handleComplete}
          onExit={handleExit}
        />
      </div>
    </RequireAuth>
  );
}
