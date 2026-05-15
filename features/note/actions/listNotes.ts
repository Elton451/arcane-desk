"use server";

import { prisma } from "@/lib/prisma";
import getUser from "@/shared/api/services/getUser";
import type { INote } from "../types/INote";

async function listNotes(campaignId: number): Promise<INote[]> {
  const user = await getUser();

  const notes = await prisma.campaignNote.findMany({
    where: {
      campaignId,
      campaign: {
        ownerId: user.id,
      },
    },
    orderBy: [{ createdAt: "desc" }],
  });

  return notes;
}

export default listNotes;
