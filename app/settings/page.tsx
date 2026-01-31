'use client';

import React, { useState } from 'react';
import { RequireAuth } from '@/components/auth';
import { useAuth } from '@/lib/auth/AuthContext';

export default function ProfileSettingsPage() {
  return (
    <RequireAuth feature="Settings">
      <ProfileSettings />
    </RequireAuth>
  );
}

function ProfileSettings() {
  const { user, updateProfile, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    display_name: user?.profile?.display_name || '',
    timezone: user?.profile?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const result = await updateProfile({
        display_name: formData.display_name || null,
        timezone: formData.timezone,
      });

      if (result.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
        await refreshProfile();
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update profile' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      display_name: user?.profile?.display_name || '',
      timezone: user?.profile?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    setIsEditing(false);
    setMessage(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* Avatar Section */}
        <div className="flex items-center gap-6 mb-8 pb-6 border-b border-slate-700">
          <div className="relative">
            {user?.profile?.avatar_url ? (
              <img
                src={user.profile.avatar_url}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {(user?.profile?.display_name || user?.email || 'U')[0].toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">
              {user?.profile?.display_name || user?.email?.split('@')[0]}
            </h3>
            <p className="text-sm text-slate-400">{user?.email}</p>
            <p className="text-xs text-slate-500 mt-1">
              Member since {user?.profile?.created_at
                ? new Date(user.profile.created_at).toLocaleDateString()
                : 'recently'}
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="display_name" className="block text-sm font-medium text-slate-300 mb-1">
                Display Name
              </label>
              <input
                id="display_name"
                type="text"
                value={formData.display_name}
                onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="Your display name"
              />
              <p className="mt-1 text-xs text-slate-500">
                This is how you&apos;ll appear in the app
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-3 bg-slate-700/50 text-slate-400 rounded-lg border border-slate-600 cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-slate-500">
                Email can be changed in Account settings
              </p>
            </div>

            <div>
              <label htmlFor="timezone" className="block text-sm font-medium text-slate-300 mb-1">
                Timezone
              </label>
              <select
                id="timezone"
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Paris">Paris (CET)</option>
                <option value="Europe/Moscow">Moscow (MSK)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
                <option value="Asia/Shanghai">Shanghai (CST)</option>
                <option value="Australia/Sydney">Sydney (AEST)</option>
              </select>
            </div>

            {/* Subscription Status */}
            <div className="pt-4 border-t border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Subscription
              </label>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user?.profile?.subscription_tier === 'premium'
                    ? 'bg-amber-500/20 text-amber-400'
                    : user?.profile?.subscription_tier === 'lifetime'
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-slate-700 text-slate-300'
                }`}>
                  {user?.profile?.subscription_tier === 'premium' ? 'Premium' :
                   user?.profile?.subscription_tier === 'lifetime' ? 'Lifetime' :
                   'Free'}
                </span>
                {user?.profile?.subscription_tier === 'free' && (
                  <button
                    type="button"
                    className="text-sm text-amber-400 hover:text-amber-300"
                    onClick={() => alert('Upgrade coming soon!')}
                  >
                    Upgrade to Premium
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-700">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 text-white font-medium rounded-lg transition-colors"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
