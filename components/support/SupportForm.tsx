'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { FileUpload } from './FileUpload';
import {
  TicketCategory,
  CATEGORY_LABELS,
} from '@/types/support';

interface UploadedFile {
  file: File;
  preview?: string;
  uploading?: boolean;
  error?: string;
}

interface SupportFormProps {
  onSuccess: (ticketNumber: number, ticketId: string) => void;
}

export function SupportForm({ onSuccess }: SupportFormProps) {
  const { user } = useAuth();

  // Form state
  const [name, setName] = useState(user?.profile?.display_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [category, setCategory] = useState<TicketCategory>('general');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<UploadedFile[]>([]);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!subject.trim()) {
      setError('Please enter a subject');
      return;
    }
    if (!message.trim()) {
      setError('Please enter your message');
      return;
    }

    // Check for file errors
    const filesWithErrors = files.filter(f => f.error);
    if (filesWithErrors.length > 0) {
      setError('Please remove invalid files before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('email', email.trim());
      formData.append('category', category);
      formData.append('subject', subject.trim());
      formData.append('message', message.trim());
      formData.append('userAgent', navigator.userAgent);
      formData.append('pageUrl', window.location.href);

      // Append files
      files.forEach((uploadedFile, index) => {
        if (!uploadedFile.error) {
          formData.append(`file-${index}`, uploadedFile.file);
        }
      });

      // Submit to API
      const response = await fetch('/api/support/tickets', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit ticket');
      }

      // Success
      onSuccess(result.ticketNumber, result.ticketId);
    } catch (err) {
      console.error('Error submitting ticket:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
            Your Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
            placeholder="John Doe"
            disabled={isSubmitting}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
            placeholder="john@example.com"
            disabled={isSubmitting}
            required
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">
          Category <span className="text-red-400">*</span>
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as TicketCategory)}
          className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
          disabled={isSubmitting}
          required
        >
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
          Subject <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
          placeholder="Brief description of your issue"
          disabled={isSubmitting}
          required
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors resize-none"
          placeholder="Please describe your issue in detail. Include any relevant information that might help us assist you."
          disabled={isSubmitting}
          required
        />
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Attachments <span className="text-slate-500">(optional)</span>
        </label>
        <FileUpload
          files={files}
          onChange={setFiles}
          maxFiles={3}
          maxSizeMB={5}
          disabled={isSubmitting}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-4">
        <p className="text-xs text-slate-500">
          <span className="text-red-400">*</span> Required fields
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </>
          ) : (
            <>
              Submit Ticket
              <span>&rarr;</span>
            </>
          )}
        </button>
      </div>

      {/* Logged in notice */}
      {user && (
        <p className="text-xs text-slate-500 text-center">
          Submitting as <span className="text-slate-400">{user.email}</span>.
          You&apos;ll be able to track this ticket in your account.
        </p>
      )}
    </form>
  );
}
