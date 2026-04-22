"use server";

import { prisma } from "@/lib/prisma";
import { NpcSchema, NpcSchemaType } from "../schemas/NpcSchema";

async function createNPC(campaignId: number, formData: NpcSchemaType) {
  const validation = NpcSchema.safeParse(formData);
  if (!validation.success) {
    return {
      success: false,
      message: "NPC Form Validation Failed",
      error: validation.error,
    };
  }

  const campaign = await prisma.campaign.findFirst({
    where: {
      id: campaignId,
      ownerId: dbUser.id,
    },
    select: { id: true },
  });

  if (!campaign) {
    return {
      success: false,
      message: "Campaign not found",
    };
  }

  const npc = await prisma.npc.create({
    data: {
      description: formData.description,
      name: formData.name,
      role: formData.role,
      personality: formData.personality,
      campaign: {
        connect: {
          id: campaign.id,
        },
      },
    },
  });

  return {
    success: true,
    data: npc,
  };
}

export default createNPC;
