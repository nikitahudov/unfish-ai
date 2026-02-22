import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || 'https://unfish.ai';
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const tokenHash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type');
  const next = requestUrl.searchParams.get('next') || '/wiki';

  const baseUrl = getBaseUrl();

  // Track cookies set by Supabase so we can forward them onto the redirect
  // response. Using cookies() from next/headers with NextResponse.redirect()
  // can silently lose Set-Cookie headers — instead we handle cookies on the
  // response object directly, matching the pattern in lib/supabase/proxy.ts.
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Helper: create a redirect that carries session cookies set by Supabase.
  function redirectWithCookies(destination: string): NextResponse {
    const response = NextResponse.redirect(new URL(destination, baseUrl));
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie.name, cookie.value, cookie);
    });
    return response;
  }

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
      return redirectWithCookies(
        `/login?error=${encodeURIComponent(error.message)}`
      );
    }

    if (type === 'recovery') {
      return redirectWithCookies('/update-password');
    }

    return redirectWithCookies(next);
  }

  // Handle code exchange (OAuth and PKCE flows)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Auth callback error:', error);
      return redirectWithCookies(
        `/login?error=${encodeURIComponent(error.message)}`
      );
    }

    if (type === 'recovery') {
      return redirectWithCookies('/update-password');
    }

    return redirectWithCookies(next);
  }

  // No code or token present - redirect to login
  return NextResponse.redirect(new URL('/login', baseUrl));
}
