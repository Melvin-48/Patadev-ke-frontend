import { apiClient } from '../../../lib/api/client';

export interface ClientProfilePayload {
  companyName?: string;
  businessName?: string;
  industry?: string;
  businessType?: string;
  businessDescription?: string;
  website?: string;
  location?: string;
  phone?: string;
}

export interface DeveloperProfilePayload {
  headline?: string;
  displayName?: string;
  bio?: string;
  skills?: string[];
  techStack?: string[];
  hourlyRate?: number;
  experienceYears?: number;
  portfolio?: Array<{
    title: string;
    description: string;
    link?: string;
    repo?: string;
  }>;
  portfolioUrl?: string;
  availability?: string;
  servicesOffered?: string[];
}

export const usersService = {
  getMe: () => apiClient.get('/users/me'),

  createClientProfile: (data: ClientProfilePayload) =>
    apiClient.post('/users/me/client-profile', {
      businessName: data.businessName || data.companyName || '',
      businessType: data.businessType || data.industry || '',
      phone: data.phone || '',
    }),

  updateClientProfile: (data: ClientProfilePayload) =>
    apiClient.patch('/users/me/client-profile', {
      businessName: data.businessName || data.companyName,
      businessType: data.businessType || data.industry,
      phone: data.phone,
    }),

  createDeveloperProfile: (data: DeveloperProfilePayload) =>
    apiClient.post('/users/me/developer-profile', {
      displayName: data.displayName || data.headline || '',
      bio: data.bio || '',
      techStack: data.techStack || data.skills || [],
      portfolioUrl: data.portfolioUrl || (data.portfolio && data.portfolio[0]?.link) || '',
    }),

  updateDeveloperProfile: (data: DeveloperProfilePayload) =>
    apiClient.patch('/users/me/developer-profile', {
      displayName: data.displayName || data.headline,
      bio: data.bio,
      techStack: data.techStack || data.skills,
      portfolioUrl: data.portfolioUrl || (data.portfolio && data.portfolio[0]?.link),
    }),
};

