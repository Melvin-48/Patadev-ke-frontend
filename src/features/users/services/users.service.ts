import { ClientProfile, DeveloperProfile } from '../types/user.types';

export const usersService = {
  async updateClientProfile(data: ClientProfile): Promise<ClientProfile> {
    // In real app, sends PUT/POST to /api/users/client-profile
    console.log('Updating client profile API payload:', data);
    return { ...data, updatedAt: new Date().toISOString() };
  },

  async updateDeveloperProfile(data: DeveloperProfile): Promise<DeveloperProfile> {
    // In real app, sends PUT/POST to /api/users/developer-profile
    console.log('Updating developer profile API payload:', data);
    return { ...data, updatedAt: new Date().toISOString() };
  },
};