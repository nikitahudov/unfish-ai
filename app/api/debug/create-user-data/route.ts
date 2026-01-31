import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const results: Record<string, string> = {};

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (!existingProfile) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          email: user.email || '',
        });

      if (profileError) {
        results.profile = `Error: ${profileError.message}`;
      } else {
        results.profile = 'Created';
      }
    } else {
      results.profile = 'Already exists';
    }

    // Check if stats exists
    const { data: existingStats } = await supabase
      .from('user_stats')
      .select('user_id')
      .eq('user_id', user.id)
      .single();

    if (!existingStats) {
      const { error: statsError } = await supabase
        .from('user_stats')
        .insert({
          user_id: user.id,
        });

      if (statsError) {
        results.stats = `Error: ${statsError.message}`;
      } else {
        results.stats = 'Created';
      }
    } else {
      results.stats = 'Already exists';
    }

    return NextResponse.json({
      success: true,
      userId: user.id,
      results,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
