import { apiClient } from '../../../lib/api/client';
import { Milestone } from '../../../types';

export const milestonesService = {
  listForBid: (bidId: string) => apiClient.get<Milestone[]>(`/milestones/bid/${bidId}`),
  updateStatus: (id: string, status: Milestone['status']) =>
    apiClient.patch(`/milestones/${id}/status`, { status }),
};
