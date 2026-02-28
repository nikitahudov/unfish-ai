'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: '📊',
  },
  {
    label: 'Support Tickets',
    href: '/admin/support',
    icon: '🎫',
  },
  {
    label: 'Users',
    href: '/admin/users',
    icon: '👥',
    comingSoon: true,
  },
  {
    label: 'Analytics',
    href: '/admin/analytics',
    icon: '📈',
    comingSoon: true,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-800 border-r border-slate-700">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <Link href="/admin" prefetch={false} className="flex items-center gap-3">
          <span className="text-2xl">⚙️</span>
          <div>
            <h1 className="text-lg font-bold text-white">Admin Panel</h1>
            <p className="text-xs text-slate-500">UnFish.ai</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));

            if (item.comingSoon) {
              return (
                <li key={item.href}>
                  <div className="flex items-center gap-3 px-4 py-3 text-slate-500 cursor-not-allowed">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                    <span className="ml-auto text-xs bg-slate-700 px-1.5 py-0.5 rounded">
                      Soon
                    </span>
                  </div>
                </li>
              );
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
        <Link
          href="/"
          prefetch={false}
          className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm">Back to Site</span>
        </Link>
      </div>
    </aside>
  );
}
