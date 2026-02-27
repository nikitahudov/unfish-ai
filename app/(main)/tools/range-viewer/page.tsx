'use client';

import React, { useState, useCallback, useMemo } from 'react';

// Constants
const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'] as const;
type Rank = typeof RANKS[number];
type HandType = 'pair' | 'suited' | 'offsuit';
type ActionColor = 'raise' | 'call' | 'fold' | 'custom1' | 'custom2' | 'custom3';

interface HandCell {
  hand: string;
  type: HandType;
  row: number;
  col: number;
}

interface RangeState {
  [hand: string]: ActionColor;
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
        // Diagonal = pairs (AA, KK, etc.)
        hand = `${rank1}${rank2}`;
        type = 'pair';
      } else if (i < j) {
        // Above diagonal = suited (AKs, AQs, etc.)
        hand = `${rank1}${rank2}s`;
        type = 'suited';
      } else {
        // Below diagonal = offsuit (AKo, AQo, etc.)
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

// Color configuration
const ACTION_COLORS: Record<ActionColor, { bg: string; bgHover: string; text: string; label: string }> = {
  raise: { bg: 'bg-blue-500', bgHover: 'hover:bg-blue-400', text: 'text-white', label: 'Raise' },
  call: { bg: 'bg-emerald-500', bgHover: 'hover:bg-emerald-400', text: 'text-white', label: 'Call' },
  fold: { bg: 'bg-slate-600', bgHover: 'hover:bg-slate-500', text: 'text-slate-300', label: 'Fold' },
  custom1: { bg: 'bg-purple-500', bgHover: 'hover:bg-purple-400', text: 'text-white', label: '3-Bet' },
  custom2: { bg: 'bg-amber-500', bgHover: 'hover:bg-amber-400', text: 'text-white', label: 'All-In' },
  custom3: { bg: 'bg-rose-500', bgHover: 'hover:bg-rose-400', text: 'text-white', label: 'Limp' },
};

// Preset ranges
const PRESETS: Record<string, { description: string; range: RangeState }> = {
  'UTG Open (6-max)': {
    description: 'Standard UTG opening range',
    range: Object.fromEntries([
      'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77',
      'AKs', 'AQs', 'AJs', 'ATs', 'A5s', 'A4s',
      'KQs', 'KJs', 'KTs',
      'QJs', 'QTs',
      'JTs',
      'T9s', '98s', '87s', '76s', '65s',
      'AKo', 'AQo', 'AJo', 'KQo'
    ].map(h => [h, 'raise' as ActionColor]))
  },
  'CO Open (6-max)': {
    description: 'Standard Cutoff opening range',
    range: Object.fromEntries([
      'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44',
      'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
      'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s',
      'QJs', 'QTs', 'Q9s', 'Q8s',
      'JTs', 'J9s', 'J8s',
      'T9s', 'T8s',
      '98s', '97s',
      '87s', '86s',
      '76s', '75s',
      '65s', '64s',
      '54s', '53s',
      '43s',
      'AKo', 'AQo', 'AJo', 'ATo', 'A9o',
      'KQo', 'KJo', 'KTo',
      'QJo', 'QTo',
      'JTo'
    ].map(h => [h, 'raise' as ActionColor]))
  },
  'BTN Open (6-max)': {
    description: 'Standard Button opening range',
    range: Object.fromEntries([
      'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
      'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
      'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s',
      'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s',
      'JTs', 'J9s', 'J8s', 'J7s', 'J6s',
      'T9s', 'T8s', 'T7s',
      '98s', '97s', '96s',
      '87s', '86s', '85s',
      '76s', '75s', '74s',
      '65s', '64s',
      '54s', '53s',
      '43s', '32s',
      'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o',
      'KQo', 'KJo', 'KTo', 'K9o', 'K8o',
      'QJo', 'QTo', 'Q9o',
      'JTo', 'J9o',
      'T9o', '98o', '87o', '76o', '65o'
    ].map(h => [h, 'raise' as ActionColor]))
  },
  'SB Open vs BB': {
    description: 'Small Blind opening vs Big Blind',
    range: Object.fromEntries([
      'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
      'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
      'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s',
      'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s',
      'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s',
      'T9s', 'T8s', 'T7s', 'T6s',
      '98s', '97s', '96s',
      '87s', '86s', '85s',
      '76s', '75s', '74s',
      '65s', '64s', '63s',
      '54s', '53s',
      '43s',
      'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o',
      'KQo', 'KJo', 'KTo', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o',
      'QJo', 'QTo', 'Q9o', 'Q8o',
      'JTo', 'J9o', 'J8o',
      'T9o', 'T8o',
      '98o', '97o',
      '87o', '76o', '65o', '54o'
    ].map(h => [h, 'raise' as ActionColor]))
  },
  'BB Defend vs BTN': {
    description: 'Big Blind defense vs Button open (3-bet + call)',
    range: {
      // 3-bet range
      ...Object.fromEntries([
        'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88',
        'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A5s', 'A4s', 'A3s',
        'KQs', 'KJs',
        'AKo', 'AQo', 'KQo'
      ].map(h => [h, 'raise' as ActionColor])),
      // Call range
      ...Object.fromEntries([
        '77', '66', '55', '44', '33', '22',
        'A8s', 'A7s', 'A6s', 'A2s',
        'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s',
        'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s',
        'JTs', 'J9s', 'J8s', 'J7s', 'J6s',
        'T9s', 'T8s', 'T7s', 'T6s',
        '98s', '97s', '96s',
        '87s', '86s', '85s',
        '76s', '75s', '74s',
        '65s', '64s', '63s',
        '54s', '53s', '52s',
        '43s', '42s',
        '32s',
        'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o',
        'KJo', 'KTo', 'K9o', 'K8o', 'K7o',
        'QJo', 'QTo', 'Q9o', 'Q8o',
        'JTo', 'J9o', 'J8o',
        'T9o', 'T8o',
        '98o', '97o',
        '87o', '86o',
        '76o', '75o',
        '65o', '64o',
        '54o'
      ].map(h => [h, 'call' as ActionColor]))
    }
  },
  'Top 10%': {
    description: 'Premium hands only (~10%)',
    range: Object.fromEntries([
      'AA', 'KK', 'QQ', 'JJ', 'TT',
      'AKs', 'AQs', 'AJs', 'ATs', 'KQs',
      'AKo', 'AQo'
    ].map(h => [h, 'raise' as ActionColor]))
  },
  'Top 20%': {
    description: 'Strong hands (~20%)',
    range: Object.fromEntries([
      'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88',
      'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A5s', 'A4s',
      'KQs', 'KJs', 'KTs',
      'QJs', 'QTs',
      'JTs',
      'T9s', '98s',
      'AKo', 'AQo', 'AJo', 'ATo',
      'KQo', 'KJo'
    ].map(h => [h, 'raise' as ActionColor]))
  },
  'Clear All': {
    description: 'Clear all hands',
    range: {}
  }
};

export default function RangeViewerPage() {
  // Primary range state
  const [range, setRange] = useState<RangeState>({});
  const [selectedColor, setSelectedColor] = useState<ActionColor>('raise');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [paintMode, setPaintMode] = useState<'paint' | 'erase'>('paint');

  // Comparison mode
  const [compareMode, setCompareMode] = useState(false);
  const [range2, setRange2] = useState<RangeState>({});
  const [activeRange, setActiveRange] = useState<1 | 2>(1);

  // UI state
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');
  const [highlightType, setHighlightType] = useState<HandType | 'all'>('all');

  // Get current active range
  const currentRange = compareMode && activeRange === 2 ? range2 : range;
  const setCurrentRange = compareMode && activeRange === 2 ? setRange2 : setRange;

  // Handle mouse interactions
  const handleMouseDown = useCallback((hand: string) => {
    setIsMouseDown(true);
    const hasColor = currentRange[hand];

    if (hasColor === selectedColor) {
      // Same color = erase
      setPaintMode('erase');
      setCurrentRange(prev => {
        const next = { ...prev };
        delete next[hand];
        return next;
      });
    } else {
      // Different or no color = paint
      setPaintMode('paint');
      setCurrentRange(prev => ({
        ...prev,
        [hand]: selectedColor
      }));
    }
  }, [currentRange, selectedColor, setCurrentRange]);

  const handleMouseEnter = useCallback((hand: string) => {
    if (!isMouseDown) return;

    if (paintMode === 'paint') {
      setCurrentRange(prev => ({
        ...prev,
        [hand]: selectedColor
      }));
    } else {
      setCurrentRange(prev => {
        const next = { ...prev };
        delete next[hand];
        return next;
      });
    }
  }, [isMouseDown, paintMode, selectedColor, setCurrentRange]);

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  // Apply preset
  const applyPreset = (presetName: string) => {
    setCurrentRange({ ...PRESETS[presetName].range });
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const colorCounts: Record<ActionColor, { hands: number; combos: number }> = {
      raise: { hands: 0, combos: 0 },
      call: { hands: 0, combos: 0 },
      fold: { hands: 0, combos: 0 },
      custom1: { hands: 0, combos: 0 },
      custom2: { hands: 0, combos: 0 },
      custom3: { hands: 0, combos: 0 },
    };

    Object.entries(currentRange).forEach(([hand, color]) => {
      // Pairs = 6 combos, Suited = 4 combos, Offsuit = 12 combos
      const combos = hand.length === 2 ? 6 : hand.endsWith('s') ? 4 : 12;
      colorCounts[color].hands++;
      colorCounts[color].combos += combos;
    });

    const totalCombos = Object.values(colorCounts).reduce((sum, c) => sum + c.combos, 0);
    const totalHands = Object.values(colorCounts).reduce((sum, c) => sum + c.hands, 0);

    return {
      colorCounts,
      totalHands,
      totalCombos,
      percentage: ((totalCombos / 1326) * 100).toFixed(1)
    };
  }, [currentRange]);

  // Export range to text notation
  const exportRange = useCallback(() => {
    const byColor: Record<string, string[]> = {};

    Object.entries(currentRange).forEach(([hand, color]) => {
      if (!byColor[color]) byColor[color] = [];
      byColor[color].push(hand);
    });

    const lines = Object.entries(byColor).map(([color, hands]) =>
      `${ACTION_COLORS[color as ActionColor].label}: ${hands.sort().join(', ')}`
    );

    return lines.join('\n');
  }, [currentRange]);

  // Import range from text
  const importRange = () => {
    const newRange: RangeState = {};
    const lines = importText.split('\n');

    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;

      const colorLabel = line.slice(0, colonIndex).trim().toLowerCase();
      const handsPart = line.slice(colonIndex + 1);

      // Find matching color by label
      let matchedColor: ActionColor | null = null;
      for (const [key, config] of Object.entries(ACTION_COLORS)) {
        if (config.label.toLowerCase() === colorLabel || key === colorLabel) {
          matchedColor = key as ActionColor;
          break;
        }
      }

      if (!matchedColor) continue;

      const hands = handsPart.split(',').map(h => h.trim()).filter(Boolean);
      hands.forEach(hand => {
        // Validate hand format
        if (hand.length === 2 || hand.length === 3) {
          newRange[hand] = matchedColor!;
        }
      });
    }

    // Also support simple format (just hand list = raise)
    if (Object.keys(newRange).length === 0) {
      const hands = importText.split(/[,\s\n]+/).map(h => h.trim()).filter(Boolean);
      hands.forEach(hand => {
        if (hand.length === 2 || hand.length === 3) {
          newRange[hand] = 'raise';
        }
      });
    }

    setCurrentRange(newRange);
    setShowImport(false);
    setImportText('');
  };

  // Copy range to clipboard
  const copyToClipboard = async () => {
    const text = exportRange();
    try {
      await navigator.clipboard.writeText(text);
      alert('Range copied to clipboard!');
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Range copied to clipboard!');
    }
  };

  // Get cell styling
  const getCellColor = (cell: HandCell, rangeState: RangeState) => {
    const color = rangeState[cell.hand];

    // Check if should be dimmed based on highlight filter
    const isDimmed = highlightType !== 'all' && cell.type !== highlightType;

    if (color) {
      const config = ACTION_COLORS[color];
      return `${config.bg} ${config.text} ${isDimmed ? 'opacity-40' : ''}`;
    }

    // Default unselected colors based on hand type
    if (isDimmed) {
      return 'bg-slate-800 text-slate-600';
    }

    return cell.type === 'pair'
      ? 'bg-slate-700 text-slate-400 hover:bg-slate-600'
      : cell.type === 'suited'
      ? 'bg-slate-700/70 text-slate-500 hover:bg-slate-600'
      : 'bg-slate-700/40 text-slate-500 hover:bg-slate-600';
  };

  return (
    <div
      className="space-y-6"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Range Builder</h1>
          <p className="text-slate-400">
            Click and drag to build hand ranges. Use colors for different actions.
          </p>
        </div>
        <button
          onClick={() => {
            setCompareMode(!compareMode);
            if (!compareMode) {
              setRange2({});
              setActiveRange(1);
            }
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            compareMode
              ? 'bg-purple-500 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          {compareMode ? 'Compare Mode On' : 'Compare Ranges'}
        </button>
      </div>

      {/* Compare Mode Range Selector */}
      {compareMode && (
        <div className="flex gap-2">
          <button
            onClick={() => setActiveRange(1)}
            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors border-2 ${
              activeRange === 1
                ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
            }`}
          >
            Range 1 ({Object.keys(range).length} hands)
          </button>
          <button
            onClick={() => setActiveRange(2)}
            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors border-2 ${
              activeRange === 2
                ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
            }`}
          >
            Range 2 ({Object.keys(range2).length} hands)
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr,320px] gap-6">
        {/* Left Column - Grid and Controls */}
        <div className="space-y-4">
          {/* Color Selector */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-slate-400 mr-2">Paint with:</span>
              {Object.entries(ACTION_COLORS).map(([color, config]) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color as ActionColor)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${config.bg} ${config.text} ${
                    selectedColor === color
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-800 scale-105'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </div>

          {/* Range Grid(s) */}
          <div className={`${compareMode ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : ''}`}>
            {/* Range 1 Grid */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
              {compareMode && (
                <div className={`text-sm font-medium mb-3 flex items-center gap-2 ${
                  activeRange === 1 ? 'text-blue-400' : 'text-slate-500'
                }`}>
                  Range 1
                  {activeRange === 1 && <span className="text-xs bg-blue-500/20 px-2 py-0.5 rounded">Editing</span>}
                </div>
              )}
              <div
                className="grid gap-0.5 select-none"
                style={{ gridTemplateColumns: 'repeat(13, minmax(0, 1fr))' }}
              >
                {GRID.flat().map((cell) => (
                  <button
                    key={`r1-${cell.hand}`}
                    onMouseDown={() => (!compareMode || activeRange === 1) && handleMouseDown(cell.hand)}
                    onMouseEnter={() => (!compareMode || activeRange === 1) && handleMouseEnter(cell.hand)}
                    className={`aspect-square flex items-center justify-center text-[9px] sm:text-xs font-medium rounded transition-colors cursor-pointer ${getCellColor(cell, range)} ${
                      compareMode && activeRange !== 1 ? 'pointer-events-none opacity-80' : ''
                    }`}
                    title={cell.hand}
                  >
                    {cell.hand}
                  </button>
                ))}
              </div>
            </div>

            {/* Range 2 Grid (Compare Mode) */}
            {compareMode && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
                <div className={`text-sm font-medium mb-3 flex items-center gap-2 ${
                  activeRange === 2 ? 'text-rose-400' : 'text-slate-500'
                }`}>
                  Range 2
                  {activeRange === 2 && <span className="text-xs bg-rose-500/20 px-2 py-0.5 rounded">Editing</span>}
                </div>
                <div
                  className="grid gap-0.5 select-none"
                  style={{ gridTemplateColumns: 'repeat(13, minmax(0, 1fr))' }}
                >
                  {GRID.flat().map((cell) => (
                    <button
                      key={`r2-${cell.hand}`}
                      onMouseDown={() => activeRange === 2 && handleMouseDown(cell.hand)}
                      onMouseEnter={() => activeRange === 2 && handleMouseEnter(cell.hand)}
                      className={`aspect-square flex items-center justify-center text-[9px] sm:text-xs font-medium rounded transition-colors cursor-pointer ${getCellColor(cell, range2)} ${
                        activeRange !== 2 ? 'pointer-events-none opacity-80' : ''
                      }`}
                      title={cell.hand}
                    >
                      {cell.hand}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Legend & Filters */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Active colors legend */}
              <div className="flex flex-wrap items-center gap-3">
                {Object.entries(ACTION_COLORS).map(([color, config]) => {
                  const count = stats.colorCounts[color as ActionColor];
                  if (count.hands === 0) return null;
                  return (
                    <div key={color} className="flex items-center gap-1.5">
                      <div className={`w-3 h-3 rounded ${config.bg}`} />
                      <span className="text-xs text-slate-400">
                        {config.label}: {count.hands} ({count.combos})
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Hand type filter */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-500 mr-2">Show:</span>
                {(['all', 'pair', 'suited', 'offsuit'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setHighlightType(type)}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      highlightType === type
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                  >
                    {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Statistics & Tools */}
        <div className="space-y-4">
          {/* Statistics */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-3">
              {compareMode ? `Range ${activeRange} Statistics` : 'Range Statistics'}
            </h3>

            <div className="space-y-3">
              {/* Summary stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-700/50 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-white">{stats.totalHands}</div>
                  <div className="text-xs text-slate-500">Hands</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-white">{stats.totalCombos}</div>
                  <div className="text-xs text-slate-500">Combos</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-amber-400">{stats.percentage}%</div>
                  <div className="text-xs text-slate-500">of Hands</div>
                </div>
              </div>

              {/* Color breakdown */}
              {Object.entries(stats.colorCounts)
                .filter(([, data]) => data.hands > 0)
                .map(([color, data]) => {
                  const config = ACTION_COLORS[color as ActionColor];
                  const pct = ((data.combos / 1326) * 100).toFixed(1);
                  return (
                    <div key={color}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={config.text}>{config.label}</span>
                        <span className="text-slate-400">{data.hands} hands ({pct}%)</span>
                      </div>
                      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${config.bg} transition-all`}
                          style={{ width: `${(data.combos / 1326) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Presets */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-3">Preset Ranges</h3>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {Object.entries(PRESETS).map(([name, preset]) => (
                <button
                  key={name}
                  onClick={() => applyPreset(name)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    name === 'Clear All'
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <div className="font-medium">{name}</div>
                  <div className="text-xs text-slate-500">{preset.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Import/Export */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-3">Import / Export</h3>
            <div className="space-y-2">
              <button
                onClick={copyToClipboard}
                className="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={() => setShowImport(true)}
                className="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                Import Range
              </button>
            </div>
          </div>

          {/* Range Notation Output */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-3">Range Notation</h3>
            <div className="bg-slate-900 rounded-lg p-3 text-xs font-mono text-slate-300 max-h-32 overflow-auto whitespace-pre-wrap">
              {Object.keys(currentRange).length > 0
                ? exportRange()
                : 'Select hands to see notation...'}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <h3 className="text-sm font-medium text-amber-400 mb-2">Tips</h3>
            <ul className="text-xs text-slate-300 space-y-1">
              <li>Click and drag to paint multiple hands</li>
              <li>Click a hand again to erase it</li>
              <li>Above diagonal = suited, below = offsuit</li>
              <li>Use Compare Mode to view two ranges</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {showImport && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-lg w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-4">Import Range</h3>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              className="w-full h-48 px-3 py-2 bg-slate-900 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none text-sm font-mono resize-none"
              placeholder={`Enter range notation, e.g.:

Raise: AA, KK, QQ, AKs, AKo
Call: JJ, TT, AQs, KQs

Or simple format (all = Raise):
AA, KK, QQ, JJ, AKs, AKo, AQs`}
              autoFocus
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={importRange}
                disabled={!importText.trim()}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-lg transition-colors"
              >
                Import
              </button>
              <button
                onClick={() => {
                  setShowImport(false);
                  setImportText('');
                }}
                className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
