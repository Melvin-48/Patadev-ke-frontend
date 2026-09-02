export interface Bid {
  id: string;
  projectId: string;
  developerId?: string;
  proposedAmount: number;
  amount?: number;
  message?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

