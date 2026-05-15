"use server";

import { auth0 } from "@/lib/auth0";
import { prisma } from "@/lib/prisma";
import { ICampaignFilters } from "../types/ICampaignFilters";
import type { ICampaignResponsePage } from "../types/ICampaignResponsePage";

async function listCampaign({
  size = 6,
  page = 1,
  search,
}: ICampaignFilters): Promise<ICampaignResponsePage> {
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

  const where = {
    ownerId: dbUser.id,
    name: search,
  };

  const skip = (page - 1) * size;

  const [total, campaigns] = await prisma.$transaction([
    prisma.campaign.count({ where }),
    prisma.campaign.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: size,
      skip,
    }),
  ]);

  return {
    campaigns,
    pagination: { page, size, total },
  };
}

export default listCampaign;
