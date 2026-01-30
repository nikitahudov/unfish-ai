import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from '@/types/database';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
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
      // Clean auth params from the URL and redirect
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.searchParams.delete('code');
      redirectUrl.searchParams.delete('error');
      redirectUrl.searchParams.delete('error_code');
      redirectUrl.searchParams.delete('error_description');

      // Send to /wiki if landing on root, otherwise keep the current path
      const destination = redirectUrl.pathname === '/' ? '/wiki' : redirectUrl.pathname;
      redirectUrl.pathname = destination;

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
