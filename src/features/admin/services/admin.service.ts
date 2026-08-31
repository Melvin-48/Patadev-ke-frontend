import type { UserAccount, AdminProject } from '../types/admin.types';

const demoAccounts: UserAccount[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'CLIENT',
    status: 'ACTIVE',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'DEVELOPER',
    status: 'PENDING',
    createdAt: new Date().toISOString()
  }
];

const demoProjects: AdminProject[] = [
  {
    id: '1',
    title: 'E-commerce Website',
    description: 'Build a full e-commerce platform',
    budget: 5000,
    status: 'OPEN',
    client: {
      id: '1',
      name: 'John Doe'
    },
    createdAt: new Date().toISOString()
  }
];

export const adminService = {

  async getAccounts(): Promise<UserAccount[]> {
    return demoAccounts;
  },

  async getProjects(): Promise<AdminProject[]> {
    return demoProjects;
  },

  async approveAccount(id: string): Promise<void> {
    const account = demoAccounts.find(a => a.id === id);

    if (account) {
      account.status = 'ACTIVE';
    }
  },

  async suspendAccount(id: string): Promise<void> {
    const account = demoAccounts.find(a => a.id === id);

    if (account) {
      account.status = 'SUSPENDED';
    }
  },

  async removeProject(id: string): Promise<void> {
    const index = demoProjects.findIndex(p => p.id === id);

    if (index !== -1) {
      demoProjects.splice(index, 1);
    }
  },

  async updateAccountStatus(
    id: string,
    status: string
  ): Promise<void> {

    const account = demoAccounts.find(a => a.id === id);

    if (account) {
      account.status = status;
    }
  },

  async updateProjectStatus(
    id: string,
    status: string
  ): Promise<void> {

    const project = demoProjects.find(p => p.id === id);

    if (project) {
      project.status = status;
    }
  }
};

export default adminService;
