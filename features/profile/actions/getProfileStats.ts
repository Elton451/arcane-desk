"use server";

import { prisma } from "@/lib/prisma";

export interface ProfileStats {
  activeCampaigns: number;
  totalSessions: number;
  npcsCreated: number;
}

const getProfileStats = async (userId: string): Promise<ProfileStats> => {
  const [activeCampaigns, totalSessions, npcsCreated] = await Promise.all([
    prisma.campaign.count({ where: { ownerId: userId } }),
    prisma.campaignSession.count({
      where: { campaign: { ownerId: userId } },
    }),
    prisma.npc.count({
      where: { campaign: { ownerId: userId } },
    }),
  ]);

  return { activeCampaigns, totalSessions, npcsCreated };
};

export default getProfileStats;
