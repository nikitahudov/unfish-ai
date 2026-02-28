import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Snapshot the original cookies BEFORE Supabase touches them
  const originalCookies = new Map<string, string>()
  for (const cookie of request.cookies.getAll()) {
    originalCookies.set(cookie.name, cookie.value)
  }

  // Track what Supabase wants to set
  let pendingCookies: Array<{ name: string; value: string; options: any }> = []

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          pendingCookies = cookiesToSet
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
        },
      },
    }
  )

  // IMPORTANT: Do NOT add any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very
  // hard to debug issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Only write Set-Cookie if values ACTUALLY changed from the incoming request.
  // This prevents unnecessary cookie writes that trigger Next.js RSC cache
  // invalidation and cause the infinite fetch loop.
  const hasRealChanges = pendingCookies.some(({ name, value }) => {
    const original = originalCookies.get(name)
    if (original === undefined && value === '') return false
    return original !== value
  })

  if (hasRealChanges && pendingCookies.length > 0) {
    supabaseResponse = NextResponse.next({ request })
    pendingCookies.forEach(({ name, value, options }) =>
      supabaseResponse.cookies.set(name, value, options)
    )
  }

  // --- Route Protection ---
  const protectedRoutes = ['/tools', '/coach', '/assess', '/wiki', '/progress', '/settings', '/admin']
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  const authRoutes = ['/login', '/signup']
  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isAuthRoute && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/tools'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
