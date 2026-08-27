export type ProjectSystemType = 'CRM' | 'POS';
export type ProjectStatus = 'DRAFT' | 'OPEN' | 'MATCHED' | 'COMPLETED' | 'CANCELLED';
export type BidStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';
export type MilestoneStatus = 'PENDING' | 'IN_PROGRESS' | 'SUBMITTED' | 'APPROVED';

export interface Project {
  id: string;
  title: string;
  description: string;
  systemType: ProjectSystemType;
  status: ProjectStatus;
  budgetMin?: number;
  budgetMax?: number;
  client?: { businessName: string };
}

export interface Bid {
  id: string;
  projectId: string;
  proposedAmount: number;
  message?: string;
  status: BidStatus;
  project?: Project;
  developer?: { displayName: string };
}

export interface Milestone {
  id: string;
  bidId: string;
  title: string;
  description?: string;
  amount: number;
  status: MilestoneStatus;
}

export interface Message {
  id: string;
  bidId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export type LedgerType = 'HELD' | 'COMMISSION' | 'PAYOUT' | 'REFUND';
export type LedgerStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface LedgerEntry {
  id: string;
  bidId: string;
  type: LedgerType;
  amount: number;
  status: LedgerStatus;
  createdAt: string;
}
