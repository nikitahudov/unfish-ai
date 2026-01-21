'use client';

import { useState } from 'react';

interface MultiExerciseProps {
  title?: string;
  exercises: Array<{
    question: string;
    answer: string;
    hint?: string;
    explanation?: string;
  }>;
}

export function MultiExercise({ title, exercises }: MultiExerciseProps) {
  const [answers, setAnswers] = useState<string[]>(new Array(exercises.length).fill(''));
  const [checked, setChecked] = useState<boolean[]>(new Array(exercises.length).fill(false));
  const [correct, setCorrect] = useState<boolean[]>(new Array(exercises.length).fill(false));
  const [showHints, setShowHints] = useState<boolean[]>(new Array(exercises.length).fill(false));

  const handleCheck = (index: number) => {
    const isCorrect = answers[index].trim().toLowerCase() === exercises[index].answer.trim().toLowerCase();

    const newChecked = [...checked];
    newChecked[index] = true;
    setChecked(newChecked);

    const newCorrect = [...correct];
    newCorrect[index] = isCorrect;
    setCorrect(newCorrect);
  };

  const toggleHint = (index: number) => {
    const newShowHints = [...showHints];
    newShowHints[index] = !newShowHints[index];
    setShowHints(newShowHints);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const completedCount = checked.filter(Boolean).length;
  const correctCount = correct.filter(Boolean).length;
  const allCompleted = completedCount === exercises.length;

  const handleReset = () => {
    setAnswers(new Array(exercises.length).fill(''));
    setChecked(new Array(exercises.length).fill(false));
    setCorrect(new Array(exercises.length).fill(false));
    setShowHints(new Array(exercises.length).fill(false));
  };

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
      {title && (
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      )}

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-400">
            Progress: {completedCount} / {exercises.length} completed
          </span>
          <span className="text-sm text-amber-400">
            {completedCount > 0 && `${correctCount} correct`}
          </span>
        </div>
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${(completedCount / exercises.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Exercises */}
      <div className="space-y-4">
        {exercises.map((exercise, index) => (
          <div
            key={index}
            className={`
              bg-slate-700/50 rounded-lg p-4 border-2 transition-colors
              ${checked[index]
                ? correct[index]
                  ? 'border-green-500'
                  : 'border-red-500'
                : 'border-slate-600'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <span className="text-slate-400 font-mono text-sm mt-1">
                {index + 1}.
              </span>
              <div className="flex-1 space-y-3">
                <p className="text-white">{exercise.question}</p>

                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    disabled={checked[index]}
                    placeholder="Your answer..."
                    className={`
                      flex-1 px-3 py-2 bg-slate-800 text-white rounded border-2
                      focus:outline-none focus:ring-2 focus:ring-amber-500
                      disabled:opacity-75 disabled:cursor-not-allowed
                      ${checked[index]
                        ? correct[index]
                          ? 'border-green-500'
                          : 'border-red-500'
                        : 'border-slate-600'
                      }
                    `}
                  />
                  {!checked[index] && (
                    <button
                      onClick={() => handleCheck(index)}
                      disabled={!answers[index].trim()}
                      className="px-4 py-2 bg-amber-500 text-slate-900 font-medium rounded hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Check
                    </button>
                  )}
                  {checked[index] && (
                    <span className="text-2xl">
                      {correct[index] ? '✓' : '✗'}
                    </span>
                  )}
                </div>

                {/* Hint */}
                {exercise.hint && !checked[index] && (
                  <div>
                    <button
                      onClick={() => toggleHint(index)}
                      className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      {showHints[index] ? 'Hide Hint' : 'Show Hint'}
                    </button>
                    {showHints[index] && (
                      <div className="mt-2 p-3 bg-slate-800/50 rounded border-l-4 border-amber-400">
                        <p className="text-sm text-amber-200">{exercise.hint}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Explanation */}
                {checked[index] && exercise.explanation && (
                  <div className={`p-3 rounded border-l-4 ${
                    correct[index]
                      ? 'bg-green-500/10 border-green-500'
                      : 'bg-red-500/10 border-red-500'
                  }`}>
                    {!correct[index] && (
                      <p className="text-sm text-slate-300 mb-1">
                        Correct answer: <strong>{exercise.answer}</strong>
                      </p>
                    )}
                    <p className="text-sm text-slate-300">{exercise.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      {allCompleted && (
        <div className="mt-6 p-4 bg-slate-700 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-white">
                You got {correctCount} out of {exercises.length} correct!
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Score: {Math.round((correctCount / exercises.length) * 100)}%
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-amber-500 text-slate-900 font-medium rounded hover:bg-amber-400 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
