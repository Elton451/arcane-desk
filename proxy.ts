import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

const locales = ["en-US", "pt-BR"];
const defaultLocale = "en-US";

function getLocale(request: NextRequest) {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => (headers[key] = value));

  const negotiator = new Negotiator({ headers });
  const languages = negotiator.languages();

  return match(languages, locales, defaultLocale);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.includes(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
