'use client';

import { useState } from 'react';

interface ExerciseProps {
  question: string;
  type?: 'text' | 'number' | 'multiple-choice';
  answer: string | number;
  acceptableAnswers?: string[];
  acceptableRange?: [number, number];
  options?: string[];
  hint?: string;
  explanation: string;
  unit?: string;
}

export function Exercise({
  question,
  type = 'text',
  answer,
  acceptableAnswers = [],
  acceptableRange,
  options = [],
  hint,
  explanation,
  unit = '',
}: ExerciseProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = () => {
    let correct = false;

    if (type === 'multiple-choice') {
      correct = selectedOption === answer;
    } else if (type === 'number') {
      const numAnswer = parseFloat(userAnswer);
      if (acceptableRange) {
        correct = numAnswer >= acceptableRange[0] && numAnswer <= acceptableRange[1];
      } else {
        correct = numAnswer === Number(answer);
      }
    } else {
      // text type
      const normalizedUserAnswer = userAnswer.trim().toLowerCase();
      const normalizedAnswer = String(answer).trim().toLowerCase();
      const normalizedAcceptable = acceptableAnswers.map(a => a.trim().toLowerCase());

      correct = normalizedUserAnswer === normalizedAnswer ||
                normalizedAcceptable.includes(normalizedUserAnswer);
    }

    setIsCorrect(correct);
    setChecked(true);
  };

  const getBorderColor = () => {
    if (!checked) return 'border-slate-600';
    return isCorrect ? 'border-green-500' : 'border-red-500';
  };

  const getInputClassName = () => {
    const base = 'w-full px-4 py-2 bg-slate-700 text-white rounded-lg border-2 transition-colors';
    const focus = 'focus:outline-none focus:ring-2 focus:ring-amber-500';
    const disabled = checked ? 'opacity-75 cursor-not-allowed' : '';

    return `${base} ${focus} ${disabled} ${getBorderColor()}`;
  };

  return (
    <div className={`bg-slate-800 rounded-lg p-6 border-2 ${getBorderColor()} transition-colors`}>
      <p className="text-white text-lg mb-4">{question}</p>

      {type === 'multiple-choice' ? (
        <div className="space-y-2 mb-4">
          {options.map((option, index) => {
            const isSelected = selectedOption === option;
            const showAsCorrect = checked && option === answer;
            const showAsIncorrect = checked && isSelected && !isCorrect;

            let buttonClass = 'w-full px-4 py-3 rounded-lg border-2 text-left transition-colors ';
            if (showAsCorrect) {
              buttonClass += 'bg-green-500/20 border-green-500 text-white';
            } else if (showAsIncorrect) {
              buttonClass += 'bg-red-500/20 border-red-500 text-white';
            } else if (isSelected) {
              buttonClass += 'bg-amber-500/20 border-amber-500 text-white';
            } else {
              buttonClass += 'bg-slate-700 border-slate-600 text-white hover:border-amber-400';
            }

            return (
              <button
                key={index}
                onClick={() => !checked && setSelectedOption(option)}
                disabled={checked}
                className={buttonClass}
              >
                {option}
                {showAsCorrect && ' ✓'}
                {showAsIncorrect && ' ✗'}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mb-4 flex items-center gap-2">
          <input
            type={type === 'number' ? 'number' : 'text'}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={checked}
            className={getInputClassName()}
            placeholder="Your answer..."
          />
          {unit && <span className="text-slate-300 text-sm">{unit}</span>}
        </div>
      )}

      <div className="flex gap-2 mb-4">
        {hint && !checked && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-4 py-2 bg-slate-700 text-amber-400 rounded-lg hover:bg-slate-600 transition-colors"
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
        )}

        {!checked && (
          <button
            onClick={checkAnswer}
            disabled={type === 'multiple-choice' ? !selectedOption : !userAnswer}
            className="px-4 py-2 bg-amber-500 text-slate-900 font-semibold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        )}
      </div>

      {showHint && hint && !checked && (
        <div className="mb-4 p-4 bg-slate-700/50 rounded-lg border-l-4 border-amber-400">
          <p className="text-amber-200 text-sm">
            <strong>Hint:</strong> {hint}
          </p>
        </div>
      )}

      {checked && (
        <div className={`p-4 rounded-lg border-l-4 ${isCorrect ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'}`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <span className="text-green-500 text-xl">✓</span>
            ) : (
              <span className="text-red-500 text-xl">✗</span>
            )}
            <p className={`font-semibold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </p>
          </div>
          {!isCorrect && type === 'multiple-choice' && (
            <p className="text-slate-300 text-sm mb-2">
              The correct answer is: <strong>{answer}</strong>
            </p>
          )}
          {!isCorrect && type !== 'multiple-choice' && (
            <p className="text-slate-300 text-sm mb-2">
              The correct answer is: <strong>{answer}{unit}</strong>
            </p>
          )}
          <p className="text-slate-300 text-sm mt-2">{explanation}</p>
        </div>
      )}
    </div>
  );
}
