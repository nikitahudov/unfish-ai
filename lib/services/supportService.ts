import { createClient } from '@/lib/supabase/client';
import type { Json } from '@/types/database';
import {
  SupportTicket,
  TicketReply,
  CreateTicketInput,
  CreateReplyInput,
  Attachment,
  TicketCategory,
  TicketStatus,
  TicketPriority
} from '@/types/support';

const supabase = createClient();

// ============================================
// TICKETS
// ============================================

export async function createTicket(
  input: CreateTicketInput,
  options: {
    userId?: string;
    isAuthenticated: boolean;
    userAgent?: string;
    pageUrl?: string;
  }
): Promise<{ ticket: SupportTicket | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('support_tickets')
      .insert({
        user_id: options.userId || null,
        name: input.name,
        email: input.email,
        is_authenticated: options.isAuthenticated,
        category: input.category,
        subject: input.subject,
        message: input.message,
        attachments: (input.attachments || []) as unknown as Json,
        user_agent: options.userAgent || null,
        page_url: options.pageUrl || null,
        status: 'open' as const,
        priority: 'normal' as const,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating ticket:', error);
      return { ticket: null, error: error.message };
    }

    return { ticket: data as unknown as SupportTicket, error: null };
  } catch (err) {
    console.error('Error creating ticket:', err);
    return { ticket: null, error: 'Failed to create ticket' };
  }
}

export async function getTicketById(
  ticketId: string
): Promise<{ ticket: SupportTicket | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('id', ticketId)
      .single();

    if (error) {
      console.error('Error fetching ticket:', error);
      return { ticket: null, error: error.message };
    }

    return { ticket: data as unknown as SupportTicket, error: null };
  } catch (err) {
    console.error('Error fetching ticket:', err);
    return { ticket: null, error: 'Failed to fetch ticket' };
  }
}

export async function getTicketByNumber(
  ticketNumber: number
): Promise<{ ticket: SupportTicket | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('ticket_number', ticketNumber)
      .single();

    if (error) {
      console.error('Error fetching ticket:', error);
      return { ticket: null, error: error.message };
    }

    return { ticket: data as unknown as SupportTicket, error: null };
  } catch (err) {
    console.error('Error fetching ticket:', err);
    return { ticket: null, error: 'Failed to fetch ticket' };
  }
}

export async function getUserTickets(
  userId?: string,
  email?: string
): Promise<{ tickets: SupportTicket[]; error: string | null }> {
  try {
    let query = supabase
      .from('support_tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    } else if (email) {
      query = query.eq('email', email);
    } else {
      return { tickets: [], error: 'No user ID or email provided' };
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching user tickets:', error);
      return { tickets: [], error: error.message };
    }

    return { tickets: data as unknown as SupportTicket[], error: null };
  } catch (err) {
    console.error('Error fetching user tickets:', err);
    return { tickets: [], error: 'Failed to fetch tickets' };
  }
}

export async function getAllTickets(
  filters?: {
    status?: TicketStatus;
    priority?: TicketPriority;
    category?: TicketCategory;
  }
): Promise<{ tickets: SupportTicket[]; error: string | null }> {
  try {
    let query = supabase
      .from('support_tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.priority) {
      query = query.eq('priority', filters.priority);
    }
    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching tickets:', error);
      return { tickets: [], error: error.message };
    }

    return { tickets: data as unknown as SupportTicket[], error: null };
  } catch (err) {
    console.error('Error fetching tickets:', err);
    return { tickets: [], error: 'Failed to fetch tickets' };
  }
}

export async function updateTicketStatus(
  ticketId: string,
  status: TicketStatus
): Promise<{ success: boolean; error: string | null }> {
  try {
    const updates: { status: TicketStatus; resolved_at?: string } = { status };

    if (status === 'resolved') {
      updates.resolved_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('support_tickets')
      .update(updates)
      .eq('id', ticketId);

    if (error) {
      console.error('Error updating ticket status:', error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error('Error updating ticket status:', err);
    return { success: false, error: 'Failed to update ticket' };
  }
}

export async function updateTicketPriority(
  ticketId: string,
  priority: TicketPriority
): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase
      .from('support_tickets')
      .update({ priority })
      .eq('id', ticketId);

    if (error) {
      console.error('Error updating ticket priority:', error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error('Error updating ticket priority:', err);
    return { success: false, error: 'Failed to update ticket' };
  }
}

// ============================================
// REPLIES
// ============================================

export async function getTicketReplies(
  ticketId: string
): Promise<{ replies: TicketReply[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('ticket_replies')
      .select('*')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching replies:', error);
      return { replies: [], error: error.message };
    }

    return { replies: data as unknown as TicketReply[], error: null };
  } catch (err) {
    console.error('Error fetching replies:', err);
    return { replies: [], error: 'Failed to fetch replies' };
  }
}

export async function createReply(
  input: CreateReplyInput,
  sender: {
    type: 'user' | 'admin';
    id?: string;
    name: string;
    email: string;
  }
): Promise<{ reply: TicketReply | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('ticket_replies')
      .insert({
        ticket_id: input.ticket_id,
        sender_type: sender.type,
        sender_id: sender.id || null,
        sender_name: sender.name,
        sender_email: sender.email,
        message: input.message,
        attachments: (input.attachments || []) as unknown as Json,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating reply:', error);
      return { reply: null, error: error.message };
    }

    // Update ticket status to in_progress if it was open
    await supabase
      .from('support_tickets')
      .update({ status: 'in_progress' })
      .eq('id', input.ticket_id)
      .eq('status', 'open');

    return { reply: data as unknown as TicketReply, error: null };
  } catch (err) {
    console.error('Error creating reply:', err);
    return { reply: null, error: 'Failed to create reply' };
  }
}

// ============================================
// ATTACHMENTS
// ============================================

export async function uploadAttachment(
  file: File,
  ticketId: string
): Promise<{ attachment: Attachment | null; error: string | null }> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${ticketId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('support-attachments')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading attachment:', error);
      return { attachment: null, error: error.message };
    }

    // Get signed URL (valid for 7 days)
    const { data: urlData } = await supabase.storage
      .from('support-attachments')
      .createSignedUrl(data.path, 60 * 60 * 24 * 7);

    const attachment: Attachment = {
      name: file.name,
      url: urlData?.signedUrl || '',
      size: file.size,
      type: file.type,
    };

    return { attachment, error: null };
  } catch (err) {
    console.error('Error uploading attachment:', err);
    return { attachment: null, error: 'Failed to upload attachment' };
  }
}

// ============================================
// ADMIN CHECK
// ============================================

export async function isUserAdmin(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('is_admin')
      .eq('id', userId)
      .single();

    if (error || !data) {
      return false;
    }

    return data.is_admin === true;
  } catch {
    return false;
  }
}
