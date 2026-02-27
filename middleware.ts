import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Skip middleware for static assets and auth routes
  const { pathname } = request.nextUrl
  if (
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Skip session refresh for RSC prefetch requests
  // Prefetches don't need fresh auth and calling getUser() on each one
  // triggers cookie updates → onAuthStateChange → re-render → more prefetches → loop
  const isPrefetch = request.headers.get('RSC') === '1'
    && request.headers.get('Next-Router-Prefetch') === '1'

  if (isPrefetch) {
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Just refresh the session, do NOT redirect anywhere
  await supabase.auth.getUser()

  // NO redirects. NO route protection. Just refresh cookies and pass through.
  // Route protection will be added back after confirming the loop is fixed.

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
