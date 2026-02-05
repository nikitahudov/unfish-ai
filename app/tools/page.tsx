import React from 'react';
import Link from 'next/link';

const featuredTools = [
  {
    href: '/tools/gto-charts',
    title: 'GTO Preflop Charts',
    icon: '📊',
    description: 'Position-based GTO ranges for every scenario. Open, 3-bet, 4-bet, and more.',
    color: 'from-purple-500 to-indigo-500',
    isNew: true,
  },
  {
    href: '/tools/pot-odds',
    title: 'Pot Odds Calculator',
    icon: '🎯',
    description: 'Calculate pot odds, required equity, and whether a call is profitable.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    href: '/tools/range-viewer',
    title: 'Range Builder',
    icon: '🎨',
    description: 'Build and visualize hand ranges. Multi-color painting, presets, and compare mode.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    href: '/tools/odds-converter',
    title: 'Odds Converter',
    icon: '🔄',
    description: 'Convert between percentages, ratios, fractions, and outs instantly.',
    color: 'from-blue-500 to-cyan-500',
  },
];

const upcomingTools = [
  { title: 'Equity Calculator', icon: '📈', description: 'Calculate hand vs hand and hand vs range equity' },
  { title: 'EV Calculator', icon: '💰', description: 'Calculate expected value of your decisions' },
  { title: 'ICM Calculator', icon: '🏆', description: 'Tournament equity and bubble calculations' },
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featuredTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group relative bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-slate-600 transition-all hover:scale-[1.02]"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`} />
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{tool.icon}</span>
                {tool.isNew && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-amber-500 text-white rounded">NEW</span>
                )}
              </div>
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
            <span>Practice calculating pot odds mentally, then verify with the calculator</span>
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
