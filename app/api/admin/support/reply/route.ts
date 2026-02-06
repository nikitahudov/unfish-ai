import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendTicketReply } from '@/lib/email/send';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const adminDb = createAdminClient();

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await adminDb
      .from('user_profiles')
      .select('is_admin, display_name')
      .eq('id', user.id)
      .single();

    if (!profile?.is_admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { ticketId, message } = body;

    if (!ticketId || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Fetch ticket
    const { data: ticket, error: ticketError } = await adminDb
      .from('support_tickets')
      .select('*')
      .eq('id', ticketId)
      .single();

    if (ticketError || !ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    // Create reply
    const senderName = profile.display_name || 'Support Team';
    const { data: reply, error: replyError } = await adminDb
      .from('ticket_replies')
      .insert({
        ticket_id: ticketId,
        sender_type: 'admin',
        sender_id: user.id,
        sender_name: senderName,
        sender_email: user.email,
        message: message.trim(),
        attachments: [],
      })
      .select()
      .single();

    if (replyError) {
      console.error('Error creating reply:', replyError);
      return NextResponse.json({ error: 'Failed to create reply' }, { status: 500 });
    }

    // Update ticket status to in_progress if it was open
    if (ticket.status === 'open') {
      await adminDb
        .from('support_tickets')
        .update({ status: 'in_progress' })
        .eq('id', ticketId);
    }

    // Send email to customer
    await sendTicketReply({
      to: ticket.email,
      recipientName: ticket.name,
      ticketId: ticket.id,
      ticketNumber: ticket.ticket_number,
      subject: ticket.subject,
      replyMessage: message.trim(),
      senderName,
      senderType: 'admin',
    });

    return NextResponse.json({ success: true, reply });
  } catch (error) {
    console.error('Error in admin reply:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
