'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CoachMessage } from './CoachMessage';
import { CoachInput } from './CoachInput';
import { ModeSelector } from './ModeSelector';
import { useCoachStore } from '@/lib/coachStore';
import { sendMessageToCoach } from '@/lib/coach/coachApi';
import { buildCoachContext, getDaysSinceLastActivity } from '@/lib/coach/contextBuilder';
import type { CoachMode } from '@/types/coach';

export function CoachInterface() {
  const [mode, setMode] = useState<CoachMode>('chat');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);
  const initializingRef = useRef(false);

  const {
    currentConversationId,
    startNewConversation,
    addMessage,
    getCurrentConversation,
  } = useCoachStore();

  const conversation = getCurrentConversation();

  // Define sendWelcomeMessage before it's used in useEffect
  const sendWelcomeMessage = useCallback(async () => {
    if (!currentConversationId || initializingRef.current) return;

    initializingRef.current = true;
    setIsLoading(true);

    // Build a welcome context
    const context = buildCoachContext();
    const daysSinceActive = getDaysSinceLastActivity(context);

    let welcomePrompt = "Generate a brief, friendly welcome message for the student. ";

    if (daysSinceActive !== null && daysSinceActive >= 3) {
      welcomePrompt += `They haven't been active for ${daysSinceActive} days, so welcome them back warmly. `;
    }

    if (context.completedSkills.length === 0) {
      welcomePrompt += "They're just starting out, so be encouraging about their journey. ";
    } else {
      welcomePrompt += `Briefly acknowledge their progress (${context.completedSkills.length} skills completed). `;
    }

    if (context.weakAreas.length > 0) {
      welcomePrompt += `You might suggest working on ${context.weakAreas[0].skillName}. `;
    }

    welcomePrompt += "Keep it to 2-3 sentences. Ask what they'd like to work on.";

    // Add a temporary user message to get the welcome (won't be shown)
    const response = await sendMessageToCoach(
      [{ id: 'temp', role: 'user', content: welcomePrompt, timestamp: new Date().toISOString() }],
      mode
    );

    if (response.message) {
      addMessage(currentConversationId, {
        role: 'assistant',
        content: response.message,
        mode,
      });
    }

    setIsLoading(false);
    hasInitializedRef.current = true;
    initializingRef.current = false;
  }, [currentConversationId, addMessage, mode]);

  // Initialize conversation if none exists
  useEffect(() => {
    if (!currentConversationId) {
      startNewConversation();
    }
  }, [currentConversationId, startNewConversation]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  // Send welcome message on first load - async fetch and state update is a legitimate pattern for initialization
  useEffect(() => {
    if (conversation && conversation.messages.length === 0 && !hasInitializedRef.current && !isLoading) {
      // eslint-disable-next-line
      sendWelcomeMessage();
    }
  }, [conversation, isLoading, sendWelcomeMessage]);

  const handleSend = async (content: string) => {
    if (!currentConversationId) return;

    // Add user message
    addMessage(currentConversationId, {
      role: 'user',
      content,
      mode,
    });

    setIsLoading(true);

    // Get updated conversation with new message
    const updatedConversation = useCoachStore.getState().getCurrentConversation();

    if (!updatedConversation) {
      setIsLoading(false);
      return;
    }

    // Send to API
    const response = await sendMessageToCoach(updatedConversation.messages, mode);

    if (response.error) {
      addMessage(currentConversationId, {
        role: 'assistant',
        content: response.error,
        mode,
      });
    } else if (response.message) {
      addMessage(currentConversationId, {
        role: 'assistant',
        content: response.message,
        mode,
      });
    }

    setIsLoading(false);
  };

  const handleNewConversation = () => {
    hasInitializedRef.current = false;
    initializingRef.current = false;
    startNewConversation();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-xl">
            <span className="text-white font-bold">AI</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">AI Coach</h1>
            <p className="text-sm text-slate-400">Your personal poker mentor</p>
          </div>
        </div>
        <button
          onClick={handleNewConversation}
          className="px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
        >
          New Chat
        </button>
      </div>

      {/* Mode Selector */}
      <div className="p-4 border-b border-slate-700">
        <ModeSelector currentMode={mode} onModeChange={setMode} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation?.messages.map((message) => (
          <CoachMessage key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-slate-700 text-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-2 text-amber-400 text-sm">
                Coach is thinking...
              </div>
              <div className="flex gap-1 mt-2">
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700">
        <CoachInput onSend={handleSend} isLoading={isLoading} mode={mode} />
      </div>
    </div>
  );
}
