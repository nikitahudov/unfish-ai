'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  SupportTicket,
  TicketStatus,
  TicketPriority,
  TicketCategory,
  STATUS_LABELS,
  PRIORITY_LABELS,
  CATEGORY_LABELS
} from '@/types/support';

type SortField = 'created_at' | 'updated_at' | 'priority' | 'status';
type SortOrder = 'asc' | 'desc';

export default function AdminSupportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>(
    (searchParams.get('status') as TicketStatus) || 'all'
  );
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<TicketCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sorting
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (priorityFilter !== 'all') params.set('priority', priorityFilter);
      if (categoryFilter !== 'all') params.set('category', categoryFilter);
      params.set('sort', sortField);
      params.set('order', sortOrder);

      const response = await fetch(`/api/admin/support/tickets?${params.toString()}`);
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
  }, [statusFilter, priorityFilter, categoryFilter, sortField, sortOrder]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // Filter tickets by search query (client-side)
  const filteredTickets = tickets.filter(ticket => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      ticket.subject.toLowerCase().includes(query) ||
      ticket.name.toLowerCase().includes(query) ||
      ticket.email.toLowerCase().includes(query) ||
      ticket.ticket_number.toString().includes(query)
    );
  });

  const getStatusColor = (status: TicketStatus) => {
    const colors: Record<TicketStatus, string> = {
      open: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      in_progress: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      resolved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      closed: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    };
    return colors[status];
  };

  const getPriorityColor = (priority: TicketPriority) => {
    const colors: Record<TicketPriority, string> = {
      low: 'text-slate-400',
      normal: 'text-slate-300',
      high: 'text-orange-400',
      urgent: 'text-red-400',
    };
    return colors[priority];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Support Tickets</h1>
          <p className="text-slate-400">Manage and respond to customer inquiries</p>
        </div>
        <div className="text-sm text-slate-500">
          {filteredTickets.length} ticket{filteredTickets.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tickets..."
                className="w-full pl-10 pr-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none text-sm"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TicketStatus | 'all')}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none text-sm"
          >
            <option value="all">All Status</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as TicketPriority | 'all')}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none text-sm"
          >
            <option value="all">All Priority</option>
            {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as TicketCategory | 'all')}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 outline-none text-sm"
          >
            <option value="all">All Categories</option>
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          {/* Refresh */}
          <button
            onClick={fetchTickets}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tickets Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full" />
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
          <p className="text-red-400">{error}</p>
          <button
            onClick={fetchTickets}
            className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-12 text-center">
          <div className="text-4xl mb-4">📭</div>
          <p className="text-slate-400">No tickets found</p>
          {(statusFilter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setStatusFilter('all');
                setPriorityFilter('all');
                setCategoryFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 text-sm text-amber-400 hover:text-amber-300"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 text-left text-sm text-slate-400">
                <th className="px-4 py-3 font-medium">Ticket</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    Status
                    {sortField === 'status' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 font-medium">
                  <button
                    onClick={() => handleSort('priority')}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    Priority
                    {sortField === 'priority' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 font-medium">
                  <button
                    onClick={() => handleSort('created_at')}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    Created
                    {sortField === 'created_at' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 font-medium w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-slate-700/50 transition-colors cursor-pointer"
                  onClick={() => router.push(`/admin/support/${ticket.id}`)}
                >
                  <td className="px-4 py-4">
                    <div>
                      <span className="text-xs text-slate-500">#{ticket.ticket_number}</span>
                      <p className="text-sm font-medium text-white line-clamp-1">
                        {ticket.subject}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm text-white">{ticket.name}</p>
                      <p className="text-xs text-slate-500">{ticket.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-slate-400">
                      {CATEGORY_LABELS[ticket.category]}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                      {STATUS_LABELS[ticket.status]}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                      {PRIORITY_LABELS[ticket.priority]}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-500">
                    {formatDate(ticket.created_at)}
                  </td>
                  <td className="px-4 py-4">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
