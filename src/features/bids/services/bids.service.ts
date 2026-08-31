import type { Bid } from "../types/bid.types";

const demoBids: Bid[] = [];

export const bidsService = {

  async getBidsByProject(projectId: string): Promise<Bid[]> {
    return demoBids.filter(
      bid => bid.projectId === projectId
    );
  },

  async getMyBids(): Promise<Bid[]> {
    return [...demoBids];
  },

  async createBid(data: Partial<Bid>): Promise<Bid> {

    const bid = {
      id: `BID-${Date.now()}`,
      ...data
    } as Bid;

    demoBids.push(bid);

    return bid;
  },

  async updateBidStatus(
    id: string,
    status: string
  ): Promise<Bid | null> {

    const bid = demoBids.find(
      item => item.id === id
    );

    if (!bid) {
      return null;
    }

    bid.status = status;

    return bid;
  },

  async getBidsForProject(
    projectId: string
  ): Promise<Bid[]> {
    return this.getBidsByProject(projectId);
  },

  async getBidById(
    id: string
  ): Promise<Bid | null> {

    const bids = await this.getMyBids();

    return bids.find(
      bid => bid.id === id
    ) ?? null;
  },

  async acceptBid(
    id: string
  ): Promise<Bid | null> {
    return this.updateBidStatus(id, "ACCEPTED");
  },

  async rejectBid(
    id: string
  ): Promise<Bid | null> {
    return this.updateBidStatus(id, "REJECTED");
  }
};
