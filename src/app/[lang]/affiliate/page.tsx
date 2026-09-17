import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AffiliateProgram } from "@/components/landing/AffiliateProgram";
import { BackLink } from "@/components/landing/BackLink";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { hasLocale, localeHref, LOCALES, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";
import { buildLanguageAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/affiliate">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.affiliate.title} | Tadado`,
    description: dict.affiliate.subtitle,
    alternates: {
      canonical: `https://tadado.app/${lang}/affiliate`,
      languages: buildLanguageAlternates("affiliate"),
    },
  };
}

export default async function AffiliatePage({ params }: PageProps<"/[lang]/affiliate">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main className="section-shell flex-1 py-16">
        <BackLink href={localeHref(locale)}>{dict.affiliate.back}</BackLink>
        <div className="mt-8">
          <AffiliateProgram dict={dict} locale={locale} variant="page" />
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
