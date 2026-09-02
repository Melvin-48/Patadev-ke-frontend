import { apiClient } from '../../../lib/api/client';
import { Bid } from '../../../types';

export const bidsService = {
  getById: (bidId: string) => apiClient.get<Bid>("/bids/"),
  create: (projectId: string, proposedAmount: number, message?: string) =>
    apiClient.post<Bid>('/bids', { projectId, proposedAmount, message }),
  listMine: () => apiClient.get<Bid[]>('/bids/mine'),
  listForProject: (projectId: string) => apiClient.get<Bid[]>(`/bids/project/${projectId}`),
  accept: (bidId: string) => apiClient.post(`/bids/${bidId}/accept`),
  decline: (bidId: string) => apiClient.post(`/bids/${bidId}/decline`),
  createBid: async (data: {
    projectId: string;
    proposedAmount: number;
    message?: string;
  }) => {
    return bidsService.create(
      data.projectId,
      data.proposedAmount,
      data.message,
    );
  },

  getBidsForProject: async (projectId: string) => {
    return bidsService.listForProject(projectId);
  },

  acceptBid: async (bidId: string) => {
    return bidsService.accept(bidId);
  },

  rejectBid: async (bidId: string) => {
    return bidsService.decline(bidId);
  },
};


