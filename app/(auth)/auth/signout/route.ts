import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {
          // No-op: we clear cookies manually on the response below.
        },
      },
    }
  );

  // Revoke the session server-side so the refresh token is invalidated.
  await supabase.auth.signOut();

  const response = NextResponse.json({ success: true });

  // Explicitly delete every sb-* cookie so no stale chunks remain.
  // Supabase SSR stores sessions in chunked cookies like
  // sb-<ref>-auth-token.0, .1, etc. If a new session has fewer chunks
  // than the old one, the leftover chunks corrupt the session.
  request.cookies.getAll().forEach((cookie) => {
    if (cookie.name.startsWith('sb-')) {
      response.cookies.set(cookie.name, '', { maxAge: 0, path: '/' });
    }
  });

  console.log('=== SERVER SIGNOUT ===', {
    clearedCookies: request.cookies
      .getAll()
      .filter((c) => c.name.startsWith('sb-'))
      .map((c) => c.name),
  });

  return response;
}
