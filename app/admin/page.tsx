import { createAdminClient } from '@/lib/supabase/admin';
import Link from 'next/link';

async function getStats() {
  const adminDb = createAdminClient();

  const { data: tickets } = await adminDb
    .from('support_tickets')
    .select('status, created_at');

  const stats = {
    total: tickets?.length || 0,
    open: tickets?.filter(t => t.status === 'open').length || 0,
    inProgress: tickets?.filter(t => t.status === 'in_progress').length || 0,
    resolved: tickets?.filter(t => t.status === 'resolved').length || 0,
    today: tickets?.filter(t => {
      const created = new Date(t.created_at);
      const today = new Date();
      return created.toDateString() === today.toDateString();
    }).length || 0,
  };

  return stats;
}

async function getRecentTickets() {
  const adminDb = createAdminClient();

  const { data: tickets } = await adminDb
    .from('support_tickets')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  return tickets || [];
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentTickets = await getRecentTickets();

  const statCards = [
    { label: 'Total Tickets', value: stats.total, color: 'bg-slate-700' },
    { label: 'Open', value: stats.open, color: 'bg-blue-500/20 text-blue-400' },
    { label: 'In Progress', value: stats.inProgress, color: 'bg-amber-500/20 text-amber-400' },
    { label: 'Resolved', value: stats.resolved, color: 'bg-emerald-500/20 text-emerald-400' },
    { label: 'Today', value: stats.today, color: 'bg-purple-500/20 text-purple-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400">Overview of your support system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl border border-slate-700 p-4 ${stat.color}`}
          >
            <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/support?status=open"
          className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-amber-500/50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center text-2xl">
              📬
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Open Tickets</h3>
              <p className="text-sm text-slate-400">
                {stats.open} ticket{stats.open !== 1 ? 's' : ''} waiting for response
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/support?status=in_progress"
          className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-amber-500/50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-lg flex items-center justify-center text-2xl">
              ⏳
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">In Progress</h3>
              <p className="text-sm text-slate-400">
                {stats.inProgress} ticket{stats.inProgress !== 1 ? 's' : ''} being worked on
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Tickets */}
      <div className="bg-slate-800 rounded-xl border border-slate-700">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">Recent Tickets</h2>
          <Link
            href="/admin/support"
            className="text-sm text-amber-400 hover:text-amber-300"
          >
            View all →
          </Link>
        </div>

        {recentTickets.length > 0 ? (
          <div className="divide-y divide-slate-700">
            {recentTickets.map((ticket) => (
              <Link
                key={ticket.id}
                href={`/admin/support/${ticket.id}`}
                className="block p-4 hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-slate-500">#{ticket.ticket_number}</span>
                      <StatusBadge status={ticket.status} />
                      <PriorityBadge priority={ticket.priority} />
                    </div>
                    <p className="text-sm font-medium text-white">{ticket.subject}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {ticket.name} • {new Date(ticket.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500">
            No tickets yet
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    open: 'bg-blue-500/20 text-blue-400',
    in_progress: 'bg-amber-500/20 text-amber-400',
    resolved: 'bg-emerald-500/20 text-emerald-400',
    closed: 'bg-slate-500/20 text-slate-400',
  };

  const labels: Record<string, string> = {
    open: 'Open',
    in_progress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[status] || colors.open}`}>
      {labels[status] || status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  if (priority === 'normal') return null;

  const colors: Record<string, string> = {
    low: 'bg-slate-500/20 text-slate-400',
    high: 'bg-orange-500/20 text-orange-400',
    urgent: 'bg-red-500/20 text-red-400',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[priority] || ''}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}
