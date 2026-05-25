"use server";

import getUser from "@/shared/api/services/getUser";
import { NoteSchema } from "../schemas/NoteSchema";
import DOMPurify from "isomorphic-dompurify";
import { prisma } from "@/lib/prisma";

export default async function updateNote(noteId: number, data: unknown) {
  const validation = NoteSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      message: "Invalid data.",
      error: validation.error,
    };
  }

  const user = await getUser();

  const note = await prisma.campaignNote.findUnique({
    where: { id: noteId },
    include: { campaign: true },
  });

  if (!note || note.campaign.ownerId !== user.id) {
    return { success: false, message: "Note not found." };
  }

  const sanitizedContent = DOMPurify.sanitize(validation.data.content);

  const updated = await prisma.campaignNote.update({
    where: { id: noteId },
    data: { ...validation.data, content: sanitizedContent },
  });

  return { success: true, data: updated };
}
