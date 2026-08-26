import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'CLIENT' | 'DEVELOPER' | 'ADMIN';

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: UserRole, name: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default design preview user for development
const DESIGN_PREVIEW_USER: User = {
  id: 'usr-design-01',
  email: 'derrick@patadev.ke',
  role: 'CLIENT',
  name: 'Derrick Rono',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(DESIGN_PREVIEW_USER);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    setUser({
      id: 'usr-logged-in',
      email,
      role: 'CLIENT',
      name: email.split('@')[0],
    });
  };

  const register = async (email: string, _password: string, role: UserRole, name: string) => {
    setUser({
      id: 'usr-registered',
      email,
      role,
      name,
    });
  };

  const forgotPassword = async (email: string) => {
    console.log('Sending password reset email to:', email);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, forgotPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}