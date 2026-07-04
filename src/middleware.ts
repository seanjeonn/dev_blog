import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n/config";
import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "NEXT_LOCALE";

/** Minimal Accept-Language parse: first tag starting with "ko" wins, else default. */
function detectFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;
  const tags = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase())
    .filter(Boolean);
  for (const tag of tags) {
    if (tag.startsWith("ko")) return "ko";
    if (tag.startsWith("en")) return "en";
  }
  return defaultLocale;
}

function resolveLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value;
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;
  return detectFromAcceptLanguage(request.headers.get("accept-language"));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocalePrefix) return NextResponse.next();

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(COOKIE_NAME, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  // Skip Next internals, API, the RSS feed, and any file with an extension
  // (fonts, images, resume.pdf, favicon) so they are never locale-redirected.
  matcher: ["/((?!_next|api|feed\\.xml|.*\\.).*)"],
};
