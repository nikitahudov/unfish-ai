'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { coachService } from '@/lib/services';
import type { ConversationCreate, ConversationUpdate } from '@/lib/services';
import { useAsyncData } from './useAsyncData';
import type { CoachConversation } from '@/types/database';
import type { Message } from '@/types/coach';

export function useCoachConversations() {
  const { isAuthenticated } = useAuth();
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch all conversations
  const {
    data: conversations,
    isLoading,
    error,
    refetch,
    mutate,
  } = useAsyncData<CoachConversation[]>(
    () => coachService.getAll(),
    [isAuthenticated],
    { enabled: isAuthenticated, initialData: [] }
  );

  // Get current conversation
  const currentConversation = conversations?.find(c => c.id === currentConversationId);

  // Start a new conversation
  const startNewConversation = useCallback(async (options?: ConversationCreate): Promise<string> => {
    if (!isAuthenticated) throw new Error('Not authenticated');

    setIsSaving(true);
    try {
      const conversation = await coachService.create(options);

      // Add to local state
      mutate(prev => prev ? [conversation, ...prev] : [conversation]);
      setCurrentConversationId(conversation.id);

      return conversation.id;
    } finally {
      setIsSaving(false);
    }
  }, [isAuthenticated, mutate]);

  // Add message to current conversation
  const addMessage = useCallback(async (
    message: Omit<Message, 'id' | 'timestamp'>
  ): Promise<void> => {
    if (!isAuthenticated || !currentConversationId) return;

    setIsSaving(true);
    try {
      const updated = await coachService.addMessage(currentConversationId, message);

      // Update local state
      mutate(prev => (prev || []).map(c =>
        c.id === currentConversationId ? updated : c
      ));
    } finally {
      setIsSaving(false);
    }
  }, [isAuthenticated, currentConversationId, mutate]);

  // Select a conversation
  const selectConversation = useCallback((conversationId: string | null) => {
    setCurrentConversationId(conversationId);
  }, []);

  // Delete a conversation
  const deleteConversation = useCallback(async (conversationId: string): Promise<void> => {
    if (!isAuthenticated) return;

    await coachService.delete(conversationId);

    // Remove from local state
    mutate(prev => (prev || []).filter(c => c.id !== conversationId));

    // If deleting current conversation, clear selection
    if (conversationId === currentConversationId) {
      setCurrentConversationId(null);
    }
  }, [isAuthenticated, currentConversationId, mutate]);

  // Archive a conversation
  const archiveConversation = useCallback(async (conversationId: string): Promise<void> => {
    if (!isAuthenticated) return;

    await coachService.archive(conversationId);

    // Remove from local state (since we don't show archived by default)
    mutate(prev => (prev || []).filter(c => c.id !== conversationId));

    if (conversationId === currentConversationId) {
      setCurrentConversationId(null);
    }
  }, [isAuthenticated, currentConversationId, mutate]);

  // Toggle star
  const toggleStar = useCallback(async (conversationId: string): Promise<void> => {
    if (!isAuthenticated) return;

    const updated = await coachService.toggleStar(conversationId);

    mutate(prev => (prev || []).map(c =>
      c.id === conversationId ? updated : c
    ));
  }, [isAuthenticated, mutate]);

  // Update conversation (title, etc.)
  const updateConversation = useCallback(async (
    conversationId: string,
    updates: ConversationUpdate
  ): Promise<void> => {
    if (!isAuthenticated) return;

    const updated = await coachService.update(conversationId, updates);

    mutate(prev => (prev || []).map(c =>
      c.id === conversationId ? updated : c
    ));
  }, [isAuthenticated, mutate]);

  // Get messages from current conversation
  const messages = (currentConversation?.messages as unknown as Message[]) || [];

  return {
    // Data
    conversations,
    currentConversation,
    currentConversationId,
    messages,

    // State
    isLoading,
    isSaving,
    error,

    // Actions
    startNewConversation,
    addMessage,
    selectConversation,
    deleteConversation,
    archiveConversation,
    toggleStar,
    updateConversation,
    refetch,
  };
}

// Hook for conversation list only (lighter weight for sidebar)
export function useConversationList(limit: number = 10) {
  const { isAuthenticated } = useAuth();

  const {
    data: conversations,
    isLoading,
    error,
    refetch,
  } = useAsyncData(
    () => coachService.getRecent(limit),
    [isAuthenticated, limit],
    { enabled: isAuthenticated, initialData: [] }
  );

  return {
    conversations,
    isLoading,
    error,
    refetch,
  };
}
