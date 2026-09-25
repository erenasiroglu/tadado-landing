import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AlternativeDetailContent } from "@/components/landing/AlternativeDetailContent";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import {
  allAlternativeSlugParams,
  getAlternativePageBySlug,
  alternativeIdFromSlug,
} from "@/lib/alternative-pages";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";
import { buildAlternativeLanguageAlternates } from "@/lib/seo";
import { BRAND } from "@/lib/brand";

export function generateStaticParams() {
  return allAlternativeSlugParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/alternatives/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};

  const content = getAlternativePageBySlug(lang, slug);
  if (!content) return {};

  const id = alternativeIdFromSlug(lang, slug);
  if (!id) return {};

  const canonical = `${BRAND.domain}/${lang}/alternatives/${slug}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical,
      languages: buildAlternativeLanguageAlternates(id),
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: canonical,
    },
  };
}

export default async function AlternativePage({ params }: PageProps<"/[lang]/alternatives/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const content = getAlternativePageBySlug(locale, slug);
  if (!content) notFound();

  const dict = await getDictionary(locale);

  const faqJsonLd =
    content.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }
      : null;

  return (
    <>
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}
      <Header locale={locale} dict={dict} />
      <main className="flex-1 bg-[#1a0f28]">
        <div className="section-shell py-12 md:py-14">
          <AlternativeDetailContent locale={locale} dict={dict} content={content} />
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
