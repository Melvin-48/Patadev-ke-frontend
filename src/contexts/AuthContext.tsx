import { createContext, useContext, useState, ReactNode } from 'react';
import { setToken, clearToken } from '../lib/api/client';

export type Role = 'CLIENT' | 'DEVELOPER' | 'ADMIN';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: Role;
  verified: boolean;
}

const defaultUser: AuthUser = {
  id: 'usr_jordan',
  email: 'jordan@buildbetter.co',
  name: 'Jordan Davis',
  role: 'CLIENT',
  verified: true,
};

interface AuthContextValue {
  user: AuthUser;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  switchRole: (role: 'CLIENT' | 'DEVELOPER' | 'ADMIN') => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(() => {
    try {
      const stored = localStorage.getItem('patadev_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.role) return parsed;
      }
    } catch {
      // ignore
    }
    return defaultUser;
  });

  function login(newUser: AuthUser, token: string) {
    setToken(token);
    try {
      localStorage.setItem('patadev_user', JSON.stringify(newUser));
    } catch {
      // ignore
    }
    setUser(newUser);
  }

  function logout() {
    clearToken();
    localStorage.removeItem('patadev_user');
    setUser(defaultUser);
  }

  function switchRole(nextRole: Role) {
    setUser((prev) => {
      const updated = { ...prev, role: nextRole };
      try {
        localStorage.setItem('patadev_user', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: true, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
