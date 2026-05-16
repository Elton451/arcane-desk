"use server";

import { prisma } from "@/lib/prisma";
import getUser from "@/shared/api/services/getUser";
import DOMPurify from "isomorphic-dompurify";
import { JSDOM } from "jsdom";
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

  const window = new JSDOM("").window;
  const purify = DOMPurify(window);
  const sanitizedContent = purify.sanitize(validation.data.content);

  const note = await prisma.campaignNote.create({
    data: {
      title: validation.data.title,
      content: sanitizedContent,
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
