import type { Milestone } from "../types/milestone.types";

const demoMilestones: Milestone[] = [];

export const milestonesService = {

  async getMilestonesByBid(bidId: string): Promise<Milestone[]> {
    return demoMilestones.filter(item => item.bidId === bidId);
  },

  async createMilestone(
    data: Partial<Milestone>
  ): Promise<Milestone> {

    const milestone: Milestone = {
      id: "MILE-" + Date.now(),
      bidId: data.bidId ?? "",
      title: data.title ?? "New Milestone",
      description: data.description,
      amount: data.amount ?? 0,
      dueDate: data.dueDate,
      status: data.status ?? "PENDING",
      createdAt: new Date().toISOString()
    };

    demoMilestones.push(milestone);

    return milestone;
  },

  async updateMilestoneStatus(
    id: string,
    status: string
  ): Promise<Milestone | null> {

    const milestone = demoMilestones.find(item => item.id === id);

    if (!milestone) {
      return null;
    }

    milestone.status = status;

    return milestone;
  },
  async getMilestonesForBid(bidId: string) {
    return this.getMilestonesByBid(bidId);
  }};

