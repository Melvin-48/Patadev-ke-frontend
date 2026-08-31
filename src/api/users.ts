import { api } from './client';
import { Role } from './auth';

export interface ClientProfile {
  id: string;
  businessName: string;
  businessType?: string | null;
  phone?: string | null;
}

export interface DeveloperProfile {
  id: string;
  displayName: string;
  bio?: string | null;
  techStack: string[];
  portfolioUrl?: string | null;
  listingTier: string;
}

export interface UserResponse {
  id: string;
  email: string;
  role: Role;
  clientProfile: ClientProfile | null;
  developerProfile: DeveloperProfile | null;
}

export interface CreateClientProfileDto {
  businessName: string;
  businessType?: string;
  phone?: string;
}

export interface CreateDeveloperProfileDto {
  displayName: string;
  bio?: string;
  techStack: string[];
  portfolioUrl?: string;
}

export const usersApi = {
  getMe: async (): Promise<UserResponse | null> => {
    const response = await api.get('/users/me');
    return response.data;
  },
  completeClientProfile: async (data: CreateClientProfileDto) => {
    const response = await api.post('/users/me/client-profile', data);
    return response.data;
  },
  updateClientProfile: async (data: Partial<CreateClientProfileDto>) => {
    const response = await api.patch('/users/me/client-profile', data);
    return response.data;
  },
  completeDeveloperProfile: async (data: CreateDeveloperProfileDto) => {
    const response = await api.post('/users/me/developer-profile', data);
    return response.data;
  },
  updateDeveloperProfile: async (data: Partial<CreateDeveloperProfileDto>) => {
    const response = await api.patch('/users/me/developer-profile', data);
    return response.data;
  },
  getUserById: async (userId: string): Promise<UserResponse> => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },
};
