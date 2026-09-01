import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { setToken, clearToken, apiClient } from '../lib/api/client';
import { supabase } from '../lib/supabase/client';

export type Role = 'CLIENT' | 'DEVELOPER' | 'ADMIN' | 'SUPER_ADMIN';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: Role | null;
  verified: boolean;
  onboarded?: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  updateUser: (partial: Partial<AuthUser>) => void;
  setRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On app boot: check for an existing Supabase session and resolve the
  // backend user record to determine the real role. This is the single source
  // of truth for authentication state after a page refresh.
  useEffect(() => {
    let mounted = true;

    // Purge old demo data immediately
    try {
      const stored = localStorage.getItem('patadev_user');
      const token = localStorage.getItem('patadev_token');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          parsed?.email === 'jordan@buildbetter.co' || 
          parsed?.id === 'usr_jordan' ||
          token === 'mock_jwt_token'
        ) {
          localStorage.removeItem('patadev_user');
          localStorage.removeItem('patadev_token');
        }
      }
    } catch {}

    async function bootstrapAuth() {
      try {
        // 1. Check for an existing Supabase session
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          // No session at all – clear any stale state and stay unauthenticated
          clearToken();
          localStorage.removeItem('patadev_user');
          if (mounted) {
            setUser(null);
            setIsLoading(false);
          }
          return;
        }

        // 2. Attach the JWT so API calls are authenticated
        setToken(session.access_token);
        localStorage.setItem('patadev_token', session.access_token);

        // 3. Fetch the real user record from the backend to get the actual role
        try {
          const backendUser = await apiClient.get<any>('/users/me');
          if (mounted && backendUser) {
            const authUser: AuthUser = {
              id: backendUser.id || session.user.id,
              email: backendUser.email || session.user.email || '',
              name: backendUser.name || backendUser.displayName,
              role: backendUser.role || null,
              verified: backendUser.verified ?? true,
              onboarded: !!backendUser.role,
            };
            localStorage.setItem('patadev_user', JSON.stringify(authUser));
            setUser(authUser);
          }
        } catch (backendErr: any) {
          // A 401 from /users/me can mean "User account not found. Please complete registration."
          // which is the EXACT state for a new Supabase user who hasn't hit /complete-registration yet.
          // Therefore, we MUST keep their token and set role to null so they route to /onboarding!
          // We DO NOT force logout here!
          
          if (mounted) {
            const minimalUser: AuthUser = {
              id: session.user.id,
              email: session.user.email || '',
              role: null,
              verified: false,
              onboarded: false,
            };
            setUser(minimalUser);
          }
        }
      } catch (_err) {
        // Supabase client error – treat as unauthenticated
        if (mounted) setUser(null);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    bootstrapAuth();

    // Listen for Supabase auth state changes (OAuth callback, sign-out, token refresh, or sign-in)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        if (event === 'SIGNED_OUT' || !session) {
          clearToken();
          localStorage.removeItem('patadev_user');
          localStorage.removeItem('patadev_token');
          setUser(null);
          return;
        }

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setToken(session.access_token);
          localStorage.setItem('patadev_token', session.access_token);
          // Re-fetch backend user on token refresh or new sign-in
          try {
            const backendUser = await apiClient.get<any>('/users/me');
            if (mounted && backendUser) {
              const authUser: AuthUser = {
                id: backendUser.id || session.user.id,
                email: backendUser.email || session.user.email || '',
                name: backendUser.name || backendUser.displayName,
                role: backendUser.role || null,
                verified: backendUser.verified ?? true,
                onboarded: !!backendUser.role,
              };
              localStorage.setItem('patadev_user', JSON.stringify(authUser));
              setUser(authUser);
            }
          } catch {
            // No backend record yet - user needs to complete onboarding
            const minimalUser: AuthUser = {
              id: session.user.id,
              email: session.user.email || '',
              role: null,
              verified: false,
              onboarded: false,
            };
            if (mounted) setUser(minimalUser);
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  function login(newUser: AuthUser, token: string) {
    setToken(token);
    try {
      localStorage.setItem('patadev_user', JSON.stringify(newUser));
      localStorage.setItem('patadev_token', token);
    } catch {
      // ignore storage errors
    }
    setUser(newUser);
  }

  function logout() {
    clearToken();
    localStorage.removeItem('patadev_user');
    localStorage.removeItem('patadev_token');
    setUser(null);
    // Also sign out of Supabase so the session cookie is cleared
    supabase.auth.signOut().catch(() => {});
  }

  function updateUser(partial: Partial<AuthUser>) {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...partial };
      try {
        localStorage.setItem('patadev_user', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }

  function setRole(role: Role) {
    updateUser({ role, onboarded: true });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
