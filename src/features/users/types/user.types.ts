export type UserRole = 'CLIENT' | 'DEVELOPER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatarUrl?: string;
}

export interface ClientProfile {
  id?: string;
  userId?: string;
  companyName?: string;
  businessDescription?: string;
  industry?: string;
  website?: string;
  location?: string;
  phone?: string;
  updatedAt?: string;
}

export interface DeveloperProfile {
  id?: string;
  userId?: string;
  headline?: string;
  bio?: string;
  skills?: string[];
  techStack?: string[];
  hourlyRate?: number;
  experienceYears?: number;
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  updatedAt?: string;
}