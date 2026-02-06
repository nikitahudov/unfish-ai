'use client';

import React, { useState, useCallback } from 'react';
import { calculateEquity, EquityResult, COMMON_MATCHUPS } from '@/lib/poker/equity';
import { RANKS, SUITS, getSuitSymbol, getSuitColor, Suit } from '@/lib/poker/cards';

type InputMode = 'cards' | 'range';

interface PlayerInput {
  mode: InputMode;
  cards: string[]; // Two card codes like ["Ah", "Kd"]
  range: string; // Range notation like "AA,KK,QQ"
}

export default function EquityCalculatorPage() {
  const [player1, setPlayer1] = useState<PlayerInput>({
    mode: 'cards',
    cards: ['', ''],
    range: ''
  });
  const [player2, setPlayer2] = useState<PlayerInput>({
    mode: 'cards',
    cards: ['', ''],
    range: ''
  });
  const [board, setBoard] = useState<string[]>(['', '', '', '', '']);
  const [result, setResult] = useState<EquityResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [iterations, setIterations] = useState(10000);
  const [error, setError] = useState<string | null>(null);

  // Get used cards to disable in selectors
  const getUsedCards = useCallback(() => {
    const used = new Set<string>();
    player1.cards.forEach(c => c && used.add(c));
    player2.cards.forEach(c => c && used.add(c));
    board.forEach(c => c && used.add(c));
    return used;
  }, [player1.cards, player2.cards, board]);

  const handleCalculate = useCallback(async () => {
    setError(null);

    // Build hand strings
    let hand1 = '';
    let hand2 = '';

    if (player1.mode === 'cards') {
      if (!player1.cards[0] || !player1.cards[1]) {
        setError('Please select both cards for Player 1');
        return;
      }
      hand1 = player1.cards.join('');
    } else {
      if (!player1.range.trim()) {
        setError('Please enter a range for Player 1');
        return;
      }
      hand1 = player1.range;
    }

    if (player2.mode === 'cards') {
      if (!player2.cards[0] || !player2.cards[1]) {
        setError('Please select both cards for Player 2');
        return;
      }
      hand2 = player2.cards.join('');
    } else {
      if (!player2.range.trim()) {
        setError('Please enter a range for Player 2');
        return;
      }
      hand2 = player2.range;
    }

    // Build board string
    const boardStr = board.filter(c => c).join('');

    setIsCalculating(true);

    // Use setTimeout to allow UI to update
    setTimeout(() => {
      try {
        const equityResult = calculateEquity({
          hand1,
          hand2,
          board: boardStr,
          iterations
        });
        setResult(equityResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Calculation failed');
      } finally {
        setIsCalculating(false);
      }
    }, 50);
  }, [player1, player2, board, iterations]);

  const applyPreset = (preset: typeof COMMON_MATCHUPS[0]) => {
    setPlayer1({
      mode: 'cards',
      cards: [preset.hand1.slice(0, 2), preset.hand1.slice(2, 4)],
      range: ''
    });
    setPlayer2({
      mode: 'cards',
      cards: [preset.hand2.slice(0, 2), preset.hand2.slice(2, 4)],
      range: ''
    });
    setBoard(['', '', '', '', '']);
    setResult(null);
  };

  const clearAll = () => {
    setPlayer1({ mode: 'cards', cards: ['', ''], range: '' });
    setPlayer2({ mode: 'cards', cards: ['', ''], range: '' });
    setBoard(['', '', '', '', '']);
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Equity Calculator</h1>
        <p className="text-slate-400">
          Calculate win percentages for hand vs hand or hand vs range matchups.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr,320px] gap-6">
        {/* Main Calculator */}
        <div className="space-y-6">
          {/* Players */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            {/* Player 1 */}
            <PlayerInputCard
              title="Player 1"
              color="blue"
              player={player1}
              setPlayer={setPlayer1}
              usedCards={getUsedCards()}
              equity={result?.player1.equity}
            />

            {/* VS Divider */}
            <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-slate-400 font-bold border border-slate-600">
                VS
              </div>
            </div>

            {/* Player 2 */}
            <PlayerInputCard
              title="Player 2"
              color="red"
              player={player2}
              setPlayer={setPlayer2}
              usedCards={getUsedCards()}
              equity={result?.player2.equity}
            />
          </div>

          {/* Board */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-3">Board (optional)</h3>
            <div className="flex gap-2 flex-wrap">
              {board.map((card, idx) => (
                <CardSelector
                  key={idx}
                  value={card}
                  onChange={(c) => {
                    const newBoard = [...board];
                    newBoard[idx] = c;
                    // Clear subsequent cards if this one is cleared
                    if (!c) {
                      for (let i = idx; i < newBoard.length; i++) {
                        newBoard[i] = '';
                      }
                    }
                    setBoard(newBoard);
                  }}
                  usedCards={getUsedCards()}
                  placeholder={idx < 3 ? 'Flop' : idx === 3 ? 'Turn' : 'River'}
                  disabled={idx > 0 && !board[idx - 1]}
                />
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleCalculate}
              disabled={isCalculating}
              className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 text-white font-medium rounded-lg transition-colors"
            >
              {isCalculating ? 'Calculating...' : 'Calculate Equity'}
            </button>
            <button
              onClick={clearAll}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Results</h3>

              {/* Equity Bars */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-400">Player 1</span>
                    <span className="text-white font-bold">{result.player1.equity.toFixed(1)}%</span>
                  </div>
                  <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all"
                      style={{ width: `${result.player1.equity}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-400">Player 2</span>
                    <span className="text-white font-bold">{result.player2.equity.toFixed(1)}%</span>
                  </div>
                  <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 transition-all"
                      style={{ width: `${result.player2.equity}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-slate-400">Win</div>
                  <div className="text-blue-400 font-bold">{result.player1.win}</div>
                  <div className="text-red-400 font-bold">{result.player2.win}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-slate-400">Tie</div>
                  <div className="text-white font-bold">{result.player1.tie}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-slate-400">Iterations</div>
                  <div className="text-white font-bold">{result.iterations.toLocaleString()}</div>
                </div>
              </div>

              <div className="mt-3 text-center text-xs text-slate-500">
                Calculated in {result.elapsed.toFixed(0)}ms
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Settings */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-3">Settings</h3>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Iterations</label>
              <select
                value={iterations}
                onChange={(e) => setIterations(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 text-sm"
              >
                <option value={1000}>1,000 (fast)</option>
                <option value={10000}>10,000 (balanced)</option>
                <option value={50000}>50,000 (accurate)</option>
                <option value={100000}>100,000 (precise)</option>
              </select>
            </div>
          </div>

          {/* Common Matchups */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-3">Common Matchups</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {COMMON_MATCHUPS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(preset)}
                  className="w-full flex justify-between items-center px-3 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm transition-colors"
                >
                  <span className="text-slate-300">{preset.name}</span>
                  <span className="text-amber-400 font-medium">~{preset.equity1}%</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <h3 className="text-sm font-medium text-amber-400 mb-2">Tips</h3>
            <ul className="text-xs text-slate-300 space-y-1">
              <li>More iterations = more accurate results</li>
              <li>Use range mode for hand vs range calculations</li>
              <li>Board cards narrow the equity calculations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Card Selector Component
function CardSelector({
  value,
  onChange,
  usedCards,
  placeholder,
  disabled
}: {
  value: string;
  onChange: (card: string) => void;
  usedCards: Set<string>;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (disabled) {
    return (
      <div className="w-16 h-20 bg-slate-700/50 rounded-lg border border-slate-600 flex items-center justify-center text-slate-600 text-xs">
        {placeholder}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-20 rounded-lg border-2 transition-colors flex items-center justify-center ${
          value
            ? 'bg-slate-700 border-amber-500'
            : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
        }`}
      >
        {value ? (
          <span className={`text-2xl font-bold ${getSuitColor(value[1] as Suit)}`}>
            {value[0]}{getSuitSymbol(value[1] as Suit)}
          </span>
        ) : (
          <span className="text-xs text-slate-500">{placeholder || 'Select'}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-20 bg-slate-800 rounded-lg border border-slate-700 shadow-xl p-2 w-48">
            {/* Clear option */}
            {value && (
              <button
                onClick={() => {
                  onChange('');
                  setIsOpen(false);
                }}
                className="w-full text-left px-2 py-1 text-sm text-red-400 hover:bg-slate-700 rounded mb-2"
              >
                Clear
              </button>
            )}

            {/* Card grid */}
            <div className="grid grid-cols-4 gap-1">
              {RANKS.map(rank => (
                SUITS.map(suit => {
                  const code = `${rank}${suit}`;
                  const isUsed = usedCards.has(code) && code !== value;
                  return (
                    <button
                      key={code}
                      disabled={isUsed}
                      onClick={() => {
                        onChange(code);
                        setIsOpen(false);
                      }}
                      className={`p-1 text-xs font-bold rounded transition-colors ${
                        isUsed
                          ? 'bg-slate-700/30 text-slate-600 cursor-not-allowed'
                          : code === value
                          ? 'bg-amber-500 text-white'
                          : `${getSuitColor(suit)} bg-slate-700 hover:bg-slate-600`
                      }`}
                    >
                      {rank}{getSuitSymbol(suit)}
                    </button>
                  );
                })
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Player Input Card Component
function PlayerInputCard({
  title,
  color,
  player,
  setPlayer,
  usedCards,
  equity
}: {
  title: string;
  color: 'blue' | 'red';
  player: PlayerInput;
  setPlayer: (p: PlayerInput) => void;
  usedCards: Set<string>;
  equity?: number;
}) {
  const colorClasses = color === 'blue'
    ? 'border-blue-500/30 bg-blue-500/5'
    : 'border-red-500/30 bg-red-500/5';

  return (
    <div className={`bg-slate-800 rounded-xl border ${colorClasses} p-4`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`font-semibold ${color === 'blue' ? 'text-blue-400' : 'text-red-400'}`}>
          {title}
        </h3>
        {equity !== undefined && (
          <span className="text-xl font-bold text-white">{equity.toFixed(1)}%</span>
        )}
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setPlayer({ ...player, mode: 'cards' })}
          className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors ${
            player.mode === 'cards'
              ? 'bg-amber-500 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          Specific Hand
        </button>
        <button
          onClick={() => setPlayer({ ...player, mode: 'range' })}
          className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors ${
            player.mode === 'range'
              ? 'bg-amber-500 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          Range
        </button>
      </div>

      {player.mode === 'cards' ? (
        <div className="flex gap-2 justify-center">
          <CardSelector
            value={player.cards[0]}
            onChange={(c) => setPlayer({ ...player, cards: [c, player.cards[1]] })}
            usedCards={usedCards}
            placeholder="Card 1"
          />
          <CardSelector
            value={player.cards[1]}
            onChange={(c) => setPlayer({ ...player, cards: [player.cards[0], c] })}
            usedCards={usedCards}
            placeholder="Card 2"
          />
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={player.range}
            onChange={(e) => setPlayer({ ...player, range: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none text-sm"
            placeholder="e.g., AA,KK,QQ,AKs"
          />
          <p className="text-xs text-slate-500 mt-1">
            Use notation: AA, KK, AKs, AKo, JJ+, ATs+
          </p>
        </div>
      )}
    </div>
  );
}
