'use client';

import { create } from 'zustand';
import type { Message } from '@/types/coach';

// This store is now just for local UI state during a session
// Actual data persistence is handled by useCoachConversations hook

interface LocalCoachState {
  // Temporary messages before they're saved to Supabase
  pendingMessages: Message[];
  isWaitingForResponse: boolean;

  // Actions
  addPendingMessage: (message: Omit<Message, 'id' | 'timestamp'>) => Message;
  clearPendingMessages: () => void;
  setWaitingForResponse: (waiting: boolean) => void;
}

export const useLocalCoachStore = create<LocalCoachState>()((set) => ({
  pendingMessages: [],
  isWaitingForResponse: false,

  addPendingMessage: (message) => {
    const newMessage: Message = {
      ...message,
      id: `pending-${crypto.randomUUID()}`,
      timestamp: new Date().toISOString(),
    };

    set(state => ({
      pendingMessages: [...state.pendingMessages, newMessage],
    }));

    return newMessage;
  },

  clearPendingMessages: () => {
    set({ pendingMessages: [] });
  },

  setWaitingForResponse: (waiting) => {
    set({ isWaitingForResponse: waiting });
  },
}));

// Keep the old export name for backward compatibility during migration
// Components should gradually migrate to useCoachConversations
export const useCoachStore = useLocalCoachStore;
