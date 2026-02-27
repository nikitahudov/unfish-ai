'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  GameFormat,
  PlayerCount,
  StackSize,
  Scenario,
  Position,
  Decision,
  RANKS,
  POSITIONS_6MAX,
  POSITIONS_9MAX,
} from '@/lib/poker/types';
import {
  getRange,
  getValidHeroPositions,
  getValidVillainPositions,
} from '@/lib/poker/ranges';

type HandType = 'pair' | 'suited' | 'offsuit';

interface HandCell {
  hand: string;
  type: HandType;
  row: number;
  col: number;
}

// Generate the 13x13 grid
const generateGrid = (): HandCell[][] => {
  const grid: HandCell[][] = [];

  for (let i = 0; i < 13; i++) {
    const row: HandCell[] = [];
    for (let j = 0; j < 13; j++) {
      const rank1 = RANKS[i];
      const rank2 = RANKS[j];

      let hand: string;
      let type: HandType;

      if (i === j) {
        hand = `${rank1}${rank2}`;
        type = 'pair';
      } else if (i < j) {
        hand = `${rank1}${rank2}s`;
        type = 'suited';
      } else {
        hand = `${rank2}${rank1}o`;
        type = 'offsuit';
      }

      row.push({ hand, type, row: i, col: j });
    }
    grid.push(row);
  }

  return grid;
};

const GRID = generateGrid();

const SCENARIO_LABELS: Record<Scenario, string> = {
  'open': 'Opening (RFI)',
  'vs-raise': 'Facing Open',
  'vs-3bet': 'Facing 3-Bet',
  'vs-4bet': 'Facing 4-Bet',
  'vs-5bet': 'Facing 5-Bet',
};

const SCENARIO_DESCRIPTIONS: Record<Scenario, string> = {
  'open': 'First to enter the pot - raise or fold',
  'vs-raise': 'Someone opened, you can 3-bet, call, or fold',
  'vs-3bet': 'You opened, someone 3-bet - 4-bet, call, or fold',
  'vs-4bet': 'You 3-bet, someone 4-bet - 5-bet, call, or fold',
  'vs-5bet': 'You 4-bet, someone 5-bet - all-in or fold',
};

