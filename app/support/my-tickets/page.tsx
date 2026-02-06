'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import {
  SupportTicket,
  STATUS_LABELS,
  CATEGORY_LABELS
} from '@/types/support';

export default function MyTicketsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/support/my-tickets');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchMyTickets();
    }
  }, [user]);

  const fetchMyTickets = async () => {
    try {
      const response = await fetch('/api/support/my-tickets');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch tickets');
      }

      setTickets(data.tickets);
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError(err instanceof Error ? err.message : 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      open: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      in_progress: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      resolved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      closed: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    };
    return colors[status] || colors.open;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">My Support Tickets</h1>
            <p className="text-slate-400">View and manage your support requests</p>
          </div>
          <Link
            href="/support"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <span>+</span>
            New Ticket
          </Link>
        </div>

        {/* Tickets List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full" />
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
            <p className="text-red-400">{error}</p>
            <button
              onClick={fetchMyTickets}
              className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : tickets.length === 0 ? (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-12 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h2 className="text-xl font-medium text-white mb-2">No tickets yet</h2>
            <p className="text-slate-400 mb-6">
              You haven&apos;t submitted any support tickets. Need help with something?
            </p>
            <Link
              href="/support"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors inline-block"
            >
              Contact Support
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Link
                key={ticket.id}
                href={`/support/tickets/${ticket.id}`}
                className="block bg-slate-800 rounded-xl border border-slate-700 p-5 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-slate-500">#{ticket.ticket_number}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                        {STATUS_LABELS[ticket.status]}
                      </span>
                      <span className="text-xs text-slate-500">
                        {CATEGORY_LABELS[ticket.category]}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-1 truncate">
                      {ticket.subject}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Submitted {formatDate(ticket.created_at)}
                      {ticket.updated_at !== ticket.created_at && (
                        <span> • Updated {formatDate(ticket.updated_at)}</span>
                      )}
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-slate-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Help Text */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>
            Need immediate help?{' '}
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@example.com'}`}
              className="text-amber-400 hover:text-amber-300"
            >
              Email us directly
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
