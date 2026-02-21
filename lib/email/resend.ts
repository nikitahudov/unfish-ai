import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  console.warn('Warning: RESEND_API_KEY is not set. Emails will not be sent.');
}

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Email sender config
export const EMAIL_FROM = 'UnFish.ai <noreply@unfish.ai>';
export const REPLY_TO = 'support@unfish.ai';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'nikitahudov@gmail.com';
export const APP_NAME = 'UnFish.ai';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://unfish.ai';
