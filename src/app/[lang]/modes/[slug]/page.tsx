import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { ModePageContent } from "@/components/landing/modes/ModePageContent";
import { BRAND } from "@/lib/brand";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";
import {
  allModePageParams,
  getModePage,
  isModePageId,
  modePageHref,
  modePageLanguageAlternates,
  modesHubHref,
} from "@/lib/mode-pages";
import { getAppStoreUrl, getPlayStoreUrl } from "@/lib/store-links";

export const dynamicParams = false;

export function generateStaticParams() {
  return allModePageParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/modes/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isModePageId(slug)) return {};
  const page = getModePage(lang, slug);

  const canonical = `${BRAND.domain}${modePageHref(lang, slug)}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical,
      languages: modePageLanguageAlternates(slug),
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: canonical,
    },
  };
}

export default async function ModePage({
  params,
}: PageProps<"/[lang]/modes/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isModePageId(slug)) notFound();

  const locale = lang as Locale;
  const page = getModePage(locale, slug);
  const dict = await getDictionary(locale);
  const pageUrl = `${BRAND.domain}${modePageHref(locale, slug)}`;

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
          name: dict.modePages.breadcrumb,
          item: `${BRAND.domain}${modesHubHref(locale)}`,
        },
        { "@type": "ListItem", position: 3, name: page.name, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.metaTitle,
      description: page.metaDescription,
      url: pageUrl,
      inLanguage: locale,
      isPartOf: { "@type": "WebSite", name: BRAND.name, url: BRAND.domain },
    },
    {
      "@context": "https://schema.org",
      "@type": ["MobileApplication", "VideoGame"],
      name: BRAND.name,
      url: pageUrl,
      description: page.hook,
      author: { "@type": "Organization", name: BRAND.developer },
      operatingSystem: "iOS, Android",
      applicationCategory: "GameApplication",
      gamePlatform: ["iOS", "Android"],
      playMode: "MultiPlayer",
      genre: ["Party game", "Word game"],
      inLanguage: locale,
      featureList: page.features.map((feature) => feature.title),
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      downloadUrl: [getAppStoreUrl(locale), getPlayStoreUrl(locale)],
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
          <ModePageContent locale={locale} dict={dict} id={slug} page={page} />
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
