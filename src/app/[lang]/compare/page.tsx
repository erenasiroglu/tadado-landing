import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Link from "next/link";

import { Tag } from "@/components/brand/tag";
import {
  CompareDownload,
  CompareLinkCard,
} from "@/components/landing/compare/CompareParts";
import { ComparisonTable } from "@/components/landing/compare/ComparisonTable";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import {
  getAlternativeHref,
  getAlternativeLinkLabel,
  getAlternativePageContent,
  SEO_ALTERNATIVE_IDS,
} from "@/lib/alternative-pages";
import { BRAND } from "@/lib/brand";
import { gameComparisonHref, getGameComparisons } from "@/lib/game-comparisons";
import { hasLocale, LOCALES, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";
import { buildLanguageAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/compare">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.compareHub.hubTitle} | Tadado`,
    description: dict.compareHub.hubSubtitle,
    alternates: {
      canonical: `${BRAND.domain}/${lang}/compare`,
      languages: buildLanguageAlternates("compare"),
    },
  };
}

export default async function ComparePage({
  params,
}: PageProps<"/[lang]/compare">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const copy = dict.compareHub;
  const games = getGameComparisons(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.hubTitle,
    itemListElement: games.map((page, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: page.h1,
      url: `${BRAND.domain}${gameComparisonHref(locale, page.slug)}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header locale={locale} dict={dict} />
      <main className="section-shell flex-1 py-12 md:py-16">
        <header className="max-w-3xl">
          <Tag>{copy.eyebrow}</Tag>
          <h1 className="mt-5 text-4xl leading-[1.04] font-extrabold tracking-[-0.045em] text-balance text-foreground sm:text-5xl lg:text-6xl">
            {copy.hubTitle}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed">
            {copy.hubSubtitle}
          </p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {games.map((page) => (
              <li key={page.slug}>
                <Link
                  href={gameComparisonHref(locale, page.slug)}
                  className="inline-flex min-h-9 items-center rounded-full bg-mist px-4 text-sm font-bold text-ink ring-1 ring-ink/10 ring-inset transition-colors hover:bg-lilac"
                >
                  {page.game}
                </Link>
              </li>
            ))}
          </ul>
          <CompareDownload
            locale={locale}
            dict={dict}
            label={copy.ctaButton}
            className="mt-8"
          />
        </header>

        <section className="mt-20">
          <h2 className="text-display text-balance">{copy.localTitle}</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {copy.localSubtitle}
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((page) => (
              <li key={page.slug}>
                <CompareLinkCard
                  href={gameComparisonHref(locale, page.slug)}
                  title={page.game}
                  body={page.tagline}
                  cta={copy.compareLink}
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <h2 className="text-display text-balance">{copy.classicTitle}</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SEO_ALTERNATIVE_IDS.map((id) => (
              <li key={id}>
                <CompareLinkCard
                  href={getAlternativeHref(locale, id)}
                  title={getAlternativeLinkLabel(locale, id)}
                  body={getAlternativePageContent(locale, id).heroSubtitle}
                  cta={copy.compareLink}
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <h2 className="text-display text-balance">{dict.compare.title}</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {dict.compare.subtitle}
          </p>
          <div className="mt-10">
            <ComparisonTable
              rows={dict.compare.rows.map((row) => ({
                feature: row.feature,
                tadado: row.tadado,
                other: row.others,
              }))}
              featureLabel={dict.compare.columns.feature}
              tadadoLabel={dict.compare.columns.tadado}
              otherLabel={dict.compare.columns.others}
              labels={{
                yes: dict.a11y.yes,
                no: dict.a11y.no,
                partial: dict.a11y.partial,
                varies: copy.varies,
              }}
            />
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {dict.compare.note}
          </p>
        </section>

        <section className="mt-20 overflow-hidden rounded-lg surface-obsidian">
          <div className="grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:p-12">
            <div className="max-w-xl">
              <h2 className="text-3xl leading-[1.05] font-extrabold tracking-[-0.04em] text-balance text-cream sm:text-4xl">
                {copy.ctaTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-cream/75">
                {copy.ctaBody}
              </p>
            </div>
            <CompareDownload
              locale={locale}
              dict={dict}
              label={copy.ctaButton}
              dark
            />
          </div>
        </section>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
