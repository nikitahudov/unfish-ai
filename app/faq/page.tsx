import React from 'react';
import Link from 'next/link';

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Click the "Sign In" button in the sidebar, then select "Create Account". You can sign up with your email or use Google authentication.',
      },
      {
        q: 'Is 24P Academy free to use?',
        a: 'We offer a free tier with access to basic features. Premium features like advanced AI coaching and detailed hand analysis require a subscription.',
      },
      {
        q: 'How do I track my progress?',
        a: 'Your progress is automatically tracked as you complete quizzes and lessons. Visit your Dashboard to see your overall progress and skill development.',
      },
    ],
  },
  {
    category: 'Learning & Curriculum',
    questions: [
      {
        q: 'What skill level is the curriculum designed for?',
        a: 'Our curriculum covers all skill levels from complete beginners to advanced players. The course adapts to your current level based on assessment results.',
      },
      {
        q: 'How long does it take to complete the curriculum?',
        a: 'The full curriculum is designed to be completed in 12-18 months with regular practice. However, you can learn at your own pace.',
      },
      {
        q: 'Can I skip ahead to advanced topics?',
        a: 'While we recommend following the structured path, you can access any topic directly through the Wiki. However, assessments require completing prerequisites.',
      },
    ],
  },
  {
    category: 'Tools & Features',
    questions: [
      {
        q: 'How accurate are the GTO charts?',
        a: 'Our GTO charts are based on solver outputs and represent balanced baseline strategies. They should be used as a starting point and adjusted for specific opponents.',
      },
      {
        q: 'Can I use the tools on mobile?',
        a: 'Yes! All our tools are mobile-responsive and can be used on any device. They also work offline once loaded.',
      },
      {
        q: 'How does the AI Coach work?',
        a: 'The AI Coach uses advanced language models to provide personalized feedback, answer questions, and help analyze your play. It adapts to your skill level and learning goals.',
      },
    ],
  },
  {
    category: 'Account & Billing',
    questions: [
      {
        q: 'How do I cancel my subscription?',
        a: 'You can manage your subscription from the Settings page. Click on "Billing" and select "Cancel Subscription". Your access will continue until the end of the billing period.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes, we use Stripe for payment processing. We never store your full credit card information on our servers.',
      },
      {
        q: 'Can I get a refund?',
        a: 'We offer a 7-day money-back guarantee for new subscribers. Contact support within 7 days of your first payment for a full refund.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400">
            Find answers to common questions about 24P Academy
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-xl font-semibold text-amber-400 mb-4">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.questions.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group bg-slate-800 rounded-xl border border-slate-700"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-5 list-none">
                      <span className="font-medium text-white pr-4">{faq.q}</span>
                      <span className="flex-shrink-0 ml-2 text-slate-500 group-open:rotate-180 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-5 pb-5 pt-0 text-slate-400">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="mt-12 bg-slate-800 rounded-xl border border-slate-700 p-8 text-center">
          <h2 className="text-xl font-semibold text-white mb-2">
            Still have questions?
          </h2>
          <p className="text-slate-400 mb-6">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          <Link
            href="/support"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
          >
            <span>🎧</span>
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
