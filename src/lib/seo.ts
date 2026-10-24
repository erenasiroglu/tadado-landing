import type { Metadata } from "next";

import { alternativeLanguageAlternates } from "@/lib/alternative-pages/slugs";
import type { AlternativeId } from "@/lib/alternative-pages/types";
import { BRAND, PRICING } from "@/lib/brand";
import type { DeckKey } from "@/lib/deck-cards";
import { deckLanguageAlternates } from "@/lib/deck-slugs";
import type { DeckPageContent } from "@/lib/deck-page-types";
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

export function buildDeckLanguageAlternates(key: DeckKey): Record<string, string> {
  const paths = deckLanguageAlternates(key);
  const languages: Record<string, string> = {
    "x-default": `${BRAND.domain}/${paths["x-default"]}`,
  };
  for (const locale of LOCALES) {
    languages[locale] = `${BRAND.domain}/${paths[locale]}`;
  }
  return languages;
}

export function buildDeckHubLanguageAlternates(): Record<string, string> {
  return buildLanguageAlternates("decks");
}

export function buildAlternativeLanguageAlternates(id: AlternativeId): Record<string, string> {
  const paths = alternativeLanguageAlternates(id);
  const languages: Record<string, string> = {
    "x-default": `${BRAND.domain}/${paths["x-default"]}`,
  };
  for (const locale of LOCALES) {
    languages[locale] = `${BRAND.domain}/${paths[locale]}`;
  }
  return languages;
}

export function buildDeckPageJsonLd(
  locale: Locale,
  key: DeckKey,
  content: DeckPageContent,
  deckDisplayName: string,
  slug: string,
) {
  const pageUrl = `${BRAND.domain}/${locale}/decks/${slug}`;
  const hubUrl = `${BRAND.domain}/${locale}/decks`;

  return [
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
          name: "Decks",
          item: hubUrl,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: deckDisplayName,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: content.metaTitle,
      description: content.metaDescription,
      url: pageUrl,
      inLanguage: locale,
      isPartOf: { "@type": "WebSite", name: BRAND.name, url: BRAND.domain },
      about: {
        "@type": "SoftwareApplication",
        name: BRAND.name,
        applicationCategory: "GameApplication",
        operatingSystem: "iOS, Android",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: BRAND.name,
      operatingSystem: "iOS, Android",
      applicationCategory: "GameApplication",
      description: content.whatIsBody,
      downloadUrl: [getAppStoreUrl(locale), getPlayStoreUrl(locale)],
    },
    ...(content.faq?.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: content.faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          },
        ]
      : []),
  ];
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
          url: `/${locale}/opengraph-image`,
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
      images: [`/${locale}/twitter-image`],
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
          price: String(PRICING.singleDeckUsd),
          priceCurrency: "USD",
          name: "Single premium deck",
        },
        {
          "@type": "Offer",
          price: String(PRICING.aiStarterUsd),
          priceCurrency: "USD",
          name: "AI deck creation — Starter",
        },
        {
          "@type": "Offer",
          price: String(PRICING.aiPlusUsd),
          priceCurrency: "USD",
          name: "AI deck creation — Plus",
        },
        {
          "@type": "Offer",
          price: String(PRICING.aiProUsd),
          priceCurrency: "USD",
          name: "AI deck creation — Pro",
        },
        {
          "@type": "Offer",
          price: String(PRICING.fullAccessUsd),
          priceCurrency: "USD",
          name: "Tadado Full Access",
          description: "Every premium themed deck plus 100 AI deck creations",
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
    contentHtml?: string;
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

  const faq = post.contentHtml ? extractFaqPairs(post.contentHtml) : [];
  if (faq.length >= 2) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    });
  }

  return graph;
}

/** Question-style `<h3>` headings followed by a paragraph, as written in blog FAQ sections. */
function extractFaqPairs(html: string): { q: string; a: string }[] {
  const strip = (value: string) => value.replace(/<[^>]+>/g, "").trim();
  const pairs: { q: string; a: string }[] = [];
  const pattern = /<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g;
  for (const match of html.matchAll(pattern)) {
    const q = strip(match[1]);
    if (/[?？]$/.test(q)) pairs.push({ q, a: strip(match[2]) });
  }
  return pairs;
}
