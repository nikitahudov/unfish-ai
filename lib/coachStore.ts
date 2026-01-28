import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Message, Conversation } from '@/types/coach';

interface CoachStore {
  conversations: Conversation[];
  currentConversationId: string | null;

  // Actions
  startNewConversation: () => string;
  addMessage: (conversationId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  getCurrentConversation: () => Conversation | null;
  clearConversations: () => void;
  setCurrentConversation: (id: string | null) => void;
}

export const useCoachStore = create<CoachStore>()(
  persist(
    (set, get) => ({
      conversations: [],
      currentConversationId: null,

      startNewConversation: () => {
        const id = `conv_${Date.now()}`;
        const newConversation: Conversation = {
          id,
          messages: [],
          startedAt: new Date().toISOString(),
          lastMessageAt: new Date().toISOString(),
        };

        set(state => ({
          conversations: [newConversation, ...state.conversations],
          currentConversationId: id,
        }));

        return id;
      },

      addMessage: (conversationId, message) => {
        const fullMessage: Message = {
          ...message,
          id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
        };

        set(state => ({
          conversations: state.conversations.map(conv =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, fullMessage],
                  lastMessageAt: fullMessage.timestamp,
                }
              : conv
          ),
        }));
      },

      getCurrentConversation: () => {
        const { conversations, currentConversationId } = get();
        return conversations.find(c => c.id === currentConversationId) || null;
      },

      setCurrentConversation: (id) => {
        set({ currentConversationId: id });
      },

      clearConversations: () => {
        set({ conversations: [], currentConversationId: null });
      },
    }),
    {
      name: '24p-coach-conversations',
    }
  )
);
