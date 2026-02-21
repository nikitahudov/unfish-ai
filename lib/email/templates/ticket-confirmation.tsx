import * as React from 'react';

interface TicketConfirmationEmailProps {
  name: string;
  ticketNumber: number;
  subject: string;
  category: string;
  message: string;
  ticketUrl?: string;
}

export function TicketConfirmationEmail({
  name,
  ticketNumber,
  subject,
  category,
  message,
  ticketUrl,
}: TicketConfirmationEmailProps) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.logo}>UnFish.ai</h1>
        <p style={styles.subtitle}>Support Ticket Confirmation</p>
      </div>

      <div style={styles.content}>
        <p style={styles.greeting}>Hi {name},</p>

        <p style={styles.text}>
          Thank you for contacting us. We&apos;ve received your support request and will get back to you as soon as possible.
        </p>

        <div style={styles.ticketBox}>
          <div style={styles.ticketHeader}>
            <span style={styles.ticketLabel}>Ticket #</span>
            <span style={styles.ticketNumberValue}>{ticketNumber}</span>
          </div>

          <div style={styles.ticketDetail}>
            <strong>Category:</strong> {formatCategory(category)}
          </div>
          <div style={styles.ticketDetail}>
            <strong>Subject:</strong> {subject}
          </div>
          <div style={styles.ticketDetail}>
            <strong>Message:</strong>
            <p style={styles.messagePreview}>{truncateMessage(message)}</p>
          </div>
        </div>

        {ticketUrl && (
          <div style={styles.buttonContainer}>
            <a href={ticketUrl} style={styles.button}>
              View Ticket Status
            </a>
          </div>
        )}

        <p style={styles.text}>
          We typically respond within 24-48 hours. If your issue is urgent, please reply to this email with additional details.
        </p>

        <p style={styles.signature}>
          Best regards,<br />
          The UnFish.ai Team
        </p>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>
          This email was sent because you submitted a support request at UnFish.ai.
        </p>
      </div>
    </div>
  );
}

function formatCategory(category: string): string {
  const categories: Record<string, string> = {
    general: 'General Inquiry',
    technical: 'Technical Support',
    billing: 'Billing Question',
    feature: 'Feature Request',
    bug: 'Bug Report',
  };
  return categories[category] || category;
}

function truncateMessage(message: string): string {
  return message.length > 200 ? message.substring(0, 200) + '...' : message;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#1e293b',
    padding: '32px',
    textAlign: 'center' as const,
  },
  logo: {
    color: '#f59e0b',
    fontSize: '24px',
    margin: '0 0 8px 0',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '14px',
    margin: 0,
  },
  content: {
    backgroundColor: '#ffffff',
    padding: '32px',
  },
  greeting: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: '16px',
  },
  text: {
    fontSize: '14px',
    color: '#475569',
    lineHeight: '1.6',
    marginBottom: '16px',
  },
  ticketBox: {
    backgroundColor: '#f1f5f9',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '24px',
    border: '1px solid #e2e8f0',
  },
  ticketHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid #e2e8f0',
  },
  ticketLabel: {
    fontSize: '12px',
    color: '#64748b',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  ticketNumberValue: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#f59e0b',
  },
  ticketDetail: {
    fontSize: '14px',
    color: '#475569',
    marginBottom: '8px',
  },
  messagePreview: {
    backgroundColor: '#ffffff',
    padding: '12px',
    borderRadius: '4px',
    fontSize: '13px',
    color: '#64748b',
    marginTop: '8px',
    borderLeft: '3px solid #f59e0b',
  },
  buttonContainer: {
    textAlign: 'center' as const,
    marginBottom: '24px',
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#f59e0b',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '14px',
  },
  signature: {
    fontSize: '14px',
    color: '#475569',
    marginTop: '24px',
  },
  footer: {
    padding: '24px 32px',
    textAlign: 'center' as const,
  },
  footerText: {
    fontSize: '12px',
    color: '#94a3b8',
    margin: 0,
  },
};

// Plain text version
export function getTicketConfirmationText({
  name,
  ticketNumber,
  subject,
  category,
  message,
}: TicketConfirmationEmailProps): string {
  return `
Hi ${name},

Thank you for contacting us. We've received your support request and will get back to you as soon as possible.

TICKET DETAILS
--------------
Ticket #: ${ticketNumber}
Category: ${formatCategory(category)}
Subject: ${subject}

Message:
${message}

We typically respond within 24-48 hours. If your issue is urgent, please reply to this email with additional details.

Best regards,
The UnFish.ai Team
  `.trim();
}
