import React from 'react';
import Link from 'next/link';

const featuredTools = [
  {
    href: '/tools/gto-charts',
    title: 'GTO Preflop Charts',
    icon: '📊',
    description: 'Position-based GTO ranges for every scenario. Open, 3-bet, 4-bet and more.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    href: '/tools/range-viewer',
    title: 'Range Builder',
    icon: '🎨',
    description: 'Build and visualize hand ranges. Multi-color painting, presets, and compare mode.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    href: '/tools/ev-calculator',
    title: 'EV Calculator',
    icon: '💰',
    description: 'Calculate expected value of calls, bets, and all-ins with fold equity.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    href: '/tools/pot-odds',
    title: 'Pot Odds Calculator',
    icon: '🎯',
    description: 'Calculate pot odds, required equity, and whether a call is profitable.',
    color: 'from-rose-500 to-pink-500',
  },
  {
    href: '/tools/odds-converter',
    title: 'Odds Converter',
    icon: '🔄',
    description: 'Convert between percentages, ratios, decimals, and outs. Includes common draws.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    href: '/tools/equity',
    title: 'Equity Calculator',
    icon: '📈',
    description: 'Calculate hand vs hand and hand vs range equity with Monte Carlo simulation.',
    color: 'from-rose-500 to-pink-500',
    isNew: true,
  },
];

const upcomingTools = [
  { title: 'ICM Calculator', icon: '🏆', description: 'Tournament equity and bubble calculations' },
  { title: 'Hand History Analyzer', icon: '📝', description: 'Import and analyze your hand histories' },
];

export default function ToolsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Poker Tools</h1>
        <p className="text-slate-400">
          Free calculators and utilities to help you make better decisions at the table.
        </p>
      </div>

      {/* Featured Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group relative bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-slate-600 transition-all hover:scale-[1.02]"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`} />
            <div className="relative">
              <span className="text-4xl mb-4 block">{tool.icon}</span>
              <h3 className="text-lg font-semibold text-white mb-2">{tool.title}</h3>
              <p className="text-sm text-slate-400">{tool.description}</p>
              <div className="mt-4 text-amber-400 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Open Tool <span>&rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Coming Soon */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Coming Soon</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {upcomingTools.map((tool) => (
            <div
              key={tool.title}
              className="bg-slate-800/50 rounded-lg border border-slate-700 p-4 flex items-start gap-3"
            >
              <span className="text-2xl opacity-50">{tool.icon}</span>
              <div>
                <h3 className="text-sm font-medium text-slate-300">{tool.title}</h3>
                <p className="text-xs text-slate-500">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Pro Tips</h2>
        <ul className="space-y-2 text-sm text-slate-400">
          <li className="flex items-start gap-2">
            <span className="text-amber-400">&bull;</span>
            <span>Use GTO Charts as a reference, then build your own ranges in Range Builder</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400">&bull;</span>
            <span>Combine Pot Odds and EV Calculator to make better calling decisions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400">&bull;</span>
            <span>Memorize common drawing odds from the Odds Converter reference table</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400">&bull;</span>
            <span>All tools work offline once loaded - great for mobile use at the table</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
