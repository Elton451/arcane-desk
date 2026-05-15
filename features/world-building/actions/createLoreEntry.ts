"use server";

import { prisma } from "@/lib/prisma";
import getUser from "@/shared/api/services/getUser";
import {
  LoreEntrySchema,
  LoreEntrySchemaType,
} from "../schemas/LoreEntrySchema";
import { toNullableString } from "../utils/optionalString";

async function createLoreEntry(
  campaignId: number,
  formData: LoreEntrySchemaType,
) {
  const user = await getUser();

  const validation = LoreEntrySchema.safeParse(formData);
  if (!validation.success) {
    return {
      success: false as const,
      message: "Lore entry form validation failed",
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

  const data = validation.data;
  const entry = await prisma.campaignLoreEntry.create({
    data: {
      name: data.name,
      type: data.type,
      era: toNullableString(data.era),
      source: toNullableString(data.source),
      description: toNullableString(data.description),
      additionalNotes: toNullableString(data.additionalNotes),
      campaign: {
        connect: { id: campaign.id },
      },
    },
  });

  return {
    success: true as const,
    data: entry,
  };
}

export default createLoreEntry;
