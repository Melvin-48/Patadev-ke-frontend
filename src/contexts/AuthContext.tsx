import { createContext, useContext, useState, ReactNode } from 'react';
import { setToken, clearToken } from '../lib/api/client';

export type Role = 'CLIENT' | 'DEVELOPER' | 'ADMIN';

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
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  updateUser: (partial: Partial<AuthUser>) => void;
  setRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem('patadev_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.id || parsed.email)) return parsed;
      }
    } catch {
      // ignore
    }
    // Default logged in user for development / demo
    return {
      id: 'usr_jordan',
      email: 'jordan@buildbetter.co',
      name: 'Jordan Davis',
      role: 'CLIENT',
      verified: true,
      onboarded: true,
    };
  });

  function login(newUser: AuthUser, token: string) {
    setToken(token);
    try {
      localStorage.setItem('patadev_user', JSON.stringify(newUser));
      localStorage.setItem('patadev_token', token);
    } catch {
      // ignore
    }
    setUser(newUser);
  }

  function logout() {
    clearToken();
    localStorage.removeItem('patadev_user');
    localStorage.removeItem('patadev_token');
    setUser(null);
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
