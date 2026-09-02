export type MilestoneStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'APPROVED';

export interface Milestone {
  id: string;
  bidId: string;
  title: string;
  description?: string;
  amount?: number;
  dueDate?: string;
  status: MilestoneStatus;
  createdAt?: string;
  updatedAt?: string;
}

