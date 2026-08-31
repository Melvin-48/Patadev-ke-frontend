export interface Project {
  id: string;
  title: string;
  description: string;
  category?: string;
  location?: string;
  budget?: number;
  budgetMin?: number;
  budgetMax?: number;
  status: string;
  createdAt?: string;
  deadline?: string;
  clientId?: string;
  clientName?: string;
  skills?: string[];
  bidsCount?: number;
  views?: number;
}

export interface ProjectFilters {
  search?: string;
  category?: string;
  budgetRange?: string;
  sortBy?: string;
}
