import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Link from "next/link";

import { CompareTable } from "@/components/landing/CompareTable";
import {
  getAlternativeHref,
  getAlternativeLinkLabel,
  SEO_ALTERNATIVE_IDS,
} from "@/lib/alternative-pages";
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
}: PageProps<"/[lang]/compare">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.compare.title} | Tadado`,
    description: dict.compare.subtitle,
    alternates: {
      canonical: `https://tadado.app/${lang}/compare`,
      languages: buildLanguageAlternates("compare"),
    },
  };
}

export default async function ComparePage({ params }: PageProps<"/[lang]/compare">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main className="section-shell flex-1 py-16">
        <BackLink href={localeHref(locale)}>{dict.compare.back}</BackLink>
        <div className="mt-8">
          <CompareTable dict={dict} locale={locale} />
        </div>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-lg font-bold text-cream">
            {locale === "tr" ? "Popüler alternatif rehberleri" : "Popular alternative guides"}
          </h2>
          <ul className="mt-4 flex flex-col gap-2">
            {SEO_ALTERNATIVE_IDS.map((id) => (
              <li key={id}>
                <Link
                  href={getAlternativeHref(locale, id)}
                  className="text-sm font-semibold text-amber hover:text-amber/80"
                >
                  {getAlternativeLinkLabel(locale, id)} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
