'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SupportForm } from '@/components/support/SupportForm';

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [ticketInfo, setTicketInfo] = useState<{ number: number; id: string } | null>(null);

  const handleSuccess = (ticketNumber: number, ticketId: string) => {
    setTicketInfo({ number: ticketNumber, id: ticketId });
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted && ticketInfo) {
    return (
      <div className="min-h-screen bg-slate-900 py-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Success Message */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">
              Ticket Submitted Successfully!
            </h1>

            <p className="text-slate-400 mb-6">
              Thank you for contacting us. We&apos;ve received your support request and will get back to you shortly.
            </p>

            <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-slate-400 mb-1">Your ticket number</p>
              <p className="text-3xl font-bold text-amber-400">#{ticketInfo.number}</p>
            </div>

            <p className="text-sm text-slate-500 mb-6">
              A confirmation email has been sent to your email address. Please keep your ticket number for reference.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/support/tickets/${ticketInfo.id}`}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
              >
                View Ticket Status
              </Link>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setTicketInfo(null);
                }}
                className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
              >
                Submit Another Ticket
              </button>
            </div>
          </div>

          {/* Help Links */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              While you wait, you might find these resources helpful:
            </p>
            <div className="flex justify-center gap-4 mt-3">
              <Link href="/wiki" className="text-sm text-amber-400 hover:text-amber-300">
                Knowledge Base &rarr;
              </Link>
              <Link href="/tools" className="text-sm text-amber-400 hover:text-amber-300">
                Poker Tools &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-3">
            Contact Support
          </h1>
          <p className="text-slate-400">
            Need help? Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Expected Response Time */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-xl">&#9200;</span>
            <div>
              <p className="text-sm text-blue-400 font-medium">Expected Response Time</p>
              <p className="text-sm text-slate-400">
                We typically respond within 24-48 hours. For urgent issues, please indicate so in your message.
              </p>
            </div>
          </div>
        </div>

        {/* Support Form */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 md:p-8">
          <SupportForm onSuccess={handleSuccess} />
        </div>

        {/* Alternative Contact */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>
            You can also reach us directly at{' '}
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@unfish.ai'}`}
              className="text-amber-400 hover:text-amber-300"
            >
              {process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@unfish.ai'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
