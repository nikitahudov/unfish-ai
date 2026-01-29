import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// This client bypasses Row Level Security - use carefully!
// Only use in server-side code for admin operations
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
