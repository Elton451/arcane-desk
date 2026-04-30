"use server";

import { prisma } from "@/lib/prisma";

export async function getSessionsByCampaignId(campaignId: number) {
  const sessions = await prisma.campaignSession.findMany({
    where: { campaignId },
    orderBy: [{ date: "asc" }],
  });

  return {
    success: true,
    data: sessions,
  };
}
