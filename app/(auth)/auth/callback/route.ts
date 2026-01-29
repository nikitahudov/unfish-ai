import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const type = requestUrl.searchParams.get('type');
  const next = requestUrl.searchParams.get('next') || '/wiki';

  if (code) {
    const supabase = await createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Auth callback error:', error);
      // Redirect to login with error
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error.message)}`, requestUrl.origin)
      );
    }

    // Handle password recovery
    if (type === 'recovery') {
      return NextResponse.redirect(new URL('/update-password', requestUrl.origin));
    }

    // Successful authentication - redirect to intended destination
    return NextResponse.redirect(new URL(next, requestUrl.origin));
  }

  // No code present - redirect to login
  return NextResponse.redirect(new URL('/login', requestUrl.origin));
}
