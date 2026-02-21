import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from '@/types/database';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { supabaseResponse, user: null };
  }

  const supabase = createServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Handle auth code exchange on any route.
  // Supabase may redirect the code to the site root instead of /auth/callback
  // if the redirect URL isn't in the allowed list. This catches that case
  // so Google OAuth and email confirmation work regardless.
  const code = request.nextUrl.searchParams.get('code');
  const isCallbackRoute = request.nextUrl.pathname === '/auth/callback';

  if (code && !isCallbackRoute) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Build redirect using the public app URL, not the request origin
      // (which may be 0.0.0.0 when the server binds to all interfaces).
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://unfish.ai';
      const destination = request.nextUrl.pathname === '/' ? '/wiki' : request.nextUrl.pathname;
      const redirectUrl = new URL(destination, baseUrl);

      const redirectResponse = NextResponse.redirect(redirectUrl);

      // Copy session cookies from the exchange onto the redirect response.
      // Without this the browser never receives the session tokens.
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
      });

      return { supabaseResponse: redirectResponse, user: null };
    }
  }

  // IMPORTANT: Do not remove this line
  // This refreshes the session if expired - required for Server Components
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabaseResponse, user };
}
