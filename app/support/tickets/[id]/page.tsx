'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import {
  SupportTicket,
  TicketReply,
  CATEGORY_LABELS,
  STATUS_LABELS
} from '@/types/support';

export default function TicketDetailPage() {
  const params = useParams();
  const ticketId = params.id as string;
  const { user } = useAuth();

  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [replies, setReplies] = useState<TicketReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Reply form
  const [replyMessage, setReplyMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTicket = useCallback(async () => {
    try {
      const response = await fetch(`/api/support/tickets/${ticketId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch ticket');
      }

      setTicket(data.ticket);
      setReplies(data.replies || []);
    } catch (err) {
      console.error('Error fetching ticket:', err);
      setError(err instanceof Error ? err.message : 'Failed to load ticket');
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !ticket) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/support/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId: ticket.id,
          message: replyMessage.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reply');
      }

      // Add new reply to list
      setReplies([...replies, data.reply]);
      setReplyMessage('');
    } catch (err) {
      console.error('Error submitting reply:', err);
      alert(err instanceof Error ? err.message : 'Failed to send reply');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in_progress': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'resolved': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'closed': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-slate-900 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-8">
            <div className="text-4xl mb-4">&#128533;</div>
            <h1 className="text-xl font-bold text-white mb-2">Ticket Not Found</h1>
            <p className="text-slate-400 mb-6">
              {error || "We couldn't find the ticket you're looking for."}
            </p>
            <Link
              href="/support"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors inline-block"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const canReply = ticket.status !== 'closed';

  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back Link */}
        <Link
          href="/support"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Support
        </Link>

        {/* Ticket Header */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-slate-500">Ticket #{ticket.ticket_number}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                  {STATUS_LABELS[ticket.status]}
                </span>
              </div>
              <h1 className="text-xl font-bold text-white">{ticket.subject}</h1>
            </div>
            <div className="text-right text-sm">
              <p className="text-slate-500">Category</p>
              <p className="text-slate-300">{CATEGORY_LABELS[ticket.category]}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
            <div>
              <span>Submitted by </span>
              <span className="text-slate-300">{ticket.name}</span>
            </div>
            <div>&bull;</div>
            <div>{formatDate(ticket.created_at)}</div>
          </div>
        </div>

        {/* Original Message */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden mb-6">
          <div className="p-4 bg-slate-700/50 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center font-medium">
                {ticket.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{ticket.name}</p>
                <p className="text-xs text-slate-500">{formatDate(ticket.created_at)}</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-slate-300 whitespace-pre-wrap">{ticket.message}</p>

            {/* Attachments */}
            {ticket.attachments && ticket.attachments.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-sm text-slate-500 mb-2">Attachments</p>
                <div className="flex flex-wrap gap-2">
                  {ticket.attachments.map((attachment, idx) => (
                    <a
                      key={idx}
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300 transition-colors"
                    >
                      <span>&#128206;</span>
                      <span className="truncate max-w-[150px]">{attachment.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Replies */}
        {replies.length > 0 && (
          <div className="space-y-4 mb-6">
            {replies.map((reply) => (
              <div
                key={reply.id}
                className={`rounded-xl border overflow-hidden ${
                  reply.sender_type === 'admin'
                    ? 'bg-blue-500/5 border-blue-500/30'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                <div className={`p-4 border-b ${
                  reply.sender_type === 'admin'
                    ? 'bg-blue-500/10 border-blue-500/20'
                    : 'bg-slate-700/50 border-slate-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                      reply.sender_type === 'admin'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {reply.sender_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white">{reply.sender_name}</p>
                        {reply.sender_type === 'admin' && (
                          <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">
                            Support Team
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{formatDate(reply.created_at)}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-slate-300 whitespace-pre-wrap">{reply.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reply Form */}
        {canReply ? (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-medium text-white mb-4">Add a Reply</h3>
            <form onSubmit={handleSubmitReply}>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none resize-none mb-4"
                placeholder="Type your reply..."
                disabled={isSubmitting}
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !replyMessage.trim()}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Reply'
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 text-center">
            <p className="text-slate-400">
              This ticket is closed. If you need further assistance, please{' '}
              <Link href="/support" className="text-amber-400 hover:text-amber-300">
                open a new ticket
              </Link>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
