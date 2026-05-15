"use server";

import { prisma } from "@/lib/prisma";
import getUser from "@/shared/api/services/getUser";

async function deleteFaction(factionId: number) {
  const user = await getUser();

  const faction = await prisma.campaignFaction.findFirst({
    where: {
      id: factionId,
      campaign: {
        ownerId: user.id,
      },
    },
  });

  if (!faction) {
    return {
      success: false as const,
      message: "Faction not found",
    };
  }

  await prisma.campaignFaction.delete({
    where: { id: factionId },
  });

  return {
    success: true as const,
    data: faction,
  };
}

export default deleteFaction;
