import { createClient } from '@supabase/supabase-js';

// Used only for Realtime messaging. Sign-up/sign-in go through the NestJS
// backend, not this client directly - see features/auth/services/auth.service.ts.
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
