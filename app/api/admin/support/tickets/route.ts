import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
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
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (!profile?.is_admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Parse query params
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const category = searchParams.get('category');
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') || 'desc';

    // Build query
    let query = adminDb
      .from('support_tickets')
      .select('*');

    if (status) query = query.eq('status', status);
    if (priority) query = query.eq('priority', priority);
    if (category) query = query.eq('category', category);

    // Apply sorting
    const ascending = order === 'asc';
    switch (sort) {
      case 'priority':
        query = query.order('created_at', { ascending: !ascending });
        break;
      case 'status':
        query = query.order('status', { ascending }).order('created_at', { ascending: false });
        break;
      case 'updated_at':
        query = query.order('updated_at', { ascending });
        break;
      default:
        query = query.order('created_at', { ascending });
    }

    const { data: tickets, error } = await query;

    if (error) {
      console.error('Error fetching tickets:', error);
      return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
    }

    return NextResponse.json({ tickets });
  } catch (error) {
    console.error('Error in admin tickets fetch:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
