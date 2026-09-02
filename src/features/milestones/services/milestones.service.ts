import { apiClient } from '../../../lib/api/client';
import { Milestone } from '../../../types';

export const milestonesService = {
  listForBid: (bidId: string) => apiClient.get<Milestone[]>(`/milestones/bid/${bidId}`),
  updateStatus: (id: string, status: Milestone['status']) =>
    apiClient.patch(`/milestones/${id}/status`, { status }),
  getMilestonesForBid: async (bidId: string) => {
    return milestonesService.listForBid(bidId);
  },

  createMilestone: async (data: Record<string, unknown>) => {
    return apiClient.post('/milestones', data);
  },

  updateMilestoneStatus: async (
    id: string,
    status: string,
  ) => {
    return milestonesService.updateStatus(id, status as any);
  },
};

