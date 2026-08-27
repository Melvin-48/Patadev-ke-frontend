import { apiClient } from '../../../lib/api/client';

interface LedgerEntry {
  id: string;
  type: 'HELD' | 'COMMISSION' | 'PAYOUT' | 'REFUND';
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
}

// View-only from the frontend, on purpose - there is no self-service
// withdrawal UI, matching the admin-confirmed payout decision.
export const paymentsService = {
  history: (bidId: string) => apiClient.get<LedgerEntry[]>(`/payments/bid/${bidId}`),
};
