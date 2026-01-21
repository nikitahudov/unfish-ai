'use client';

import { useState, useEffect } from 'react';
import { useContent } from './ContentContext';

interface ScenarioProps {
  title: string;
  setup: string;
  steps: Array<{
    question: string;
    answer: string;
    explanation: string;
    hint?: string;
  }>;
}

export function Scenario({ title, setup, steps }: ScenarioProps) {
  const { onScenarioComplete } = useContent();
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [stepResults, setStepResults] = useState<boolean[]>([]);
  const [hasTracked, setHasTracked] = useState(false);

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isComplete = currentStep >= steps.length;

  // Track scenario completion when all steps are done
  useEffect(() => {
    if (currentStep >= steps.length && !hasTracked) {
      onScenarioComplete();
      setHasTracked(true);
    }
  }, [currentStep, steps.length, hasTracked, onScenarioComplete]);

  const handleCheck = () => {
    const correct = userAnswer.trim().toLowerCase() === currentStepData.answer.trim().toLowerCase();
    setIsCorrect(correct);
    setChecked(true);

    const newResults = [...stepResults];
    newResults[currentStep] = correct;
    setStepResults(newResults);
  };

  const handleReveal = () => {
    setRevealed(true);
    setChecked(true);
    setIsCorrect(false);

    const newResults = [...stepResults];
    newResults[currentStep] = false;
    setStepResults(newResults);
  };

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
    setUserAnswer('');
    setChecked(false);
    setIsCorrect(false);
    setShowHint(false);
    setRevealed(false);
  };

  const handleStartOver = () => {
    setCurrentStep(0);
    setUserAnswer('');
    setChecked(false);
    setIsCorrect(false);
    setShowHint(false);
    setRevealed(false);
    setStepResults([]);
  };

  const correctCount = stepResults.filter(Boolean).length;

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>

      {/* Setup - Always Visible */}
      <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border-l-4 border-amber-500">
        <p className="text-xs text-amber-400 font-semibold mb-2">SCENARIO</p>
        <p className="text-white leading-relaxed">{setup}</p>
      </div>

      {!isComplete ? (
        <>
          {/* Completed Steps - Collapsed */}
          {currentStep > 0 && (
            <div className="mb-4 space-y-2">
              {steps.slice(0, currentStep).map((step, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-slate-700/30 rounded border border-slate-600"
                >
                  <span className="text-slate-400 text-sm">
                    Step {index + 1}
                  </span>
                  <span className="text-lg">
                    {stepResults[index] ? '✓' : '✗'}
                  </span>
                  <span className="text-slate-500 text-sm flex-1 truncate">
                    {step.question}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Current Step */}
          <div className="bg-slate-700 rounded-lg p-5 border-2 border-amber-500 mb-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-amber-400 font-semibold">
                STEP {currentStep + 1} OF {steps.length}
              </p>
            </div>

            <p className="text-lg text-white mb-4">{currentStepData.question}</p>

            {!checked ? (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Your answer..."
                    className="w-full px-4 py-2 bg-slate-800 text-white rounded border-2 border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex gap-2 mb-4">
                  <button
                    onClick={handleCheck}
                    disabled={!userAnswer.trim()}
                    className="px-4 py-2 bg-amber-500 text-slate-900 font-medium rounded hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Check Answer
                  </button>
                  <button
                    onClick={handleReveal}
                    className="px-4 py-2 bg-slate-600 text-slate-300 rounded hover:bg-slate-500 transition-colors"
                  >
                    Reveal Answer
                  </button>
                </div>

                {/* Hint */}
                {currentStepData.hint && (
                  <div>
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      {showHint ? 'Hide Hint' : 'Show Hint'}
                    </button>
                    {showHint && (
                      <div className="mt-2 p-3 bg-slate-800/50 rounded border-l-4 border-amber-400">
                        <p className="text-sm text-amber-200">{currentStepData.hint}</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Result */}
                <div className={`p-4 rounded border-l-4 mb-4 ${
                  isCorrect
                    ? 'bg-green-500/10 border-green-500'
                    : 'bg-red-500/10 border-red-500'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <span className="text-green-500 text-xl">✓</span>
                    ) : (
                      <span className="text-red-500 text-xl">✗</span>
                    )}
                    <p className={`font-semibold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                      {isCorrect ? 'Correct!' : revealed ? 'Answer Revealed' : 'Incorrect'}
                    </p>
                  </div>
                  {!isCorrect && (
                    <p className="text-slate-300 text-sm mb-2">
                      The correct answer is: <strong>{currentStepData.answer}</strong>
                    </p>
                  )}
                  <p className="text-slate-300 text-sm">{currentStepData.explanation}</p>
                </div>

                <button
                  onClick={handleContinue}
                  className="px-6 py-2 bg-amber-500 text-slate-900 font-semibold rounded hover:bg-amber-400 transition-colors"
                >
                  {isLastStep ? 'Finish' : 'Continue to Next Step →'}
                </button>
              </>
            )}
          </div>

          {/* Future Steps - Hidden */}
          {currentStep < steps.length - 1 && (
            <div className="text-center text-slate-500 text-sm">
              {steps.length - currentStep - 1} more {steps.length - currentStep - 1 === 1 ? 'step' : 'steps'} remaining
            </div>
          )}
        </>
      ) : (
        /* Summary */
        <div className="p-6 bg-slate-700 rounded-lg">
          <div className="text-center mb-4">
            <h4 className="text-2xl font-bold text-white mb-2">
              Scenario Complete!
            </h4>
            <p className="text-lg text-slate-300">
              You completed {correctCount} of {steps.length} steps correctly
            </p>
            <p className="text-3xl font-bold text-amber-400 mt-2">
              {Math.round((correctCount / steps.length) * 100)}%
            </p>
          </div>

          {/* Step breakdown */}
          <div className="space-y-2 mb-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded ${
                  stepResults[index] ? 'bg-green-500/10' : 'bg-red-500/10'
                }`}
              >
                <span className="text-xl">
                  {stepResults[index] ? '✓' : '✗'}
                </span>
                <div className="flex-1">
                  <p className="text-white text-sm">{step.question}</p>
                  <p className="text-slate-400 text-xs">
                    Answer: {step.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleStartOver}
            className="w-full px-6 py-3 bg-amber-500 text-slate-900 font-semibold rounded hover:bg-amber-400 transition-colors"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}
