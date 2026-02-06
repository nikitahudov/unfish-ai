import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/proxy';
import { getRouteAccess } from '@/lib/config/routes';

export async function proxy(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);

  // If updateSession already returned a redirect (e.g. code exchange), pass it through
  if (supabaseResponse.headers.get('location')) {
    return supabaseResponse;
  }

  const pathname = request.nextUrl.pathname;
  const routeConfig = getRouteAccess(pathname);

  // Handle protected routes - redirect unauthenticated users to login
  if (routeConfig?.access === 'auth' && !user) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('returnUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Handle guest-only routes - redirect authenticated users away
  if (routeConfig?.access === 'guest-only' && user) {
    const returnUrl = request.nextUrl.searchParams.get('returnUrl') || '/wiki';
    return NextResponse.redirect(new URL(returnUrl, request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)',
  ],
};
