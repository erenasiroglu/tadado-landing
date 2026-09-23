import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { BackLink } from "@/components/landing/BackLink";
import { DecksHubGrid } from "@/components/landing/DecksHubGrid";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { getDeckHubCopy } from "@/lib/deck-seo-content";
import { hasLocale, localeHref, LOCALES, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";
import { buildDeckHubLanguageAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/decks">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const hub = getDeckHubCopy(lang);
  const canonical = `https://tadado.app/${lang}/decks`;

  return {
    title: `${hub.title} | Tadado`,
    description: hub.description,
    alternates: {
      canonical,
      languages: buildDeckHubLanguageAlternates(),
    },
  };
}

export default async function DecksHubPage({ params }: PageProps<"/[lang]/decks">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main className="flex-1 bg-[#1a0f28]">
        <div className="section-shell py-12 md:py-14">
          <BackLink href={localeHref(locale)}>
            {locale === "tr" ? "Ana sayfa" : "Home"}
          </BackLink>
          <div className="mt-8">
            <DecksHubGrid locale={locale} dict={dict} />
          </div>
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
