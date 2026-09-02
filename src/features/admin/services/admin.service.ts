import { apiClient } from '../../../lib/api/client';

export interface AdminListResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export const adminService = {
  // â”€â”€ Users â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  async getAccounts(params?: { role?: string; status?: string; search?: string }): Promise<AdminListResponse<any>> {
    const query = new URLSearchParams();
    if (params?.role) query.set('role', params.role);
    if (params?.status) query.set('status', params.status);
    if (params?.search) query.set('search', params.search);
    return apiClient.get(`/admin/users?${query.toString()}`);
  },

  async updateAccountStatus(userId: string, status: string): Promise<void> {
    return apiClient.patch(`/admin/users/${userId}/status`, { status });
  },

  async verifyDeveloper(userId: string, decision: 'APPROVED' | 'REJECTED', rejectionReason?: string): Promise<void> {
    return apiClient.post('/admin/verify-developer', { userId, decision, rejectionReason });
  },

  // â”€â”€ Projects â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  async getProjects(params?: { status?: string; search?: string }): Promise<AdminListResponse<any>> {
    const query = new URLSearchParams();
    if (params?.status) query.set('status', params.status);
    if (params?.search) query.set('search', params.search);
    // Since there is no /admin/projects, we use the public /projects endpoint
    // If the backend /projects returns { data, meta }, we adapt it
    const res: any = await apiClient.get(`/projects?${query.toString()}`);
    // Adapt response if it differs from AdminListResponse
    if (res.data && Array.isArray(res.data)) {
      return { items: res.data, total: res.meta?.total || res.data.length, page: 1, pageSize: 20 };
    }
    return res; // Fallback
  },

  async moderateListing(projectId: string, action: 'APPROVE' | 'REMOVE'): Promise<void> {
    return apiClient.post('/admin/moderate-listing', { projectId, action });
  },

  // â”€â”€ Payouts â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Note: Backend does not currently provide a GET /admin/payouts endpoint.
  // We can only confirm payouts when we have a milestoneId.
  async confirmPayout(milestoneId: string): Promise<void> {
    return apiClient.post('/payments/confirm-payout', { milestoneId });
  },

  // â”€â”€ Disputes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  async getDisputes(params?: { status?: string }): Promise<AdminListResponse<any>> {
    const query = new URLSearchParams();
    if (params?.status) query.set('status', params.status);
    return apiClient.get(`/admin/disputes?${query.toString()}`);
  },

  async resolveDispute(disputeId: string, decision: string, resolutionNote: string): Promise<void> {
    return apiClient.patch(`/admin/disputes/${disputeId}`, { decision, resolutionNote });
  },

  // â”€â”€ Stats â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  async getFinancialReport(): Promise<any> {
    return apiClient.get('/admin/financial-report');
  }
};

export default adminService;

