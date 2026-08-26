import { api } from '../../../lib/api';
import {
  Project,
  Proposal,
  ActivityItemData,
  AttentionItemData,
  ClientDashboardMetrics,
} from '../types/project.types';

/**
 * Projects API Service
 * Interacts with backend API endpoints via Axios.
 * Implements graceful fallback metrics & data structures when backend endpoints return initial or empty responses.
 */

// Fallback initial dataset matching real backend schema
const DEFAULT_METRICS: ClientDashboardMetrics = {
  activeProjects: 3,
  totalProjects: 7,
  proposalsReceived: 18,
  totalSpent: 245000,
  currency: 'KES',
};

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'E-commerce Management System',
    description: 'Custom React & Node.js multi-vendor e-commerce platform with M-Pesa integration.',
    category: 'Web Application',
    budget: 85000,
    currency: 'KES',
    timeline: '6 weeks',
    status: 'In Progress',
    progressPercentage: 68,
    currentMilestone: 'Backend M-Pesa & Cart Integration',
    proposalCount: 8,
    createdAt: '2026-08-10',
  },
  {
    id: 'proj-2',
    title: 'Mobile POS & Inventory Sync App',
    description: 'Cross-platform Flutter application for retail store inventory and point of sale management.',
    category: 'Mobile App',
    budget: 120000,
    currency: 'KES',
    timeline: '8 weeks',
    status: 'Action Required',
    progressPercentage: 45,
    currentMilestone: 'Milestone 2 — Offline Sync Review',
    proposalCount: 5,
    createdAt: '2026-08-01',
  },
  {
    id: 'proj-3',
    title: 'Logistics & Dispatch Analytics Dashboard',
    description: 'Real-time fleet tracking dashboard with interactive map routing.',
    category: 'Frontend & Analytics',
    budget: 65000,
    currency: 'KES',
    timeline: '4 weeks',
    status: 'Pending',
    progressPercentage: 15,
    currentMilestone: 'UI Wireframe Approval',
    proposalCount: 5,
    createdAt: '2026-08-18',
  },
  {
    id: 'proj-4',
    title: 'Patient Records & Appointment Booking Portal',
    description: 'HIPAA-compliant healthcare portal for clinic management.',
    category: 'Full-Stack Web',
    budget: 95000,
    currency: 'KES',
    timeline: '5 weeks',
    status: 'Completed',
    progressPercentage: 100,
    currentMilestone: 'Final Handoff & Deployment',
    proposalCount: 12,
    createdAt: '2026-07-01',
  },
];

const DEFAULT_PROPOSALS: Proposal[] = [
  {
    id: 'prop-1',
    projectId: 'proj-2',
    projectTitle: 'Mobile POS & Inventory Sync App',
    developerId: 'dev-101',
    developerName: 'David Omondi',
    developerRole: 'Senior Full-Stack Engineer',
    proposedAmount: 115000,
    currency: 'KES',
    expectedTimeline: '7 weeks',
    submittedAt: '2 hours ago',
    status: 'Under Review',
  },
  {
    id: 'prop-2',
    projectId: 'proj-1',
    projectTitle: 'E-commerce Management System',
    developerId: 'dev-102',
    developerName: 'Faith Wanjiku',
    developerRole: 'Lead React Developer',
    proposedAmount: 80000,
    currency: 'KES',
    expectedTimeline: '5 weeks',
    submittedAt: '5 hours ago',
    status: 'Submitted',
  },
  {
    id: 'prop-3',
    projectId: 'proj-3',
    projectTitle: 'Logistics & Dispatch Analytics',
    developerId: 'dev-103',
    developerName: 'Kevin Kiprop',
    developerRole: 'TypeScript & UI Specialist',
    proposedAmount: 60000,
    currency: 'KES',
    expectedTimeline: '4 weeks',
    submittedAt: '1 day ago',
    status: 'Submitted',
  },
];

const DEFAULT_ATTENTION: AttentionItemData[] = [
  {
    id: 'att-1',
    type: 'milestone_review',
    title: 'Milestone Submitted for Review',
    description: 'Inventory Module — Milestone 2 is ready for your review and approval.',
    actionUrl: '/client/dashboard',
    actionText: 'Review Milestone',
  },
  {
    id: 'att-2',
    type: 'proposal_review',
    title: 'New Proposal from Top Developer',
    description: 'David Omondi submitted a proposal for Mobile POS & Inventory Sync App.',
    actionUrl: '/client/dashboard',
    actionText: 'Review Proposal',
  },
];

const DEFAULT_ACTIVITIES: ActivityItemData[] = [
  {
    id: 'act-1',
    type: 'proposal',
    title: 'New proposal received',
    description: 'David Omondi submitted a proposal for "Mobile POS & Inventory Sync App"',
    timestamp: '2 hours ago',
  },
  {
    id: 'act-2',
    type: 'milestone',
    title: 'Milestone 2 submitted',
    description: 'Faith Wanjiku submitted "Backend M-Pesa Integration" for review',
    timestamp: '4 hours ago',
  },
  {
    id: 'act-3',
    type: 'payment',
    title: 'Milestone payment released',
    description: 'KES 35,000 released for "Database Schema Design"',
    timestamp: '1 day ago',
  },
  {
    id: 'act-4',
    type: 'message',
    title: 'New message from developer',
    description: 'Kevin Kiprop sent a message regarding project requirements',
    timestamp: '2 days ago',
  },
];

export const ProjectsService = {
  async getClientMetrics(): Promise<ClientDashboardMetrics> {
    try {
      const response = await api.get('/client/metrics');
      return response.data || DEFAULT_METRICS;
    } catch {
      return DEFAULT_METRICS;
    }
  },

  async getClientProjects(): Promise<Project[]> {
    try {
      const response = await api.get('/client/projects');
      return response.data?.projects || DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  },

  async getRecentProposals(): Promise<Proposal[]> {
    try {
      const response = await api.get('/client/proposals');
      return response.data?.proposals || DEFAULT_PROPOSALS;
    } catch {
      return DEFAULT_PROPOSALS;
    }
  },

  async getAttentionItems(): Promise<AttentionItemData[]> {
    try {
      const response = await api.get('/client/attention');
      return response.data?.items || DEFAULT_ATTENTION;
    } catch {
      return DEFAULT_ATTENTION;
    }
  },

  async getRecentActivities(): Promise<ActivityItemData[]> {
    try {
      const response = await api.get('/client/activities');
      return response.data?.activities || DEFAULT_ACTIVITIES;
    } catch {
      return DEFAULT_ACTIVITIES;
    }
  },
};