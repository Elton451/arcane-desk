import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { auth0 } from "./lib/auth0";

const locales = ["en-US", "pt-BR"];
const defaultLocale = "en-US";

function getLocale(request: NextRequest) {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => (headers[key] = value));

  const negotiator = new Negotiator({ headers });
  const languages = negotiator.languages();

  return match(languages, locales, defaultLocale);
}

export async function proxy(request: NextRequest) {
  const authRes = await auth0.middleware(request);
  const { pathname } = request.nextUrl;

  if (request.nextUrl.pathname.startsWith("/auth")) {
    return authRes;
  }

  const session = await auth0.getSession();
  console.log("🪚 session:", session);

  if (!session) {
    return NextResponse.redirect(`/auth/login`);
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  console.log("🪚 locale:", locale);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
