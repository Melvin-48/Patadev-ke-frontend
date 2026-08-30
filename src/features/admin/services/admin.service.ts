import { apiClient } from '../../../lib/api/client';

export const adminService = {
  approveAccount: (userId: string) => apiClient.post('/admin/approve-account', { userId }),
  moderateListing: (projectId: string, action: 'APPROVE' | 'REMOVE') =>
    apiClient.post('/admin/moderate-listing', { projectId, action }),
  confirmPayout: (milestoneId: string) => apiClient.post('/payments/confirm-payout', { milestoneId }),
  // TODO: reports endpoints once GET/PATCH /admin/reports exist on the backend
  // (per the lightweight dispute-report design agreed on).
};

