'use client';

import React, { useState } from 'react';
import { RequireAuth } from '@/components/auth';
import { useAuth } from '@/lib/auth/AuthContext';
import type { UserPreferences } from '@/types/database';

export default function PreferencesPage() {
  return (
    <RequireAuth feature="Settings">
      <PreferencesSettings />
    </RequireAuth>
  );
}

function PreferencesSettings() {
  const { user, updateProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const currentPreferences: UserPreferences = (user?.profile?.preferences as UserPreferences) || {
    theme: 'dark',
    emailNotifications: true,
    coachPersonality: 'balanced',
  };

  const [preferences, setPreferences] = useState<UserPreferences>(currentPreferences);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const result = await updateProfile({ preferences: preferences as unknown as import('@/types/database').Json });

      if (result.success) {
        setMessage({ type: 'success', text: 'Preferences saved!' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to save preferences' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setIsSaving(false);
    }
  };

  const updatePreference = <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success'
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
            : 'bg-red-500/10 border border-red-500/30 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      {/* Coach Preferences */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">AI Coach Preferences</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Coach Personality
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: 'encouraging' as const, label: 'Encouraging', desc: 'Positive and motivating' },
                { value: 'balanced' as const, label: 'Balanced', desc: 'Mix of support and challenge' },
                { value: 'strict' as const, label: 'Strict', desc: 'Direct and challenging' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updatePreference('coachPersonality', option.value)}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    preferences.coachPersonality === option.value
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <div className="font-medium text-white">{option.label}</div>
                  <div className="text-xs text-slate-400 mt-1">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Quiz Difficulty Preference
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: 'easier' as const, label: 'Easier', desc: 'More foundational questions' },
                { value: 'adaptive' as const, label: 'Adaptive', desc: 'Adjusts to your level' },
                { value: 'harder' as const, label: 'Harder', desc: 'More challenging questions' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updatePreference('quizDifficulty', option.value)}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    preferences.quizDifficulty === option.value
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <div className="font-medium text-white">{option.label}</div>
                  <div className="text-xs text-slate-400 mt-1">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Notifications</h2>

        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-white font-medium">Email Notifications</p>
              <p className="text-sm text-slate-400">Receive study reminders and progress updates</p>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={preferences.emailNotifications}
                onChange={(e) => updatePreference('emailNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 rounded-full peer peer-checked:bg-amber-500 transition-colors"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
            </div>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-white font-medium">Streak Reminders</p>
              <p className="text-sm text-slate-400">Get reminded to maintain your study streak</p>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={preferences.streakReminders ?? true}
                onChange={(e) => updatePreference('streakReminders', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 rounded-full peer peer-checked:bg-amber-500 transition-colors"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
            </div>
          </label>
        </div>
      </div>

      {/* Display Preferences */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Display</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Theme
            </label>
            <div className="flex gap-3">
              {[
                { value: 'dark' as const, label: 'Dark' },
                { value: 'light' as const, label: 'Light', disabled: true },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  disabled={option.disabled}
                  onClick={() => updatePreference('theme', option.value)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    preferences.theme === option.value
                      ? 'border-amber-500 bg-amber-500/10 text-white'
                      : option.disabled
                      ? 'border-slate-700 text-slate-500 cursor-not-allowed'
                      : 'border-slate-600 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {option.label}
                  {option.disabled && ' (coming soon)'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 text-white font-medium rounded-lg transition-colors"
        >
          {isSaving ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
}
