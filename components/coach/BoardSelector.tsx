'use client';

import React from 'react';
import { CardSelector } from './CardSelector';

interface BoardSelectorProps {
  flop: string[];
  turn: string[];
  river: string[];
  onFlopChange: (cards: string[]) => void;
  onTurnChange: (cards: string[]) => void;
  onRiverChange: (cards: string[]) => void;
}

export function BoardSelector({
  flop,
  turn,
  river,
  onFlopChange,
  onTurnChange,
  onRiverChange,
}: BoardSelectorProps) {
  return (
    <div className="space-y-4">
      {/* Flop */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Flop (3 cards)
        </label>
        <CardSelector
          selectedCards={flop}
          onSelect={onFlopChange}
          maxCards={3}
        />
      </div>

      {/* Turn - only show if flop is complete */}
      {flop.length === 3 && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Turn (1 card)
          </label>
          <CardSelector
            selectedCards={turn}
            onSelect={onTurnChange}
            maxCards={1}
          />
        </div>
      )}

      {/* River - only show if turn is complete */}
      {turn.length === 1 && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            River (1 card)
          </label>
          <CardSelector
            selectedCards={river}
            onSelect={onRiverChange}
            maxCards={1}
          />
        </div>
      )}
    </div>
  );
}
