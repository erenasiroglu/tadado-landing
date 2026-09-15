import type { MetadataRoute } from "next";

import { getAllBlogSlugs } from "@/lib/blog";
import { BRAND } from "@/lib/brand";
import { LOCALES } from "@/lib/i18n-config";
import { buildLanguageAlternates } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BRAND.domain;
  const entries: MetadataRoute.Sitemap = [];
  const landingLanguages = buildLanguageAlternates();

  for (const locale of LOCALES) {
    entries.push({
      url: `${base}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: locale === "en" ? 1 : 0.9,
      alternates: { languages: landingLanguages },
    });
  }

  const affiliateLanguages = buildLanguageAlternates("affiliate");
  const partnershipsLanguages = buildLanguageAlternates("partnerships");
  const compareLanguages = buildLanguageAlternates("compare");
  const teamLanguages = buildLanguageAlternates("team");

  for (const locale of LOCALES) {
    entries.push(
      {
        url: `${base}/${locale}/affiliate`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: affiliateLanguages },
      },
      {
        url: `${base}/${locale}/partnerships`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: partnershipsLanguages },
      },
      {
        url: `${base}/${locale}/compare`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.75,
        alternates: { languages: compareLanguages },
      },
      {
        url: `${base}/${locale}/team`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.65,
        alternates: { languages: teamLanguages },
      },
    );
  }

  entries.push({
    url: `${base}/llms.txt`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  });

  entries.push({
    url: `${base}/llms-full.txt`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  });

  entries.push(
    { url: `${base}/terms-of-use`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  );

  const blogLocales = new Set<string>();
  for (const { locale, slug } of getAllBlogSlugs()) {
    blogLocales.add(locale);
    entries.push({
      url: `${base}/${locale}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const locale of blogLocales) {
    entries.push({
      url: `${base}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return entries;
}
