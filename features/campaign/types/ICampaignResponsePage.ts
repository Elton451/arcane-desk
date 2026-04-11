import type { Campaign } from "@/prisma/generated/prisma/client";

export interface ICampaignResponsePage {
  campaigns: Campaign[];
  pagination: {
    page: number;
    size: number;
    total: number;
  };
}
