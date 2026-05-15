"use server";
import { prisma } from "@/lib/prisma";
import { Npc } from "@/prisma/generated/prisma/client";

const editNpc = async (npcId: number, payload: Partial<Npc>) => {
  const npc = await prisma.npc.update({
    where: { id: npcId },
    data: {
      ...payload,
    },
  });

  return {
    success: true,
    data: npc,
  };
};

export default editNpc;
