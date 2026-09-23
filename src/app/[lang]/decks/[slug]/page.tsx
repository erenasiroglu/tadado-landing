import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { DeckDetailContent } from "@/components/landing/DeckDetailContent";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { getDeckPageContent } from "@/lib/deck-seo-content";
import { allDeckSlugParams, deckKeyFromSlug } from "@/lib/deck-slugs";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";
import { buildDeckLanguageAlternates, buildDeckPageJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return allDeckSlugParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/decks/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const key = deckKeyFromSlug(lang, slug);
  if (!key) return {};

  const content = getDeckPageContent(lang, key);
  const canonical = `https://tadado.app/${lang}/decks/${slug}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical,
      languages: buildDeckLanguageAlternates(key),
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: canonical,
    },
  };
}

export default async function DeckDetailPage({ params }: PageProps<"/[lang]/decks/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const deckKey = deckKeyFromSlug(locale, slug);
  if (!deckKey) notFound();

  const dict = await getDictionary(locale);
  const content = getDeckPageContent(locale, deckKey);
  const deckName = dict.decks.items[deckKey].name;
  const jsonLd = buildDeckPageJsonLd(locale, deckKey, content, deckName, slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header locale={locale} dict={dict} />
      <main className="flex-1 bg-[#1a0f28]">
        <div className="section-shell py-12 md:py-14">
          <DeckDetailContent locale={locale} deckKey={deckKey} dict={dict} />
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
