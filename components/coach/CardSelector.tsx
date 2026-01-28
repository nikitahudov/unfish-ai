'use client';

import React from 'react';

interface CardSelectorProps {
  selectedCards: string[];
  onSelect: (cards: string[]) => void;
  maxCards?: number;
  label?: string;
}

const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const SUITS = [
  { symbol: '♠', name: 'spades', color: 'text-slate-200' },
  { symbol: '♥', name: 'hearts', color: 'text-red-500' },
  { symbol: '♦', name: 'diamonds', color: 'text-blue-400' },
  { symbol: '♣', name: 'clubs', color: 'text-green-500' },
];

export function CardSelector({ selectedCards, onSelect, maxCards = 2, label }: CardSelectorProps) {
  const toggleCard = (card: string) => {
    if (selectedCards.includes(card)) {
      onSelect(selectedCards.filter(c => c !== card));
    } else if (selectedCards.length < maxCards) {
      onSelect([...selectedCards, card]);
    }
  };

  const isSelected = (card: string) => selectedCards.includes(card);
  const isDisabled = (card: string) => !isSelected(card) && selectedCards.length >= maxCards;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-300">{label}</label>
      )}

      {/* Selected Cards Display */}
      <div className="flex gap-2 mb-3 min-h-[60px]">
        {selectedCards.length > 0 ? (
          selectedCards.map((card, index) => {
            const rank = card.slice(0, -1);
            const suitSymbol = card.slice(-1);
            const suit = SUITS.find(s => s.symbol === suitSymbol);

            return (
              <div
                key={index}
                className="w-12 h-16 bg-white rounded-lg flex flex-col items-center justify-center shadow-lg border-2 border-amber-500"
              >
                <span className={`text-lg font-bold ${suit?.color || 'text-black'}`}>
                  {rank}
                </span>
                <span className={`text-xl ${suit?.color || 'text-black'}`}>
                  {suitSymbol}
                </span>
              </div>
            );
          })
        ) : (
          <div className="flex gap-2">
            {Array.from({ length: maxCards }).map((_, i) => (
              <div
                key={i}
                className="w-12 h-16 bg-slate-700 rounded-lg border-2 border-dashed border-slate-600 flex items-center justify-center"
              >
                <span className="text-slate-500 text-2xl">?</span>
              </div>
            ))}
          </div>
        )}

        {selectedCards.length > 0 && (
          <button
            onClick={() => onSelect([])}
            className="self-center px-2 py-1 text-xs text-slate-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Card Grid */}
      <div className="bg-slate-800 rounded-lg p-3 max-h-48 overflow-y-auto">
        <div className="grid grid-cols-13 gap-1">
          {/* Header row - Ranks */}
          <div className="col-span-13 grid grid-cols-13 gap-1 mb-1">
            {RANKS.map(rank => (
              <div key={rank} className="text-center text-xs text-slate-500 font-medium">
                {rank}
              </div>
            ))}
          </div>

          {/* Suit rows */}
          {SUITS.map(suit => (
            <React.Fragment key={suit.name}>
              {RANKS.map(rank => {
                const card = `${rank}${suit.symbol}`;
                const selected = isSelected(card);
                const disabled = isDisabled(card);

                return (
                  <button
                    key={card}
                    onClick={() => toggleCard(card)}
                    disabled={disabled}
                    className={`
                      w-6 h-8 rounded text-xs font-medium transition-all
                      ${selected
                        ? 'bg-amber-500 text-white ring-2 ring-amber-400'
                        : disabled
                          ? 'bg-slate-700/50 text-slate-600 cursor-not-allowed'
                          : 'bg-slate-700 hover:bg-slate-600 ' + suit.color
                      }
                    `}
                  >
                    {suit.symbol}
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        {selectedCards.length}/{maxCards} cards selected
      </p>
    </div>
  );
}
