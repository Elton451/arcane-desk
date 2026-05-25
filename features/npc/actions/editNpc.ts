"use server";
import { prisma } from "@/lib/prisma";
import DOMPurify from "isomorphic-dompurify";
import { Npc } from "@/prisma/generated/prisma/client";

const editNpc = async (npcId: number, payload: Partial<Npc>) => {
  const sanitizedDescription = payload.description
    ? DOMPurify.sanitize(payload.description)
    : "";

  const npc = await prisma.npc.update({
    where: { id: npcId },
    data: {
      ...payload,
      description: sanitizedDescription,
    },
  });

  return {
    success: true,
    data: npc,
  };
};

export default editNpc;
