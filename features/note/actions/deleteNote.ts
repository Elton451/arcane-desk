"use server";

import { prisma } from "@/lib/prisma";
import getUser from "@/shared/api/services/getUser";

async function deleteNote(noteId: number) {
  const user = await getUser();

  const note = await prisma.campaignNote.findFirst({
    where: {
      id: noteId,
      campaign: {
        ownerId: user.id,
      },
    },
  });

  if (!note) {
    return {
      success: false as const,
      message: "Note not found",
    };
  }

  await prisma.campaignNote.delete({
    where: { id: noteId },
  });

  return {
    success: true as const,
    data: note,
  };
}

export default deleteNote;
