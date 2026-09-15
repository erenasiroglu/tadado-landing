import { notFound } from "next/navigation";

import {
  getDictionary,
  hasLocale,
  isRtlLocale,
  LOCALES,
  type Locale,
} from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return buildPageMetadata(lang, dict);
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dir = isRtlLocale(locale) ? "rtl" : "ltr";

  return <div lang={locale} dir={dir} className="contents">{children}</div>;
}
