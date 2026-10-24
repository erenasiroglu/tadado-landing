import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { GameComparisonContent } from "@/components/landing/compare/GameComparisonContent";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { BRAND } from "@/lib/brand";
import {
  allGameComparisonParams,
  gameComparisonHref,
  gameComparisonLanguageAlternates,
  getGameComparison,
} from "@/lib/game-comparisons";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";

export const dynamicParams = false;

export function generateStaticParams() {
  return allGameComparisonParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/compare/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const page = getGameComparison(lang, slug);
  if (!page) return {};

  const canonical = `${BRAND.domain}${gameComparisonHref(lang, slug)}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical,
      languages: gameComparisonLanguageAlternates(page.id),
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: canonical,
    },
  };
}

export default async function GameComparisonPage({
  params,
}: PageProps<"/[lang]/compare/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const page = getGameComparison(locale, slug);
  if (!page) notFound();

  const dict = await getDictionary(locale);
  const pageUrl = `${BRAND.domain}${gameComparisonHref(locale, slug)}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: BRAND.name,
          item: `${BRAND.domain}/${locale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: dict.footer.compare,
          item: `${BRAND.domain}/${locale}/compare`,
        },
        { "@type": "ListItem", position: 3, name: page.game, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header locale={locale} dict={dict} />
      <main className="flex-1">
        <div className="section-shell py-12 md:py-16">
          <GameComparisonContent locale={locale} dict={dict} page={page} />
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
