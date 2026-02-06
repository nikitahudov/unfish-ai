'use client';

import React, { useState, useMemo } from 'react';

type InputType = 'percentage' | 'ratio' | 'decimal' | 'outs';

interface ConversionResult {
  percentage: string;
  decimal: string;
  ratioAgainst: string;
  ratioFor: string;
  outsFrom47: string;
  outsFrom46: string;
  outsRule2: string;
  outsRule4: string;
}

// Common drawing situations
const COMMON_DRAWS = [
  { name: 'Flush draw (one card)', outs: 9, street: 'turn', percentage: 19.1 },
  { name: 'Flush draw (two cards)', outs: 9, street: 'turn+river', percentage: 35.0 },
  { name: 'Open-ended straight draw (one card)', outs: 8, street: 'turn', percentage: 17.0 },
  { name: 'Open-ended straight draw (two cards)', outs: 8, street: 'turn+river', percentage: 31.5 },
  { name: 'Gutshot straight draw (one card)', outs: 4, street: 'turn', percentage: 8.5 },
  { name: 'Gutshot straight draw (two cards)', outs: 4, street: 'turn+river', percentage: 16.5 },
  { name: 'Two overcards (one card)', outs: 6, street: 'turn', percentage: 12.8 },
  { name: 'Two overcards (two cards)', outs: 6, street: 'turn+river', percentage: 24.1 },
  { name: 'Flush draw + gutshot (one card)', outs: 12, street: 'turn', percentage: 25.5 },
  { name: 'Flush draw + gutshot (two cards)', outs: 12, street: 'turn+river', percentage: 45.0 },
  { name: 'Flush draw + open-ender (one card)', outs: 15, street: 'turn', percentage: 31.9 },
  { name: 'Flush draw + open-ender (two cards)', outs: 15, street: 'turn+river', percentage: 54.1 },
  { name: 'Set to full house/quads (one card)', outs: 7, street: 'turn', percentage: 14.9 },
  { name: 'Pocket pair to set (flop)', outs: 2, street: 'preflop', percentage: 11.8 },
  { name: 'One overcard (one card)', outs: 3, street: 'turn', percentage: 6.4 },
];

