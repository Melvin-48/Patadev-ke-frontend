<<<<<<< HEAD
import { apiClient } from '../../../lib/api/client';
import { Notification } from '../../../types';

export const notificationsService = {
  list: () => apiClient.get<Notification[]>('/notifications'),
};
=======
// TODO: Implement API calls for fetching and marking read
>>>>>>> origin/main
