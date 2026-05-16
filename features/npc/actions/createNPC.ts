"use server";

import { prisma } from "@/lib/prisma";
import { NpcSchema, NpcSchemaType } from "../schemas/NpcSchema";
import DOMPurify from "isomorphic-dompurify";
import { JSDOM } from "jsdom";
import getUser from "@/shared/api/services/getUser";

async function createNPC(campaignId: number, formData: NpcSchemaType) {
  const user = await getUser();

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
      ownerId: user.id,
    },
    select: { id: true },
  });

  if (!campaign) {
    return {
      success: false,
      message: "Campaign not found",
    };
  }

  const window = new JSDOM("").window;
  const purify = DOMPurify(window);
  const sanitizedDescription = purify.sanitize(validation.data.description);

  const npc = await prisma.npc.create({
    data: {
      description: sanitizedDescription,
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
