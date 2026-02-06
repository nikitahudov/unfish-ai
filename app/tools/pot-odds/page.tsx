'use client';

import React, { useState, useMemo } from 'react';

interface Calculations {
  potOddsPercent: string;
  potOddsRatio: string;
  breakEvenEquity: string;
  totalPotAfterCall: string;
  ev: string | null;
  isPositiveEV: boolean | null;
  priceYouGet: string;
}

export default function PotOddsCalculatorPage() {
  const [potSize, setPotSize] = useState<string>('100');
  const [betSize, setBetSize] = useState<string>('50');
  const [yourEquity, setYourEquity] = useState<string>('');

  // Calculate all values
  const calculations = useMemo((): Calculations | null => {
    const pot = parseFloat(potSize) || 0;
    const bet = parseFloat(betSize) || 0;
    const equity = parseFloat(yourEquity) || 0;

    if (pot <= 0 || bet <= 0) {
      return null;
    }

    // Total pot after villain's bet (before our call)
    const potPlusBet = pot + bet;

    // Total pot if we call
    const totalPotAfterCall = potPlusBet + bet;

    // Pot odds = what we risk / what we can win
    // We risk: bet (our call)
    // We can win: pot + bet (current pot including villain's bet)
    const potOddsPercent = (bet / totalPotAfterCall) * 100;

    // Pot odds ratio (X:1 means pot is X times our call)
    const potOddsRatio = potPlusBet / bet;

    // Break-even equity = same as pot odds percent
    const breakEvenEquity = potOddsPercent;

    // Price we're getting (pot : call)
    const priceYouGet = `${potPlusBet.toFixed(0)} : ${bet.toFixed(0)}`;

    // EV calculation if equity is provided
    let ev: string | null = null;
    let isPositiveEV: boolean | null = null;

    if (equity > 0) {
      // EV = (Equity × Pot we win) - ((1 - Equity) × Amount we risk)
      const equityDecimal = equity / 100;
      const evValue = (equityDecimal * potPlusBet) - ((1 - equityDecimal) * bet);
      ev = evValue.toFixed(2);
      isPositiveEV = equity > breakEvenEquity;
    }

    return {
      potOddsPercent: potOddsPercent.toFixed(1),
      potOddsRatio: potOddsRatio.toFixed(2),
      breakEvenEquity: breakEvenEquity.toFixed(1),
      totalPotAfterCall: totalPotAfterCall.toFixed(0),
      ev,
      isPositiveEV,
      priceYouGet,
    };
  }, [potSize, betSize, yourEquity]);

  // Bet size presets (relative to pot)
  const betPresets = [
    { label: '1/4 pot', multiplier: 0.25 },
    { label: '1/3 pot', multiplier: 0.33 },
    { label: '1/2 pot', multiplier: 0.5 },
    { label: '2/3 pot', multiplier: 0.67 },
    { label: '3/4 pot', multiplier: 0.75 },
    { label: 'Pot', multiplier: 1 },
    { label: '1.5x pot', multiplier: 1.5 },
    { label: '2x pot', multiplier: 2 },
  ];

  const applyBetPreset = (multiplier: number) => {
    const pot = parseFloat(potSize) || 0;
    if (pot > 0) {
      setBetSize((pot * multiplier).toFixed(0));
    }
  };

  // Common scenarios for quick reference
  const commonScenarios = [
    { pot: '100', bet: '25', label: '1/4 pot bet', equity: '20%' },
    { pot: '100', bet: '33', label: '1/3 pot bet', equity: '25%' },
    { pot: '100', bet: '50', label: '1/2 pot bet', equity: '25%' },
    { pot: '100', bet: '67', label: '2/3 pot bet', equity: '29%' },
    { pot: '100', bet: '75', label: '3/4 pot bet', equity: '30%' },
    { pot: '100', bet: '100', label: 'Pot-size bet', equity: '33%' },
    { pot: '100', bet: '150', label: '1.5x pot bet', equity: '38%' },
    { pot: '100', bet: '200', label: '2x pot bet', equity: '40%' },
  ];

  const applyScenario = (scenario: typeof commonScenarios[0]) => {
    setPotSize(scenario.pot);
    setBetSize(scenario.bet);
    setYourEquity('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">🎯 Pot Odds Calculator</h1>
        <p className="text-slate-400">
          Calculate pot odds, break-even equity, and whether a call is mathematically profitable.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Input</h2>

          <div className="space-y-5">
            {/* Pot Size */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Current Pot Size
                <span className="text-slate-500 font-normal ml-2">(before villain&apos;s bet)</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">$</span>
                <input
                  type="number"
                  value={potSize}
                  onChange={(e) => setPotSize(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 text-white text-lg rounded-lg border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                  placeholder="100"
                  min="0"
                  step="1"
                />
              </div>
            </div>

            {/* Bet Size */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Villain&apos;s Bet
                <span className="text-slate-500 font-normal ml-2">(amount you need to call)</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">$</span>
                <input
                  type="number"
                  value={betSize}
                  onChange={(e) => setBetSize(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 text-white text-lg rounded-lg border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                  placeholder="50"
                  min="0"
                  step="1"
                />
              </div>

              {/* Bet Presets */}
              <div className="flex flex-wrap gap-2 mt-3">
                {betPresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => applyBetPreset(preset.multiplier)}
                    className="px-2.5 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Your Equity (Optional) */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Your Equity
                <span className="text-amber-400 font-normal ml-2">(optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={yourEquity}
                  onChange={(e) => setYourEquity(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 bg-slate-700 text-white text-lg rounded-lg border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                  placeholder="e.g., 35"
                  min="0"
                  max="100"
                  step="0.1"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">%</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Enter your estimated equity to see if calling is +EV
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Results</h2>

          {calculations ? (
            <div className="space-y-4">
              {/* Main Results */}
              <div className="grid grid-cols-2 gap-3">
                {/* Pot Odds */}
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Pot Odds</div>
                  <div className="text-2xl font-bold text-white">{calculations.potOddsPercent}%</div>
                  <div className="text-sm text-slate-500 mt-1">
                    {calculations.potOddsRatio} : 1
                  </div>
                </div>

                {/* Break-even Equity */}
                <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-4">
                  <div className="text-sm text-amber-400 mb-1">Need to Win</div>
                  <div className="text-2xl font-bold text-white">{calculations.breakEvenEquity}%</div>
                  <div className="text-sm text-slate-500 mt-1">
                    to break even
                  </div>
                </div>
              </div>

              {/* Price You're Getting */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-sm text-slate-400 mb-1">Price You&apos;re Getting</div>
                <div className="text-xl font-bold text-white">{calculations.priceYouGet}</div>
                <div className="text-sm text-slate-500 mt-1">
                  Risk ${betSize} to win ${(parseFloat(potSize) + parseFloat(betSize)).toFixed(0)}
                </div>
              </div>

              {/* EV Analysis (if equity provided) */}
              {calculations.ev !== null && (
                <div className={`rounded-lg p-4 ${
                  calculations.isPositiveEV
                    ? 'bg-emerald-500/20 border border-emerald-500/30'
                    : 'bg-red-500/20 border border-red-500/30'
                }`}>
                  <div className="text-sm text-slate-300 mb-1">Expected Value</div>
                  <div className={`text-3xl font-bold ${
                    calculations.isPositiveEV ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {parseFloat(calculations.ev) >= 0 ? '+' : ''}{calculations.ev}
                  </div>
                  <div className={`text-sm mt-2 ${
                    calculations.isPositiveEV ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {calculations.isPositiveEV
                      ? '✓ Calling is profitable (+EV)'
                      : '✗ Calling is NOT profitable (-EV)'}
                  </div>

                  {/* Equity comparison bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Your Equity: {yourEquity}%</span>
                      <span className="text-amber-400">Need: {calculations.breakEvenEquity}%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full relative overflow-hidden">
                      {/* Required equity marker */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-10"
                        style={{ left: `${Math.min(parseFloat(calculations.breakEvenEquity), 100)}%` }}
                      />
                      {/* Your equity bar */}
                      <div
                        className={`h-full rounded-full transition-all ${
                          calculations.isPositiveEV ? 'bg-emerald-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(parseFloat(yourEquity), 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Text */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-sm text-slate-400 mb-2">Summary</div>
                <p className="text-sm text-slate-300">
                  You need to call <span className="text-white font-semibold">${betSize}</span> to win a pot of{' '}
                  <span className="text-white font-semibold">${calculations.totalPotAfterCall}</span>.
                  You need at least <span className="text-amber-400 font-semibold">{calculations.breakEvenEquity}% equity</span> to break even on this call.
                </p>
                {!yourEquity && (
                  <p className="text-xs text-slate-500 mt-2">
                    💡 Enter your equity above to see if the call is profitable
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              Enter pot and bet size to calculate
            </div>
          )}
        </div>
      </div>

      {/* Common Scenarios */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">📋 Common Bet Sizes & Required Equity</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-700">
                <th className="text-left py-3 pr-4">Bet Size</th>
                <th className="text-center py-3 px-4">Pot Odds</th>
                <th className="text-center py-3 px-4">Equity Needed</th>
                <th className="text-center py-3 pl-4">Odds</th>
              </tr>
            </thead>
            <tbody>
              {commonScenarios.map((scenario, idx) => (
                <tr
                  key={idx}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer"
                  onClick={() => applyScenario(scenario)}
                >
                  <td className="py-3 pr-4 text-slate-300">{scenario.label}</td>
                  <td className="py-3 px-4 text-center text-white">
                    {((parseFloat(scenario.bet) / (parseFloat(scenario.pot) + parseFloat(scenario.bet) * 2)) * 100).toFixed(1)}%
                  </td>
                  <td className="py-3 px-4 text-center text-amber-400 font-bold">{scenario.equity}</td>
                  <td className="py-3 pl-4 text-center text-slate-400">
                    {((parseFloat(scenario.pot) + parseFloat(scenario.bet)) / parseFloat(scenario.bet)).toFixed(1)}:1
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          💡 Click any row to load those values into the calculator
        </p>
      </div>

      {/* Educational Section */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">📚 How Pot Odds Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-400">
          <div>
            <h3 className="font-medium text-white mb-2">What are Pot Odds?</h3>
            <p>
              Pot odds represent the ratio between the current pot size and the cost of a call.
              They tell you what percentage of the time you need to win to break even on a call.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">The Formula</h3>
            <div className="bg-slate-900 rounded p-3 font-mono text-xs">
              Pot Odds % = Call ÷ (Pot + Call)<br/>
              <span className="text-slate-500">Example: $50 ÷ ($150 + $50) = 25%</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">When to Call</h3>
            <p>
              If your equity (chance of winning) is <span className="text-emerald-400">greater</span> than
              the pot odds percentage, calling is profitable in the long run. If your equity
              is <span className="text-red-400">less</span> than pot odds, you should fold.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Implied Odds</h3>
            <p>
              Implied odds account for money you might win on future streets. With strong drawing
              hands, you can sometimes call with less equity than pot odds require if you expect
              to win more when you hit.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-amber-400 mb-4">💡 Quick Memorization Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div>
            <h3 className="font-medium text-white mb-2">Common Bet Sizes</h3>
            <ul className="space-y-1">
              <li>• <span className="text-amber-400">1/2 pot:</span> need ~25% equity</li>
              <li>• <span className="text-amber-400">2/3 pot:</span> need ~29% equity</li>
              <li>• <span className="text-amber-400">Pot size:</span> need ~33% equity</li>
              <li>• <span className="text-amber-400">2x pot:</span> need ~40% equity</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Mental Shortcuts</h3>
            <ul className="space-y-1">
              <li>• Half pot = about 3:1 odds = 25%</li>
              <li>• Pot size bet = 2:1 odds = 33%</li>
              <li>• Overbet (2x pot) = ~1.5:1 = 40%</li>
              <li>• The bigger the bet, the more you need</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
