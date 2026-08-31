import { api } from './client';

export type Role = 'CLIENT' | 'DEVELOPER' | 'ADMIN';

export const authApi = {
  completeRegistration: async (role: Role) => {
    const response = await api.post('/auth/complete-registration', { role });
    return response.data;
  },
};
