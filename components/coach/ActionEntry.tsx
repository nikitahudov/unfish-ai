'use client';

import React, { useState } from 'react';

export interface Action {
  position: string;
  action: 'fold' | 'check' | 'call' | 'bet' | 'raise' | 'all-in';
  amount?: number;
}

interface ActionEntryProps {
  street: 'preflop' | 'flop' | 'turn' | 'river';
  actions: Action[];
  onActionsChange: (actions: Action[]) => void;
}

const POSITIONS = ['UTG', 'UTG+1', 'MP', 'MP+1', 'HJ', 'CO', 'BTN', 'SB', 'BB', 'Hero'];
const ACTIONS = [
  { value: 'fold', label: 'Fold', needsAmount: false },
  { value: 'check', label: 'Check', needsAmount: false },
  { value: 'call', label: 'Call', needsAmount: true },
  { value: 'bet', label: 'Bet', needsAmount: true },
  { value: 'raise', label: 'Raise', needsAmount: true },
  { value: 'all-in', label: 'All-in', needsAmount: true },
];

export function ActionEntry({ street, actions, onActionsChange }: ActionEntryProps) {
  const [newAction, setNewAction] = useState<Partial<Action>>({});

  const addAction = () => {
    if (newAction.position && newAction.action) {
      const action: Action = {
        position: newAction.position,
        action: newAction.action as Action['action'],
        amount: newAction.amount,
      };
      onActionsChange([...actions, action]);
      setNewAction({});
    }
  };

  const removeAction = (index: number) => {
    onActionsChange(actions.filter((_, i) => i !== index));
  };

  const selectedAction = ACTIONS.find(a => a.value === newAction.action);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-300 capitalize">
        {street} Action
      </label>

      {/* Existing Actions */}
      {actions.length > 0 && (
        <div className="space-y-1">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-slate-700/50 rounded px-3 py-1.5 text-sm"
            >
              <span className="text-slate-300">
                <span className="text-amber-400 font-medium">{action.position}</span>
                {' '}
                {action.action}
                {action.amount && (
                  <span className="text-white"> ${action.amount}</span>
                )}
              </span>
              <button
                onClick={() => removeAction(index)}
                className="text-slate-500 hover:text-red-400 ml-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Action */}
      <div className="flex flex-wrap gap-2">
        <select
          value={newAction.position || ''}
          onChange={(e) => setNewAction({ ...newAction, position: e.target.value })}
          className="px-3 py-1.5 bg-slate-700 text-white text-sm rounded border border-slate-600 focus:border-amber-500 outline-none"
        >
          <option value="">Position</option>
          {POSITIONS.map(pos => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>

        <select
          value={newAction.action || ''}
          onChange={(e) => setNewAction({ ...newAction, action: e.target.value as Action['action'] })}
          className="px-3 py-1.5 bg-slate-700 text-white text-sm rounded border border-slate-600 focus:border-amber-500 outline-none"
        >
          <option value="">Action</option>
          {ACTIONS.map(action => (
            <option key={action.value} value={action.value}>{action.label}</option>
          ))}
        </select>

        {selectedAction?.needsAmount && (
          <div className="flex items-center">
            <span className="text-slate-400 mr-1">$</span>
            <input
              type="number"
              value={newAction.amount || ''}
              onChange={(e) => setNewAction({ ...newAction, amount: parseFloat(e.target.value) || undefined })}
              placeholder="Amount"
              className="w-20 px-2 py-1.5 bg-slate-700 text-white text-sm rounded border border-slate-600 focus:border-amber-500 outline-none"
            />
          </div>
        )}

        <button
          onClick={addAction}
          disabled={!newAction.position || !newAction.action}
          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white text-sm rounded transition-colors"
        >
          + Add
        </button>
      </div>
    </div>
  );
}
