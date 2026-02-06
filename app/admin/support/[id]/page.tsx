'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  SupportTicket,
  TicketReply,
  TicketStatus,
  TicketPriority,
  CATEGORY_LABELS,
  STATUS_LABELS,
  PRIORITY_LABELS
} from '@/types/support';

export default function AdminTicketDetailPage() {
  const params = useParams();
  const router = useRouter();
  const ticketId = params.id as string;

  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [replies, setReplies] = useState<TicketReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Reply form
  const [replyMessage, setReplyMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status/Priority updates
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, [ticketId]);

  const fetchTicket = async () => {
    try {
      const response = await fetch(`/api/admin/support/tickets/${ticketId}`);
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
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !ticket) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/support/reply', {
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

      setReplies([...replies, data.reply]);
      setReplyMessage('');

      // Update ticket status to in_progress if it was open
      if (ticket.status === 'open') {
        setTicket({ ...ticket, status: 'in_progress' });
      }
    } catch (err) {
      console.error('Error submitting reply:', err);
      alert(err instanceof Error ? err.message : 'Failed to send reply');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (newStatus: TicketStatus) => {
    if (!ticket || ticket.status === newStatus) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/support/tickets/${ticket.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update status');
      }

      setTicket({ ...ticket, status: newStatus });
    } catch (err) {
      console.error('Error updating status:', err);
      alert(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePriorityChange = async (newPriority: TicketPriority) => {
    if (!ticket || ticket.priority === newPriority) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/support/tickets/${ticket.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority: newPriority }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update priority');
      }

      setTicket({ ...ticket, priority: newPriority });
    } catch (err) {
      console.error('Error updating priority:', err);
      alert(err instanceof Error ? err.message : 'Failed to update priority');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: TicketStatus) => {
    const colors: Record<TicketStatus, string> = {
      open: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      in_progress: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      resolved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      closed: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    };
    return colors[status];
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
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">😕</div>
        <h1 className="text-xl font-bold text-white mb-2">Ticket Not Found</h1>
        <p className="text-slate-400 mb-6">{error || "We couldn't find this ticket."}</p>
        <Link
          href="/admin/support"
          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors inline-block"
        >
          Back to Tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/support"
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-sm text-slate-500">Ticket #{ticket.ticket_number}</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
              {STATUS_LABELS[ticket.status]}
            </span>
          </div>
          <h1 className="text-xl font-bold text-white">{ticket.subject}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Original Message */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="p-4 bg-slate-700/50 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center font-medium text-lg">
                  {ticket.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-white">{ticket.name}</p>
                    {ticket.is_authenticated ? (
                      <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded">
                        Registered
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 bg-slate-500/20 text-slate-400 text-xs rounded">
                        Guest
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{ticket.email}</p>
                </div>
                <div className="text-right text-sm text-slate-500">
                  {formatDate(ticket.created_at)}
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-slate-300 whitespace-pre-wrap">{ticket.message}</p>

              {/* Attachments */}
              {ticket.attachments && ticket.attachments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <p className="text-sm text-slate-500 mb-2">Attachments ({ticket.attachments.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {ticket.attachments.map((attachment, idx) => (
                      <a
                        key={idx}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300 transition-colors"
                      >
                        <span>{attachment.type.startsWith('image/') ? '🖼️' : '📄'}</span>
                        <span className="truncate max-w-[150px]">{attachment.name}</span>
                        <span className="text-xs text-slate-500">
                          ({(attachment.size / 1024).toFixed(1)}KB)
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Replies */}
          {replies.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-slate-400">
                Conversation ({replies.length} {replies.length === 1 ? 'reply' : 'replies'})
              </h3>
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
                      </div>
                      <span className="text-xs text-slate-500">{formatDate(reply.created_at)}</span>
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
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <h3 className="text-sm font-medium text-white mb-3">Send Reply</h3>
            <form onSubmit={handleSubmitReply}>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none resize-none mb-4"
                placeholder="Type your reply to the customer..."
                disabled={isSubmitting}
                required
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  Customer will receive an email notification
                </p>
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
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Reply
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Status */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-3">Status</h3>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(STATUS_LABELS) as TicketStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={isUpdating || ticket.status === status}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors border ${
                    ticket.status === status
                      ? getStatusColor(status)
                      : 'bg-slate-700 border-slate-600 text-slate-400 hover:bg-slate-600 disabled:opacity-50'
                  }`}
                >
                  {STATUS_LABELS[status]}
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-3">Priority</h3>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(PRIORITY_LABELS) as TicketPriority[]).map((priority) => {
                const isActive = ticket.priority === priority;
                const colors: Record<TicketPriority, string> = {
                  low: isActive ? 'bg-slate-500/20 text-slate-400 border-slate-500/30' : '',
                  normal: isActive ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : '',
                  high: isActive ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : '',
                  urgent: isActive ? 'bg-red-500/20 text-red-400 border-red-500/30' : '',
                };
                return (
                  <button
                    key={priority}
                    onClick={() => handlePriorityChange(priority)}
                    disabled={isUpdating || isActive}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors border ${
                      isActive
                        ? colors[priority]
                        : 'bg-slate-700 border-slate-600 text-slate-400 hover:bg-slate-600 disabled:opacity-50'
                    }`}
                  >
                    {PRIORITY_LABELS[priority]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-3">Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Category</span>
                <span className="text-white">{CATEGORY_LABELS[ticket.category]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Created</span>
                <span className="text-white">{formatDate(ticket.created_at)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Updated</span>
                <span className="text-white">{formatDate(ticket.updated_at)}</span>
              </div>
              {ticket.resolved_at && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Resolved</span>
                  <span className="text-emerald-400">{formatDate(ticket.resolved_at)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-3">Customer</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-slate-500 block mb-1">Name</span>
                <span className="text-white">{ticket.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Email</span>
                <a href={`mailto:${ticket.email}`} className="text-amber-400 hover:text-amber-300">
                  {ticket.email}
                </a>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Account</span>
                <span className={ticket.is_authenticated ? 'text-emerald-400' : 'text-slate-400'}>
                  {ticket.is_authenticated ? 'Registered User' : 'Guest'}
                </span>
              </div>
            </div>
          </div>

          {/* Meta Info */}
          {ticket.user_agent && (
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
              <h3 className="text-sm font-medium text-slate-400 mb-3">Technical Info</h3>
              <div className="text-xs text-slate-500 break-all">
                {ticket.user_agent}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
