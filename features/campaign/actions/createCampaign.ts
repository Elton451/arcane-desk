"use server";
import { prisma } from "@/lib/prisma";
import {
  CampaignFormSchema,
  CampaignFormType,
} from "../schemas/CampaignFormSchema";
import { auth0 } from "@/lib/auth0";

async function createCampaign(formData: CampaignFormType) {
  const session = await auth0.getSession();

  if (!session) {
    throw new Error("User not authenticated");
  }

  const dbUser = await prisma.user.findUnique({
    where: { auth0Id: session.user.sub },
    select: { id: true },
  });

  if (!dbUser) {
    throw new Error("User not found");
  }

  const validation = CampaignFormSchema.safeParse(formData);
  if (!validation.success) {
    return {
      success: false,
      message: "Campaign Form Validation Failed",
      error: validation.error,
    };
  }

  try {
    const campaign = await prisma.campaign.create({
      data: {
        name: formData.name,
        description: formData.description,
        ownerId: dbUser.id,
      },
    });

    return { success: true, data: campaign };
  } catch (err) {
    console.error(err);
  }
}

export default createCampaign;
