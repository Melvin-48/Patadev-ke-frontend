import { createClient } from '@supabase/supabase-js';

// Used only for Realtime messaging. Sign-up/sign-in go through the NestJS
// backend, not this client directly - see features/auth/services/auth.service.ts.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
