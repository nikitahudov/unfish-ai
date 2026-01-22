'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useProgressStore } from '@/lib/progressStore';
import { hasQuiz } from '@/data/quizRegistry';
import { getAllSkills } from '@/data/skills';
import type { Skill } from '@/data/skills';

interface SkillModalProps {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SkillModal({ skill, isOpen, onClose }: SkillModalProps) {
  // Close on escape key and manage body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Don't render if not open or no skill
  if (!isOpen || !skill) {
    return null;
  }

  // Get progress data
  const { contentProgress, skills: quizProgress, getContentStatus } = useProgressStore();
  const content = contentProgress[skill.id];
  const quiz = quizProgress[skill.id];

  // Get content status
  const contentStatus = getContentStatus(skill.id);

  // Get quiz status
  const getQuizStatus = () => {
    if (!quiz || quiz.attempts === 0) return 'not_started';
    if (quiz.status === 'completed') return 'passed';
    return 'in_progress';
  };

  const quizStatus = getQuizStatus();
  const quizAvailable = hasQuiz(skill.id);

  // Get level color
  const getLevelColor = () => {
    switch (skill.level) {
      case 'Fundamental':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'Intermediate':
        return 'bg-amber-500/20 text-amber-400';
      case 'Advanced':
        return 'bg-rose-500/20 text-rose-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  // Find next skill
  const getNextSkill = () => {
    const allSkills = getAllSkills();
    const currentIndex = allSkills.findIndex(s => s.id === skill.id);
    if (currentIndex >= 0 && currentIndex < allSkills.length - 1) {
      return allSkills[currentIndex + 1];
    }
    return null;
  };

  const nextSkill = getNextSkill();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-800 rounded-2xl max-w-lg w-full border border-slate-700 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-700/50"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-sm font-mono rounded">
                {skill.id}
              </span>
              <span className={`px-2 py-1 text-xs rounded ${getLevelColor()}`}>
                {skill.level}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{skill.name}</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{skill.description}</p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Learn Card */}
            <Link
              href={`/wiki/${skill.id}`}
              onClick={onClose}
              className="block bg-slate-700/50 rounded-xl p-4 hover:bg-slate-700 hover:border-amber-500/50 border border-slate-600/50 transition-all group"
            >
              <div className="flex flex-col h-full">
                <div className="text-3xl mb-2">📖</div>
                <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-amber-400 transition-colors">
                  Learn
                </h3>
                <p className="text-slate-400 text-xs mb-3">
                  ~20 min read with exercises
                </p>

                {/* Status Badge */}
                <div className="mt-auto">
                  {contentStatus === 'not_started' && (
                    <span className="inline-block px-2 py-1 bg-slate-600 text-slate-300 text-xs rounded">
                      Not Started
                    </span>
                  )}
                  {contentStatus === 'in_progress' && (
                    <div>
                      <span className="inline-block px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded mb-1">
                        In Progress
                      </span>
                      {content && (
                        <p className="text-slate-400 text-xs">
                          {content.exercisesCompleted}/{content.exercisesTotal} exercises
                        </p>
                      )}
                    </div>
                  )}
                  {contentStatus === 'completed' && (
                    <span className="inline-block px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded">
                      Completed ✓
                    </span>
                  )}
                </div>
              </div>
            </Link>

            {/* Quiz Card */}
            {quizAvailable ? (
              <Link
                href={`/assess/quiz/${skill.id}`}
                onClick={onClose}
                className="block bg-slate-700/50 rounded-xl p-4 hover:bg-slate-700 hover:border-amber-500/50 border border-slate-600/50 transition-all group"
              >
                <div className="flex flex-col h-full">
                  <div className="text-3xl mb-2">📝</div>
                  <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-amber-400 transition-colors">
                    Quiz
                  </h3>
                  <p className="text-slate-400 text-xs mb-3">
                    25 questions • ~20-30 min
                  </p>

                  {/* Status Badge */}
                  <div className="mt-auto">
                    {quizStatus === 'not_started' && (
                      <span className="inline-block px-2 py-1 bg-slate-600 text-slate-300 text-xs rounded">
                        Not Started
                      </span>
                    )}
                    {quizStatus === 'in_progress' && (
                      <div>
                        <span className="inline-block px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded mb-1">
                          In Progress
                        </span>
                        {quiz && (
                          <p className="text-slate-400 text-xs">
                            Best: {quiz.bestScore}%
                          </p>
                        )}
                      </div>
                    )}
                    {quizStatus === 'passed' && (
                      <div>
                        <span className="inline-block px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded mb-1">
                          Passed ✓
                        </span>
                        {quiz && (
                          <p className="text-slate-400 text-xs">
                            Best: {quiz.bestScore}%
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30 opacity-50 cursor-not-allowed">
                <div className="flex flex-col h-full">
                  <div className="text-3xl mb-2 opacity-50">📝</div>
                  <h3 className="text-slate-400 font-semibold text-lg mb-1">
                    Quiz
                  </h3>
                  <p className="text-slate-500 text-xs mb-3">
                    25 questions • ~20-30 min
                  </p>

                  <div className="mt-auto">
                    <span className="inline-block px-2 py-1 bg-slate-600/50 text-slate-400 text-xs rounded">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          {nextSkill && (
            <div className="pt-4 border-t border-slate-700/50">
              <Link
                href={`/wiki/${nextSkill.id}`}
                onClick={onClose}
                className="flex items-center justify-between text-sm text-slate-400 hover:text-amber-400 transition-colors group"
              >
                <span className="text-xs text-slate-500">Next:</span>
                <span className="flex items-center gap-2">
                  <span>{nextSkill.name}</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
