import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({
        authenticated: false,
        error: authError?.message || 'No user',
      });
    }

    // Check profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    // Check stats
    const { data: stats, error: statsError } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Check progress count
    const { count: progressCount } = await supabase
      .from('skill_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Check quiz count
    const { count: quizCount } = await supabase
      .from('quiz_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Check activity count
    const { count: activityCount } = await supabase
      .from('activity_log')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    return NextResponse.json({
      authenticated: true,
      userId: user.id,
      email: user.email,
      profile: profile || null,
      profileError: profileError?.message || null,
      stats: stats || null,
      statsError: statsError?.message || null,
      progressCount: progressCount || 0,
      quizCount: quizCount || 0,
      activityCount: activityCount || 0,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
