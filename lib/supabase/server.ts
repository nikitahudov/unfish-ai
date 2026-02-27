import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll() {
          // Intentionally empty. The proxy (proxy.ts) handles session
          // refresh and cookie writes. Writing cookies from Server
          // Components or Route Handlers adds Set-Cookie headers to
          // RSC responses, which triggers Next.js cache invalidation
          // and causes infinite RSC re-fetch loops.
        },
      },
    }
  )
}
