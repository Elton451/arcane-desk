"use server";

import { prisma } from "@/lib/prisma";
import getUser from "@/shared/api/services/getUser";
import { LocationSchema, LocationSchemaType } from "../schemas/LocationSchema";
import { toNullableString } from "../utils/optionalString";

async function createLocation(
  campaignId: number,
  formData: LocationSchemaType,
) {
  const user = await getUser();

  const validation = LocationSchema.safeParse(formData);
  if (!validation.success) {
    return {
      success: false as const,
      message: "Location form validation failed",
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
  const location = await prisma.campaignLocation.create({
    data: {
      name: data.name,
      type: data.type,
      population: toNullableString(data.population),
      ruler: toNullableString(data.ruler),
      description: toNullableString(data.description),
      additionalNotes: toNullableString(data.additionalNotes),
      campaign: {
        connect: { id: campaign.id },
      },
    },
  });

  return {
    success: true as const,
    data: location,
  };
}

export default createLocation;
