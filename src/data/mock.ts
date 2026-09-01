import { Bid, Milestone, LedgerEntry, ProjectSystemType } from '../types';

// Sample data in KES so the dashboard renders with realistic local-market
// figures. All of this will be replaced by real service calls once the
// backend endpoints are wired to these pages (see the TODO notes in each
// page). The shapes here mirror what the service layer returns today.

export type Accent = 'coral' | 'sky' | 'gold' | 'mint';

export interface MockProject {
  id: string;
  title: string;
  category: string;
  description: string;
  systemType: ProjectSystemType;
  budgetLabel: string;
  budgetMin: number;
  budgetMax: number;
  status: 'DRAFT' | 'OPEN' | 'MATCHED' | 'COMPLETED';
  bids: number;
  updated: string;
  accent: Accent;
}

export interface MockDeveloper {
  name: string;
  role: string;
  initials: string;
  color: 'blue' | 'amber' | 'green';
  rating: string;
  skills: string;
  amount: string;
  time: string;
}

export interface MockBid {
  id: string;
  projectId: string;
  title: string;
  category: string;
  amount: string;
  statusLabel: 'Under review' | 'Matched' | 'Declined';
  color: 'pending' | 'matched' | 'declined';
  time: string;
}

export interface MockMilestone {
  title: string;
  detail: string;
  amount: string;
  stage: 'complete' | 'current' | 'upcoming';
}

export interface MockChatMessage {
  id: string;
  author: string;
  initials: string;
  color: 'blue' | 'amber' | 'green';
  text: string;
  time: string;
  sent: boolean;
}

export interface MockNotificationGroup {
  day: string;
  items: { title: string; detail: string; time: string; unread?: boolean }[];
}

export interface MockLedgerRow {
  date: string;
  label: string;
  type: 'PAYOUT' | 'COMMISSION' | 'HELD' | 'REFUND';
  amount: string;
}

export const selectedBidId = 'bid-02';

export const mockProjects: MockProject[] = [
  {
    id: 'proj-01',
    title: 'Real POS System',
    category: 'Point of Sale · Web App',
    description: 'A modern point-of-sale system for growing retail teams with real-time inventory.',
    systemType: 'POS',
    budgetLabel: 'KES 480,000 – KES 720,000',
    budgetMin: 480000,
    budgetMax: 720000,
    status: 'OPEN',
    bids: 8,
    updated: '2 hours ago',
    accent: 'coral',
  },
  {
    id: 'proj-02',
    title: 'Customer Management CRM',
    category: 'CRM · SaaS Platform',
    description: 'Centralize customer data, sales activity, and follow-ups in one simple workspace.',
    systemType: 'CRM',
    budgetLabel: 'KES 720,000 – KES 1,080,000',
    budgetMin: 720000,
    budgetMax: 1080000,
    status: 'MATCHED',
    bids: 12,
    updated: 'Yesterday',
    accent: 'sky',
  },
  {
    id: 'proj-03',
    title: 'Business Operations Platform',
    category: 'CRM · Business Software',
    description: 'Connect projects, team workflows, approvals, and reporting across the business.',
    systemType: 'CRM',
    budgetLabel: 'KES 1,200,000 – KES 1,680,000',
    budgetMin: 1200000,
    budgetMax: 1680000,
    status: 'COMPLETED',
    bids: 16,
    updated: 'May 16, 2024',
    accent: 'gold',
  },
  {
    id: 'proj-04',
    title: 'Inventory Management',
    category: 'POS · Web Application',
    description: 'Keep stock levels accurate and teams aligned with a focused inventory system.',
    systemType: 'POS',
    budgetLabel: 'KES 420,000 – KES 600,000',
    budgetMin: 420000,
    budgetMax: 600000,
    status: 'DRAFT',
    bids: 0,
    updated: 'May 14, 2024',
    accent: 'mint',
  },
];

