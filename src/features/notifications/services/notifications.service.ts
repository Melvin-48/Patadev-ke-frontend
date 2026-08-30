import { apiClient } from '../../../lib/api/client';
import { Notification } from '../../../types';

export const notificationsService = {
  list: () => apiClient.get<Notification[]>('/notifications'),
};

