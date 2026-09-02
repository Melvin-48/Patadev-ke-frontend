import { apiClient } from '../../../lib/api/client';
import { supabase } from '../../../lib/supabase/client';

export interface AuthResponse {
  accessToken: string;
  userId: string;
  role: 'CLIENT' | 'DEVELOPER' | 'ADMIN' | null;
}

export const authService = {
  signUp: async (email: string, password: string): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (!data.session) throw new Error('No session returned after sign up');
    
    return {
      accessToken: data.session.access_token,
      userId: data.user!.id,
      role: null, // Role is assigned during complete-registration
    };
  },

  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    
    // Once authenticated, we must fetch the backend profile to get the role
    // The role isn't stored in the Supabase session by default.
    return {
      accessToken: data.session.access_token,
      userId: data.user.id,
      role: null, // Role will be fetched via users/me
    };
  },
};

