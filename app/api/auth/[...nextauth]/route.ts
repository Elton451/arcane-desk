import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

const CLIENT_ID = process.env.AUTH_AUTH0_ID;
const CLIENT_SECRET = process.env.AUTH_AUTH0_SECRET;
const ISSUER_BASE_URL = process.env.AUTH_AUTH0_ISSUER;

if (
  CLIENT_ID === undefined ||
  CLIENT_SECRET === undefined ||
  ISSUER_BASE_URL === undefined
) {
  throw new Error("Missing Auth0 environment variables");
}

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      issuer: ISSUER_BASE_URL,
    }),
  ],
});

export { handler as GET, handler as POST };
