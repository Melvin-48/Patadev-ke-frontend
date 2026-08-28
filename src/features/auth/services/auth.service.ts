import { apiClient } from '../../../lib/api/client';

interface AuthResponse {
  accessToken: string;
  userId: string;
  role: 'CLIENT' | 'DEVELOPER' | 'ADMIN';
}

// Calls the NestJS backend, which proxies to Supabase Auth server-side -
// this frontend never talks to Supabase directly for auth.
export const authService = {
  signUp: (email: string, password: string, role: 'CLIENT' | 'DEVELOPER') =>
    apiClient.post<AuthResponse>('/auth/sign-up', { email, password, role }),

  signIn: (email: string, password: string) =>
    apiClient.post<AuthResponse>('/auth/sign-in', { email, password }),
};
