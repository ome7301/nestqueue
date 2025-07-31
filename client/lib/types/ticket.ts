export default interface Ticket {
  id: string;
  title: string;
  description: string;
  site: Site;
  category: Category;
  assignedTo?: string;
  createdBy: string;
  priority: Priority;
  status: Status;
  createdOn: Date;
  updatedAt: Date;
}

export const sites = [
  "Salinas",
  "Watsonville",
  "HQ",
  "Gilroy",
  "Modesto",
  "Stockton",
] as const;

export type Site = (typeof sites)[number];

export const categories = ["Software", "Hardware", "Network"] as const;

export type Category = (typeof categories)[number];

export const priorities = [5, 4, 3, 2, 1] as const;

export type Priority = (typeof priorities)[number];

export type Status = (typeof statuses)[number];

export const statuses = ["Active", "Open", "Closed", "Rejected"] as const;
