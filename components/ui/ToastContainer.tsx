'use client';

import React from 'react';
import { useToastStore, ToastType } from '@/lib/hooks/useToast';

const toastStyles: Record<ToastType, { bg: string; icon: string }> = {
  success: { bg: 'bg-emerald-500', icon: '\u2713' },
  error: { bg: 'bg-red-500', icon: '\u2715' },
  info: { bg: 'bg-blue-500', icon: '\u2139' },
  warning: { bg: 'bg-amber-500', icon: '\u26A0' },
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => {
        const style = toastStyles[toast.type];
        return (
          <div
            key={toast.id}
            className={`${style.bg} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[280px] max-w-[400px] animate-slide-in`}
          >
            <span className="w-6 h-6 flex items-center justify-center bg-white/20 rounded-full text-sm font-bold">
              {style.icon}
            </span>
            <p className="flex-1 text-sm">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/70 hover:text-white transition-colors"
            >
              {'\u2715'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
