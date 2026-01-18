'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { QuizEngine } from '@/components/quiz/QuizEngine';
import { getQuizById, hasQuiz } from '@/data/quizRegistry';
import type { QuizResults } from '@/types/quiz';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;

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
    // In the future, save results to progress store
    console.log('Quiz completed:', results);
    
    // Could save to localStorage or send to API
    const savedResults = JSON.parse(localStorage.getItem('quizResults') || '{}');
    savedResults[moduleId] = {
      ...results,
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem('quizResults', JSON.stringify(savedResults));
  };

  const handleExit = () => {
    router.push('/assess');
  };

  return (
    <div className="p-6 md:p-8">
      <QuizEngine
        quizData={quizData}
        onComplete={handleComplete}
        onExit={handleExit}
      />
    </div>
  );
}
