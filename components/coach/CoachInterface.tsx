'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CoachMessage } from './CoachMessage';
import { CoachInput } from './CoachInput';
import { ModeSelector } from './ModeSelector';
import { QuickActions } from './QuickActions';
import { ProgressSummary } from './ProgressSummary';
import { AnalyzePanel } from './AnalyzePanel';
import { QuizPanel } from './QuizPanel';
import { QuizSessionHeader } from './QuizSessionHeader';
import { QuizSummaryModal } from './QuizSummaryModal';
import { ConversationSidebar } from './ConversationSidebar';
import { useCoach } from '@/lib/hooks/useCoach';
import { useQuizSessionStore, QuizSessionSummary } from '@/lib/quizSessionStore';
import { sendMessageToCoach } from '@/lib/coach/coachApi';
import { coachService } from '@/lib/services';
import { buildCoachContextAsync, getDaysSinceLastActivity } from '@/lib/coach/contextBuilder';
import type { CoachMode } from '@/types/coach';

export function CoachInterface() {
  const {
    conversations,
    currentConversation,
    currentConversationId,
    messages,
    mode,
    error: coachError,
    isLoading,
    isSaving,
    isWaitingForResponse,
    sendMessage,
    startNewChat,
    switchConversation,
    deleteConversation,
    archiveConversation,
    changeMode,
    refetch,
  } = useCoach();

  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showAnalyzePanel, setShowAnalyzePanel] = useState(false);
  const [showQuizPanel, setShowQuizPanel] = useState(false);
  const [showQuizSummary, setShowQuizSummary] = useState(false);
  const [quizSummary, setQuizSummary] = useState<QuizSessionSummary | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const welcomeSentRef = useRef<string | null>(null);
  const welcomeInProgressRef = useRef(false);

  const { isActive: quizIsActive, endSession, resetSession } = useQuizSessionStore();

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send welcome message for new conversations
  useEffect(() => {
    if (
      currentConversationId &&
      messages.length === 0 &&
      !isLoading &&
      !isWaitingForResponse &&
      welcomeSentRef.current !== currentConversationId &&
      !welcomeInProgressRef.current
    ) {
      welcomeInProgressRef.current = true;
      welcomeSentRef.current = currentConversationId;
      sendWelcomeMessage(currentConversationId);
    }
  }, [currentConversationId, messages.length, isLoading, isWaitingForResponse]);

  // Hide quick actions after messages
  useEffect(() => {
    setShowQuickActions(messages.length <= 2);
  }, [messages.length]);

  // Send a welcome message without showing the prompt as a user message
  const sendWelcomeMessage = async (conversationId: string) => {
    try {
      const context = await buildCoachContextAsync();
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

      // Send prompt to AI without saving it as a user message
      const response = await sendMessageToCoach(
        [{ id: 'temp', role: 'user', content: welcomePrompt, timestamp: new Date().toISOString() }],
        mode
      );

      if (response.message) {
        // Save only the assistant response to the conversation
        await coachService.addMessage(conversationId, {
          role: 'assistant',
          content: response.message,
          mode,
        });
        // Refetch to sync local state
        refetch();
      }
    } catch (error) {
      console.error('Error sending welcome message:', error);
    } finally {
      welcomeInProgressRef.current = false;
    }
  };

  const handleSend = async (content: string, switchToMode?: CoachMode) => {
    // Handle special flags
    if (content === '__SHOW_FORM__') {
      setShowAnalyzePanel(true);
      return;
    }

    if (content === '__SHOW_QUIZ_PANEL__') {
      setShowQuizPanel(true);
      return;
    }

    // Switch mode if specified
    if (switchToMode && switchToMode !== mode) {
      changeMode(switchToMode);
    }

    setShowQuickActions(false);
    setShowAnalyzePanel(false);
    setShowQuizPanel(false);

    await sendMessage(content, switchToMode);
  };

  const handleHandSubmit = (message: string, _handSummary?: string) => {
    setShowAnalyzePanel(false);
    handleSend(message, 'analyze');
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

  const handleNewConversation = () => {
    resetSession();
    setShowQuickActions(true);
    setShowAnalyzePanel(false);
    setShowQuizPanel(false);
    startNewChat();
  };

  const handleModeChange = (newMode: CoachMode) => {
    changeMode(newMode);
    setShowQuickActions(true);

    if (newMode === 'analyze') {
      setShowAnalyzePanel(true);
      setShowQuizPanel(false);
    } else if (newMode === 'quiz') {
      setShowAnalyzePanel(false);
      setShowQuizPanel(!quizIsActive);
    } else {
      setShowAnalyzePanel(false);
      setShowQuizPanel(false);
    }
  };

  const handleSelectConversation = (conversationId: string) => {
    switchConversation(conversationId);
    resetSession();
    setShowQuickActions(true);
    setShowAnalyzePanel(false);
    setShowQuizPanel(false);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Sidebar */}
      {showSidebar && (
        <ConversationSidebar
          conversations={conversations || []}
          currentConversationId={currentConversationId}
          isLoading={isLoading}
          onSelect={handleSelectConversation}
          onNew={handleNewConversation}
          onDelete={deleteConversation}
          onArchive={archiveConversation}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors md:hidden"
            >
              <span className="text-slate-400">{'\u2630'}</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-xl">
              {'\u{1F393}'}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">AI Coach</h1>
              <p className="text-sm text-slate-400">
                {currentConversation?.title || 'Your personal poker mentor'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isSaving && (
              <span className="text-xs text-slate-500">Saving...</span>
            )}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors hidden md:block"
              title={showSidebar ? 'Hide sidebar' : 'Show sidebar'}
            >
              <span className="text-slate-400">{showSidebar ? '\u25C0' : '\u25B6'}</span>
            </button>
          </div>
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
          {/* Loading state */}
          {isLoading && messages.length === 0 && (
            <div className="flex justify-center py-8">
              <div className="text-slate-400">Loading conversations...</div>
            </div>
          )}

          {/* Empty state for new conversation */}
          {!isLoading && messages.length === 0 && !isWaitingForResponse && !welcomeInProgressRef.current && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center text-3xl mb-4">
                {'\u{1F393}'}
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Welcome to AI Coach
              </h2>
              <p className="text-slate-400 max-w-md">
                {"I'm here to help you improve your poker game. Ask me anything, analyze hands, or test your knowledge with quizzes."}
              </p>
            </div>
          )}

          {/* Panels shown inline in message area */}
          {showAnalyzePanel && !isWaitingForResponse ? (
            <AnalyzePanel
              onSubmitHand={handleHandSubmit}
              onCancel={() => setShowAnalyzePanel(false)}
            />
          ) : showQuizPanel && !quizIsActive && !isWaitingForResponse ? (
            <QuizPanel
              onStartQuiz={handleQuizStart}
              onCustomQuiz={() => setShowQuizPanel(false)}
            />
          ) : null}

          {/* Messages */}
          {messages.map((message) => (
            <CoachMessage key={message.id} message={message} />
          ))}

          {/* Error message */}
          {coachError && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {coachError}
            </div>
          )}

          {/* Typing indicator */}
          {(isWaitingForResponse || welcomeInProgressRef.current) && (
            <div className="flex justify-start mb-4">
              <div className="bg-slate-700 text-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-2 text-amber-400 text-sm">
                  {'\u{1F393}'} Coach is thinking...
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

        {/* Quick Actions */}
        {showQuickActions && !isWaitingForResponse && !showAnalyzePanel && !showQuizPanel && messages.length > 0 && (
          <div className="px-4">
            <QuickActions onAction={handleSend} currentMode={mode} />
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-slate-700">
          <CoachInput onSend={handleSend} isLoading={isWaitingForResponse} mode={mode} />
        </div>

        {/* Quiz Summary Modal */}
        {showQuizSummary && quizSummary && (
          <QuizSummaryModal
            summary={quizSummary}
            onClose={handleCloseQuizSummary}
            onRestart={handleRestartQuiz}
          />
        )}
      </div>
    </div>
  );
}
