import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  DEFAULT_LOCALE,
  hasLocale,
  LOCALES,
  type Locale,
} from "@/lib/i18n-config";

function getLocale(request: NextRequest): Locale {
  const pathname = request.nextUrl.pathname;
  const segment = pathname.split("/")[1];
  if (segment && hasLocale(segment)) {
    return segment;
  }

  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/marketing") {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}`, request.url), 301);
  }

  if (pathname === "/link" || pathname.startsWith("/link/")) {
    return NextResponse.next();
  }

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) return NextResponse.next();

  const skip =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".") ||
    pathname === "/terms-of-use" ||
    pathname === "/privacy-policy" ||
    pathname.startsWith("/.well-known") ||
    pathname === "/llms.txt" ||
    pathname === "/llms-full.txt" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/link";

  if (skip) return NextResponse.next();

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|images|.*\\..*).*)"],
};
