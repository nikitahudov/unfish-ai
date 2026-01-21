'use client';

import { useState } from 'react';

interface CalculatorProps {
  type: 'pot-odds' | 'equity' | 'ev';
}

const commonScenarios = [
  { name: 'Half-pot bet', pot: 100, bet: 50 },
  { name: '2/3 pot bet', pot: 100, bet: 67 },
  { name: 'Pot-sized bet', pot: 100, bet: 100 },
  { name: '2x pot overbet', pot: 100, bet: 200 },
];

export function Calculator({ type }: CalculatorProps) {
  const [potSize, setPotSize] = useState<string>('');
  const [betAmount, setBetAmount] = useState<string>('');

  const handleClear = () => {
    setPotSize('');
    setBetAmount('');
  };

  const handleScenario = (scenario: typeof commonScenarios[0]) => {
    setPotSize(scenario.pot.toString());
    setBetAmount(scenario.bet.toString());
  };

  const calculatePotOdds = () => {
    const pot = parseFloat(potSize);
    const bet = parseFloat(betAmount);

    if (isNaN(pot) || isNaN(bet) || bet === 0) {
      return null;
    }

    const totalPot = pot + bet;
    const ratio = totalPot / bet;
    const percentageNeeded = (bet / (totalPot + bet)) * 100;

    return {
      ratio: ratio.toFixed(1),
      percentageNeeded: percentageNeeded.toFixed(1),
    };
  };

  if (type === 'equity' || type === 'ev') {
    return (
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-semibold text-white mb-4">
          {type === 'equity' ? 'Equity Calculator' : 'EV Calculator'}
        </h3>
        <p className="text-slate-400 text-sm">
          This calculator is coming soon!
        </p>
      </div>
    );
  }

  const result = calculatePotOdds();

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
      <h3 className="text-xl font-semibold text-white mb-4">
        Pot Odds Calculator
      </h3>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Pot Size
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400">$</span>
            <input
              type="number"
              value={potSize}
              onChange={(e) => setPotSize(e.target.value)}
              placeholder="100"
              min="0"
              step="1"
              className="w-full pl-7 pr-4 py-2 bg-slate-700 text-white rounded border-2 border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Bet/Call Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400">$</span>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              placeholder="50"
              min="0"
              step="1"
              className="w-full pl-7 pr-4 py-2 bg-slate-700 text-white rounded border-2 border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Common Scenarios */}
      <div className="mb-6">
        <p className="text-xs text-slate-400 mb-2">QUICK PRESETS</p>
        <div className="flex flex-wrap gap-2">
          {commonScenarios.map((scenario, index) => (
            <button
              key={index}
              onClick={() => handleScenario(scenario)}
              className="px-3 py-1 text-sm bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition-colors"
            >
              {scenario.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {result ? (
        <div className="bg-amber-500/10 border-2 border-amber-500 rounded-lg p-6 mb-4">
          <div className="space-y-3">
            <div>
              <p className="text-xs text-amber-400 mb-1">POT ODDS</p>
              <p className="text-3xl font-bold text-amber-400">
                {result.ratio}:1
              </p>
            </div>
            <div className="border-t border-amber-500/30 pt-3">
              <p className="text-sm text-slate-300">
                You need <strong className="text-amber-400">{result.percentageNeeded}%</strong> equity to call profitably
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-700/50 rounded-lg p-6 mb-4 text-center">
          <p className="text-slate-400 text-sm">
            Enter pot size and bet amount to calculate pot odds
          </p>
        </div>
      )}

      {/* Clear Button */}
      <button
        onClick={handleClear}
        className="w-full px-4 py-2 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition-colors"
      >
        Clear
      </button>

      {/* How it works */}
      <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
        <p className="text-xs text-slate-400 mb-2">HOW IT WORKS</p>
        <ul className="text-sm text-slate-300 space-y-1">
          <li>• Pot Odds = (Pot + Bet) : Bet</li>
          <li>• Equity Needed = Bet / (Pot + Bet + Bet)</li>
          <li>• Example: $100 pot, $50 bet = 3:1 odds (25% needed)</li>
        </ul>
      </div>
    </div>
  );
}
