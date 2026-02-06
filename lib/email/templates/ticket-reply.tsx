import * as React from 'react';

interface TicketReplyEmailProps {
  recipientName: string;
  ticketNumber: number;
  subject: string;
  replyMessage: string;
  senderName: string;
  senderType: 'user' | 'admin';
  ticketUrl?: string;
}

export function TicketReplyEmail({
  recipientName,
  ticketNumber,
  subject,
  replyMessage,
  senderName,
  senderType,
  ticketUrl,
}: TicketReplyEmailProps) {
  const isFromAdmin = senderType === 'admin';

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.logo}>24P Academy</h1>
        <p style={styles.subtitle}>
          {isFromAdmin ? 'Support Response' : 'New Reply on Ticket'}
        </p>
      </div>

      <div style={styles.content}>
        <p style={styles.greeting}>Hi {recipientName},</p>

        <p style={styles.text}>
          {isFromAdmin
            ? `We've responded to your support ticket #${ticketNumber}.`
            : `There's a new reply on ticket #${ticketNumber}.`
          }
        </p>

        <div style={styles.ticketInfo}>
          <strong>Subject:</strong> {subject}
        </div>

        <div style={styles.replyBox}>
          <div style={styles.replyHeader}>
            <span style={styles.replyAuthor}>{senderName}</span>
            <span style={styles.replyBadge}>
              {isFromAdmin ? 'Support Team' : 'Customer'}
            </span>
          </div>
          <div style={styles.replyMessage}>
            {replyMessage}
          </div>
        </div>

        {ticketUrl && (
          <div style={styles.buttonContainer}>
            <a href={ticketUrl} style={styles.button}>
              {isFromAdmin ? 'View Full Conversation' : 'Respond to Ticket'}
            </a>
          </div>
        )}

        <p style={styles.text}>
          {isFromAdmin
            ? 'If you have any follow-up questions, simply reply to this email or visit the ticket page.'
            : 'Please respond to this ticket as soon as possible.'
          }
        </p>

        <p style={styles.signature}>
          Best regards,<br />
          The 24P Academy Team
        </p>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>
          Ticket #{ticketNumber} &bull; {subject}
        </p>
      </div>
    </div>
  );
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
    padding: '24px 32px',
    textAlign: 'center' as const,
  },
  logo: {
    color: '#f59e0b',
    fontSize: '20px',
    margin: '0 0 4px 0',
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
  ticketInfo: {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '16px',
  },
  replyBox: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '24px',
  },
  replyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#f1f5f9',
    borderBottom: '1px solid #e2e8f0',
  },
  replyAuthor: {
    fontWeight: 600,
    color: '#1e293b',
    fontSize: '14px',
  },
  replyBadge: {
    fontSize: '11px',
    fontWeight: 500,
    color: '#64748b',
    backgroundColor: '#e2e8f0',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  replyMessage: {
    padding: '16px',
    fontSize: '14px',
    color: '#334155',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap' as const,
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
    padding: '20px 32px',
    textAlign: 'center' as const,
    borderTop: '1px solid #e2e8f0',
  },
  footerText: {
    fontSize: '12px',
    color: '#94a3b8',
    margin: 0,
  },
};

// Plain text version
export function getTicketReplyText({
  recipientName,
  ticketNumber,
  subject,
  replyMessage,
  senderName,
  senderType,
  ticketUrl,
}: TicketReplyEmailProps): string {
  const isFromAdmin = senderType === 'admin';

  return `
Hi ${recipientName},

${isFromAdmin
  ? `We've responded to your support ticket #${ticketNumber}.`
  : `There's a new reply on ticket #${ticketNumber}.`
}

Subject: ${subject}

${senderName} wrote:
------------------------
${replyMessage}
------------------------

${ticketUrl ? `View the full conversation: ${ticketUrl}` : ''}

Best regards,
The 24P Academy Team
  `.trim();
}
