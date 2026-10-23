import { hasLocale, LOCALES } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";
import { canRenderOgCopy, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = "Tadado";
export const size = OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LocaleOpenGraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = hasLocale(lang) && canRenderOgCopy(lang) ? lang : "en";
  const dict = await getDictionary(locale);

  return renderOgImage({
    title: dict.hero.title,
    subtitle: dict.hero.subtitle,
    cta: dict.hero.ctaPrimary,
    footnote: dict.productBenefits.details.slice(2).join(" · "),
  });
}
