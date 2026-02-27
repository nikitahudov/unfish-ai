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

  // Skip session refresh for ALL RSC (React Server Component) requests.
  // RSC requests are triggered by client-side navigation and re-renders.
  // Running getUser() on these updates cookies, which triggers
  // onAuthStateChange → re-render → more RSC requests → infinite loop.
  // Session only needs refreshing on full document (HTML) requests.
  const isRSC = request.headers.get('RSC') === '1'

  if (isRSC) {
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
