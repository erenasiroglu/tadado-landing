import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";

import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { AttributionProvider } from "@/components/analytics/AttributionProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { hasLocale, isRtlLocale, LOCALES, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

import "../globals.css";

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
  return buildPageMetadata(lang, dict);
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

  return (
    <html
      lang={locale}
      dir={dir}
      data-scroll-behavior="smooth"
      className={cn("h-full antialiased", poppins.variable)}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-foreground antialiased">
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
