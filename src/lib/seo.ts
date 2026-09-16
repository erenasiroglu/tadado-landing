import type { Metadata } from "next";

import { BRAND, PRICING } from "@/lib/brand";
import type { Dictionary } from "@/lib/i18n";
import { LOCALES, type Locale } from "@/lib/i18n-config";
import { getKeywordsString, getMarketSeoProfile } from "@/lib/seo-keywords";
import { getAppStoreUrl, getPlayStoreUrl } from "@/lib/store-links";
import { SOCIAL_LINKS } from "@/lib/social";

export function buildLanguageAlternates(path = ""): Record<string, string> {
  const clean = path.startsWith("/") ? path : path ? `/${path}` : "";
  const languages: Record<string, string> = {
    "x-default": `${BRAND.domain}/en${clean}`,
  };
  for (const locale of LOCALES) {
    languages[locale] = `${BRAND.domain}/${locale}${clean}`;
  }
  return languages;
}

export function buildPageMetadata(
  locale: Locale,
  dict: Dictionary,
  path = "",
): Metadata {
  const canonical = `${BRAND.domain}/${locale}${path ? `/${path}` : ""}`;
  const keywords = getKeywordsString(locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords,
    metadataBase: new URL(BRAND.domain),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
      types: {
        "text/plain": `${BRAND.domain}/llms.txt`,
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: canonical,
      siteName: BRAND.name,
      locale,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: BRAND.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/twitter-image"],
    },
    other: {
      "apple-itunes-app": "app-id=6753135485",
    },
  };
}

export function buildLandingJsonLd(locale: Locale, dict: Dictionary) {
  const market = getMarketSeoProfile(locale);

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: BRAND.name,
      url: `${BRAND.domain}/${locale}`,
      inLanguage: locale,
      description: dict.meta.description,
      keywords: market.keywords.join(", "),
      publisher: { "@type": "Organization", name: BRAND.developer },
      potentialAction: {
        "@type": "ReadAction",
        target: `${BRAND.domain}/llms.txt`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: dict.meta.title,
      description: dict.meta.description,
      url: `${BRAND.domain}/${locale}`,
      inLanguage: locale,
      isPartOf: { "@type": "WebSite", name: BRAND.name, url: BRAND.domain },
      about: {
        "@type": "SoftwareApplication",
        name: BRAND.name,
        applicationCategory: market.applicationCategory,
        operatingSystem: "iOS, Android",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: BRAND.developer,
      alternateName: BRAND.name,
      url: BRAND.domain,
      email: BRAND.supportEmail,
      sameAs: [
        SOCIAL_LINKS.instagram.href,
        SOCIAL_LINKS.tiktok.href,
        getAppStoreUrl(locale),
        getPlayStoreUrl(locale),
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: BRAND.name,
      author: { "@type": "Organization", name: BRAND.developer },
      operatingSystem: "iOS, Android",
      applicationCategory: market.applicationCategory,
      applicationSubCategory: "Word Game",
      keywords: market.keywords.join(", "),
      featureList: market.featureList,
      inLanguage: locale,
      offers: [
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          name: "Tadado Mix",
        },
        {
          "@type": "Offer",
          price: String(PRICING.themeDeckUsd),
          priceCurrency: "USD",
          name: "Theme deck",
        },
        {
          "@type": "Offer",
          price: String(PRICING.aiDeckUsd),
          priceCurrency: "USD",
          name: "AI deck creation",
        },
      ],
      description: dict.meta.description,
      downloadUrl: [getAppStoreUrl(locale), getPlayStoreUrl(locale)],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: dict.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ];
}

export function buildBlogPostJsonLd(
  locale: Locale,
  post: {
    title: string;
    description: string;
    slug: string;
    date: string;
    alternateSlug?: string;
    alternateLocale?: Locale;
  },
) {
  const url = `${BRAND.domain}/${locale}/blog/${post.slug}`;
  const graph: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      inLanguage: locale,
      author: { "@type": "Organization", name: BRAND.developer },
      publisher: { "@type": "Organization", name: BRAND.developer },
      mainEntityOfPage: url,
      isAccessibleForFree: true,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${BRAND.domain}/${locale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${BRAND.domain}/${locale}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: url,
        },
      ],
    },
  ];

  return graph;
}
