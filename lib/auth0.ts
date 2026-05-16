import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { prisma } from "./prisma";
import { NextResponse } from "next/server";

export const auth0 = new Auth0Client({
  onCallback: async (error, context, session) => {
    if (error) throw error;

    if (session?.user) {
      await prisma.user.upsert({
        where: { auth0Id: session.user.sub },
        update: {
          email: session.user.email!,
          name: session.user.name,
        },
        create: {
          displayName: session.user.name,
          auth0Id: session.user.sub,
          email: session.user.email!,
          name: session.user.name,
          lastLoginAt: new Date(),
        },
      });
    }

    return NextResponse.redirect(
      new URL(context.returnTo || "/", process.env.APP_BASE_URL),
    );
  },
});
