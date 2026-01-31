'use client';

import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { CoachConversation } from '@/types/database';

interface ConversationSidebarProps {
  conversations: CoachConversation[];
  currentConversationId: string | null;
  isLoading: boolean;
  onSelect: (conversationId: string) => void;
  onNew: () => void;
  onDelete: (conversationId: string) => void;
  onArchive: (conversationId: string) => void;
}

export function ConversationSidebar({
  conversations,
  currentConversationId,
  isLoading,
  onSelect,
  onNew,
  onDelete,
  onArchive,
}: ConversationSidebarProps) {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'chat': return '\u{1F4AC}';
      case 'analyze': return '\u{1F50D}';
      case 'quiz': return '\u{1F4DD}';
      default: return '\u{1F4AC}';
    }
  };

  const getConversationTitle = (conv: CoachConversation) => {
    if (conv.title) return conv.title;
    if (conv.message_count === 0) return 'New conversation';
    return 'Untitled conversation';
  };

  if (isLoading) {
    return (
      <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-3 border-b border-slate-700">
          <div className="h-10 bg-slate-700 rounded-lg animate-pulse" />
        </div>
        <div className="flex-1 p-2 space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-700 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      {/* New Chat Button */}
      <div className="p-3 border-b border-slate-700">
        <button
          onClick={onNew}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
        >
          <span>+</span>
          <span>New Chat</span>
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {conversations.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">
            <p>No conversations yet</p>
            <p className="mt-1">Start a new chat above!</p>
          </div>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              className={`group relative rounded-lg transition-colors ${
                conv.id === currentConversationId
                  ? 'bg-slate-700'
                  : 'hover:bg-slate-700/50'
              }`}
            >
              <button
                onClick={() => onSelect(conv.id)}
                className="w-full text-left p-3"
              >
                <div className="flex items-start gap-2">
                  <span className="text-sm mt-0.5">{getModeIcon(conv.mode)}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${
                      conv.id === currentConversationId ? 'text-white' : 'text-slate-300'
                    }`}>
                      {getConversationTitle(conv)}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {conv.message_count} messages &middot; {formatDistanceToNow(new Date(conv.last_message_at), { addSuffix: true })}
                    </p>
                  </div>
                  {conv.is_starred && (
                    <span className="text-amber-400 text-xs">{'\u2B50'}</span>
                  )}
                </div>
              </button>

              {/* Menu Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(menuOpen === conv.id ? null : conv.id);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 opacity-0 group-hover:opacity-100 hover:bg-slate-600 rounded transition-all"
              >
                <span className="text-slate-400">{'\u22EE'}</span>
              </button>

              {/* Dropdown Menu */}
              {menuOpen === conv.id && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setMenuOpen(null)}
                  />
                  <div className="absolute right-2 top-full mt-1 z-20 bg-slate-700 rounded-lg shadow-xl border border-slate-600 py-1 min-w-[140px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onArchive(conv.id);
                        setMenuOpen(null);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-600 transition-colors"
                    >
                      {'\u{1F4C1}'} Archive
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this conversation?')) {
                          onDelete(conv.id);
                        }
                        setMenuOpen(null);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-slate-600 transition-colors"
                    >
                      {'\u{1F5D1}\uFE0F'} Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700 text-center">
        <p className="text-xs text-slate-500">
          {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
