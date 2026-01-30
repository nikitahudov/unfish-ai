'use client';

import React from 'react';
import { useActivity } from '@/lib/hooks';
import { formatDistanceToNow } from 'date-fns';
import type { ActivityLog } from '@/types/database';

export function RecentActivity() {
  const { activities, isLoading } = useActivity(10);

  if (isLoading) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <div className="h-4 bg-slate-700 rounded w-1/3 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-slate-700 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <p className="text-slate-400 text-center py-8">
          No activity yet. Start learning to see your progress!
        </p>
      </div>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'content_viewed': return '\uD83D\uDC41\uFE0F';
      case 'content_completed': return '\u2705';
      case 'quiz_attempted': return '\uD83D\uDCDD';
      case 'quiz_passed': return '\uD83C\uDFC6';
      case 'coach_message': return '\uD83D\uDCAC';
      case 'login': return '\uD83D\uDD11';
      default: return '\uD83D\uDCCC';
    }
  };

  const getActivityText = (activity: ActivityLog) => {
    const metadata = activity.metadata as Record<string, unknown>;
    const skillName = (metadata?.skillName as string) || activity.reference_id || 'Unknown';

    switch (activity.activity_type) {
      case 'content_viewed':
        return `Viewed ${skillName}`;
      case 'content_completed':
        return `Completed ${skillName}`;
      case 'quiz_attempted':
        return `Attempted ${skillName} quiz (${metadata?.score}%)`;
      case 'quiz_passed':
        return `Passed ${skillName} quiz (${metadata?.score}%)`;
      case 'coach_message':
        return 'Chatted with AI Coach';
      case 'login':
        return 'Logged in';
      default:
        return activity.activity_type;
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg"
          >
            <span className="text-xl">{getActivityIcon(activity.activity_type)}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">
                {getActivityText(activity)}
              </p>
              <p className="text-xs text-slate-500">
                {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
