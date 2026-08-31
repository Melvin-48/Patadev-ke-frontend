export interface User {
  id: string;
  email: string;
  name: string;
  role: 'CLIENT' | 'DEVELOPER' | 'ADMIN';
  avatar?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: 'CLIENT' | 'DEVELOPER';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
