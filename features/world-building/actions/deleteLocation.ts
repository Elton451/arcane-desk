"use server";

import { prisma } from "@/lib/prisma";
import getUser from "@/shared/api/services/getUser";

async function deleteLocation(locationId: number) {
  const user = await getUser();

  const location = await prisma.campaignLocation.findFirst({
    where: {
      id: locationId,
      campaign: {
        ownerId: user.id,
      },
    },
  });

  if (!location) {
    return {
      success: false as const,
      message: "Location not found",
    };
  }

  await prisma.campaignLocation.delete({
    where: { id: locationId },
  });

  return {
    success: true as const,
    data: location,
  };
}

export default deleteLocation;
