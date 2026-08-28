<<<<<<< HEAD
import { apiClient } from '../../../lib/api/client';
import { Project } from '../../../types';

export const projectsService = {
  list: (filters?: Record<string, string>) =>
    apiClient.get<{ items: Project[]; total: number }>(
      `/projects${filters ? '?' + new URLSearchParams(filters) : ''}`,
    ),
  getById: (id: string) => apiClient.get<Project>(`/projects/${id}`),
  create: (data: Partial<Project>) => apiClient.post<Project>('/projects', data),
  publish: (id: string) => apiClient.post(`/projects/${id}/publish`),
  cancel: (id: string) => apiClient.post(`/projects/${id}/cancel`),
};
=======
// TODO: Implement CRUD API calls for projects
>>>>>>> origin/main
