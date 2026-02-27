import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendTicketReply } from '@/lib/email/send';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const adminDb = createAdminClient();

    // Get current user (session client for auth only)
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user ?? null;

    const body = await request.json();
    const { ticketId, message } = body;

    if (!ticketId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Fetch ticket using admin client (bypasses RLS)
    const { data: ticket, error: ticketError } = await adminDb
      .from('support_tickets')
      .select('*')
      .eq('id', ticketId)
      .single();

    if (ticketError || !ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    // Verify user has access to this ticket
    const userEmail = user?.email;
    const hasAccess =
      ticket.user_id === user?.id ||
      ticket.email === userEmail;

    if (!hasAccess && !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Determine sender info
    const senderName = user?.user_metadata?.display_name || ticket.name;
    const senderEmail = userEmail || ticket.email;

    // Create reply using admin client (bypasses RLS)
    const { data: reply, error: replyError } = await adminDb
      .from('ticket_replies')
      .insert({
        ticket_id: ticketId,
        sender_type: 'user',
        sender_id: user?.id || null,
        sender_name: senderName,
        sender_email: senderEmail,
        message: message.trim(),
        attachments: [],
      })
      .select()
      .single();

    if (replyError) {
      console.error('Error creating reply:', replyError);
      return NextResponse.json(
        { error: 'Failed to create reply' },
        { status: 500 }
      );
    }

    // Update ticket status if it was resolved/closed
    if (ticket.status === 'resolved' || ticket.status === 'closed') {
      await adminDb
        .from('support_tickets')
        .update({ status: 'open' })
        .eq('id', ticketId);
    }

    // Send email notification to admin
    await sendTicketReply({
      to: process.env.ADMIN_EMAIL || 'nikitahudov@gmail.com',
      recipientName: 'Admin',
      ticketId: ticket.id,
      ticketNumber: ticket.ticket_number,
      subject: ticket.subject,
      replyMessage: message.trim(),
      senderName,
      senderType: 'user',
    });

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error('Error in reply submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
