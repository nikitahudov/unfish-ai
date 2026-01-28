'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CoachMessage } from './CoachMessage';
import { CoachInput } from './CoachInput';
import { ModeSelector } from './ModeSelector';
import { QuickActions } from './QuickActions';
import { ProgressSummary } from './ProgressSummary';
import { AnalyzePanel } from './AnalyzePanel';
import { QuizPanel } from './QuizPanel';
import { QuizSessionHeader } from './QuizSessionHeader';
import { QuizSummaryModal } from './QuizSummaryModal';
import { useCoachStore } from '@/lib/coachStore';
import { useQuizSessionStore, QuizSessionSummary } from '@/lib/quizSessionStore';
import { sendMessageToCoach } from '@/lib/coach/coachApi';
import { buildCoachContext, getDaysSinceLastActivity } from '@/lib/coach/contextBuilder';
import type { CoachMode } from '@/types/coach';

export function CoachInterface() {
  const [mode, setMode] = useState<CoachMode>('chat');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showHandForm, setShowHandForm] = useState(false);
  const [showQuizPanel, setShowQuizPanel] = useState(false);
  const [showQuizSummary, setShowQuizSummary] = useState(false);
  const [quizSummary, setQuizSummary] = useState<QuizSessionSummary | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);
  const initializingRef = useRef(false);

  const {
    currentConversationId,
    startNewConversation,
    addMessage,
    getCurrentConversation,
  } = useCoachStore();

  const { isActive: quizIsActive, endSession, resetSession } = useQuizSessionStore();

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

    // Check for special form flags
    if (content === '__SHOW_FORM__') {
      setShowHandForm(true);
      return;
    }

    if (content === '__SHOW_QUIZ_PANEL__') {
      setShowQuizPanel(true);
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
    setShowHandForm(false);
    setShowQuizPanel(false);

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

      // Track quiz answers if in quiz mode
      if (activeMode === 'quiz' && quizIsActive) {
        // Simple heuristic: check if response contains correct/incorrect indicators
        const wasCorrect = response.message.toLowerCase().includes('✅') ||
                         response.message.toLowerCase().includes('correct!');
        const wasWrong = response.message.toLowerCase().includes('❌') ||
                        response.message.toLowerCase().includes('not quite');

        if (wasCorrect || wasWrong) {
          useQuizSessionStore.getState().recordAnswer(
            content, // user's answer
            content,
            wasCorrect
          );
        }
      }
    }

    setIsLoading(false);
  };

  const handleNewConversation = () => {
    hasInitializedRef.current = false;
    initializingRef.current = false;
    setShowQuickActions(true);
    setShowHandForm(false);
    setShowQuizPanel(false);
    resetSession();
    startNewConversation();
  };

  const handleModeChange = (newMode: CoachMode) => {
    setMode(newMode);
    setShowQuickActions(true);
    setShowHandForm(false);

    // Show quiz panel when switching to quiz mode (if no active quiz)
    if (newMode === 'quiz' && !quizIsActive) {
      setShowQuizPanel(true);
    } else {
      setShowQuizPanel(false);
    }
  };

  const handleHandSubmit = (message: string, _handSummary?: string) => {
    setShowHandForm(false);
    // Send the hand for analysis
    handleSend(message);
  };

  const handleFormCancel = () => {
    setShowHandForm(false);
  };

  const handleQuizStart = (prompt: string) => {
    setShowQuizPanel(false);
    handleSend(prompt, 'quiz');
  };

  const handleEndQuiz = () => {
    const summary = endSession();
    setQuizSummary(summary);
    setShowQuizSummary(true);
  };

  const handleCloseQuizSummary = () => {
    setShowQuizSummary(false);
    setQuizSummary(null);
    setShowQuizPanel(true);
  };

  const handleRestartQuiz = () => {
    setShowQuizSummary(false);
    setQuizSummary(null);
    resetSession();
    setShowQuizPanel(true);
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

      {/* Quiz Session Header (if quiz is active) */}
      {quizIsActive && mode === 'quiz' && (
        <QuizSessionHeader onEndQuiz={handleEndQuiz} />
      )}

      {/* Progress Summary - Collapsible (hide during active quiz) */}
      {!quizIsActive && (
        <div className="p-4 border-b border-slate-700">
          <ProgressSummary />
        </div>
      )}

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
        ) : showQuizPanel && !quizIsActive ? (
          <QuizPanel
            onStartQuiz={handleQuizStart}
            onCustomQuiz={() => setShowQuizPanel(false)}
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
      {showQuickActions && !isLoading && !showHandForm && !showQuizPanel && (
        <div className="px-4">
          <QuickActions onAction={handleSend} currentMode={mode} />
        </div>
      )}

      {/* Input */}
      {!showHandForm && !showQuizPanel && (
        <div className="p-4 border-t border-slate-700">
          <CoachInput onSend={handleSend} isLoading={isLoading} mode={mode} />
        </div>
      )}

      {/* Quiz Summary Modal */}
      {showQuizSummary && quizSummary && (
        <QuizSummaryModal
          summary={quizSummary}
          onClose={handleCloseQuizSummary}
          onRestart={handleRestartQuiz}
        />
      )}
    </div>
  );
}
