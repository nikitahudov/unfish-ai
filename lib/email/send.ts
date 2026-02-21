import { render } from '@react-email/render';
import { resend, EMAIL_FROM, REPLY_TO, ADMIN_EMAIL, APP_URL } from './resend';
import {
  TicketConfirmationEmail,
  getTicketConfirmationText,
  NewTicketAdminEmail,
  getNewTicketAdminText,
  TicketReplyEmail,
  getTicketReplyText,
} from './templates';

interface SendTicketConfirmationParams {
  to: string;
  name: string;
  ticketId: string;
  ticketNumber: number;
  subject: string;
  category: string;
  message: string;
}

interface SendNewTicketAdminParams {
  ticketId: string;
  ticketNumber: number;
  name: string;
  email: string;
  isAuthenticated: boolean;
  category: string;
  subject: string;
  message: string;
  priority: string;
  attachmentCount: number;
  userAgent?: string;
}

interface SendTicketReplyParams {
  to: string;
  recipientName: string;
  ticketId: string;
  ticketNumber: number;
  subject: string;
  replyMessage: string;
  senderName: string;
  senderType: 'user' | 'admin';
}

// Send confirmation email to user when ticket is created
export async function sendTicketConfirmation(params: SendTicketConfirmationParams) {
  const ticketUrl = `${APP_URL}/support/tickets/${params.ticketId}`;

  try {
    const html = await render(TicketConfirmationEmail({
      name: params.name,
      ticketNumber: params.ticketNumber,
      subject: params.subject,
      category: params.category,
      message: params.message,
      ticketUrl,
    }));

    if (!resend) {
      console.warn('Resend not configured, skipping ticket confirmation email');
      return { success: false, error: 'Email service not configured' };
    }

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      replyTo: REPLY_TO,
      to: params.to,
      subject: `[Ticket #${params.ticketNumber}] ${params.subject}`,
      html,
      text: getTicketConfirmationText({
        name: params.name,
        ticketNumber: params.ticketNumber,
        subject: params.subject,
        category: params.category,
        message: params.message,
        ticketUrl,
      }),
    });

    if (error) {
      console.error('Failed to send ticket confirmation email:', error);
      return { success: false, error };
    }

    console.log('Ticket confirmation email sent:', data?.id);
    return { success: true, id: data?.id };
  } catch (err) {
    console.error('Error sending ticket confirmation email:', err);
    return { success: false, error: err };
  }
}

// Send notification to admin when new ticket is created
export async function sendNewTicketAdmin(params: SendNewTicketAdminParams) {
  const adminUrl = `${APP_URL}/admin/support/${params.ticketId}`;

  try {
    const html = await render(NewTicketAdminEmail({
      ...params,
      adminUrl,
    }));

    if (!resend) {
      console.warn('Resend not configured, skipping admin notification email');
      return { success: false, error: 'Email service not configured' };
    }

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      replyTo: REPLY_TO,
      to: ADMIN_EMAIL,
      subject: `[New Ticket #${params.ticketNumber}] ${params.subject}`,
      html,
      text: getNewTicketAdminText({
        ...params,
        adminUrl,
      }),
    });

    if (error) {
      console.error('Failed to send new ticket admin email:', error);
      return { success: false, error };
    }

    console.log('New ticket admin email sent:', data?.id);
    return { success: true, id: data?.id };
  } catch (err) {
    console.error('Error sending new ticket admin email:', err);
    return { success: false, error: err };
  }
}

// Send reply notification
export async function sendTicketReply(params: SendTicketReplyParams) {
  const ticketUrl = params.senderType === 'admin'
    ? `${APP_URL}/support/tickets/${params.ticketId}`
    : `${APP_URL}/admin/support/${params.ticketId}`;

  try {
    const html = await render(TicketReplyEmail({
      recipientName: params.recipientName,
      ticketNumber: params.ticketNumber,
      subject: params.subject,
      replyMessage: params.replyMessage,
      senderName: params.senderName,
      senderType: params.senderType,
      ticketUrl,
    }));

    if (!resend) {
      console.warn('Resend not configured, skipping reply notification email');
      return { success: false, error: 'Email service not configured' };
    }

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      replyTo: REPLY_TO,
      to: params.to,
      subject: `Re: [Ticket #${params.ticketNumber}] ${params.subject}`,
      html,
      text: getTicketReplyText({
        recipientName: params.recipientName,
        ticketNumber: params.ticketNumber,
        subject: params.subject,
        replyMessage: params.replyMessage,
        senderName: params.senderName,
        senderType: params.senderType,
        ticketUrl,
      }),
    });

    if (error) {
      console.error('Failed to send ticket reply email:', error);
      return { success: false, error };
    }

    console.log('Ticket reply email sent:', data?.id);
    return { success: true, id: data?.id };
  } catch (err) {
    console.error('Error sending ticket reply email:', err);
    return { success: false, error: err };
  }
}
