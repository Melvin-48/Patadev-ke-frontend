import { apiClient } from '../../../lib/api/client';
import { Bid } from '../../../types';

export const bidsService = {
  create: (projectId: string, proposedAmount: number, message?: string) =>
    apiClient.post<Bid>('/bids', { projectId, proposedAmount, message }),
  listMine: () => apiClient.get<Bid[]>('/bids/mine'),
  listForProject: (projectId: string) => apiClient.get<Bid[]>(`/bids/project/${projectId}`),
  accept: (bidId: string) => apiClient.post(`/bids/${bidId}/accept`),
  decline: (bidId: string) => apiClient.post(`/bids/${bidId}/decline`),
};

