import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LegalPageShell } from "@/app/legal-layout";
import { BRAND } from "@/lib/brand";
import { getDictionary } from "@/lib/i18n-server";
import { hasLocale, localeHref, type Locale } from "@/lib/i18n-config";
import { getLegalPage } from "@/lib/legal";
import { buildLanguageAlternates } from "@/lib/seo";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  const { LOCALES } = await import("@/lib/i18n-config");
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const page = await getLegalPage(lang as Locale, "terms-of-use");
  if (!page) return {};
  return {
    title: `${page.title} | Tadado`,
    description: page.description,
    alternates: buildLanguageAlternates("terms-of-use"),
  };
}

export default async function TermsOfUsePage({ params }: PageProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const page = await getLegalPage(locale, "terms-of-use");
  const dict = await getDictionary(locale);
  if (!page) notFound();

  return (
    <LegalPageShell>
      <main className="section-shell max-w-3xl py-16 prose-blog">
        <h1 className="mt-6 text-4xl font-extrabold text-cream">{page.title}</h1>
        {page.updated ? (
          <p className="text-sm text-lavender">
            {dict.footer.legal}: {page.updated}
          </p>
        ) : null}
        <div dangerouslySetInnerHTML={{ __html: page.contentHtml }} />
        <p className="mt-8 text-sm text-cream/65">
          <Link href={localeHref(locale, "privacy-policy")} className="text-amber">
            {dict.footer.privacy}
          </Link>
          {" · "}
          <a href={`mailto:${BRAND.supportEmail}`} className="text-amber">
            {BRAND.supportEmail}
          </a>
        </p>
      </main>
    </LegalPageShell>
  );
}
