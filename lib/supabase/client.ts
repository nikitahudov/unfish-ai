import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a dummy client that won't crash when Supabase is not configured.
    // This allows the app to render public pages without Supabase credentials.
    return createBrowserClient<Database>(
      'http://localhost:54321',
      'dummy-key-for-development'
    );
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
