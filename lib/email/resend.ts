import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  console.warn('Warning: RESEND_API_KEY is not set. Emails will not be sent.');
}

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Email sender config
// Using Resend's test domain initially - change to your domain later
export const EMAIL_FROM = 'Support <onboarding@resend.dev>';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'nikitahudov@gmail.com';
export const APP_NAME = 'UnFish.ai';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
