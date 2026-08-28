import { createContext, useContext, useState, ReactNode } from 'react';
import { setToken, clearToken } from '../lib/api/client';

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
  login: (emailOrUser: string | AuthUser, passwordOrToken?: string) => Promise<void> | void;
  register: (email: string, password: string, role: string, fullName: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Supports both:
  //   login(authUser, token)  — called programmatically after successful API response
  //   login(email, password)  — called from LoginPage form submit
  async function login(emailOrUser: string | AuthUser, passwordOrToken?: string): Promise<void> {
    if (typeof emailOrUser === 'object') {
      // Direct user + token injection (from API response handlers)
      setToken(passwordOrToken ?? '');
      setUser(emailOrUser);
      return;
    }

    // Simulate API login for development/design phase
    // TODO: replace with real auth API call
    const mockUser: AuthUser = {
      id: 'usr-001',
      email: emailOrUser,
      role: 'CLIENT',
      name: emailOrUser.split('@')[0],
      verified: true,
    };
    setToken('mock-token');
    setUser(mockUser);
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

  function logout() {
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
