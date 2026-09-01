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
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'patadev_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY);

      if (savedUser) {
        const parsedUser = JSON.parse(savedUser) as User;
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Failed to restore authentication:', error);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    // Demo ADMIN account
    if (
      normalizedEmail === 'admin@patadev.co.ke' &&
      password === 'admin123'
    ) {
      const adminUser: User = {
        id: 'admin-001',
        email: 'admin@patadev.co.ke',
        role: 'ADMIN',
        name: 'PataDev Administrator',
      };

      setUser(adminUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
      return;
    }

    // Demo CLIENT account
    if (
      normalizedEmail === 'client@patadev.co.ke' &&
      password === 'client123'
    ) {
      const clientUser: User = {
        id: 'client-001',
        email: 'client@patadev.co.ke',
        role: 'CLIENT',
        name: 'Demo Client',
      };

      setUser(clientUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clientUser));
      return;
    }

    // Demo DEVELOPER account
    if (
      normalizedEmail === 'developer@patadev.co.ke' &&
      password === 'developer123'
    ) {
      const developerUser: User = {
        id: 'developer-001',
        email: 'developer@patadev.co.ke',
        role: 'DEVELOPER',
        name: 'Demo Developer',
      };

      setUser(developerUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(developerUser));
      return;
    }

    throw new Error('Invalid email or password');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
