'use client';

import React, { useState } from 'react';
import { CardSelector } from './CardSelector';
import { ActionEntry, Action } from './ActionEntry';

export interface HandData {
  gameType: 'cash' | 'tournament';
  stakes: string;
  position: string;
  effectiveStack: number;
  holeCards: string[];
  flop: string[];
  turn: string[];
  river: string[];
  preflopActions: Action[];
  flopActions: Action[];
  turnActions: Action[];
  riverActions: Action[];
  villainNotes: string;
  question: string;
}

interface HandInputFormProps {
  onSubmit: (data: HandData) => void;
  onCancel: () => void;
}

const POSITIONS = ['UTG', 'UTG+1', 'MP', 'MP+1', 'HJ', 'CO', 'BTN', 'SB', 'BB'];
const STAKES = ['NL2', 'NL5', 'NL10', 'NL25', 'NL50', 'NL100', 'NL200', 'NL500', 'Live 1/2', 'Live 2/5', 'Live 5/10'];

export function HandInputForm({ onSubmit, onCancel }: HandInputFormProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<HandData>({
    gameType: 'cash',
    stakes: 'NL50',
    position: 'BTN',
    effectiveStack: 100,
    holeCards: [],
    flop: [],
    turn: [],
    river: [],
    preflopActions: [],
    flopActions: [],
    turnActions: [],
    riverActions: [],
    villainNotes: '',
    question: '',
  });

  const updateData = (updates: Partial<HandData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return data.position && data.effectiveStack > 0;
      case 2: return data.holeCards.length === 2;
      case 3: return data.preflopActions.length > 0;
      case 4: return true;
      case 5: return data.question.trim().length > 0;
      default: return false;
    }
  };

  const handleSubmit = () => {
    onSubmit(data);
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="flex border-b border-slate-700">
        {['Setup', 'Hand', 'Preflop', 'Board', 'Question'].map((label, index) => (
          <button
            key={label}
            onClick={() => setStep(index + 1)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              step === index + 1
                ? 'bg-amber-500/20 text-amber-400 border-b-2 border-amber-500'
                : step > index + 1
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : 'text-slate-500'
            }`}
          >
            {step > index + 1 && '✓ '}
            {label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* Step 1: Game Setup */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Game Setup</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Game Type
                </label>
                <div className="flex gap-2">
                  {(['cash', 'tournament'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => updateData({ gameType: type })}
                      className={`flex-1 py-2 rounded capitalize ${
                        data.gameType === type
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Stakes
                </label>
                <select
                  value={data.stakes}
                  onChange={(e) => updateData({ stakes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-amber-500 outline-none"
                >
                  {STAKES.map(stake => (
                    <option key={stake} value={stake}>{stake}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Your Position
                </label>
                <select
                  value={data.position}
                  onChange={(e) => updateData({ position: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-amber-500 outline-none"
                >
                  {POSITIONS.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Effective Stack (BB)
                </label>
                <input
                  type="number"
                  value={data.effectiveStack}
                  onChange={(e) => updateData({ effectiveStack: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-amber-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Hole Cards */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Your Hand</h3>
            <CardSelector
              selectedCards={data.holeCards}
              onSelect={(cards) => updateData({ holeCards: cards })}
              maxCards={2}
              label="Select your two hole cards"
            />
          </div>
        )}

        {/* Step 3: Preflop Action */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Preflop Action</h3>
            <p className="text-sm text-slate-400 mb-4">
              Enter the preflop action in order. Use &quot;Hero&quot; for your own actions.
            </p>
            <ActionEntry
              street="preflop"
              actions={data.preflopActions}
              onActionsChange={(actions) => updateData({ preflopActions: actions })}
            />
          </div>
        )}

        {/* Step 4: Board & Post-flop */}
        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Board & Post-flop Action</h3>

            {/* Flop */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-300">Flop</h4>
              <CardSelector
                selectedCards={data.flop}
                onSelect={(cards) => updateData({ flop: cards })}
                maxCards={3}
              />
              {data.flop.length === 3 && (
                <ActionEntry
                  street="flop"
                  actions={data.flopActions}
                  onActionsChange={(actions) => updateData({ flopActions: actions })}
                />
              )}
            </div>

            {/* Turn */}
            {data.flop.length === 3 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-300">Turn</h4>
                <CardSelector
                  selectedCards={data.turn}
                  onSelect={(cards) => updateData({ turn: cards })}
                  maxCards={1}
                />
                {data.turn.length === 1 && (
                  <ActionEntry
                    street="turn"
                    actions={data.turnActions}
                    onActionsChange={(actions) => updateData({ turnActions: actions })}
                  />
                )}
              </div>
            )}

            {/* River */}
            {data.turn.length === 1 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-300">River</h4>
                <CardSelector
                  selectedCards={data.river}
                  onSelect={(cards) => updateData({ river: cards })}
                  maxCards={1}
                />
                {data.river.length === 1 && (
                  <ActionEntry
                    street="river"
                    actions={data.riverActions}
                    onActionsChange={(actions) => updateData({ riverActions: actions })}
                  />
                )}
              </div>
            )}

            {data.flop.length === 0 && (
              <p className="text-sm text-slate-500 italic">
                If the hand ended preflop, you can skip this step.
              </p>
            )}
          </div>
        )}

        {/* Step 5: Question */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Your Question</h3>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Villain Notes (optional)
              </label>
              <textarea
                value={data.villainNotes}
                onChange={(e) => updateData({ villainNotes: e.target.value })}
                placeholder="Any reads on villain? (e.g., 'Tight regular', 'Loose recreational player')"
                className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-amber-500 outline-none resize-none h-20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                What&apos;s your question?
              </label>
              <textarea
                value={data.question}
                onChange={(e) => updateData({ question: e.target.value })}
                placeholder="e.g., 'Should I call or fold here?', 'Was my sizing correct?', 'How should I play the turn?'"
                className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-amber-500 outline-none resize-none h-24"
              />
            </div>

            {/* Hand Summary */}
            <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
              <h4 className="text-sm font-medium text-slate-300 mb-2">Hand Summary</h4>
              <div className="text-sm text-slate-400 space-y-1">
                <p><span className="text-white">{data.stakes}</span> {data.gameType}, <span className="text-white">{data.effectiveStack}bb</span> effective</p>
                <p>Position: <span className="text-amber-400">{data.position}</span></p>
                <p>Hand: <span className="text-white">{data.holeCards.join(' ') || 'Not selected'}</span></p>
                {data.flop.length > 0 && (
                  <p>Board: <span className="text-white">{[...data.flop, ...data.turn, ...data.river].join(' ')}</span></p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between p-4 border-t border-slate-700">
        <button
          onClick={step === 1 ? onCancel : () => setStep(step - 1)}
          className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
        >
          {step === 1 ? 'Cancel' : '← Back'}
        </button>

        {step < 5 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canProceed()}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            Analyze Hand
          </button>
        )}
      </div>
    </div>
  );
}
