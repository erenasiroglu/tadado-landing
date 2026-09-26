import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { BackLink } from "@/components/landing/BackLink";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { SupportPageContent } from "@/components/landing/SupportPageContent";
import { hasLocale, localeHref, LOCALES, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";
import { buildLanguageAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/support">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.support.title} | Tadado`,
    description: dict.support.subtitle,
    alternates: {
      canonical: `https://tadado.app/${lang}/support`,
      languages: buildLanguageAlternates("support"),
    },
  };
}

export default async function SupportPage({ params }: PageProps<"/[lang]/support">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main className="flex-1 bg-[#1a0f28]">
        <div className="section-shell py-12 md:py-14">
          <BackLink href={localeHref(locale)}>{dict.support.back}</BackLink>
          <div className="mt-8">
            <SupportPageContent dict={dict} locale={locale} />
          </div>
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
