export interface Milestone {
  id: string;
  bidId: string;
  title: string;
  description?: string;
  amount: number;
  dueDate?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MilestoneInput {
  title: string;
  description: string;
  amount: number;
  dueDate: string;
}
