"use server";

import { prisma } from "@/lib/prisma";
import getUser from "@/shared/api/services/getUser";
import type { IFaction } from "../types/IFaction";

async function listFactions(campaignId: number): Promise<IFaction[]> {
  const user = await getUser();

  return prisma.campaignFaction.findMany({
    where: {
      campaignId,
      campaign: {
        ownerId: user.id,
      },
    },
    orderBy: [{ createdAt: "desc" }],
  });
}

export default listFactions;
