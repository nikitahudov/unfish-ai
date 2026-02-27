'use client';

import React, { useState, useMemo } from 'react';

type CalculationMode = 'call' | 'bet' | 'allin';

interface EVResult {
  ev: number;
  evFormatted: string;
  isPositive: boolean;
  breakdown: {
    label: string;
    calculation: string;
    value: number;
  }[];
}

export default function EVCalculatorPage() {
  const [mode, setMode] = useState<CalculationMode>('call');

  // Call EV inputs
  const [potSize, setPotSize] = useState<string>('100');
  const [callAmount, setCallAmount] = useState<string>('50');
  const [winEquity, setWinEquity] = useState<string>('35');

  // Bet/Raise EV inputs
  const [betAmount, setBetAmount] = useState<string>('75');
  const [foldEquity, setFoldEquity] = useState<string>('40');
  const [equityWhenCalled, setEquityWhenCalled] = useState<string>('35');

  // All-in EV inputs
  const [stackSize, setStackSize] = useState<string>('100');
  const [villainStack, setVillainStack] = useState<string>('100');
  const [allinFoldEquity, setAllinFoldEquity] = useState<string>('50');
  const [allinEquity, setAllinEquity] = useState<string>('40');

  // Calculate EV based on mode
  const result = useMemo((): EVResult | null => {
    if (mode === 'call') {
      // Call EV = (Equity × Pot after call) - (1 - Equity) × Call amount
      // Or: EV = Equity × (Pot + Call) - Call
      const pot = parseFloat(potSize) || 0;
      const call = parseFloat(callAmount) || 0;
      const equity = (parseFloat(winEquity) || 0) / 100;

      if (pot <= 0 || call <= 0) return null;

      const potAfterCall = pot + call;
      const winAmount = potAfterCall; // What we win (pot + their bet)
      const loseAmount = call; // What we lose (our call)

      const evWin = equity * winAmount;
      const evLose = (1 - equity) * loseAmount;
      const ev = evWin - evLose;

      return {
        ev,
        evFormatted: ev >= 0 ? `+${ev.toFixed(2)}` : ev.toFixed(2),
        isPositive: ev >= 0,
        breakdown: [
          {
            label: 'Win Scenario',
            calculation: `${(equity * 100).toFixed(1)}% × $${winAmount.toFixed(0)}`,
            value: evWin,
          },
          {
            label: 'Lose Scenario',
            calculation: `${((1 - equity) * 100).toFixed(1)}% × -$${loseAmount.toFixed(0)}`,
            value: -evLose,
          },
          {
            label: 'Expected Value',
            calculation: `$${evWin.toFixed(2)} - $${evLose.toFixed(2)}`,
            value: ev,
          },
        ],
      };
    }

    if (mode === 'bet') {
      // Bet EV with fold equity
      // EV = (FoldEq × CurrentPot) + (1 - FoldEq) × [(Equity × PotAfterCall) - (1 - Equity) × Bet]
      const pot = parseFloat(potSize) || 0;
      const bet = parseFloat(betAmount) || 0;
      const foldEq = (parseFloat(foldEquity) || 0) / 100;
      const eqWhenCalled = (parseFloat(equityWhenCalled) || 0) / 100;

      if (pot <= 0 || bet <= 0) return null;

      const potIfCalled = pot + bet + bet; // Our bet + their call

      // EV when they fold
      const evFold = foldEq * pot;

      // EV when they call
      const evWinWhenCalled = eqWhenCalled * potIfCalled;
      const evLoseWhenCalled = (1 - eqWhenCalled) * bet;
      const evWhenCalled = (1 - foldEq) * (evWinWhenCalled - evLoseWhenCalled);

      const ev = evFold + evWhenCalled;

      return {
        ev,
        evFormatted: ev >= 0 ? `+${ev.toFixed(2)}` : ev.toFixed(2),
        isPositive: ev >= 0,
        breakdown: [
          {
            label: 'When They Fold',
            calculation: `${(foldEq * 100).toFixed(1)}% × $${pot.toFixed(0)}`,
            value: evFold,
          },
          {
            label: 'When They Call (Win)',
            calculation: `${((1 - foldEq) * 100).toFixed(1)}% × ${(eqWhenCalled * 100).toFixed(1)}% × $${potIfCalled.toFixed(0)}`,
            value: (1 - foldEq) * evWinWhenCalled,
          },
          {
            label: 'When They Call (Lose)',
            calculation: `${((1 - foldEq) * 100).toFixed(1)}% × ${((1 - eqWhenCalled) * 100).toFixed(1)}% × -$${bet.toFixed(0)}`,
            value: -(1 - foldEq) * evLoseWhenCalled,
          },
          {
            label: 'Expected Value',
            calculation: 'Fold EV + Called EV',
            value: ev,
          },
        ],
      };
    }

    if (mode === 'allin') {
      // All-in EV
      const pot = parseFloat(potSize) || 0;
      const stack = parseFloat(stackSize) || 0;
      const vStack = parseFloat(villainStack) || 0;
      const foldEq = (parseFloat(allinFoldEquity) || 0) / 100;
      const equity = (parseFloat(allinEquity) || 0) / 100;

      if (pot <= 0 || stack <= 0) return null;

      const effectiveStack = Math.min(stack, vStack);
      const potIfCalled = pot + effectiveStack * 2;

      // EV when they fold
      const evFold = foldEq * pot;

      // EV when they call
      const evWinWhenCalled = equity * potIfCalled;
      const evLoseWhenCalled = (1 - equity) * effectiveStack;
      const evWhenCalled = (1 - foldEq) * (evWinWhenCalled - evLoseWhenCalled);

      const ev = evFold + evWhenCalled;

      return {
        ev,
        evFormatted: ev >= 0 ? `+${ev.toFixed(2)}` : ev.toFixed(2),
        isPositive: ev >= 0,
        breakdown: [
          {
            label: 'When They Fold',
            calculation: `${(foldEq * 100).toFixed(1)}% × $${pot.toFixed(0)}`,
            value: evFold,
          },
          {
            label: 'When They Call (Win)',
            calculation: `${((1 - foldEq) * 100).toFixed(1)}% × ${(equity * 100).toFixed(1)}% × $${potIfCalled.toFixed(0)}`,
            value: (1 - foldEq) * evWinWhenCalled,
          },
          {
            label: 'When They Call (Lose)',
            calculation: `${((1 - foldEq) * 100).toFixed(1)}% × ${((1 - equity) * 100).toFixed(1)}% × -$${effectiveStack.toFixed(0)}`,
            value: -(1 - foldEq) * evLoseWhenCalled,
          },
          {
            label: 'Expected Value',
            calculation: 'Fold EV + Called EV',
            value: ev,
          },
        ],
      };
    }

    return null;
  }, [mode, potSize, callAmount, winEquity, betAmount, foldEquity, equityWhenCalled, stackSize, villainStack, allinFoldEquity, allinEquity]);

  // Calculate break-even values
  const breakEven = useMemo(() => {
    if (mode === 'call') {
      const pot = parseFloat(potSize) || 0;
      const call = parseFloat(callAmount) || 0;
      if (pot <= 0 || call <= 0) return null;

      // Break-even equity = Call / (Pot + Call)
      const beEquity = (call / (pot + call)) * 100;
      return { equity: beEquity.toFixed(1) };
    }

    if (mode === 'bet' || mode === 'allin') {
      const pot = parseFloat(potSize) || 0;
      const bet = mode === 'bet' ? parseFloat(betAmount) || 0 : parseFloat(stackSize) || 0;
      if (pot <= 0 || bet <= 0) return null;

      // Break-even fold equity (if we have 0 equity when called)
      // Need them to fold: Bet / (Pot + Bet) of the time
      const beFoldEquity = (bet / (pot + bet)) * 100;
      return { foldEquity: beFoldEquity.toFixed(1) };
    }

    return null;
  }, [mode, potSize, callAmount, betAmount, stackSize]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">EV Calculator</h1>
        <p className="text-slate-400">
          Calculate the expected value of your poker decisions.
        </p>
      </div>

      {/* Mode Selector */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
        <label className="block text-sm font-medium text-slate-400 mb-3">Calculation Mode</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setMode('call')}
            className={`px-4 py-3 rounded-lg font-medium transition-colors ${
              mode === 'call'
                ? 'bg-amber-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <div className="text-sm">Call EV</div>
          </button>
          <button
            onClick={() => setMode('bet')}
            className={`px-4 py-3 rounded-lg font-medium transition-colors ${
              mode === 'bet'
                ? 'bg-amber-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <div className="text-sm">Bet/Raise EV</div>
          </button>
          <button
            onClick={() => setMode('allin')}
            className={`px-4 py-3 rounded-lg font-medium transition-colors ${
              mode === 'allin'
                ? 'bg-amber-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <div className="text-sm">All-In EV</div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            {mode === 'call' && 'Call Decision'}
            {mode === 'bet' && 'Bet/Raise Decision'}
            {mode === 'allin' && 'All-In Decision'}
          </h2>

          <div className="space-y-4">
            {/* Common: Pot Size */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Current Pot Size
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <input
                  type="number"
                  value={potSize}
                  onChange={(e) => setPotSize(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none"
                  placeholder="100"
                  min="0"
                />
              </div>
            </div>

            {/* Call Mode Inputs */}
            {mode === 'call' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Amount to Call
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input
                      type="number"
                      value={callAmount}
                      onChange={(e) => setCallAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none"
                      placeholder="50"
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Your Equity (Win %)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={winEquity}
                      onChange={(e) => setWinEquity(e.target.value)}
                      className="w-full pr-8 pl-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none"
                      placeholder="35"
                      min="0"
                      max="100"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Your estimated chance of winning at showdown
                  </p>
                </div>
              </>
            )}

            {/* Bet Mode Inputs */}
            {mode === 'bet' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Bet/Raise Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input
                      type="number"
                      value={betAmount}
                      onChange={(e) => setBetAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none"
                      placeholder="75"
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Fold Equity (Villain Folds %)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={foldEquity}
                      onChange={(e) => setFoldEquity(e.target.value)}
                      className="w-full pr-8 pl-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none"
                      placeholder="40"
                      min="0"
                      max="100"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Estimated chance villain folds to your bet
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Equity When Called
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={equityWhenCalled}
                      onChange={(e) => setEquityWhenCalled(e.target.value)}
                      className="w-full pr-8 pl-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none"
                      placeholder="35"
                      min="0"
                      max="100"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Your win % against villain&apos;s calling range
                  </p>
                </div>
              </>
            )}

            {/* All-In Mode Inputs */}
            {mode === 'allin' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Your Stack
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                      <input
                        type="number"
                        value={stackSize}
                        onChange={(e) => setStackSize(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none"
                        placeholder="100"
                        min="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Villain&apos;s Stack
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                      <input
                        type="number"
                        value={villainStack}
                        onChange={(e) => setVillainStack(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none"
                        placeholder="100"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Fold Equity (Villain Folds %)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={allinFoldEquity}
                      onChange={(e) => setAllinFoldEquity(e.target.value)}
                      className="w-full pr-8 pl-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none"
                      placeholder="50"
                      min="0"
                      max="100"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Your Equity When Called
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={allinEquity}
                      onChange={(e) => setAllinEquity(e.target.value)}
                      className="w-full pr-8 pl-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none"
                      placeholder="40"
                      min="0"
                      max="100"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Break-even info */}
          {breakEven && (
            <div className="mt-6 pt-4 border-t border-slate-700">
              <h3 className="text-sm font-medium text-slate-400 mb-2">Break-Even Point</h3>
              {'equity' in breakEven && breakEven.equity && (
                <p className="text-sm text-slate-300">
                  You need at least <span className="text-amber-400 font-bold">{breakEven.equity}%</span> equity to break even on this call.
                </p>
              )}
              {'foldEquity' in breakEven && breakEven.foldEquity && (
                <p className="text-sm text-slate-300">
                  With 0% equity when called, you need <span className="text-amber-400 font-bold">{breakEven.foldEquity}%</span> fold equity to break even.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Expected Value</h2>

          {result ? (
            <div className="space-y-4">
              {/* Main EV Display */}
              <div className={`rounded-xl p-6 text-center ${
                result.isPositive
                  ? 'bg-emerald-500/20 border border-emerald-500/30'
                  : 'bg-red-500/20 border border-red-500/30'
              }`}>
                <div className="text-sm text-slate-400 mb-2">Expected Value</div>
                <div className={`text-4xl font-bold ${
                  result.isPositive ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {result.evFormatted}
                </div>
                <div className={`text-sm mt-2 ${
                  result.isPositive ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {result.isPositive
                    ? 'This is a profitable decision (+EV)'
                    : 'This is an unprofitable decision (-EV)'}
                </div>
              </div>

              {/* EV Breakdown */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-400">Calculation Breakdown</h3>
                {result.breakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex justify-between items-center p-3 rounded-lg ${
                      idx === result.breakdown.length - 1
                        ? 'bg-slate-700 border border-slate-600'
                        : 'bg-slate-700/50'
                    }`}
                  >
                    <div>
                      <div className="text-sm text-white">{item.label}</div>
                      <div className="text-xs text-slate-500">{item.calculation}</div>
                    </div>
                    <div className={`font-bold ${
                      item.value >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {item.value >= 0 ? '+' : ''}{item.value.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Visual Bar */}
              <div className="pt-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>-EV</span>
                  <span>Break Even</span>
                  <span>+EV</span>
                </div>
                <div className="h-3 bg-slate-700 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 bg-red-500/30" />
                    <div className="w-1/2 bg-emerald-500/30" />
                  </div>
                  {/* Indicator */}
                  <div
                    className={`absolute top-0 bottom-0 w-1 ${
                      result.isPositive ? 'bg-emerald-400' : 'bg-red-400'
                    }`}
                    style={{
                      left: `${Math.min(Math.max(50 + result.ev / 2, 5), 95)}%`,
                      transform: 'translateX(-50%)'
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              Enter values to calculate EV
            </div>
          )}
        </div>
      </div>

      {/* Educational Section */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Understanding Expected Value</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-400">
          <div>
            <h3 className="font-medium text-white mb-2">What is EV?</h3>
            <p>
              Expected Value (EV) is the average amount you expect to win or lose on a decision
              if you made it thousands of times. A +EV decision is profitable long-term, while
              -EV is unprofitable.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Call EV Formula</h3>
            <p className="font-mono text-xs bg-slate-900 p-2 rounded">
              EV = (Equity x Pot) - ((1 - Equity) x Call)
            </p>
            <p className="mt-2">
              If your equity exceeds the pot odds, the call is +EV.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Fold Equity</h3>
            <p>
              Fold equity is the value gained when your opponent folds to your bet. Even with
              a weak hand, you can profit if opponents fold often enough. This is the basis
              of semi-bluffing.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Bet/Raise EV Formula</h3>
            <p className="font-mono text-xs bg-slate-900 p-2 rounded">
              EV = (FoldEq x Pot) + (1 - FoldEq) x [(Eq x NewPot) - ((1-Eq) x Bet)]
            </p>
            <p className="mt-2">
              Combines fold equity with showdown equity.
            </p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-amber-400 mb-4">Pro Tips</h2>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-amber-400">&bull;</span>
            <span>Use the Equity Calculator to determine your win % against villain&apos;s range</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400">&bull;</span>
            <span>Estimate fold equity based on villain&apos;s tendencies and board texture</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400">&bull;</span>
            <span>Remember: A small +EV edge repeated many times = big profits</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400">&bull;</span>
            <span>Semi-bluffs work best when you have both fold equity AND showdown equity</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
