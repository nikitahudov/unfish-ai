import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Snapshot the original cookies to detect actual changes
  const originalCookies = new Map(
    request.cookies.getAll().map(c => [c.name, c.value])
  )

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Check if any cookie value actually differs from the original.
          // The Supabase storage adapter may include DELETE markers
          // (value="") for cookie chunks that don't exist in the request.
          // These are not real changes and must be ignored.
          const hasRealChanges = cookiesToSet.some(({ name, value }) => {
            const original = originalCookies.get(name)
            if (original === undefined) {
              // Cookie doesn't exist in request — only a real change
              // if we're setting a non-empty value (new cookie)
              return value !== ''
            }
            return original !== value
          })

          if (!hasRealChanges) {
            // Cookies unchanged — skip writing to avoid triggering
            // Next.js RSC cache invalidation
            return
          }

          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Use getSession() instead of getUser() to avoid the RSC infinite
  // fetch loop. getUser() makes an API call to Supabase on every
  // request, which internally triggers setAll() even when the session
  // hasn't changed — adding Set-Cookie headers that invalidate the
  // Next.js RSC cache and cause a re-fetch loop. getSession() reads
  // the JWT locally and only refreshes when the token is actually
  // expired, preventing unnecessary cookie writes.
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const user = session?.user ?? null

  // --- Route Protection ---
  // Redirect unauthenticated users away from protected routes
  const protectedRoutes = ['/tools', '/coach', '/assess', '/wiki', '/progress', '/settings', '/admin']
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  const authRoutes = ['/login', '/signup']
  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isAuthRoute && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/tools'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next()
  // make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid
  //    changing the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to
  // go out of sync and terminate the user's session prematurely!

  return supabaseResponse
}
