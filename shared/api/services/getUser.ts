"use server";
import { auth0 } from "@/lib/auth0";
import { prisma } from "@/lib/prisma";
import { User } from "@/prisma/generated/prisma/client";

const getUser = async (): Promise<User> => {
  const session = await auth0.getSession();

  if (!session) {
    throw new Error("User not authenticated");
  }

  const dbUser: User | null = await prisma.user.findUnique({
    where: { auth0Id: session.user.sub },
  });

  if (!dbUser) {
    throw new Error("User not found");
  }

  return dbUser;
};

export default getUser;
