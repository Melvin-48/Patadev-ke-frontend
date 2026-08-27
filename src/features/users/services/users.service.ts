<<<<<<< HEAD
import { apiClient } from '../../../lib/api/client';

export const usersService = {
  createClientProfile: (userId: string, data: { businessName: string; businessType?: string; phone?: string }) =>
    apiClient.post(`/users/${userId}/client-profile`, data),

  createDeveloperProfile: (userId: string, data: { displayName: string; bio?: string; techStack: string[]; portfolioUrl?: string }) =>
    apiClient.post(`/users/${userId}/developer-profile`, data),
};
=======
// TODO: Implement Profile CRUD and verification API calls
>>>>>>> origin/main
