import { createContext, useContext, useState, ReactNode } from 'react';
import { setToken, clearToken } from '../lib/api/client';

type Role = 'CLIENT' | 'DEVELOPER' | 'ADMIN';

interface AuthUser {
  id: string;
  email: string;
  role: Role;
  verified: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // TODO: on mount, check localStorage for an existing token and re-fetch
  // the current user (e.g. a GET /auth/me endpoint) instead of starting
  // logged out on every page refresh.
  const [user, setUser] = useState<AuthUser | null>(null);

  function login(user: AuthUser, token: string) {
    setToken(token);
    setUser(user);
  }

  function logout() {
    clearToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
