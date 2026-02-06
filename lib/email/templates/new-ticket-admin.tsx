import * as React from 'react';

interface NewTicketAdminEmailProps {
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
  adminUrl: string;
}

export function NewTicketAdminEmail({
  ticketNumber,
  name,
  email,
  isAuthenticated,
  category,
  subject,
  message,
  priority,
  attachmentCount,
  userAgent,
  adminUrl,
}: NewTicketAdminEmailProps) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.logo}>24P Academy</h1>
        <p style={styles.subtitle}>New Support Ticket</p>
      </div>

      <div style={styles.content}>
        <div style={styles.alertBox}>
          <p style={styles.alertText}>
            <strong>New ticket #{ticketNumber}</strong> requires your attention
          </p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Customer Information</h3>
          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.tableLabel}>Name:</td>
                <td style={styles.tableValue}>{name}</td>
              </tr>
              <tr>
                <td style={styles.tableLabel}>Email:</td>
                <td style={styles.tableValue}>
                  <a href={`mailto:${email}`} style={styles.link}>{email}</a>
                </td>
              </tr>
              <tr>
                <td style={styles.tableLabel}>Account:</td>
                <td style={styles.tableValue}>
                  {isAuthenticated ? (
                    <span style={styles.badgeGreen}>Registered User</span>
                  ) : (
                    <span style={styles.badgeGray}>Guest</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Ticket Details</h3>
          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.tableLabel}>Category:</td>
                <td style={styles.tableValue}>
                  <span style={getCategoryBadgeStyle(category)}>
                    {formatCategory(category)}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={styles.tableLabel}>Priority:</td>
                <td style={styles.tableValue}>
                  <span style={getPriorityBadgeStyle(priority)}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={styles.tableLabel}>Subject:</td>
                <td style={styles.tableValue}><strong>{subject}</strong></td>
              </tr>
              <tr>
                <td style={styles.tableLabel}>Attachments:</td>
                <td style={styles.tableValue}>
                  {attachmentCount > 0 ? `${attachmentCount} file(s)` : 'None'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Message</h3>
          <div style={styles.messageBox}>
            {message}
          </div>
        </div>

        {userAgent && (
          <div style={styles.metaSection}>
            <p style={styles.metaText}>
              <strong>Browser:</strong> {userAgent}
            </p>
          </div>
        )}

        <div style={styles.buttonContainer}>
          <a href={adminUrl} style={styles.button}>
            View &amp; Respond to Ticket
          </a>
        </div>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>
          This is an automated notification from 24P Academy Support System.
        </p>
      </div>
    </div>
  );
}

function formatCategory(category: string): string {
  const categories: Record<string, string> = {
    general: 'General',
    technical: 'Technical',
    billing: 'Billing',
    feature: 'Feature Request',
    bug: 'Bug Report',
  };
  return categories[category] || category;
}

function getCategoryBadgeStyle(category: string): React.CSSProperties {
  const colors: Record<string, { bg: string; text: string }> = {
    general: { bg: '#e0f2fe', text: '#0369a1' },
    technical: { bg: '#fef3c7', text: '#b45309' },
    billing: { bg: '#dcfce7', text: '#15803d' },
    feature: { bg: '#f3e8ff', text: '#7c3aed' },
    bug: { bg: '#fee2e2', text: '#dc2626' },
  };
  const color = colors[category] || colors.general;
  return {
    ...styles.badge,
    backgroundColor: color.bg,
    color: color.text,
  };
}

function getPriorityBadgeStyle(priority: string): React.CSSProperties {
  const colors: Record<string, { bg: string; text: string }> = {
    low: { bg: '#f1f5f9', text: '#64748b' },
    normal: { bg: '#e0f2fe', text: '#0369a1' },
    high: { bg: '#fef3c7', text: '#b45309' },
    urgent: { bg: '#fee2e2', text: '#dc2626' },
  };
  const color = colors[priority] || colors.normal;
  return {
    ...styles.badge,
    backgroundColor: color.bg,
    color: color.text,
  };
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
    padding: '24px 32px',
  },
  alertBox: {
    backgroundColor: '#fef3c7',
    border: '1px solid #fbbf24',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '24px',
  },
  alertText: {
    margin: 0,
    color: '#92400e',
    fontSize: '14px',
  },
  section: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#64748b',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '1px solid #e2e8f0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  tableLabel: {
    fontSize: '13px',
    color: '#64748b',
    padding: '6px 16px 6px 0',
    verticalAlign: 'top',
    width: '100px',
  },
  tableValue: {
    fontSize: '14px',
    color: '#1e293b',
    padding: '6px 0',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
  },
  badge: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 500,
  },
  badgeGreen: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 500,
    backgroundColor: '#dcfce7',
    color: '#15803d',
  },
  badgeGray: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 500,
    backgroundColor: '#f1f5f9',
    color: '#64748b',
  },
  messageBox: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '16px',
    fontSize: '14px',
    color: '#334155',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap' as const,
  },
  metaSection: {
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    padding: '12px',
    marginBottom: '24px',
  },
  metaText: {
    margin: 0,
    fontSize: '12px',
    color: '#64748b',
  },
  buttonContainer: {
    textAlign: 'center' as const,
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#f59e0b',
    color: '#ffffff',
    padding: '12px 32px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '14px',
  },
  footer: {
    padding: '20px 32px',
    textAlign: 'center' as const,
  },
  footerText: {
    fontSize: '12px',
    color: '#94a3b8',
    margin: 0,
  },
};

// Plain text version
export function getNewTicketAdminText({
  ticketNumber,
  name,
  email,
  isAuthenticated,
  category,
  subject,
  message,
  priority,
  attachmentCount,
  adminUrl,
}: NewTicketAdminEmailProps): string {
  return `
NEW SUPPORT TICKET #${ticketNumber}
================================

CUSTOMER INFORMATION
- Name: ${name}
- Email: ${email}
- Account: ${isAuthenticated ? 'Registered User' : 'Guest'}

TICKET DETAILS
- Category: ${formatCategory(category)}
- Priority: ${priority}
- Subject: ${subject}
- Attachments: ${attachmentCount > 0 ? `${attachmentCount} file(s)` : 'None'}

MESSAGE
-------
${message}

View and respond: ${adminUrl}
  `.trim();
}
