import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id: ticketId } = await params;

    // Fetch ticket
    const { data: ticket, error: ticketError } = await supabase
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

    // Fetch replies
    const { data: replies, error: repliesError } = await supabase
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
