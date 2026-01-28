'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Message } from '@/types/coach';

interface CoachMessageProps {
  message: Message;
}

export function CoachMessage({ message }: CoachMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-amber-500 text-white rounded-br-md'
            : 'bg-slate-700 text-slate-100 rounded-bl-md'
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-2 text-amber-400 text-sm font-medium">
            Coach
          </div>
        )}
        <div className={`prose prose-sm max-w-none ${isUser ? 'prose-invert-user' : 'prose-invert'}`}>
          {isUser ? (
            <p className="m-0 text-sm leading-relaxed">{message.content}</p>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Headings
                h1: ({ children }) => (
                  <h1 className="text-lg font-bold text-white mt-3 mb-2">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-base font-semibold text-white mt-3 mb-2">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-semibold text-white mt-2 mb-1">{children}</h3>
                ),
                // Paragraphs
                p: ({ children }) => (
                  <p className="text-sm text-slate-200 mb-2 last:mb-0 leading-relaxed">{children}</p>
                ),
                // Lists
                ul: ({ children }) => (
                  <ul className="text-sm text-slate-200 mb-2 ml-4 list-disc space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="text-sm text-slate-200 mb-2 ml-4 list-decimal space-y-1">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-slate-200">{children}</li>
                ),
                // Emphasis
                strong: ({ children }) => (
                  <strong className="font-semibold text-white">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="text-amber-400 not-italic">{children}</em>
                ),
                // Code
                code: ({ children, className }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="bg-slate-600 px-1.5 py-0.5 rounded text-amber-400 text-xs">
                      {children}
                    </code>
                  ) : (
                    <code className="block bg-slate-800 p-3 rounded-lg text-xs overflow-x-auto">
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-slate-800 p-3 rounded-lg mb-2 overflow-x-auto">
                    {children}
                  </pre>
                ),
                // Blockquotes
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-amber-500 pl-3 my-2 text-slate-400 italic">
                    {children}
                  </blockquote>
                ),
                // Horizontal rule
                hr: () => <hr className="border-slate-600 my-3" />,
                // Links
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-amber-400 hover:text-amber-300 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                // Tables (for quiz results, comparisons)
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-2">
                    <table className="min-w-full text-sm">{children}</table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-slate-600">{children}</thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-slate-600">{children}</tbody>
                ),
                tr: ({ children }) => <tr>{children}</tr>,
                th: ({ children }) => (
                  <th className="px-3 py-2 text-left text-white font-medium">{children}</th>
                ),
                td: ({ children }) => (
                  <td className="px-3 py-2 text-slate-300">{children}</td>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        <div className={`text-xs mt-2 ${isUser ? 'text-amber-200' : 'text-slate-500'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}
