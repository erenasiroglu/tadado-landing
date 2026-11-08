import type { Viewport } from "next";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";

import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { AttributionProvider } from "@/components/analytics/AttributionProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { hasLocale, isRtlLocale, LOCALES, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";
import { isHalloweenSeasonalContent, isNightLandingTheme } from "@/lib/landing-theme";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#140a25",
};

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
  // CSS is inlined, so faces are discovered at once; skip preloading all 10 files and fetch only what the page uses.
  preload: false,
});

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  // Home page title follows the season so Halloween searches land on the themed page.
  const meta = isHalloweenSeasonalContent()
    ? { title: dict.halloween.metaTitle, description: dict.halloween.metaDescription }
    : dict.meta;
  return buildPageMetadata(lang, { ...dict, meta });
}

/** Root layout per locale so `<html lang>` and `dir` match the page language. */
export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dir = isRtlLocale(locale) ? "rtl" : "ltr";
  const night = isNightLandingTheme();

  return (
    <html
      lang={locale}
      dir={dir}
      data-scroll-behavior="smooth"
      className={cn("h-full antialiased", poppins.variable, night && "season-night")}
    >
      <body
        className={cn(
          "flex min-h-dvh flex-col font-sans text-foreground antialiased",
          night ? "season-night" : "bg-paper",
        )}
      >
        <AnalyticsScripts />
        <AttributionProvider />
        <MotionProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
