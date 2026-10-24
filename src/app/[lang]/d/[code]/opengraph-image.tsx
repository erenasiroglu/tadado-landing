import { hasLocale } from "@/lib/i18n";
import { canRenderOgCopy, OG_SIZE, renderOgImage } from "@/lib/og-image";
import {
  fillTemplate,
  getSharedDeckPreview,
  getShareLinkCopy,
  normalizeShareCode,
} from "@/lib/share-links";

export const runtime = "nodejs";
export const alt = "Tadado AI deck";
export const size = OG_SIZE;
export const contentType = "image/png";

/** The OG font is Poppins (Latin only), so non-Latin deck names fall back to generic copy. */
const LATIN_TEXT = /^[\p{Script=Latin}\p{N}\p{P}\p{S}\s]+$/u;

export default async function SharedDeckOpenGraphImage({
  params,
}: {
  params: Promise<{ lang: string; code: string }>;
}) {
  const { lang, code: rawCode } = await params;
  const locale = hasLocale(lang) && canRenderOgCopy(lang) ? lang : "en";
  const copy = getShareLinkCopy(locale);
  const code = normalizeShareCode(rawCode);
  const deck = code ? await getSharedDeckPreview(code) : null;

  const samples = (deck?.samples ?? []).map((sample) => sample.word).filter((word) => LATIN_TEXT.test(word));
  const canShowName = deck ? LATIN_TEXT.test(deck.name) : false;

  return renderOgImage({
    title: deck && canShowName ? deck.name : copy.deckKicker,
    subtitle:
      samples.length > 0
        ? samples.join(" · ")
        : deck
          ? fillTemplate(copy.deckCards, { count: deck.card_count })
          : copy.notFoundBody,
    cta: copy.ogCta,
    footnote: locale === "tr" ? "Tabu · Heads Up · AI" : "Taboo · Heads Up · AI",
  });
}
