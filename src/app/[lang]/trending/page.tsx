import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { BackLink } from "@/components/landing/BackLink";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { TrendingCardsGrid } from "@/components/landing/TrendingCardsGrid";
import { Badge } from "@/components/ui/badge";
import { hasLocale, localeHref, LOCALES, type Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/i18n-server";
import { buildLanguageAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/trending">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.trending.title} | Tadado`,
    description: dict.trending.subtitle,
    alternates: {
      canonical: `https://tadado.app/${lang}/trending`,
      languages: buildLanguageAlternates("trending"),
    },
  };
}

export default async function TrendingPage({ params }: PageProps<"/[lang]/trending">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main className="flex-1 bg-[#1c1129] py-12 md:py-16">
        <div className="section-shell">
          <BackLink href={localeHref(locale)}>{dict.compare.back}</BackLink>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-balance text-3xl font-extrabold tracking-tight text-cream sm:text-4xl">
                {dict.trending.title}
              </h1>
              <p className="mt-3 text-base text-cream/70 sm:text-lg">{dict.trending.subtitle}</p>
            </div>
            <Badge variant="outline" className="w-fit border-amber/30 bg-amber/10 text-amber">
              {dict.trending.badge}
            </Badge>
          </div>

          <div className="mt-10">
            <TrendingCardsGrid locale={locale} dict={dict} />
          </div>
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
