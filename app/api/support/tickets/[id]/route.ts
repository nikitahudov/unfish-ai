import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminDb = createAdminClient();
    const { id: ticketId } = await params;

    // Fetch ticket using admin client (bypasses RLS)
    const { data: ticket, error: ticketError } = await adminDb
      .from('support_tickets')
      .select('*')
      .eq('id', ticketId)
      .single();

    if (ticketError) {
      console.error('Error fetching ticket:', ticketError);
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    // Fetch replies using admin client (bypasses RLS)
    const { data: replies, error: repliesError } = await adminDb
      .from('ticket_replies')
      .select('*')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true });

    if (repliesError) {
      console.error('Error fetching replies:', repliesError);
    }

    return NextResponse.json({
      ticket,
      replies: replies || [],
    });
  } catch (error) {
    console.error('Error in ticket fetch:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
