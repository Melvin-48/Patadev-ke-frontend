import type { Project } from "../types/project.types";

const demoProjects: Project[] = [
  {
    id: "PROJ-001",
    title: "Build a modern business website",
    description: "Create a responsive professional business website.",
    category: "Web Development",
    location: "Remote",
    budget: 1000,
    status: "OPEN",
    createdAt: new Date().toISOString(),
    bidsCount: 4,
    views: 32
  },
  {
    id: "PROJ-002",
    title: "E-commerce website development",
    description: "Develop an online store with product management.",
    category: "E-commerce",
    location: "Remote",
    budget: 2500,
    status: "OPEN",
    createdAt: new Date().toISOString(),
    bidsCount: 7,
    views: 61
  }
];

export const projectsService = {

  async getProjects(): Promise<Project[]> {
    return demoProjects;
  },

  async getProject(id: string): Promise<Project | null> {
    return demoProjects.find(project => project.id === id) ?? null;
  },

  async getMyProjects(): Promise<Project[]> {
    return demoProjects;
  },

  async createProject(project: Partial<Project>): Promise<Project> {
    const newProject: Project = {
      id: "PROJ-" + Date.now(),
      title: project.title ?? "Untitled Project",
      description: project.description ?? "",
      category: project.category,
      location: project.location,
      budget: project.budget ?? 0,
      status: "OPEN",
      createdAt: new Date().toISOString()
    };

    demoProjects.push(newProject);

    return newProject;
  },

  async updateProject(
    id: string,
    data: Partial<Project>
  ): Promise<Project | null> {

    const index = demoProjects.findIndex(project => project.id === id);

    if (index === -1) {
      return null;
    }

    demoProjects[index] = {
      ...demoProjects[index],
      ...data
    };

    return demoProjects[index];
  },
  async getProjectById(id: string) {
    return this.getProject(id);
  }};

