import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST() {
  const results: Record<string, unknown> = {};

  try {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({
        error: 'Not authenticated',
        authError: authError?.message,
      }, { status: 401 });
    }

    results.userId = user.id;

    // Test 1: Insert into skill_progress
    const { data: progressData, error: progressError } = await supabase
      .from('skill_progress')
      .insert({
        user_id: user.id,
        skill_id: 'debug-test',
        content_viewed: true,
        first_viewed_at: new Date().toISOString(),
        last_viewed_at: new Date().toISOString(),
      })
      .select()
      .single();

    results.skillProgress = progressError
      ? { error: progressError.message, code: progressError.code, details: progressError.details, hint: progressError.hint }
      : { success: true, id: progressData?.id };

    // Test 2: Insert into quiz_attempts
    const { data: quizData, error: quizError } = await supabase
      .from('quiz_attempts')
      .insert({
        user_id: user.id,
        skill_id: 'debug-test',
        score: 8,
        max_score: 10,
        percentage: 80,
        passed: true,
        answers: [],
      })
      .select()
      .single();

    results.quizAttempts = quizError
      ? { error: quizError.message, code: quizError.code, details: quizError.details, hint: quizError.hint }
      : { success: true, id: quizData?.id };

    // Test 3: Insert into activity_log
    const { data: activityData, error: activityError } = await supabase
      .from('activity_log')
      .insert({
        user_id: user.id,
        activity_type: 'login',
        metadata: { test: true },
      })
      .select()
      .single();

    results.activityLog = activityError
      ? { error: activityError.message, code: activityError.code, details: activityError.details, hint: activityError.hint }
      : { success: true, id: activityData?.id };

    // Test 4: Update user_stats
    const { data: statsData, error: statsError } = await supabase
      .from('user_stats')
      .update({ skills_viewed: 1, updated_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .select()
      .single();

    results.userStats = statsError
      ? { error: statsError.message, code: statsError.code, details: statsError.details, hint: statsError.hint }
      : { success: true, skills_viewed: statsData?.skills_viewed };

    // Cleanup: delete test rows
    await supabase.from('skill_progress').delete().eq('skill_id', 'debug-test').eq('user_id', user.id);
    await supabase.from('quiz_attempts').delete().eq('skill_id', 'debug-test').eq('user_id', user.id);
    await supabase.from('activity_log').delete().eq('activity_type', 'login').eq('user_id', user.id).eq('metadata->>test', 'true');

    // Reset stats back
    await supabase.from('user_stats').update({ skills_viewed: 0, updated_at: new Date().toISOString() }).eq('user_id', user.id);

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      results,
    }, { status: 500 });
  }
}
