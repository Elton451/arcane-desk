"use server";

import { prisma } from "@/lib/prisma";
import getUser from "@/shared/api/services/getUser";
import type { ILoreEntry } from "../types/ILoreEntry";

async function listLoreEntries(campaignId: number): Promise<ILoreEntry[]> {
  const user = await getUser();

  return prisma.campaignLoreEntry.findMany({
    where: {
      campaignId,
      campaign: {
        ownerId: user.id,
      },
    },
    orderBy: [{ createdAt: "desc" }],
  });
}

export default listLoreEntries;
