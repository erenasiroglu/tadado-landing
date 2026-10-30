import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { BackLink } from "@/components/landing/BackLink";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { OpenMetrics } from "@/components/landing/OpenMetrics";
import { hasLocale, localeHref, LOCALES, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";
import { buildLanguageAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/open">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.open.title} | Tadado`,
    description: dict.open.subtitle,
    alternates: {
      canonical: `https://tadado.app/${lang}/open`,
      languages: buildLanguageAlternates("open"),
    },
  };
}

export default async function OpenMetricsPage({ params }: PageProps<"/[lang]/open">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main className="section-shell flex-1 py-16">
        <BackLink href={localeHref(locale)}>{dict.open.back}</BackLink>
        <div className="mt-8">
          <OpenMetrics dict={dict} />
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
