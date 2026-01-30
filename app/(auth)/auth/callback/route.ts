import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Use the public app URL for redirects instead of the request origin,
// which can be 0.0.0.0 when the server binds to all interfaces.
function getBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const tokenHash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type');
  const next = requestUrl.searchParams.get('next') || '/wiki';

  const baseUrl = getBaseUrl();
  const supabase = await createClient();

  // Handle token_hash from email confirmation links.
  // Always use verifyOtp for token_hash — even pkce_ prefixed ones —
  // because email links open without the PKCE code verifier cookie
  // that exchangeCodeForSession requires.
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as 'signup' | 'email' | 'recovery' | 'invite',
    });

    if (error) {
      console.error('Token verification error:', error);
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error.message)}`, baseUrl)
      );
    }

    if (type === 'recovery') {
      return NextResponse.redirect(new URL('/update-password', baseUrl));
    }

    return NextResponse.redirect(new URL(next, baseUrl));
  }

  // Handle code exchange (OAuth and PKCE flows)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error.message)}`, baseUrl)
      );
    }

    if (type === 'recovery') {
      return NextResponse.redirect(new URL('/update-password', baseUrl));
    }

    return NextResponse.redirect(new URL(next, baseUrl));
  }

  // No code or token present - redirect to login
  return NextResponse.redirect(new URL('/login', baseUrl));
}
