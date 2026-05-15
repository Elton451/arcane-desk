import { prisma } from "@/lib/prisma";

const getSession = async (id: number) => {
  const session = await prisma.campaignSession.findUnique({
    where: { id },
  });

  if (session) {
    return {
      success: true,
      data: session,
    };
  }

  return {
    success: false,
    data: null,
  };
};

export default getSession;
