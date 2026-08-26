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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Check session/cookie on mount
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    // TODO: Implement actual API call
    console.log('Logging in', email);
  };

  const register = async (email: string, _password: string, role: UserRole, name: string) => {
    // TODO: Implement actual API call
    console.log('Registering user', email, role, name);
  };

  const forgotPassword = async (email: string) => {
    // TODO: Implement actual password reset request
    console.log('Sending password reset email to:', email);
  };

  const logout = () => {
    // TODO: Implement actual API call
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