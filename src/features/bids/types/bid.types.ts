export interface Bid {
  id: string;
  projectId: string;
  developerId?: string;
  developerName?: string;
  amount: number;
  message?: string;
  experience?: string;
  status: string;
  createdAt?: string;
  proposedDuration?: number;
}

export interface ProjectBidsListProps {
  bids: Bid[];
  onStatusChange?: (bid: Bid, status: string) => void;
  onSelect?: (bid: Bid) => void;
}
