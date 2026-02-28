import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database';

/**
 * Creates a READ-ONLY Supabase server client for use in Server Components
 * and Route Handlers. This client can read cookies but will NOT write them.
 *
 * Only middleware.ts should refresh tokens and set cookies (via its own
 * inline writable client). If server components or route handlers set
 * cookies, each RSC response carries Set-Cookie headers, which invalidates
 * the Next.js client-side RSC cache and triggers an infinite refetch loop.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // Intentionally empty — do NOT set cookies from server components
          // or route handlers. Only middleware should refresh tokens and
          // write cookies. Writing cookies here causes Set-Cookie headers
          // on RSC responses → cache invalidation → infinite refetch loop.
        },
      },
    }
  );
}
