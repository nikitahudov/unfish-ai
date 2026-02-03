'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const toolCategories = [
  {
    name: 'Charts',
    tools: [
      { href: '/tools/gto-charts', label: 'GTO Preflop Charts', icon: '📊', description: 'Position-based GTO ranges' },
      { href: '/tools/range-viewer', label: 'Range Viewer', icon: '🎨', description: 'Build custom ranges' },
    ],
  },
  {
    name: 'Calculators',
    tools: [
      { href: '/tools/pot-odds', label: 'Pot Odds Calculator', icon: '🎯', description: 'Calculate pot odds & equity needed' },
      { href: '/tools/odds-converter', label: 'Odds Converter', icon: '🔄', description: 'Convert between formats' },
      { href: '/tools/equity', label: 'Equity Calculator', icon: '📈', description: 'Hand vs hand equity', comingSoon: true },
      { href: '/tools/ev', label: 'EV Calculator', icon: '💰', description: 'Expected value calculator', comingSoon: true },
    ],
  },
];

interface Tool {
  href: string;
  label: string;
  icon: string;
  description: string;
  comingSoon?: boolean;
}

export function ToolsSidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 lg:sticky lg:top-8">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-700">
        <span className="text-2xl">🛠️</span>
        <h2 className="text-lg font-bold text-white">Poker Tools</h2>
      </div>

      <nav className="space-y-6">
        {toolCategories.map((category) => (
          <div key={category.name}>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              {category.name}
            </h3>
            <ul className="space-y-1">
              {category.tools.map((tool: Tool) => {
                const isActive = pathname === tool.href;
                const isDisabled = tool.comingSoon;

                if (isDisabled) {
                  return (
                    <li key={tool.href}>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 cursor-not-allowed">
                        <span>{tool.icon}</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm">{tool.label}</span>
                          <span className="ml-2 text-xs bg-slate-700 px-1.5 py-0.5 rounded">Soon</span>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      <span>{tool.icon}</span>
                      <span className="text-sm font-medium">{tool.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Quick tip */}
      <div className="mt-6 pt-4 border-t border-slate-700">
        <p className="text-xs text-slate-500">
          These tools are free to use. No login required!
        </p>
      </div>
    </div>
  );
}
