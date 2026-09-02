export interface UserAccount {
  id: string;
  name?: string;
  email: string;
  role: string;
  status?: string;
  createdAt?: string;
}

export interface AdminProject {
  id: string;
  title: string;
  description?: string;
  status?: string;
  budget?: number;
  clientName?: string;
  client?: { id: string; name: string };
  createdAt?: string;
}



