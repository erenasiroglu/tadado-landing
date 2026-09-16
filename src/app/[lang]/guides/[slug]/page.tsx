import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import { getBlogPost } from "@/lib/blog";
import { hasLocale, localeHref, LOCALES, type Locale } from "@/lib/i18n";
import { buildLanguageAlternates } from "@/lib/seo";
import { getSeoGuides } from "@/lib/seo-guides";

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of LOCALES) {
    for (const guide of getSeoGuides(lang as Locale)) {
      params.push({ lang, slug: guide.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/guides/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const guides = getSeoGuides(lang);
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) return {};

  return {
    title: `${guide.label} | Tadado`,
    description: guide.label,
    alternates: {
      canonical: `https://tadado.app/${lang}/guides/${slug}`,
      languages: buildLanguageAlternates(`guides/${slug}`),
    },
  };
}

export default async function GuidePage({ params }: PageProps<"/[lang]/guides/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const guides = getSeoGuides(locale);
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();

  const blogPost = await getBlogPost(locale, slug);
  if (blogPost) {
    redirect(localeHref(locale, `blog/${slug}`));
  }

  redirect(localeHref(locale, "guides"));
}
