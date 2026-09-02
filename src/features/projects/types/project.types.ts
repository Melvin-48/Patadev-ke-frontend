export type ProjectStatus = 'Pending' | 'In Progress' | 'Submitted' | 'Approved' | 'Completed' | 'Action Required';

export interface ProjectMilestone {
  id: string;
  title: string;
  amount: number;
  status: 'Pending' | 'In Progress' | 'Submitted' | 'Approved';
  dueDate?: string;
}

export interface Project {
  skills?: string[];
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  currency: string;
  timeline: string;
  status: ProjectStatus;
  progressPercentage: number;
  currentMilestone?: string;
  proposalCount: number;
  createdAt: string;
  milestones?: ProjectMilestone[];
}

export interface Proposal {
  id: string;
  projectId: string;
  projectTitle: string;
  developerId: string;
  developerName: string;
  developerAvatar?: string;
  developerRole?: string;
  proposedAmount: number;
  currency: string;
  expectedTimeline: string;
  submittedAt: string;
  status: 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected';
}

export interface ActivityItemData {
  id: string;
  type: 'proposal' | 'milestone' | 'payment' | 'message' | 'project';
  title: string;
  description: string;
  timestamp: string;
}

export interface AttentionItemData {
  id: string;
  type: 'milestone_review' | 'proposal_review' | 'payment_review';
  title: string;
  description: string;
  actionUrl: string;
  actionText: string;
}

export interface ClientDashboardMetrics {
  activeProjects: number;
  totalProjects: number;
  proposalsReceived: number;
  totalSpent: number;
  currency: string;
}

