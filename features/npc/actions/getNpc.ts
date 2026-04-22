import { prisma } from "@/lib/prisma";

const getNpc = async (id: number) => {
  const npc = await prisma.npc.findUnique({
    where: { id },
  });

  if (npc) {
    return {
      success: true,
      data: npc,
    };
  }

  return {
    success: false,
    data: null,
  };
};

export default getNpc;
