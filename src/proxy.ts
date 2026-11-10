import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { detectLocaleFromAcceptLanguage } from "@/lib/smart-app-link";
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

  const preferred = request.cookies.get("NEXT_LOCALE")?.value;
  if (preferred && hasLocale(preferred)) return preferred;

  return detectLocaleFromAcceptLanguage(request.headers.get("accept-language")) ?? DEFAULT_LOCALE;
}

/** Agent Experience: `/<page>.md` or `Accept: text/markdown` serves the page's Markdown twin. */
function markdownRewrite(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;
  let pagePath: string | null = null;

  if (pathname.endsWith(".md")) {
    pagePath = pathname.slice(0, -3);
    if (pagePath === "/index") pagePath = "";
  } else {
    const accept = request.headers.get("accept") ?? "";
    const wantsMarkdown =
      accept.includes("text/markdown") && !accept.includes("text/html") && !pathname.includes(".");
    if (wantsMarkdown) pagePath = pathname === "/" ? "" : pathname.replace(/\/$/, "");
  }

  if (pagePath === null || pagePath.startsWith("/api") || pagePath.startsWith("/_next")) return null;

  const url = request.nextUrl.clone();
  url.pathname = `/api/md${pagePath}`;
  const res = NextResponse.rewrite(url);
  res.headers.set("Vary", "Accept");
  return res;
}

const AGENT_LINKS = [
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</.well-known/mcp.json>; rel="service-desc"; type="application/json"',
];

/** Sections that have a Markdown twin (keep in sync with src/lib/agent-markdown.ts). */
const MARKDOWN_SECTIONS = new Set(["modes", "decks", "blog", "compare", "alternatives"]);

function hasMarkdownTwin(pathname: string): boolean {
  const [, section, ...rest] = pathname.replace(/\/$/, "").split("/").slice(1);
  if (section === undefined) return true;
  return MARKDOWN_SECTIONS.has(section) && rest.length <= 1;
}

/** Advertise the Markdown twin and agent endpoints on HTML page responses. */
function withAgentLinks(res: NextResponse, pathname: string): NextResponse {
  const links: string[] = [...AGENT_LINKS];
  if (hasMarkdownTwin(pathname)) {
    links.unshift(`<${pathname.replace(/\/$/, "")}.md>; rel="alternate"; type="text/markdown"`);
  }
  res.headers.set("Link", links.join(", "));
  return res;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const markdown = markdownRewrite(request);
  if (markdown) return markdown;

  if (pathname === "/marketing" || pathname === "/support") {
    const locale = getLocale(request);
    const segment = pathname.slice(1);
    return NextResponse.redirect(new URL(`/${locale}/${segment}`, request.url), 301);
  }

  if (pathname === "/link" || pathname.startsWith("/link/")) {
    return NextResponse.next();
  }

  // App deep links (/d/<code>, /i/<code>) stay on the same URL (rewrite) so Android App Links
  // and Play Console checks see 200 instead of a locale redirect.
  const deckShare = pathname.match(/^\/d\/([^/]+)$/);
  const inviteShare = pathname.match(/^\/i\/([^/]+)$/);
  if (deckShare || inviteShare) {
    const locale = getLocale(request);
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.rewrite(rewriteUrl);
  }

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) return withAgentLinks(NextResponse.next(), pathname);

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
  matcher: ["/((?!_next|api|images|.*\\..*).*)", "/(.*\\.md)"],
};
