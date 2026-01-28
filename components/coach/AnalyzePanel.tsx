'use client';

import React, { useState } from 'react';
import { HandInputForm, HandData } from './HandInputForm';
import { formatHandForAnalysis, formatHandSimple } from '@/lib/coach/handFormatter';

interface AnalyzePanelProps {
  onSubmitHand: (message: string, handSummary?: string) => void;
  onCancel: () => void;
}

type InputMode = 'select' | 'form' | 'text';

export function AnalyzePanel({ onSubmitHand, onCancel }: AnalyzePanelProps) {
  const [inputMode, setInputMode] = useState<InputMode>('select');
  const [textInput, setTextInput] = useState('');

  const handleFormSubmit = (data: HandData) => {
    const formattedHand = formatHandForAnalysis(data);
    const handSummary = formatHandSimple(data);
    onSubmitHand(formattedHand, handSummary);
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      onSubmitHand(textInput.trim());
    }
  };

  // Mode selection screen
  if (inputMode === 'select') {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-2">Hand Analysis</h2>
        <p className="text-slate-400 mb-6">
          Choose how you&apos;d like to enter your hand for analysis.
        </p>

        <div className="grid gap-4">
          {/* Structured Form Option */}
          <button
            onClick={() => setInputMode('form')}
            className="flex items-start gap-4 p-4 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-amber-500/50 rounded-lg text-left transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center text-2xl flex-shrink-0">
              🎴
            </div>
            <div>
              <h3 className="text-white font-semibold group-hover:text-amber-400 transition-colors">
                Guided Form
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Step-by-step wizard to enter your hand. Select cards visually,
                add actions street by street. Best for detailed analysis.
              </p>
              <span className="inline-block mt-2 text-xs text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                Recommended
              </span>
            </div>
          </button>

          {/* Free Text Option */}
          <button
            onClick={() => setInputMode('text')}
            className="flex items-start gap-4 p-4 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-blue-500/50 rounded-lg text-left transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-2xl flex-shrink-0">
              ✏️
            </div>
            <div>
              <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                Free Text
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Paste or type your hand history in any format.
                Good for quick questions or pasting from poker software.
              </p>
            </div>
          </button>
        </div>

        <button
          onClick={onCancel}
          className="mt-6 text-slate-400 hover:text-white text-sm transition-colors"
        >
          ← Back to chat
        </button>
      </div>
    );
  }

  // Guided Form
  if (inputMode === 'form') {
    return (
      <HandInputForm
        onSubmit={handleFormSubmit}
        onCancel={() => setInputMode('select')}
      />
    );
  }

  // Free Text Input
  if (inputMode === 'text') {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Describe Your Hand</h2>
          <button
            onClick={() => setInputMode('select')}
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            ← Back
          </button>
        </div>

        <p className="text-slate-400 text-sm mb-4">
          Describe the hand situation in your own words. Include:
        </p>

        <ul className="text-sm text-slate-500 mb-4 space-y-1">
          <li>• Stakes and game type (e.g., NL50 cash, $100 MTT)</li>
          <li>• Your position and stack depth</li>
          <li>• Your hole cards</li>
          <li>• Actions and sizings</li>
          <li>• Board cards (if applicable)</li>
          <li>• Your specific question</li>
        </ul>

        <textarea
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder={`Example:
NL50 6-max cash game, 100bb effective.
Hero in CO with AsKd.
Folds to Hero who raises to 2.5bb.
BTN 3-bets to 8bb.
Blinds fold. Hero?

What's the best play here? Should I 4-bet, call, or fold?`}
          className="w-full h-48 px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none resize-none placeholder:text-slate-500"
        />

        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-slate-500">
            {textInput.length} characters
          </span>
          <button
            onClick={handleTextSubmit}
            disabled={!textInput.trim()}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            Analyze Hand
          </button>
        </div>
      </div>
    );
  }

  return null;
}
