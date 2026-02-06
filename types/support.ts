export type TicketCategory = 'general' | 'technical' | 'billing' | 'feature' | 'bug';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface Attachment {
  name: string;
  url: string;
  size: number;
  type: string;
}

export interface SupportTicket {
  id: string;
  ticket_number: number;
  user_id: string | null;
  name: string;
  email: string;
  is_authenticated: boolean;
  category: TicketCategory;
  subject: string;
  message: string;
  attachments: Attachment[];
  status: TicketStatus;
  priority: TicketPriority;
  user_agent: string | null;
  page_url: string | null;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
}

export interface TicketReply {
  id: string;
  ticket_id: string;
  sender_type: 'user' | 'admin';
  sender_id: string | null;
  sender_name: string;
  sender_email: string;
  message: string;
  attachments: Attachment[];
  created_at: string;
}

export interface CreateTicketInput {
  name: string;
  email: string;
  category: TicketCategory;
  subject: string;
  message: string;
  attachments?: Attachment[];
}

export interface CreateReplyInput {
  ticket_id: string;
  message: string;
  attachments?: Attachment[];
}

export const CATEGORY_LABELS: Record<TicketCategory, string> = {
  general: 'General Inquiry',
  technical: 'Technical Support',
  billing: 'Billing Question',
  feature: 'Feature Request',
  bug: 'Bug Report',
};

export const STATUS_LABELS: Record<TicketStatus, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  closed: 'Closed',
};

export const PRIORITY_LABELS: Record<TicketPriority, string> = {
  low: 'Low',
  normal: 'Normal',
  high: 'High',
  urgent: 'Urgent',
};
