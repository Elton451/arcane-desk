"use server";
import { auth0 } from "@/lib/auth0";
import { INpc } from "../types/INpc";
import { prisma } from "@/lib/prisma";

const listNpcs = async (
  campaignId: number,
  search?: string,
): Promise<INpc[]> => {
  const session = await auth0.getSession();

  if (!session || !session.user || !session.user.email) {
    throw new Error("Unauthorized: User not authenticated.");
  }

  const user = await prisma.user.findUnique({
    where: { auth0Id: session.user.sub },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const npcs = await prisma.npc.findMany({
    where: {
      campaignId: campaignId,
      campaign: {
        ownerId: user.id,
      },
    },
    orderBy: { name: "asc" },
  });

  return npcs;
};

export default listNpcs;
