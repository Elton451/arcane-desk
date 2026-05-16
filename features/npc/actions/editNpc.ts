"use server";
import { prisma } from "@/lib/prisma";
import DOMPurify from "isomorphic-dompurify";
import { JSDOM } from "jsdom";
import { Npc } from "@/prisma/generated/prisma/client";

const editNpc = async (npcId: number, payload: Partial<Npc>) => {
  const window = new JSDOM("").window;
  const purify = DOMPurify(window);
  const sanitizedDescription = payload.description
    ? purify.sanitize(payload.description)
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
