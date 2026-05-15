"use server";

import { prisma } from "@/lib/prisma";
import getUser from "@/shared/api/services/getUser";
import { NoteSchema, NoteSchemaType } from "../schemas/NoteSchema";

async function createNote(campaignId: number, formData: NoteSchemaType) {
  const user = await getUser();

  const validation = NoteSchema.safeParse(formData);
  if (!validation.success) {
    return {
      success: false as const,
      message: "Note form validation failed",
      error: validation.error,
    };
  }

  const campaign = await prisma.campaign.findFirst({
    where: {
      id: campaignId,
      ownerId: user.id,
    },
    select: { id: true },
  });

  if (!campaign) {
    return {
      success: false as const,
      message: "Campaign not found",
    };
  }

  const note = await prisma.campaignNote.create({
    data: {
      title: validation.data.title,
      content: validation.data.content,
      category: validation.data.category,
      date: new Date(),
      campaign: {
        connect: { id: campaign.id },
      },
    },
  });

  return {
    success: true as const,
    data: note,
  };
}

export default createNote;