export const mockDevelopers: MockDeveloper[] = [
  { name: 'Alex Morgan', role: 'Full-stack engineer', initials: 'AM', color: 'blue', rating: '4.9', skills: 'React, Node.js, PostgreSQL', amount: 'KES 630,000', time: '12 weeks' },
  { name: 'Jordan Lee', role: 'Product designer & developer', initials: 'JL', color: 'amber', rating: '5.0', skills: 'Figma, Next.js, Tailwind', amount: 'KES 708,000', time: '14 weeks' },
  { name: 'Sam Rivera', role: 'Senior software engineer', initials: 'SR', color: 'green', rating: '4.8', skills: 'TypeScript, AWS, Python', amount: 'KES 576,000', time: '10 weeks' },
];

export const mockBids: MockBid[] = [
  { id: 'bid-01', projectId: 'proj-02', title: 'Customer Management CRM', category: 'CRM · SaaS Platform', amount: 'KES 912,000', statusLabel: 'Under review', color: 'pending', time: '2 days ago' },
  { id: 'bid-02', projectId: 'proj-02', title: 'Business Operations Platform', category: 'CRM · Business Software', amount: 'KES 1,320,000', statusLabel: 'Matched', color: 'matched', time: 'May 18, 2024' },
  { id: 'bid-03', projectId: 'proj-01', title: 'Real POS System', category: 'POS · Web App', amount: 'KES 630,000', statusLabel: 'Declined', color: 'declined', time: 'May 10, 2024' },
];

export const mockMilestones: MockMilestone[] = [
  { title: 'Project kickoff', detail: 'Completed May 18', amount: 'KES 60,000', stage: 'complete' },
  { title: 'Design system & prototypes', detail: 'Approved · KES 228,000', amount: 'KES 228,000', stage: 'complete' },
  { title: 'Core application build', detail: 'Due Jun 10 · KES 492,000', amount: 'KES 492,000', stage: 'current' },
  { title: 'Launch & handoff', detail: 'Due Jun 28 · KES 192,000', amount: 'KES 192,000', stage: 'upcoming' },
];

export const mockChatMessages: MockChatMessage[] = [
  { id: 'm1', author: 'Alex Morgan', initials: 'AM', color: 'blue', text: "Morning! First set of dashboard concepts is ready.", time: '9:04 AM', sent: false },
  { id: 'm2', author: 'You', initials: 'PD', color: 'amber', text: "Nice work. Could we push the inventory panel higher up?", time: '9:12 AM', sent: true },
  { id: 'm3', author: 'Alex Morgan', initials: 'AM', color: 'blue', text: "Absolutely - I'll reorder it and share a new preview this evening.", time: '9:20 AM', sent: false },
];

export const mockNotifications: MockNotificationGroup[] = [
  {
    day: 'TODAY',
    items: [
      { title: 'New bid received', detail: 'Alex Morgan bid KES 630,000 on Real POS System', time: '12 min ago', unread: true },
      { title: 'New message from Alex Morgan', detail: "I've uploaded the first set of dashboard concepts.", time: '1 hour ago', unread: true },
    ],
  },
  {
    day: 'YESTERDAY',
    items: [
      { title: 'Milestone approved', detail: 'Design system & prototypes was approved and payment released.', time: 'Yesterday' },
      { title: 'Project deadline approaching', detail: 'Core application build is due in 20 days.', time: 'Yesterday' },
    ],
  },
];

export const mockLedger: MockLedgerRow[] = [
  { date: 'May 18, 2024', label: 'Design system & prototypes', type: 'PAYOUT', amount: 'KES 228,000' },
  { date: 'May 18, 2024', label: 'Platform fee', type: 'COMMISSION', amount: '-KES 22,800' },
  { date: 'May 15, 2024', label: 'Project deposit', type: 'HELD', amount: 'KES 60,000' },
];

export const mockCommonBids: Bid[] = [];
export const mockCommonMilestones: Milestone[] = [];
export const mockCommonLedger: LedgerEntry[] = [];