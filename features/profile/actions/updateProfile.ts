"use server";

import { UpdateProfileSchema } from "@/features/profile/schemas/updateProfile.schema";
import { prisma } from "@/lib/prisma";
import getUser from "@/shared/api/services/getUser";

export default async function updateProfile(data: unknown) {
  const validation = UpdateProfileSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      message: "Invalid data.",
      error: validation.error,
    };
  }

  const user = await getUser();

  await prisma.user.update({
    where: { id: user.id },
    data: { displayName: validation.data.displayName },
  });

  return { success: true };
}
