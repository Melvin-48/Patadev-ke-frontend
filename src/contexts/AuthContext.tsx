import { createContext, useContext, useState, ReactNode } from 'react';
import { setToken, clearToken } from '../lib/api/client';
import { supabase } from '../lib/supabase/client';
import { usersApi } from '../api/users';

type Role = 'CLIENT' | 'DEVELOPER' | 'ADMIN';

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
  name?: string;
  verified?: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (emailOrUser: string | AuthUser, passwordOrToken?: string) => Promise<AuthUser | null>;
  register: (email: string, password: string, role: string, fullName: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Supports both:
  //   login(authUser, token)  — called programmatically after successful API response
  //   login(email, password)  — called from LoginPage form submit
  async function login(emailOrUser: string | AuthUser, passwordOrToken?: string): Promise<AuthUser | null> {
    if (typeof emailOrUser === 'object') {
      // Direct user + token injection (from API response handlers)
      setToken(passwordOrToken ?? '');
      setUser(emailOrUser);
      return emailOrUser;
    }

    const email = emailOrUser;
    const password = passwordOrToken || '';

    if (!password) {
      throw new Error('Password is required');
    }

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      throw authError;
    }

    if (!authData.session) {
      throw new Error('Authentication failed: No session returned.');
    }

    // Set token so the API client interceptor picks it up if needed, 
    // although the axios interceptor already calls getSession().
    setToken(authData.session.access_token);

    try {
      const userResponse = await usersApi.getMe();
      if (userResponse) {
        const patadevUser = userResponse as unknown as AuthUser;
        setUser(patadevUser);
        return patadevUser;
      }
    } catch (err) {
      // Registration might be incomplete, or user doesn't exist in backend yet
      console.error('Failed to fetch PataDev user:', err);
      setUser(null);
      return null;
    }
    
    return null;
  }

  async function register(email: string, password: string, role: string, fullName: string): Promise<void> {
    // TODO: replace with real register API call
    const mockUser: AuthUser = {
      id: 'usr-new',
      email,
      role: (role.toUpperCase() as Role) || 'CLIENT',
      name: fullName,
      verified: false,
    };
    setToken('mock-token');
    setUser(mockUser);
    void password;
  }

  async function forgotPassword(email: string): Promise<void> {
    // TODO: replace with real forgot-password API call
    console.log('Password reset requested for:', email);
  }

  async function logout() {
    await supabase.auth.signOut();
    clearToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, forgotPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
