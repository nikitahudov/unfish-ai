import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const adminDb = createAdminClient();

    // Get current user
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user ?? null;

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch user's tickets (by user_id or email) using admin client to bypass RLS
    const { data: tickets, error } = await adminDb
      .from('support_tickets')
      .select('*')
      .or(`user_id.eq.${user.id},email.eq.${user.email}`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tickets:', error);
      return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
    }

    return NextResponse.json({ tickets: tickets || [] });
  } catch (error) {
    console.error('Error in my-tickets fetch:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
