import "server-only";

import {
  getAlternativeHref,
  getAlternativePageBySlug,
  getAlternativePageContent,
  SEO_ALTERNATIVE_IDS,
  alternativeSlugFor,
} from "@/lib/alternative-pages";
import { getAllBlogSlugs, getBlogPost, getBlogPosts } from "@/lib/blog";
import { BRAND } from "@/lib/brand";
import { getDeckHubCopy, getDeckPageContent } from "@/lib/deck-seo-content";
import { deckKeyFromSlug, deckPagePath, deckSlugFor, SEO_DECK_KEYS } from "@/lib/deck-slugs";
import {
  gameComparisonHref,
  getGameComparison,
  getGameComparisons,
} from "@/lib/game-comparisons";
import { hasLocale, LOCALES, type Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/i18n-server";
import { getModePage, isModePageId, MODE_PAGE_IDS, modePageHref } from "@/lib/mode-pages";
import { PRICING_PLAN, pricingMarkdownLines } from "@/lib/pricing-plan";
import { getAppStoreUrl, getPlayStoreUrl, getSmartStoreUrl } from "@/lib/store-links";

/**
 * Markdown twins of the public pages, for AI agents and LLM crawlers.
 * Any page URL + `.md` (or a request with `Accept: text/markdown`) returns this.
 */

const abs = (path: string) => `${BRAND.domain}${path}`;

function bullets(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function faqBlock(faq: { q: string; a: string }[] | undefined, title = "FAQ"): string[] {
  if (!faq?.length) return [];
  return [`## ${title}`, "", ...faq.flatMap(({ q, a }) => [`### ${q}`, "", a, ""])];
}

function frontMatter(fields: Record<string, string>): string[] {
  const esc = (v: string) => JSON.stringify(v);
  return [
    "---",
    ...Object.entries(fields).map(([k, v]) => `${k}: ${esc(v)}`),
    "---",
    "",
  ];
}

function appFooter(locale: Locale): string[] {
  return [
    "---",
    "",
    "## Get Tadado",
    "",
    `- [App Store (iOS)](${getAppStoreUrl(locale)})`,
    `- [Google Play (Android)](${getPlayStoreUrl(locale)})`,
    `- [Smart download link (picks the right store)](${getSmartStoreUrl(locale)})`,
    "",
    `Free to start with the Tadado Mix deck. Premium: ${PRICING_PLAN.premiumWeekly.trialDays} days free, then $${PRICING_PLAN.premiumWeekly.priceUsd}/week. AI credit packs from $${PRICING_PLAN.aiCreditPacks[0].priceUsd}. No ads.`,
    "",
    `Site index for agents: ${abs("/llms.txt")} · MCP server: ${abs("/api/mcp")}`,
    "",
  ];
}

function doc(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  body: string[],
): string {
  return [
    ...frontMatter({ title, description, url: abs(path), language: locale }),
    `# ${title}`,
    "",
    description ? `> ${description}` : "",
    "",
    ...body,
    "",
    ...appFooter(locale),
  ]
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}

async function homeMarkdown(locale: Locale): Promise<string> {
  const dict = await getDictionary(locale);
  const body: string[] = [
    `**${dict.hero.title}** ${dict.hero.subtitle}`,
    "",
    `## ${dict.howItWorks.title}`,
    "",
    ...dict.howItWorks.steps.map((s, i) => `${i + 1}. **${s.title}**: ${s.body}`),
    "",
    "## Game modes",
    "",
    ...MODE_PAGE_IDS.map((id) => {
      const m = getModePage(locale, id);
      return `- [${m.name}](${abs(modePageHref(locale, id))}): ${m.tagline}`;
    }),
    "",
    "## Decks",
    "",
    ...SEO_DECK_KEYS.map((key) => {
      const d = getDeckPageContent(locale, key);
      return `- [${d.h1}](${abs(deckPagePath(locale, key))}): ${d.metaDescription}`;
    }),
    "",
    "## Pricing (USD)",
    "",
    ...pricingMarkdownLines(),
    "",
    ...faqBlock(dict.faq.items, dict.faq.title),
  ];
  return doc(locale, `/${locale}`, dict.meta.title, dict.meta.description, body);
}

function modesHubMarkdown(locale: Locale): string {
  const body = MODE_PAGE_IDS.flatMap((id) => {
    const m = getModePage(locale, id);
    return [`## [${m.name}](${abs(modePageHref(locale, id))}.md)`, "", m.tagline, ""];
  });
  return doc(locale, `/${locale}/modes`, "Tadado game modes", "", body);
}

function modeMarkdown(locale: Locale, id: (typeof MODE_PAGE_IDS)[number]): string {
  const m = getModePage(locale, id);
  const body = [
    m.hook,
    "",
    ...m.facts.map((f) => `- **${f.label}:** ${f.value}`),
    "",
    "## How to play",
    "",
    ...m.steps.map((s, i) => `${i + 1}. **${s.title}**: ${s.body}`),
    "",
    "## Features",
    "",
    ...m.features.map((f) => `- **${f.title}:** ${f.body}`),
    "",
    m.knownAs ? `${m.knownAs} ${m.aliases.join(", ")}` : "",
    "",
    ...faqBlock(m.faq),
  ];
  return doc(locale, modePageHref(locale, id), m.h1, m.metaDescription, body);
}

function decksHubMarkdown(locale: Locale): string {
  const hub = getDeckHubCopy(locale);
  const body = SEO_DECK_KEYS.map((key) => {
    const d = getDeckPageContent(locale, key);
    const price = key === "mix" ? "free" : "Premium";
    return `- [${d.h1}](${abs(deckPagePath(locale, key))}.md) (${price}): ${d.metaDescription}`;
  });
  return doc(locale, `/${locale}/decks`, hub.title, hub.description, body);
}

function deckMarkdown(locale: Locale, slug: string): string | null {
  const key = deckKeyFromSlug(locale, slug);
  if (!key) return null;
  const d = getDeckPageContent(locale, key);
  const body = [
    d.heroSubtitle,
    "",
    `- **Price:** ${key === "mix" ? "free for everyone" : `included in Tadado Premium (${PRICING_PLAN.premiumWeekly.trialDays} days free, then $${PRICING_PLAN.premiumWeekly.priceUsd}/week)`}`,
    "",
    `## ${d.whatIsTitle}`,
    "",
    d.whatIsBody,
    "",
    `## ${d.insideTitle}`,
    "",
    bullets(d.insideBullets),
    "",
    `## ${d.samplesTitle}`,
    "",
    d.sampleWords.join(", "),
    "",
    `## ${d.playTitle}`,
    "",
    d.playBody,
    "",
    ...faqBlock(d.faq),
  ];
  return doc(locale, deckPagePath(locale, key), d.h1, d.metaDescription, body);
}

async function blogIndexMarkdown(locale: Locale): Promise<string> {
  const posts = await getBlogPosts(locale);
  const body = posts.map(
    (p) => `- [${p.title}](${abs(`/${locale}/blog/${p.slug}`)}.md) (${p.date}): ${p.description}`,
  );
  return doc(locale, `/${locale}/blog`, "Tadado blog", "", body);
}

async function blogPostMarkdown(locale: Locale, slug: string): Promise<string | null> {
  const post = await getBlogPost(locale, slug);
  if (!post) return null;
  const body = [`_Published ${post.date}${post.author ? ` by ${post.author}` : ""}_`, "", post.contentMarkdown];
  return doc(locale, `/${locale}/blog/${slug}`, post.title, post.description, body);
}

function compareHubMarkdown(locale: Locale): string {
  const body = getGameComparisons(locale).map(
    (c) => `- [${c.h1}](${abs(gameComparisonHref(locale, c.slug))}.md): ${c.tagline}`,
  );
  return doc(locale, `/${locale}/compare`, "Tadado vs other party games", "", body);
}

function compareMarkdown(locale: Locale, slug: string): string | null {
  const c = getGameComparison(locale, slug);
  if (!c) return null;
  const body = [
    c.hook,
    "",
    ...c.about,
    "",
    `| Feature | Tadado | ${c.game} |`,
    "| --- | --- | --- |",
    ...c.rows.map((r) => `| ${r.feature} | ${r.tadado} | ${r.other} |`),
    "",
    `## When to pick ${c.game}`,
    "",
    bullets(c.pickThem),
    "",
    "## When to pick Tadado",
    "",
    bullets(c.pickTadado),
    "",
    "## How to play it in Tadado",
    "",
    ...c.steps.map((s, i) => `${i + 1}. ${s}`),
    "",
    ...faqBlock(c.faq),
  ];
  return doc(locale, gameComparisonHref(locale, slug), c.h1, c.metaDescription, body);
}

function alternativeMarkdown(locale: Locale, slug: string): string | null {
  const a = getAlternativePageBySlug(locale, slug);
  if (!a) return null;
  const body = [
    a.heroSubtitle,
    "",
    `## ${a.introTitle}`,
    "",
    ...a.introParagraphs.flatMap((p) => [p, ""]),
    `## ${a.reasonsTitle}`,
    "",
    bullets(a.reasons),
    "",
    `## ${a.compareTitle}`,
    "",
    `| Feature | ${a.compareColumnTadado} | ${a.compareColumnOther} |`,
    "| --- | --- | --- |",
    ...a.compareRows.map((r) => `| ${r.feature} | ${r.tadado} | ${r.alternative} |`),
    "",
    a.compareNote,
    "",
    ...faqBlock(a.faq, a.faqTitle),
    `_${a.disclaimer}_`,
  ];
  return doc(locale, getAlternativeHref(locale, a.id), a.h1, a.metaDescription, body);
}

function alternativesHubMarkdown(locale: Locale): string {
  const body = SEO_ALTERNATIVE_IDS.map((id) => {
    const a = getAlternativePageContent(locale, id);
    return `- [${a.h1}](${abs(getAlternativeHref(locale, id))}.md): ${a.metaDescription}`;
  });
  return doc(locale, `/${locale}/alternatives`, "Tadado alternatives", "", body);
}

/** Returns Markdown for a site path (segments without the `.md` suffix), or null if unknown. */
export async function renderPageMarkdown(segments: string[]): Promise<string | null> {
  const [lang = "en", section, slug, ...rest] = segments.map(decodeURIComponent);
  if (!hasLocale(lang) || rest.length) return null;
  const locale: Locale = lang;

  if (!section) return homeMarkdown(locale);
  switch (section) {
    case "modes":
      if (!slug) return modesHubMarkdown(locale);
      return isModePageId(slug) ? modeMarkdown(locale, slug) : null;
    case "decks":
      return slug ? deckMarkdown(locale, slug) : decksHubMarkdown(locale);
    case "blog":
      return slug ? blogPostMarkdown(locale, slug) : blogIndexMarkdown(locale);
    case "compare":
      return slug ? compareMarkdown(locale, slug) : compareHubMarkdown(locale);
    case "alternatives":
      return slug ? alternativeMarkdown(locale, slug) : alternativesHubMarkdown(locale);
    default:
      return null;
  }
}

/** Every path that has a Markdown twin (used for static generation). */
export function allMarkdownPaths(): string[][] {
  const paths: string[][] = [[]];
  for (const locale of LOCALES) {
    paths.push(
      [locale],
      [locale, "modes"],
      ...MODE_PAGE_IDS.map((id) => [locale, "modes", id]),
      [locale, "decks"],
      ...SEO_DECK_KEYS.map((key) => [locale, "decks", deckSlugFor(locale, key)]),
      [locale, "blog"],
      [locale, "compare"],
      ...getGameComparisons(locale).map((c) => [locale, "compare", c.slug]),
      [locale, "alternatives"],
      ...SEO_ALTERNATIVE_IDS.map((id) => [locale, "alternatives", alternativeSlugFor(locale, id)]),
    );
  }
  for (const { locale, slug } of getAllBlogSlugs()) paths.push([locale, "blog", slug]);
  return paths;
}
