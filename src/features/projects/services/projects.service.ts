import { apiClient } from '../../../lib/api/client';
import { Project } from '../../../types';
import {
  Project as DashboardProject,
  Proposal,
  ActivityItemData,
  AttentionItemData,
  ClientDashboardMetrics,
} from '../types/project.types';

export const projectsService = {
  list: (filters?: Record<string, string>) =>
    apiClient.get<{ items: Project[]; total: number }>(
      `/projects${filters ? '?' + new URLSearchParams(filters) : ''}`,
    ),
  getById: (id: string) => apiClient.get<Project>(`(/projects/)`),
  create: (data: Partial<Project>) => apiClient.post<Project>('/projects', data),
  update: (id: string, data: unknown) => apiClient.patch<Project>(`/projects/${id}`, data),
  publish: (id: string) => apiClient.post(`(/projects/)/publish`),
  cancel: (id: string) => apiClient.post(`(/projects/)/cancel`),
};

// Dashboard aggregate service for Client / Developer views
export class ProjectsService {
  static async getClientMetrics(): Promise<ClientDashboardMetrics> {
    return {
      activeProjects: 3,
      totalProjects: 6,
      proposalsReceived: 14,
      totalSpent: 480000,
      currency: 'KES',
    };
  }

  static async getClientProjects(): Promise<DashboardProject[]> {
    return [
      {
        id: 'proj-01',
        title: 'Modern Retail POS System',
        description: 'Multi-branch point of sale system with offline caching and M-Pesa integration.',
        category: 'POS System',
        budget: 640000,
        currency: 'KES',
        timeline: '8-10 weeks',
        status: 'In Progress',
        progressPercentage: 65,
        currentMilestone: 'Core Transaction Engine Build',
        proposalCount: 8,
        createdAt: '2 days ago',
      },
      {
        id: 'proj-02',
        title: 'B2B Wholesale CRM & Ordering',
        description: 'Customer management and bulk order dispatch for FMCG distributor in Nairobi.',
        category: 'CRM & ERP',
        budget: 920000,
        currency: 'KES',
        timeline: '12 weeks',
        status: 'In Progress',
        progressPercentage: 30,
        currentMilestone: 'Design System & Client Approval',
        proposalCount: 12,
        createdAt: '1 week ago',
      },
    ];
  }

  static async getRecentProposals(): Promise<Proposal[]> {
    return [
      {
        id: 'prop-01',
        projectId: 'proj-01',
        projectTitle: 'Modern Retail POS System',
        developerId: 'dev-01',
        developerName: 'Brian Mutua',
        developerRole: 'Senior Full-Stack Engineer',
        proposedAmount: 620000,
        currency: 'KES',
        expectedTimeline: '8 weeks',
        submittedAt: '3 hours ago',
        status: 'Submitted',
      },
      {
        id: 'prop-02',
        projectId: 'proj-02',
        projectTitle: 'B2B Wholesale CRM & Ordering',
        developerId: 'dev-02',
        developerName: 'Faith Chebet',
        developerRole: 'Backend & Cloud Specialist',
        proposedAmount: 890000,
        currency: 'KES',
        expectedTimeline: '10 weeks',
        submittedAt: 'Yesterday',
        status: 'Submitted',
      },
    ];
  }

  static async getAttentionItems(): Promise<AttentionItemData[]> {
    return [
      {
        id: 'att-01',
        type: 'milestone_review',
        title: 'Milestone 2 ready for review',
        description: 'Brian Mutua submitted the UI mockups for Retail POS.',
        actionUrl: '/client/dashboard',
        actionText: 'Review Work',
      },
    ];
  }

  static async getRecentActivities(): Promise<ActivityItemData[]> {
    return [
      {
        id: 'act-01',
        type: 'proposal',
        title: 'New proposal received',
        description: 'Brian Mutua submitted a bid on Modern Retail POS System.',
        timestamp: '3 hours ago',
      },
      {
        id: 'act-02',
        type: 'milestone',
        title: 'Milestone deliverable submitted',
        description: 'Faith Chebet uploaded Database Schema & Architecture.',
        timestamp: 'Yesterday',
      },
      {
        id: 'act-03',
        type: 'payment',
        title: 'Escrow funded',
        description: 'KES 220,000 deposited for Milestone 1.',
        timestamp: '3 days ago',
      },
    ];
  }

  static async getBrowseProjects(): Promise<DashboardProject[]> {
    return this.getClientProjects();
  }

  static async postProject(data: unknown) {
    return apiClient.post('/projects', data);
  }
}

export default ProjectsService;