export default function GTOChartsPage() {
  // Configuration state
  const [format, setFormat] = useState<GameFormat>('cash');
  const [players, setPlayers] = useState<PlayerCount>(6);
  const [stackSize, setStackSize] = useState<StackSize>(100);
  const [scenario, setScenario] = useState<Scenario>('open');
  const [heroPosition, setHeroPosition] = useState<Position>('CO');
  const [villainPosition, setVillainPosition] = useState<Position | undefined>(undefined);

  // Get valid positions based on current config
  const validHeroPositions = useMemo(() =>
    getValidHeroPositions(players, scenario),
    [players, scenario]
  );

  const validVillainPositions = useMemo(() =>
    getValidVillainPositions(players, scenario, heroPosition),
    [players, scenario, heroPosition]
  );

  // Update hero position if current is invalid
  useEffect(() => {
    if (!validHeroPositions.includes(heroPosition)) {
      setHeroPosition(validHeroPositions[0]);
    }
  }, [validHeroPositions, heroPosition]);

  // Update villain position when needed
  useEffect(() => {
    if (scenario === 'open') {
      setVillainPosition(undefined);
    } else if (!villainPosition || !validVillainPositions.includes(villainPosition)) {
      setVillainPosition(validVillainPositions[0]);
    }
  }, [scenario, validVillainPositions, villainPosition]);

  // Get range data
  const rangeData = useMemo(() =>
    getRange(format, players, stackSize, scenario, heroPosition, villainPosition),
    [format, players, stackSize, scenario, heroPosition, villainPosition]
  );

  // Calculate statistics
  const stats = useMemo(() => {
    let raiseCount = 0;
    let callCount = 0;
    let foldCount = 0;
    let raiseCombos = 0;
    let callCombos = 0;
    let foldCombos = 0;

    Object.entries(rangeData).forEach(([hand, decision]) => {
      const combos = hand.length === 2 ? 6 : hand.endsWith('s') ? 4 : 12;

      if (decision === 'raise') {
        raiseCount++;
        raiseCombos += combos;
      } else if (decision === 'call') {
        callCount++;
        callCombos += combos;
      } else {
        foldCount++;
        foldCombos += combos;
      }
    });

    const totalCombos = raiseCombos + callCombos + foldCombos;

    return {
      raiseCount,
      callCount,
      foldCount,
      raiseCombos,
      callCombos,
      foldCombos,
      raisePercent: ((raiseCombos / totalCombos) * 100).toFixed(1),
      callPercent: ((callCombos / totalCombos) * 100).toFixed(1),
      foldPercent: ((foldCombos / totalCombos) * 100).toFixed(1),
      totalPercent: (((raiseCombos + callCombos) / totalCombos) * 100).toFixed(1),
    };
  }, [rangeData]);

  const getDecisionColor = (decision: Decision) => {
    switch (decision) {
      case 'raise':
        return 'bg-blue-500 hover:bg-blue-400';
      case 'call':
        return 'bg-emerald-500 hover:bg-emerald-400';
      case 'fold':
        return 'bg-slate-700 hover:bg-slate-600';
      default:
        return 'bg-slate-700';
    }
  };

  const needsVillain = scenario !== 'open';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">GTO Preflop Charts</h1>
        <p className="text-slate-400">
          Simplified GTO-based preflop decisions for every position and scenario.
        </p>
      </div>

      {/* Configuration Panel */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 lg:p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Configuration</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Format */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Format</label>
            <div className="flex rounded-lg overflow-hidden border border-slate-600">
              {(['cash', 'mtt'] as GameFormat[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                    format === f
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {f === 'cash' ? 'Cash' : 'MTT'}
                </button>
              ))}
            </div>
          </div>

          {/* Players */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Players</label>
            <div className="flex rounded-lg overflow-hidden border border-slate-600">
              {([6, 9] as PlayerCount[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlayers(p)}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                    players === p
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {p}-Max
                </button>
              ))}
            </div>
          </div>

          {/* Stack Size */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Stack Size</label>
            <select
              value={stackSize}
              onChange={(e) => setStackSize(Number(e.target.value) as StackSize)}
              className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none text-sm"
            >
              <option value={100}>100 BB</option>
              <option value={40}>40 BB</option>
              <option value={20}>20 BB</option>
              <option value={10}>10 BB</option>
              <option value={5}>5 BB</option>
            </select>
          </div>

          {/* Scenario */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Scenario</label>
            <select
              value={scenario}
              onChange={(e) => setScenario(e.target.value as Scenario)}
              className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none text-sm"
            >
              {Object.entries(SCENARIO_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* Hero Position */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Hero Position</label>
            <select
              value={heroPosition}
              onChange={(e) => setHeroPosition(e.target.value as Position)}
              className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none text-sm"
            >
              {validHeroPositions.map((pos) => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>

          {/* Villain Position */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Villain Position
            </label>
            {needsVillain ? (
              <select
                value={villainPosition || ''}
                onChange={(e) => setVillainPosition(e.target.value as Position)}
                className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none text-sm"
              >
                {validVillainPositions.map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            ) : (
              <div className="px-3 py-2 bg-slate-700/50 text-slate-500 rounded-lg border border-slate-600 text-sm">
                N/A
              </div>
            )}
          </div>
        </div>

        {/* Scenario Description */}
        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
          <p className="text-sm text-slate-300">
            <span className="font-medium text-amber-400">{SCENARIO_LABELS[scenario]}:</span>{' '}
            {SCENARIO_DESCRIPTIONS[scenario]}
          </p>
          {needsVillain && villainPosition && (
            <p className="text-sm text-slate-400 mt-1">
              Hero ({heroPosition}) vs Villain ({villainPosition})
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr,280px] gap-6">
        {/* Range Grid */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
          <div
            className="grid gap-0.5 select-none"
            style={{ gridTemplateColumns: 'repeat(13, minmax(0, 1fr))' }}
          >
            {GRID.flat().map((cell) => {
              const decision = rangeData[cell.hand] as Decision || 'fold';
              return (
                <div
                  key={cell.hand}
                  className={`aspect-square flex items-center justify-center text-[10px] sm:text-xs font-medium rounded transition-colors ${getDecisionColor(decision)} text-white`}
                  title={`${cell.hand}: ${decision.toUpperCase()}`}
                >
                  {cell.hand}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500" />
              <span className="text-xs text-slate-400">
                {scenario === 'open' ? 'Raise' : 'Raise/Re-raise'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-500" />
              <span className="text-xs text-slate-400">Call</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-700" />
              <span className="text-xs text-slate-400">Fold</span>
            </div>
          </div>
        </div>

        {/* Statistics Panel */}
        <div className="space-y-4">
          {/* Stats Card */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-3">Range Statistics</h3>

            <div className="space-y-3">
              {/* Raise Stats */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-400">Raise</span>
                  <span className="text-white font-medium">{stats.raisePercent}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${stats.raisePercent}%` }}
                  />
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {stats.raiseCount} hands ({stats.raiseCombos} combos)
                </div>
              </div>

              {/* Call Stats */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-emerald-400">Call</span>
                  <span className="text-white font-medium">{stats.callPercent}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{ width: `${stats.callPercent}%` }}
                  />
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {stats.callCount} hands ({stats.callCombos} combos)
                </div>
              </div>

              {/* Fold Stats */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Fold</span>
                  <span className="text-white font-medium">{stats.foldPercent}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-600 transition-all"
                    style={{ width: `${stats.foldPercent}%` }}
                  />
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {stats.foldCount} hands ({stats.foldCombos} combos)
                </div>
              </div>

              {/* Total Playing */}
              <div className="pt-3 border-t border-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Total Playing</span>
                  <span className="text-amber-400 font-bold">{stats.totalPercent}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Position Context */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-3">Position Guide</h3>
            <div className="flex flex-wrap gap-1.5">
              {(players === 9 ? POSITIONS_9MAX : POSITIONS_6MAX).map((pos) => (
                <span
                  key={pos}
                  className={`px-2 py-1 text-xs rounded ${
                    pos === heroPosition
                      ? 'bg-amber-500 text-white font-medium'
                      : pos === villainPosition
                      ? 'bg-red-500/20 text-red-400 font-medium'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {pos}
                </span>
              ))}
            </div>
            <div className="mt-2 text-xs text-slate-500">
              <span className="text-amber-400">■</span> Hero &nbsp;
              {needsVillain && <><span className="text-red-400">■</span> Villain</>}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <h3 className="text-sm font-medium text-amber-400 mb-2">Tips</h3>
            <ul className="text-xs text-slate-300 space-y-1">
              {stackSize <= 20 && (
                <li>• At {stackSize}BB, consider push/fold over raising</li>
              )}
              {format === 'mtt' && (
                <li>• MTT ranges are tighter due to ICM pressure</li>
              )}
              {scenario === 'vs-3bet' && (
                <li>• Consider villain&apos;s 3-bet frequency</li>
              )}
              {heroPosition === 'SB' && scenario === 'open' && (
                <li>• SB vs BB is often raise-or-fold, rarely limp</li>
              )}
              {heroPosition === 'BB' && scenario === 'vs-raise' && (
                <li>• BB defends wider due to better pot odds</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Educational Note */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-white mb-3">About These Charts</h2>
        <div className="text-sm text-slate-400 space-y-2">
          <p>
            These charts represent <strong className="text-white">simplified GTO approximations</strong> for preflop play.
            They are based on solver outputs but simplified for practical use at the tables.
          </p>
          <p>
            <strong className="text-amber-400">Important:</strong> GTO is a baseline strategy. Against specific opponents,
            you should exploit their tendencies by deviating from these ranges. For example:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Against tight players: Steal more, call 3-bets less</li>
            <li>Against loose players: Value bet wider, bluff less</li>
            <li>In MTT bubbles: Tighten up due to ICM</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
