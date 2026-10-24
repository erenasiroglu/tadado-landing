import { hasLocale } from "@/lib/i18n";
import { canRenderOgCopy, OG_SIZE, renderOgImage } from "@/lib/og-image";
import { getShareLinkCopy } from "@/lib/share-links";

export const runtime = "nodejs";
export const alt = "Tadado invitation";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function InviteOpenGraphImage({
  params,
}: {
  params: Promise<{ lang: string; code: string }>;
}) {
  const { lang } = await params;
  const locale = hasLocale(lang) && canRenderOgCopy(lang) ? lang : "en";
  const copy = getShareLinkCopy(locale);

  return renderOgImage({
    title: copy.inviteTitle,
    subtitle: copy.inviteBody,
    cta: copy.ogCta,
    footnote: locale === "tr" ? "Tabu · Heads Up · AI" : "Taboo · Heads Up · AI",
  });
}
