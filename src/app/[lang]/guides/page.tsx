import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Footer } from "@/components/landing/Footer";
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
          <p className="mt-10 text-sm text-lavender">
            <Link href={localeHref(locale)} className="text-amber hover:underline">
              {dict.compare.back}
            </Link>
          </p>
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
