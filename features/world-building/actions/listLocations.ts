"use server";

import { prisma } from "@/lib/prisma";
import getUser from "@/shared/api/services/getUser";
import type { ILocation } from "../types/ILocation";

async function listLocations(campaignId: number): Promise<ILocation[]> {
  const user = await getUser();

  return prisma.campaignLocation.findMany({
    where: {
      campaignId,
      campaign: {
        ownerId: user.id,
      },
    },
    orderBy: [{ createdAt: "desc" }],
  });
}

export default listLocations;
