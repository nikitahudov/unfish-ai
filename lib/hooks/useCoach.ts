'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useCoachConversations } from './useCoachConversations';
import { useLocalCoachStore } from '@/lib/coachStore';
import { sendMessageToCoach } from '@/lib/coach/coachApi';
import { activityService } from '@/lib/services';
import type { Message, CoachMode } from '@/types/coach';

export function useCoach() {
  const { isAuthenticated } = useAuth();
  const {
    conversations,
    currentConversation,
    currentConversationId,
    messages: savedMessages,
    isLoading: conversationsLoading,
    isSaving,
    startNewConversation,
    addMessage: saveMessage,
    selectConversation,
    deleteConversation,
    archiveConversation,
    updateConversation,
    refetch,
  } = useCoachConversations();

  const {
    pendingMessages,
    isWaitingForResponse,
    addPendingMessage,
    clearPendingMessages,
    setWaitingForResponse,
  } = useLocalCoachStore();

  const [mode, setMode] = useState<CoachMode>('chat');
  const [error, setError] = useState<string | null>(null);

  // Combined messages (saved + pending)
  const messages = [...savedMessages, ...pendingMessages];

  // Initialize conversation if none exists
  useEffect(() => {
    if (isAuthenticated && !conversationsLoading && !currentConversationId && conversations?.length === 0) {
      startNewConversation({ mode });
    }
  }, [isAuthenticated, conversationsLoading, currentConversationId, conversations, startNewConversation, mode]);

  // Send a message
  const sendMessage = useCallback(async (content: string, overrideMode?: CoachMode) => {
    if (!isAuthenticated || !currentConversationId) {
      setError('Please sign in to use the coach');
      return;
    }

    const activeMode = overrideMode || mode;
    setError(null);

    // Create user message
    const userMessage: Omit<Message, 'id' | 'timestamp'> = {
      role: 'user',
      content,
      mode: activeMode,
    };

    // Add to pending (optimistic UI)
    addPendingMessage(userMessage);
    setWaitingForResponse(true);

    try {
      // Save user message to Supabase
      await saveMessage(userMessage);

      // Get all messages for context (including the one we just added)
      const allMessages = [...savedMessages, {
        ...userMessage,
        id: 'temp',
        timestamp: new Date().toISOString(),
      }];

      // Send to AI
      const response = await sendMessageToCoach(allMessages, activeMode);

      if (response.error) {
        setError(response.error);
        // Add error message
        const errorMessage: Omit<Message, 'id' | 'timestamp'> = {
          role: 'assistant',
          content: `I'm sorry, I encountered an error: ${response.error}. Please try again.`,
          mode: activeMode,
        };
        await saveMessage(errorMessage);
      } else if (response.message) {
        // Save assistant response
        const assistantMessage: Omit<Message, 'id' | 'timestamp'> = {
          role: 'assistant',
          content: response.message,
          mode: activeMode,
        };
        await saveMessage(assistantMessage);

        // Log activity
        if (currentConversationId) {
          activityService.logCoachMessage(currentConversationId).catch(console.error);
        }
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      clearPendingMessages();
      setWaitingForResponse(false);
    }
  }, [
    isAuthenticated,
    currentConversationId,
    mode,
    savedMessages,
    addPendingMessage,
    saveMessage,
    clearPendingMessages,
    setWaitingForResponse,
  ]);

  // Start a new chat
  const startNewChat = useCallback(async () => {
    if (!isAuthenticated) return;

    clearPendingMessages();
    setError(null);
    await startNewConversation({ mode });
  }, [isAuthenticated, mode, startNewConversation, clearPendingMessages]);

  // Switch conversation
  const switchConversation = useCallback((conversationId: string) => {
    clearPendingMessages();
    setError(null);
    selectConversation(conversationId);

    // Update mode based on conversation
    const conversation = conversations?.find(c => c.id === conversationId);
    if (conversation?.mode) {
      setMode(conversation.mode as CoachMode);
    }
  }, [selectConversation, conversations, clearPendingMessages]);

  // Change mode
  const changeMode = useCallback((newMode: CoachMode) => {
    setMode(newMode);
  }, []);

  return {
    // Data
    conversations,
    currentConversation,
    currentConversationId,
    messages,
    mode,
    error,

    // State
    isLoading: conversationsLoading,
    isSaving,
    isWaitingForResponse,

    // Actions
    sendMessage,
    startNewChat,
    switchConversation,
    deleteConversation,
    archiveConversation,
    updateConversation,
    changeMode,
    refetch,
  };
}
