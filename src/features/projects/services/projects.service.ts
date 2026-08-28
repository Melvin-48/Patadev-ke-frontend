// TODO: Implement CRUD API calls for projects
export class ProjectsService {
  static async getClientMetrics(): Promise<import('../../../features/projects/types/project.types').ClientDashboardMetrics> { return {} as import('../../../features/projects/types/project.types').ClientDashboardMetrics; }
  static async getClientProjects() { return []; }
  static async getRecentProposals() { return []; }
  static async getAttentionItems() { return []; }
  static async getRecentActivities() { return []; }
  static async getBrowseProjects() { return []; }
  static async postProject(_data: unknown) { return {}; }
}

export default ProjectsService;
