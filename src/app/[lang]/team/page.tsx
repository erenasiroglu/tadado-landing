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
      <main className="flex-1 bg-[#2a0a3b]">
        <div className="section-shell py-12 md:py-14">
          <Link
            href={localeHref(locale)}
            className="inline-flex cursor-pointer items-center text-sm font-semibold text-amber transition-colors hover:text-amber/85"
          >
            ← {dict.team.back}
          </Link>
          <div className="mt-8 max-w-5xl">
            <Team dict={dict} locale={locale} />
          </div>
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
