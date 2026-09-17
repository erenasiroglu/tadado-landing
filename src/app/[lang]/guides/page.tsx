import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Footer } from "@/components/landing/Footer";
import { BackLink } from "@/components/landing/BackLink";
import { Header } from "@/components/landing/Header";
import { SeoGuides } from "@/components/landing/SeoGuides";
import { hasLocale, localeHref, LOCALES, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";
import { buildLanguageAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/guides">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.seoGuides.title} | Tadado`,
    description: dict.seoGuides.subtitle,
    alternates: {
      canonical: `https://tadado.app/${lang}/guides`,
      languages: buildLanguageAlternates("guides"),
    },
  };
}

export default async function GuidesPage({ params }: PageProps<"/[lang]/guides">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main className="flex-1 py-16">
        <div className="section-shell">
          <SeoGuides locale={locale} dict={dict} />
          <div className="mt-10">
            <BackLink href={localeHref(locale)}>{dict.compare.back}</BackLink>
          </div>
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
