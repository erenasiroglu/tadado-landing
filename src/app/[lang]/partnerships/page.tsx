import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Partnerships } from "@/components/landing/Partnerships";
import { hasLocale, localeHref, LOCALES, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";
import { buildLanguageAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/partnerships">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.partnerships.title} | Tadado`,
    description: dict.partnerships.subtitle,
    alternates: {
      canonical: `https://tadado.app/${lang}/partnerships`,
      languages: buildLanguageAlternates("partnerships"),
    },
  };
}

export default async function PartnershipsPage({
  params,
}: PageProps<"/[lang]/partnerships">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main className="section-shell flex-1 py-16">
        <Link href={localeHref(locale)} className="text-sm text-amber hover:underline">
          ← {dict.partnerships.back}
        </Link>
        <div className="mt-8">
          <Partnerships dict={dict} locale={locale} variant="page" />
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
