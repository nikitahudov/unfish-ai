'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CoachMessage } from './CoachMessage';
import { CoachInput } from './CoachInput';
import { ModeSelector } from './ModeSelector';
import { QuickActions } from './QuickActions';
import { ProgressSummary } from './ProgressSummary';
import { AnalyzePanel } from './AnalyzePanel';
import { useCoachStore } from '@/lib/coachStore';
import { sendMessageToCoach } from '@/lib/coach/coachApi';
import { buildCoachContext, getDaysSinceLastActivity } from '@/lib/coach/contextBuilder';
import type { CoachMode } from '@/types/coach';

export function CoachInterface() {
  const [mode, setMode] = useState<CoachMode>('chat');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showHandForm, setShowHandForm] = useState(false);
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
      welcomePrompt += `They haven't been active for ${daysSinceActive} days, so welcome them back warmly and encourage them to continue. `;
    } else if (daysSinceActive === 1) {
      welcomePrompt += "They were active yesterday, acknowledge their consistency. ";
    }

    if (context.completedSkills.length === 0) {
      welcomePrompt += "They're just starting out, so be encouraging about beginning their poker journey. Suggest they start with the first skill (Pot Odds). ";
    } else if (context.completedSkills.length < 5) {
      welcomePrompt += `They've completed ${context.completedSkills.length} skills - encourage their early progress. `;
    } else {
      welcomePrompt += `They've completed ${context.completedSkills.length} skills - acknowledge their dedication. `;
    }

    if (context.weakAreas.length > 0) {
      welcomePrompt += `Mention that you notice ${context.weakAreas[0].skillName} might need some work (scored ${context.weakAreas[0].score}%). `;
    }

    if (context.stats.currentStreak > 2) {
      welcomePrompt += `Celebrate their ${context.stats.currentStreak}-day study streak! `;
    }

    welcomePrompt += "Keep it to 2-4 sentences. End by asking what they'd like to work on today. Use markdown formatting for emphasis.";

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

  // Hide quick actions after first message - deriving UI state from conversation length
  useEffect(() => {
    // eslint-disable-next-line
    setShowQuickActions(!(conversation && conversation.messages.length > 2));
  }, [conversation]);

  const handleSend = async (content: string, switchToMode?: CoachMode) => {
    if (!currentConversationId) return;

    // Check for special form flag
    if (content === '__SHOW_FORM__') {
      setShowHandForm(true);
      return;
    }

    // Switch mode if specified
    if (switchToMode && switchToMode !== mode) {
      setMode(switchToMode);
    }

    const activeMode = switchToMode || mode;

    // Add user message
    addMessage(currentConversationId, {
      role: 'user',
      content,
      mode: activeMode,
    });

    setIsLoading(true);
    setShowQuickActions(false);

    // Get updated conversation with new message
    const updatedConversation = useCoachStore.getState().getCurrentConversation();

    if (!updatedConversation) {
      setIsLoading(false);
      return;
    }

    // Send to API
    const response = await sendMessageToCoach(updatedConversation.messages, activeMode);

    if (response.error) {
      addMessage(currentConversationId, {
        role: 'assistant',
        content: response.error,
        mode: activeMode,
      });
    } else if (response.message) {
      addMessage(currentConversationId, {
        role: 'assistant',
        content: response.message,
        mode: activeMode,
      });
    }

    setIsLoading(false);
  };

  const handleNewConversation = () => {
    hasInitializedRef.current = false;
    initializingRef.current = false;
    setShowQuickActions(true);
    startNewConversation();
  };

  const handleModeChange = (newMode: CoachMode) => {
    setMode(newMode);
    setShowQuickActions(true);
    setShowHandForm(false);
  };

  const handleHandSubmit = (message: string, _handSummary?: string) => {
    setShowHandForm(false);
    // Send the hand for analysis
    handleSend(message);
  };

  const handleFormCancel = () => {
    setShowHandForm(false);
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

      {/* Progress Summary - Collapsible */}
      <div className="p-4 border-b border-slate-700">
        <ProgressSummary />
      </div>

      {/* Mode Selector */}
      <div className="p-4 border-b border-slate-700">
        <ModeSelector currentMode={mode} onModeChange={handleModeChange} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {showHandForm ? (
          <AnalyzePanel
            onSubmitHand={handleHandSubmit}
            onCancel={handleFormCancel}
          />
        ) : (
          <>
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
          </>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {showQuickActions && !isLoading && !showHandForm && (
        <div className="px-4">
          <QuickActions onAction={handleSend} currentMode={mode} />
        </div>
      )}

      {/* Input */}
      {!showHandForm && (
        <div className="p-4 border-t border-slate-700">
          <CoachInput onSend={handleSend} isLoading={isLoading} mode={mode} />
        </div>
      )}
    </div>
  );
}