export default function OddsConverterPage() {
  const [inputType, setInputType] = useState<InputType>('percentage');
  const [inputValue, setInputValue] = useState<string>('33');
  const [totalCards, setTotalCards] = useState<'47' | '46'>('47'); // For outs calculation

  // Calculate all conversions
  const conversions = useMemo((): ConversionResult | null => {
    let percentage = 0;

    switch (inputType) {
      case 'percentage':
        percentage = parseFloat(inputValue) || 0;
        break;

      case 'ratio': {
        // Ratio format: X:1 means X to 1 against (so 1 in X+1 chance)
        const ratio = parseFloat(inputValue) || 0;
        if (ratio > 0) {
          percentage = (1 / (ratio + 1)) * 100;
        }
        break;
      }

      case 'decimal': {
        // Decimal is just percentage / 100
        const decimal = parseFloat(inputValue) || 0;
        percentage = decimal * 100;
        break;
      }

      case 'outs': {
        // Outs to percentage: outs / total cards
        const outs = parseFloat(inputValue) || 0;
        const total = parseInt(totalCards);
        if (total > 0 && outs >= 0) {
          percentage = (outs / total) * 100;
        }
        break;
      }
    }

    // Clamp percentage to valid range
    percentage = Math.max(0, Math.min(100, percentage));

    if (percentage === 0 && inputType !== 'percentage') {
      return null;
    }

    // Calculate all formats
    const decimal = percentage / 100;
    const ratioAgainst = percentage > 0 && percentage < 100
      ? (100 - percentage) / percentage
      : 0;
    const outsFrom47 = (percentage / 100) * 47;
    const outsFrom46 = (percentage / 100) * 46;

    // Rule of 2 and 4: approximate outs needed
    const outsRule2 = percentage / 2; // One card to come
    const outsRule4 = percentage / 4; // Two cards to come

    return {
      percentage: percentage.toFixed(1),
      decimal: decimal.toFixed(3),
      ratioAgainst: ratioAgainst.toFixed(2),
      ratioFor: ratioAgainst > 0 ? (1 / ratioAgainst).toFixed(2) : '0.00',
      outsFrom47: outsFrom47.toFixed(1),
      outsFrom46: outsFrom46.toFixed(1),
      outsRule2: outsRule2.toFixed(1),
      outsRule4: outsRule4.toFixed(1),
    };
  }, [inputType, inputValue, totalCards]);

  // Quick preset buttons
  const presets = [
    { label: '10%', value: '10', type: 'percentage' as InputType },
    { label: '20%', value: '20', type: 'percentage' as InputType },
    { label: '33%', value: '33', type: 'percentage' as InputType },
    { label: '50%', value: '50', type: 'percentage' as InputType },
    { label: '2:1', value: '2', type: 'ratio' as InputType },
    { label: '3:1', value: '3', type: 'ratio' as InputType },
    { label: '4:1', value: '4', type: 'ratio' as InputType },
    { label: '9 outs', value: '9', type: 'outs' as InputType },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setInputType(preset.type);
    setInputValue(preset.value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">🔄 Odds Converter</h1>
        <p className="text-slate-400">
          Convert between percentages, ratios, decimals, and outs instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Input</h2>

          {/* Input Type Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Convert from
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { value: 'percentage', label: 'Percentage' },
                { value: 'ratio', label: 'Ratio' },
                { value: 'decimal', label: 'Decimal' },
                { value: 'outs', label: 'Outs' },
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setInputType(type.value as InputType)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    inputType === type.value
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Input Fields */}
          <div className="space-y-4">
            {inputType === 'percentage' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Percentage
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 bg-slate-700 text-white text-lg rounded-lg border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                    placeholder="33"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">%</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Enter a value between 0 and 100
                </p>
              </div>
            )}

            {inputType === 'ratio' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Odds Against (X : 1)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-700 text-white text-lg rounded-lg border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                    placeholder="2"
                    min="0"
                    step="0.1"
                  />
                  <span className="text-slate-400 text-xl font-medium">: 1</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  e.g., 2:1 against means you lose 2 times for every 1 win (33% chance)
                </p>
              </div>
            )}

            {inputType === 'decimal' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Decimal (0 to 1)
                </label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 text-white text-lg rounded-lg border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                  placeholder="0.33"
                  min="0"
                  max="1"
                  step="0.01"
                />
                <p className="text-xs text-slate-500 mt-1">
                  e.g., 0.33 = 33%
                </p>
              </div>
            )}

            {inputType === 'outs' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Number of Outs
                  </label>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 text-white text-lg rounded-lg border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                    placeholder="9"
                    min="0"
                    max="52"
                    step="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Cards Remaining (Street)
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTotalCards('47')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        totalCards === '47'
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      47 cards (Turn)
                    </button>
                    <button
                      onClick={() => setTotalCards('46')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        totalCards === '46'
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      46 cards (River)
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    47 = flop to turn, 46 = turn to river
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Quick Presets */}
          <div className="mt-6 pt-4 border-t border-slate-700">
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Quick Presets
            </label>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => applyPreset(preset)}
                  className="px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Conversions</h2>

          {conversions ? (
            <div className="space-y-3">
              {/* Main percentage */}
              <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-4">
                <div className="text-sm text-amber-400 mb-1">Percentage</div>
                <div className="text-3xl font-bold text-white">{conversions.percentage}%</div>
              </div>

              {/* Other conversions */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Decimal</div>
                  <div className="text-xl font-bold text-white">{conversions.decimal}</div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Odds Against</div>
                  <div className="text-xl font-bold text-white">{conversions.ratioAgainst} : 1</div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Outs (from 47)</div>
                  <div className="text-xl font-bold text-blue-400">{conversions.outsFrom47}</div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Outs (from 46)</div>
                  <div className="text-xl font-bold text-blue-400">{conversions.outsFrom46}</div>
                </div>
              </div>

              {/* Rule of 2 and 4 */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mt-4">
                <h3 className="font-medium text-emerald-400 mb-3 flex items-center gap-2">
                  <span>📐</span> Rule of 2 and 4
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">One card to come (× 2)</span>
                    <span className="text-white font-medium">
                      ~{conversions.outsRule2} outs × 2 = {conversions.percentage}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Two cards to come (× 4)</span>
                    <span className="text-white font-medium">
                      ~{conversions.outsRule4} outs × 4 = {conversions.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              Enter a value to see conversions
            </div>
          )}
        </div>
      </div>

      {/* Common Drawing Odds Reference */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">📋 Common Drawing Odds</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-700">
                <th className="text-left py-3 pr-4">Draw Type</th>
                <th className="text-center py-3 px-4">Outs</th>
                <th className="text-center py-3 px-4">Street</th>
                <th className="text-center py-3 px-4">Percentage</th>
                <th className="text-center py-3 pl-4">Odds Against</th>
              </tr>
            </thead>
            <tbody>
              {COMMON_DRAWS.map((draw, idx) => {
                const oddsAgainst = ((100 - draw.percentage) / draw.percentage).toFixed(1);
                return (
                  <tr
                    key={idx}
                    className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer"
                    onClick={() => {
                      setInputType('percentage');
                      setInputValue(draw.percentage.toString());
                    }}
                  >
                    <td className="py-3 pr-4 text-slate-300">{draw.name}</td>
                    <td className="py-3 px-4 text-center text-white font-medium">{draw.outs}</td>
                    <td className="py-3 px-4 text-center text-slate-400 text-xs">{draw.street}</td>
                    <td className="py-3 px-4 text-center text-amber-400 font-bold">{draw.percentage}%</td>
                    <td className="py-3 pl-4 text-center text-slate-400">{oddsAgainst}:1</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          💡 Click any row to load those odds into the converter
        </p>
      </div>

      {/* Educational Section */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">📚 Understanding Poker Odds</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-400">
          <div>
            <h3 className="font-medium text-white mb-2">What are Outs?</h3>
            <p>
              Outs are the cards remaining in the deck that will improve your hand to (likely)
              the winning hand. For example, with a flush draw you have 9 outs (13 cards of
              your suit minus the 4 you can see).
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Rule of 2 and 4</h3>
            <p>
              A quick mental math shortcut: multiply your outs by 2 for one card to come (turn
              OR river), or by 4 for two cards to come (turn AND river). This gives you an
              approximate percentage.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Odds vs Percentage</h3>
            <p>
              &quot;2:1 against&quot; means you&apos;ll lose 2 times for every 1 time you win = 33% chance.
              &quot;3:1 against&quot; means losing 3 times per 1 win = 25% chance. Lower odds = better chance.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Using with Pot Odds</h3>
            <p>
              Compare your equity (winning %) to the pot odds you&apos;re getting. If your equity
              is higher than the pot odds percentage, the call is profitable in the long run.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
