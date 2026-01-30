import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const tokenHash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type');
  const next = requestUrl.searchParams.get('next') || '/wiki';

  const supabase = await createClient();

  // Handle token_hash from email confirmation links
  if (tokenHash && type) {
    // PKCE token hashes (prefixed with pkce_) must be exchanged as auth codes.
    // Regular token hashes are verified as OTPs.
    const isPkce = tokenHash.startsWith('pkce_');

    let error;
    if (isPkce) {
      ({ error } = await supabase.auth.exchangeCodeForSession(tokenHash));
    } else {
      ({ error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: type as 'signup' | 'email' | 'recovery' | 'invite',
      }));
    }

    if (error) {
      console.error('Token verification error:', error);
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error.message)}`, requestUrl.origin)
      );
    }

    if (type === 'recovery') {
      return NextResponse.redirect(new URL('/update-password', requestUrl.origin));
    }

    return NextResponse.redirect(new URL(next, requestUrl.origin));
  }

  // Handle code exchange (OAuth and PKCE flows)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error.message)}`, requestUrl.origin)
      );
    }

    if (type === 'recovery') {
      return NextResponse.redirect(new URL('/update-password', requestUrl.origin));
    }

    return NextResponse.redirect(new URL(next, requestUrl.origin));
  }

  // No code or token present - redirect to login
  return NextResponse.redirect(new URL('/login', requestUrl.origin));
}
