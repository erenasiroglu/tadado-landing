import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Tag } from "@/components/brand/tag";
import { CompareDownload } from "@/components/landing/compare/CompareParts";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { ModeLinkCard } from "@/components/landing/modes/ModeLinkCard";
import { BRAND } from "@/lib/brand";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";
import {
  getModePage,
  MODE_PAGE_IDS,
  modePageHref,
  modePageLanguageAlternates,
  modesHubHref,
} from "@/lib/mode-pages";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/modes">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const canonical = `${BRAND.domain}${modesHubHref(lang)}`;

  return {
    title: dict.modePages.hubMetaTitle,
    description: dict.modePages.hubMetaDescription,
    alternates: { canonical, languages: modePageLanguageAlternates() },
    openGraph: {
      title: dict.modePages.hubMetaTitle,
      description: dict.modePages.hubMetaDescription,
      url: canonical,
    },
  };
}

export default async function ModesHubPage({
  params,
}: PageProps<"/[lang]/modes">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const copy = dict.modePages;
  const pages = MODE_PAGE_IDS.map((id) => ({ id, page: getModePage(locale, id) }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.hubTitle,
    itemListElement: pages.map(({ id, page }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: page.name,
      url: `${BRAND.domain}${modePageHref(locale, id)}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header locale={locale} dict={dict} />
      <main className="flex-1">
        <div className="section-shell py-12 md:py-16">
          <header className="max-w-3xl">
            <Tag>{copy.breadcrumb}</Tag>
            <h1 className="mt-5 text-4xl leading-[1.04] font-extrabold tracking-[-0.045em] text-balance text-foreground sm:text-5xl lg:text-6xl">
              {copy.hubTitle}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed">
              {copy.hubSubtitle}
            </p>
            <CompareDownload
              locale={locale}
              dict={dict}
              label={copy.ctaButton}
              source="mode_page"
              className="mt-8"
            />
          </header>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2">
            {pages.map(({ id, page }) => (
              <li key={id}>
                <ModeLinkCard
                  href={modePageHref(locale, id)}
                  eyebrow={copy.eyebrow}
                  title={page.name}
                  body={page.tagline}
                  cta={copy.explore}
                />
              </li>
            ))}
          </ul>
          <p className="mt-12 max-w-3xl text-xs leading-relaxed text-muted-foreground">
            {copy.disclaimer}
          </p>
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
