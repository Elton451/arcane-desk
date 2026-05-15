"use server";

import { prisma } from "@/lib/prisma";
import getUser from "@/shared/api/services/getUser";

async function deleteLoreEntry(entryId: number) {
  const user = await getUser();

  const entry = await prisma.campaignLoreEntry.findFirst({
    where: {
      id: entryId,
      campaign: {
        ownerId: user.id,
      },
    },
  });

  if (!entry) {
    return {
      success: false as const,
      message: "Lore entry not found",
    };
  }

  await prisma.campaignLoreEntry.delete({
    where: { id: entryId },
  });

  return {
    success: true as const,
    data: entry,
  };
}

export default deleteLoreEntry;
