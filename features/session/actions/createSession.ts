"use server";

import { prisma } from "@/lib/prisma";
import getUser from "@/shared/api/services/getUser";
import DOMPurify from "isomorphic-dompurify";
import { SessionSchema, SessionSchemaType } from "../schemas/SessionSchema";

const createSession = async (
  campaignId: number,
  formData: SessionSchemaType,
) => {
  const user = await getUser();

  const sanitizedSummary = DOMPurify.sanitize(formData.sessionSummary);

  const validation = SessionSchema.safeParse(formData);
  if (!validation.success) {
    return {
      success: false,
      message: "Session form validation failed",
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

  const session = await prisma.campaignSession.create({
    data: {
      title: validation.data.title,
      date: new Date(validation.data.date),
      numberOfPlayers: validation.data.numberOfPlayers,
      sessionSummary: sanitizedSummary,
      highlights: validation.data.highlights || null,
      improvements: validation.data.improvements || null,
      notes: validation.data.notes || null,
      campaign: {
        connect: {
          id: campaign.id,
        },
      },
    },
  });

  return {
    success: true,
    data: session,
  };
};

export default createSession;
