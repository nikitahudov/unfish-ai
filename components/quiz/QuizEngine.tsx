'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import type { QuizData, Question, QuizResults, QuizMode, SectionResult } from '@/types/quiz';

interface QuizEngineProps {
  quizData: QuizData;
  onComplete?: (results: QuizResults) => void;
  onExit?: () => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  quizData,
  onComplete,
  onExit
}) => {
  const [currentSection, setCurrentSection] = useState<string>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizMode, setQuizMode] = useState<QuizMode>('standard');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const hasCalledOnComplete = useRef(false);

  // Timer effect for timed mode
  useEffect(() => {
    if (quizMode === 'timed' && timeLeft !== null && timeLeft > 0 && currentSection !== 'intro') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowResults(true);
    }
  }, [timeLeft, quizMode, currentSection]);

  // Call onComplete only once when results are shown
  useEffect(() => {
    if (showResults && onComplete && !hasCalledOnComplete.current) {
      hasCalledOnComplete.current = true;
      const results = calculateResults();
      onComplete(results);
    }
  }, [showResults, onComplete, calculateResults]);

  const handleAnswer = (questionId: string, answer: unknown) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateResults = useCallback((): QuizResults => {
    let totalCorrect = 0;
    let totalQuestions = 0;
    const sectionResults: Record<string, SectionResult> = {};

    quizData.sections.forEach(section => {
      let sectionCorrect = 0;
      
      section.questions.forEach(q => {
        totalQuestions++;
        const userAnswer = answers[q.id];
        let isCorrect = false;

        if (q.type === 'multiple-choice' || q.type === 'scenario') {
          isCorrect = userAnswer === q.correctAnswer;
        } else if (q.type === 'true-false') {
          isCorrect = userAnswer === q.correctAnswer;
        } else if (q.type === 'calculation') {
          const numAnswer = parseFloat(String(userAnswer));
          isCorrect = !isNaN(numAnswer) && 
            numAnswer >= q.acceptableRange[0] && 
            numAnswer <= q.acceptableRange[1];
        } else if (q.type === 'quick-calc') {
          isCorrect = q.acceptableAnswers?.some(a => 
            a.toLowerCase().replace(/\s/g, '') === String(userAnswer).toLowerCase().replace(/\s/g, '')
          ) || false;
        }

        if (isCorrect) {
          sectionCorrect++;
          totalCorrect++;
        }
      });

      sectionResults[section.id] = {
        correct: sectionCorrect,
        total: section.questions.length,
        percentage: Math.round((sectionCorrect / section.questions.length) * 100),
        weight: section.weight
      };
    });

    const weightedScore = Object.values(sectionResults).reduce((sum, section) => {
      return sum + (section.percentage * section.weight / 100);
    }, 0);

    const timeSpent = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;

    return {
      totalCorrect,
      totalQuestions,
      percentage: Math.round((totalCorrect / totalQuestions) * 100),
      weightedScore: Math.round(weightedScore),
      sectionResults,
      passed: weightedScore >= quizData.moduleInfo.passingScore,
      timeSpent
    };
  }, [answers, quizData, startTime]);

  const startQuiz = (mode: QuizMode) => {
    setQuizMode(mode);
    setStartTime(Date.now());
    setCurrentSection(quizData.sections[0].id);
    setCurrentQuestion(0);
    
    if (mode === 'timed' && quizData.moduleInfo.timedModeMinutes) {
      setTimeLeft(quizData.moduleInfo.timedModeMinutes * 60);
    } else if (mode === 'speed' && quizData.moduleInfo.speedModeMinutes) {
      setTimeLeft(quizData.moduleInfo.speedModeMinutes * 60);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // ============================================
  // RENDER: Intro Screen
  // ============================================
  const renderIntro = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🎰</div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Module {quizData.moduleInfo.id} Assessment
        </h1>
        <h2 className="text-xl text-amber-400">{quizData.moduleInfo.title}</h2>
        <p className="text-slate-400 mt-2">
          {quizData.moduleInfo.category} • {quizData.moduleInfo.level}
        </p>
      </div>

      <div className="bg-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">📋 Quiz Overview</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-slate-400">Total Questions</div>
            <div className="text-2xl font-bold text-white">
              {quizData.sections.reduce((sum, s) => sum + s.questions.length, 0)}
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-slate-400">Passing Score</div>
            <div className="text-2xl font-bold text-green-400">
              {quizData.moduleInfo.passingScore}%
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-slate-400">Estimated Time</div>
            <div className="text-2xl font-bold text-white">
              {quizData.moduleInfo.estimatedTime}
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-slate-400">Sections</div>
            <div className="text-2xl font-bold text-white">
              {quizData.sections.length}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">🎯 Learning Outcomes Tested</h3>
        <ul className="space-y-2">
          {quizData.moduleInfo.learningOutcomes.map((outcome, idx) => (
            <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
              <span className="text-green-400 mt-1">✓</span>
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">📚 Sections</h3>
        <div className="space-y-3">
          {quizData.sections.map((section) => (
            <div key={section.id} className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
              <div>
                <div className="text-white font-medium">{section.title}</div>
                <div className="text-slate-400 text-xs">{section.description}</div>
              </div>
              <div className="text-right">
                <div className="text-amber-400 font-semibold">{section.questions.length} Q</div>
                <div className="text-slate-400 text-xs">{section.weight}% weight</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">🎮 Choose Quiz Mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => startQuiz('standard')}
            className="p-4 bg-slate-800/50 rounded-xl border-2 border-transparent hover:border-amber-500 transition-all text-left"
          >
            <div className="text-2xl mb-2">📝</div>
            <div className="font-semibold text-white">Standard</div>
            <div className="text-xs text-slate-400">No time limit. See hints.</div>
          </button>
          <button
            onClick={() => startQuiz('timed')}
            className="p-4 bg-slate-800/50 rounded-xl border-2 border-transparent hover:border-amber-500 transition-all text-left"
          >
            <div className="text-2xl mb-2">⏱️</div>
            <div className="font-semibold text-white">Timed</div>
            <div className="text-xs text-slate-400">
              {quizData.moduleInfo.timedModeMinutes || 20} min limit
            </div>
          </button>
          <button
            onClick={() => startQuiz('speed')}
            className="p-4 bg-slate-800/50 rounded-xl border-2 border-transparent hover:border-amber-500 transition-all text-left"
          >
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-semibold text-white">Speed</div>
            <div className="text-xs text-slate-400">
              {quizData.moduleInfo.speedModeMinutes || 10} min. No hints.
            </div>
          </button>
        </div>
      </div>

      {onExit && (
        <div className="text-center">
          <button
            onClick={onExit}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Assessments
          </button>
        </div>
      )}
    </div>
  );

  // ============================================
  // RENDER: Question
  // ============================================
  const renderQuestion = (question: Question, questionIndex: number, totalInSection: number) => {
    const userAnswer = answers[question.id];
    const section = quizData.sections.find(s => s.questions.some(q => q.id === question.id));

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wide">
              {section?.title}
            </span>
            <div className="text-sm text-slate-500">Topic: {question.topic}</div>
          </div>
          <div className="text-right flex items-center gap-4">
            {timeLeft !== null && (
              <div className={`font-mono text-lg ${timeLeft < 60 ? 'text-red-400' : 'text-amber-400'}`}>
                {formatTime(timeLeft)}
              </div>
            )}
            <div>
              <span className="text-amber-400 font-bold">Q{questionIndex + 1}</span>
              <span className="text-slate-400">/{totalInSection}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-amber-500 to-amber-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((questionIndex + 1) / totalInSection) * 100}%` }}
          />
        </div>

        {/* Scenario (if present) */}
        {question.type === 'scenario' && (
          <div className="bg-slate-700/70 rounded-xl p-4 border-l-4 border-amber-500">
            <div className="text-xs text-amber-400 uppercase tracking-wide mb-2">Scenario</div>
            <p className="text-slate-300">{question.scenario}</p>
          </div>
        )}

        {/* Question Card */}
        <div className="bg-slate-800/50 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              question.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
              question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {question.difficulty}
            </span>
          </div>
          <h3 className="text-lg text-white font-medium mb-6">{question.question}</h3>

          {/* Multiple Choice / Scenario Options */}
          {(question.type === 'multiple-choice' || question.type === 'scenario') && (
            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(question.id, idx)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    userAnswer === idx
                      ? 'bg-amber-500/20 border-2 border-amber-500 text-white'
                      : 'bg-slate-700/50 border-2 border-transparent text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-600 text-xs font-medium mr-3">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* True/False */}
          {question.type === 'true-false' && (
            <div className="flex gap-4">
              {[true, false].map((value) => (
                <button
                  key={String(value)}
                  onClick={() => handleAnswer(question.id, value)}
                  className={`flex-1 p-4 rounded-xl transition-all font-medium ${
                    userAnswer === value
                      ? 'bg-amber-500/20 border-2 border-amber-500 text-white'
                      : 'bg-slate-700/50 border-2 border-transparent text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {value ? '✓ True' : '✗ False'}
                </button>
              ))}
            </div>
          )}

          {/* Calculation */}
          {(question.type === 'calculation' || question.type === 'quick-calc') && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={String(userAnswer || '')}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  placeholder="Enter your answer"
                  className="flex-1 bg-slate-700 border-2 border-slate-600 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none text-lg"
                />
                {question.type === 'calculation' && question.unit && (
                  <span className="text-slate-400 font-medium">{question.unit}</span>
                )}
              </div>
              {question.type === 'calculation' && question.showWorkspace && (
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                  <div className="text-xs text-slate-500 mb-2">Workspace (for your calculations)</div>
                  <textarea
                    className="w-full bg-transparent text-slate-400 text-sm font-mono resize-none focus:outline-none"
                    rows={3}
                    placeholder="Show your work here..."
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Explanation (Standard mode only) */}
        {showExplanation && quizMode === 'standard' && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <div className="text-xs text-blue-400 uppercase tracking-wide mb-2">💡 Hint</div>
            <p className="text-slate-300 text-sm">{question.explanation}</p>
          </div>
        )}
      </div>
    );
  };

  // ============================================
  // RENDER: Results
  // ============================================
  const renderResults = () => {
    const results = calculateResults();

    return (
      <div className="space-y-6">
        {/* Score Header */}
        <div className={`text-center p-8 rounded-2xl ${
          results.passed 
            ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30' 
            : 'bg-gradient-to-br from-red-500/20 to-rose-500/10 border border-red-500/30'
        }`}>
          <div className="text-6xl mb-4">{results.passed ? '🎉' : '📚'}</div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {results.passed ? 'Congratulations!' : 'Keep Practicing!'}
          </h2>
          <div className="text-5xl font-bold mb-2">
            <span className={results.passed ? 'text-green-400' : 'text-red-400'}>
              {results.weightedScore}%
            </span>
          </div>
          <p className="text-slate-400">
            {results.passed 
              ? `You passed with a weighted score of ${results.weightedScore}%` 
              : `You need ${quizData.moduleInfo.passingScore}% to pass. You scored ${results.weightedScore}%`
            }
          </p>
          {results.timeSpent && (
            <p className="text-slate-500 text-sm mt-2">
              Time: {Math.floor(results.timeSpent / 60)}m {results.timeSpent % 60}s
            </p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-700/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{results.totalCorrect}</div>
            <div className="text-slate-400 text-sm">Correct</div>
          </div>
          <div className="bg-slate-700/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{results.totalQuestions}</div>
            <div className="text-slate-400 text-sm">Total</div>
          </div>
          <div className="bg-slate-700/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{results.percentage}%</div>
            <div className="text-slate-400 text-sm">Raw Score</div>
          </div>
        </div>

        {/* Section Breakdown */}
        <div className="bg-slate-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Section Breakdown</h3>
          <div className="space-y-4">
            {quizData.sections.map(section => {
              const sectionResult = results.sectionResults[section.id];
              return (
                <div key={section.id} className="bg-slate-800/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300">{section.title}</span>
                    <span className={`font-bold ${
                      sectionResult.percentage >= 80 ? 'text-green-400' : 
                      sectionResult.percentage >= 60 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {sectionResult.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        sectionResult.percentage >= 80 ? 'bg-green-500' : 
                        sectionResult.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${sectionResult.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {sectionResult.correct}/{sectionResult.total} correct • {section.weight}% weight
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              setAnswers({});
              setCurrentSection('intro');
              setCurrentQuestion(0);
              setShowResults(false);
              setTimeLeft(null);
              hasCalledOnComplete.current = false;
            }}
            className="px-6 py-3 bg-slate-700 text-white font-medium rounded-xl hover:bg-slate-600 transition-all"
          >
            ← Retake Quiz
          </button>
          {results.passed && quizData.moduleInfo.nextModule && (
            <Link
              href={`/assess/quiz/${quizData.moduleInfo.nextModule.id}`}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-green-700 transition-all"
            >
              Continue to {quizData.moduleInfo.nextModule.title} →
            </Link>
          )}
          <Link
            href="/assess"
            className="px-6 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-all"
          >
            Back to Assessments
          </Link>
        </div>
      </div>
    );
  };

  // ============================================
  // RENDER: Section Quiz
  // ============================================
  const renderSectionQuiz = () => {
    const section = quizData.sections.find(s => s.id === currentSection);
    if (!section) return null;

    const question = section.questions[currentQuestion];
    const totalQuestions = section.questions.length;

    const handleNext = () => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowExplanation(false);
      } else {
        const currentSectionIndex = quizData.sections.findIndex(s => s.id === currentSection);
        if (currentSectionIndex < quizData.sections.length - 1) {
          setCurrentSection(quizData.sections[currentSectionIndex + 1].id);
          setCurrentQuestion(0);
          setShowExplanation(false);
        } else {
          setShowResults(true);
        }
      }
    };

    const handlePrevious = () => {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
        setShowExplanation(false);
      }
    };

    const currentSectionIndex = quizData.sections.findIndex(s => s.id === currentSection);
    const isLastQuestion = currentQuestion >= totalQuestions - 1;
    const isLastSection = currentSectionIndex >= quizData.sections.length - 1;

    return (
      <div className="space-y-6">
        {renderQuestion(question, currentQuestion, totalQuestions)}

        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-all"
          >
            ← Previous
          </button>

          <div className="flex gap-2">
            {quizMode === 'standard' && (
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all"
              >
                {showExplanation ? 'Hide' : 'Show'} Hint
              </button>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={answers[question.id] === undefined}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-600 transition-all"
          >
            {!isLastQuestion ? 'Next →' : 
             !isLastSection ? 'Next Section →' : 
             'Finish Quiz →'}
          </button>
        </div>
      </div>
    );
  };

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur border border-slate-700/50">
        {currentSection === 'intro' && !showResults && renderIntro()}
        {currentSection !== 'intro' && !showResults && renderSectionQuiz()}
        {showResults && renderResults()}
      </div>
    </div>
  );
};

export default QuizEngine;
