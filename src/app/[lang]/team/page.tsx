import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Team } from "@/components/landing/Team";
import { getDictionary, hasLocale, localeHref, LOCALES, type Locale } from "@/lib/i18n";
import { buildLanguageAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/team">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.team.title} | Tadado`,
    description: dict.team.subtitle,
    alternates: {
      canonical: `https://tadado.app/${lang}/team`,
      languages: buildLanguageAlternates("team"),
    },
  };
}

export default async function TeamPage({ params }: PageProps<"/[lang]/team">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main className="section-shell flex-1 py-16">
        <Link href={localeHref(locale)} className="text-sm text-amber hover:underline">
          ← {dict.team.back}
        </Link>
        <div className="mt-8">
          <Team dict={dict} locale={locale} variant="page" />
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
