'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const settingsLinks = [
  { href: '/settings', label: 'Profile', icon: '👤' },
  { href: '/settings/account', label: 'Account', icon: '🔐' },
  { href: '/settings/preferences', label: 'Preferences', icon: '⚙️' },
  { href: '/settings/data', label: 'Your Data', icon: '📊' },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-800 rounded-xl border border-slate-700 p-2">
      <ul className="space-y-1">
        {settingsLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span>{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
