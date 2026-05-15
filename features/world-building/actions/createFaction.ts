"use server";

import { prisma } from "@/lib/prisma";
import getUser from "@/shared/api/services/getUser";
import { FactionSchema, FactionSchemaType } from "../schemas/FactionSchema";
import { toNullableString } from "../utils/optionalString";

async function createFaction(campaignId: number, formData: FactionSchemaType) {
  const user = await getUser();

  const validation = FactionSchema.safeParse(formData);
  if (!validation.success) {
    return {
      success: false as const,
      message: "Faction form validation failed",
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
  const faction = await prisma.campaignFaction.create({
    data: {
      name: data.name,
      type: data.type,
      leader: toNullableString(data.leader),
      goals: toNullableString(data.goals),
      description: toNullableString(data.description),
      additionalNotes: toNullableString(data.additionalNotes),
      campaign: {
        connect: { id: campaign.id },
      },
    },
  });

  return {
    success: true as const,
    data: faction,
  };
}

export default createFaction;
