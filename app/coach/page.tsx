'use client';

import React, { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const coachModes = [
  { id: 'explain', label: 'Explain', icon: '📖', description: 'Learn concepts' },
  { id: 'analyze', label: 'Analyze', icon: '🔍', description: 'Review hands' },
  { id: 'quiz', label: 'Quiz Me', icon: '✅', description: 'Practice questions' },
  { id: 'plan', label: 'Plan', icon: '📋', description: 'Study planning' },
];

const quickSuggestions = [
  'Explain pot odds',
  'Quiz me on equity',
  'Study plan for today',
  'What should I learn next?',
  'Analyze my last hand',
  'How do I calculate EV?',
];

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hey! 👋 I'm your AI poker coach. I'm here to help you master the 96-skill curriculum.

**I can help you:**
• Explain any poker concept in detail
• Analyze hands and discuss strategy  
• Quiz you on specific topics
• Create personalized study plans

What would you like to work on today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [coachMode, setCoachMode] = useState('explain');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response (will be replaced with actual API call)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `I received your message: "${userMessage}"\n\n*AI coaching integration coming soon! This will connect to Claude API to provide personalized poker coaching.*`,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6 md:p-8 h-screen flex flex-col max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">🤖 AI Poker Coach</h1>
        <p className="text-slate-400">Get personalized help with any poker concept</p>
      </div>

      {/* Mode Selection */}
      <div className="flex flex-wrap gap-2 mb-4">
        {coachModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setCoachMode(mode.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              coachMode === mode.id
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600'
            }`}
          >
            <span>{mode.icon}</span>
            {mode.label}
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-slate-800/50 rounded-2xl border border-slate-700/50 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-amber-500/20 text-white'
                    : 'bg-slate-700/50 text-slate-300'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {msg.content.split('**').map((part, j) =>
                    j % 2 === 1 ? (
                      <strong key={j} className="text-white">
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-700/50 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <div
                    className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={
                coachMode === 'explain'
                  ? 'Ask about any poker concept...'
                  : coachMode === 'analyze'
                  ? 'Paste a hand history or describe the situation...'
                  : coachMode === 'quiz'
                  ? 'Say "quiz me" to start practice questions...'
                  : 'Ask me anything about poker...'
              }
              className="flex-1 bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {quickSuggestions.slice(0, 4).map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="px-3 py-1.5 bg-slate-700/50 text-slate-400 text-sm rounded-lg hover:bg-slate-700 hover:text-white transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
