import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { skillId, seconds } = await request.json();

    if (!skillId || !seconds || seconds < 1) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user ?? null;

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get existing progress
    const { data: existing } = await supabase
      .from('skill_progress')
      .select('id, time_spent_seconds')
      .eq('user_id', user.id)
      .eq('skill_id', skillId)
      .single();

    if (existing) {
      await supabase
        .from('skill_progress')
        .update({
          time_spent_seconds: existing.time_spent_seconds + seconds,
          last_viewed_at: new Date().toISOString(),
        })
        .eq('id', existing.id);
    }

    // Also update total study time in stats
    const { data: stats } = await supabase
      .from('user_stats')
      .select('total_study_time_seconds')
      .eq('user_id', user.id)
      .single();

    if (stats) {
      await supabase
        .from('user_stats')
        .update({
          total_study_time_seconds: stats.total_study_time_seconds + seconds,
        })
        .eq('user_id', user.id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking time:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
