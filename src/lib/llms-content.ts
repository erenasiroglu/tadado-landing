import "server-only";

import { getAllBlogSlugs, getBlogPosts } from "@/lib/blog";
import { getAlternativeHref, getAlternativePageContent, SEO_ALTERNATIVE_IDS } from "@/lib/alternative-pages";
import { BRAND } from "@/lib/brand";
import { getDeckPageContent } from "@/lib/deck-seo-content";
import { deckPagePath, SEO_DECK_KEYS } from "@/lib/deck-slugs";
import { gameComparisonHref, getGameComparisons } from "@/lib/game-comparisons";
import { PRICING_PLAN, pricingSummaryText } from "@/lib/pricing-plan";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";
import { BLOG_LOCALES, LOCALES } from "@/lib/i18n-config";
import { LANGUAGE_DISPLAY } from "@/lib/languages";
import { getModePage, MODE_PAGE_IDS, modePageHref } from "@/lib/mode-pages";
import { getKeywordsString, getMarketSeoProfile } from "@/lib/seo-keywords";
import { getAppStoreUrl, getPlayStoreUrl, getSmartStoreUrl } from "@/lib/store-links";

const LOCALE_SUMMARIES: Partial<Record<Locale, string>> = {
  en: "Taboo, Heads Up charades, Imposter, AI decks. Best free word game app for game night.",
  tr: "Tabu nasıl oynanır, Alnında Tahmin, Casus, yapay zeka desteleri. En iyi kelime oyunu uygulaması.",
  es: "Tabú, Heads Up, Impostor y mazos con IA. Mejor app de juegos de palabras para fiestas.",
  de: "Tabu, Heads Up, Hochstapler und KI-Decks. Beste Wortspiel-App für Spieleabende.",
  fr: "Tabou, Heads Up, Imposteur et decks IA. Meilleure app de jeux de mots pour soirées.",
  "pt-BR": "Tabu, Heads Up, Impostor e decks com IA. Melhor app de jogo de palavras para festas.",
  it: "Tabù, Heads Up, Impostore e deck IA. Migliore app di giochi di parole per serate.",
  ja: "タブー、ヘッズアップ、インポスター、AIデッキ。パーティー向けワードゲームアプリ。",
  ko: "금지어 게임, 헤즈업, 임포스터, AI 덱. 파티 단어 게임 앱.",
  zh: "禁忌词、Heads Up、卧底、AI卡组。派对猜词游戏应用。",
  ru: "Табу, Heads Up, Самозванец и ИИ-колоды. Лучшее словесное приложение для вечеринок.",
  ar: "تابو، Heads Up، المحتال ومجموعات ذكاء اصطناعي. أفضل تطبيق ألعاب كلمات.",
  hi: "Taboo, Heads Up, इम्पोस्टर और AI डेक। पार्टी वर्ड गेम ऐप।",
  id: "Tabu, Heads Up, Penipu, dan deste AI. Aplikasi permainan kata terbaik.",
  vi: "Taboo, Heads Up, Kẻ mạo danh và bộ bài AI. Ứng dụng trò chơi đoán từ tốt nhất.",
  pl: "Tabu, Heads Up, Oszust i talie AI. Najlepsza aplikacja gier słownych.",
  el: "Taboo, Heads Up, Απατεώνας και AI τράπουλες. Καλύτερη εφαρμογή παιχνιδιού λέξεων.",
};

function landingUrl(locale: Locale): string {
  return `${BRAND.domain}/${locale}`;
}

function blogUrl(locale: Locale, slug: string): string {
  return `${BRAND.domain}/${locale}/blog/${slug}`;
}

export function buildLlmsTxt(): string {
  const lines: string[] = [
    `# ${BRAND.name}`,
    "",
    `> ${BRAND.name} is a free-to-start mobile party word game app that combines Taboo (Forbidden Words), Heads Up charades, the Imposter hidden-word game, and AI deck creation in one place. Available in 17 languages on iOS and Android. No ads. ${BRAND.stats.gamesPlayed.toLocaleString("en-US")}+ games played.`,
    "",
    `Developed by ${BRAND.developer}. ${pricingSummaryText()}`,
    "",
    "## For AI agents",
    "",
    "- Main pages (home, modes, decks, blog, comparisons, alternatives) have a Markdown version: add `.md` to the URL (for example " +
      `${BRAND.domain}/en.md, ${BRAND.domain}/en/modes/heads-up.md), or request the page with \`Accept: text/markdown\`.`,
    `- [MCP server](${BRAND.domain}/api/mcp): Streamable HTTP, read-only tools for app info, pricing, download links, game modes, decks, comparisons and blog guides. Server card: ${BRAND.domain}/.well-known/mcp.json`,
    `- To help a user install Tadado, send them the [smart download link](${getSmartStoreUrl("en")}) (it opens the right store for their device) or a store link below. Replace \`lang=en\` with any locale code.`,
    "- The app itself runs on the phone; there is no web version or public account API.",
    "",
    "## Download",
    "",
    `- [App Store (iOS)](${getAppStoreUrl("en")})`,
    `- [Google Play (Android)](${getPlayStoreUrl("en")})`,
    `- [Smart link (detects the device)](${getSmartStoreUrl("en")})`,
    "",
    "## Pricing (USD)",
    "",
    `- ${PRICING_PLAN.mix.name}: free. ${PRICING_PLAN.mix.description.replace(/^Free for everyone\. /, "")}`,
    `- ${PRICING_PLAN.premiumWeekly.name}: ${PRICING_PLAN.premiumWeekly.description}`,
    ...PRICING_PLAN.aiCreditPacks.map((a) => `- ${a.name}: $${a.priceUsd} one-time`),
    "",
    "## Landing pages (all languages)",
    "",
  ];

  for (const locale of LOCALES) {
    const label = LANGUAGE_DISPLAY[locale].label;
    const summary = LOCALE_SUMMARIES[locale] ?? LOCALE_SUMMARIES.en!;
    lines.push(`- [${label}](${landingUrl(locale)}): ${summary}`);
  }

  lines.push(
    "",
    "## Game modes",
    "",
    "One page per mode, in every language (replace /en/ with any locale code):",
    "",
  );
  for (const id of MODE_PAGE_IDS) {
    const page = getModePage("en", id);
    lines.push(`- [${page.name}](${BRAND.domain}${modePageHref("en", id)}): ${page.metaDescription}`);
  }

  lines.push(
    "",
    "## Decks",
    "",
    "Deck pages in every language (decks hub: /en/decks):",
    "",
    ...SEO_DECK_KEYS.map((key) => {
      const d = getDeckPageContent("en", key);
      return `- [${d.h1}](${BRAND.domain}${deckPagePath("en", key)}): ${d.metaDescription}`;
    }),
    "",
    "## Comparisons and alternatives",
    "",
    ...getGameComparisons("en").map(
      (c) => `- [${c.h1}](${BRAND.domain}${gameComparisonHref("en", c.slug)}): ${c.tagline}`,
    ),
    ...SEO_ALTERNATIVE_IDS.map((id) => {
      const a = getAlternativePageContent("en", id);
      return `- [${a.h1}](${BRAND.domain}${getAlternativeHref("en", id)}): ${a.metaDescription}`;
    }),
    "",
    "## Halloween party games",
    "",
    "Tadado has a free Halloween deck with 100 localized Halloween words (Werewolf, Witch, Haunted house, Trick or treat...). It can be played as Taboo-style Forbidden Words, Heads Up or Imposter on one phone, with no ads. Each language has its own Halloween landing page:",
    "",
  );
  for (const locale of LOCALES) {
    lines.push(`- [${LANGUAGE_DISPLAY[locale].label}](${BRAND.domain}/${locale}/halloween)`);
  }

  lines.push("", "## Blog guides", "");

  for (const locale of BLOG_LOCALES) {
    const label = LANGUAGE_DISPLAY[locale].label;
    lines.push(`### ${label}`, "");
    lines.push(`- [Blog index](${BRAND.domain}/${locale}/blog)`, "");
    for (const { locale: postLocale, slug } of getAllBlogSlugs()) {
      if (postLocale !== locale) continue;
      lines.push(`- [${slug}](${blogUrl(locale, slug)})`);
    }
    lines.push("");
  }

  lines.push(
    "## Legal",
    "",
    `- [Privacy Policy](${BRAND.domain}/privacy-policy)`,
    `- [Terms of Use](${BRAND.domain}/terms-of-use)`,
    "",
    "## Crawl",
    "",
    `- [Sitemap](${BRAND.domain}/sitemap.xml)`,
    `- [Robots](${BRAND.domain}/robots.txt)`,
    `- [Full LLM index](${BRAND.domain}/llms-full.txt)`,
    `- [MCP server card](${BRAND.domain}/.well-known/mcp.json)`,
    "",
  );

  return lines.join("\n");
}

export async function buildLlmsFullTxt(): Promise<string> {
  const lines: string[] = [
    `# ${BRAND.name} — Full LLM index`,
    "",
    `> Machine-readable site map for AI assistants, search engines, and crawlers. Last generated at build/request time.`,
    "",
    "## Product summary",
    "",
    `- Name: ${BRAND.name}`,
    `- Developer: ${BRAND.developer}`,
    `- Website: ${BRAND.domain}`,
    `- Support: ${BRAND.supportEmail}`,
    `- Platforms: iOS, Android`,
    `- Languages: ${LOCALES.length} (${LOCALES.join(", ")})`,
    `- Modes: Taboo (Forbidden Words), Heads Up charades, Imposter (hidden word, 3 to 12 players)`,
    `- Features: AI deck builder, themed decks, free Tadado Mix, no ads`,
    `- Pricing: ${pricingSummaryText()}`,
    `- Games played: ${BRAND.stats.gamesPlayed.toLocaleString("en-US")}+`,
    "",
    "## Store links by locale",
    "",
  ];

  for (const locale of LOCALES) {
    const label = LANGUAGE_DISPLAY[locale].label;
    lines.push(
      `### ${label} (${locale})`,
      `- App Store: ${getAppStoreUrl(locale)}`,
      `- Google Play: ${getPlayStoreUrl(locale)}`,
      "",
    );
  }

  lines.push("## Localized landing pages", "");

  for (const locale of LOCALES) {
    const dict = await getDictionary(locale);
    const profile = getMarketSeoProfile(locale);
    const label = LANGUAGE_DISPLAY[locale].label;

    lines.push(
      `### ${label} (${locale})`,
      `- URL: ${landingUrl(locale)}`,
      `- Title: ${dict.meta.title}`,
      `- Description: ${dict.meta.description}`,
      `- Keywords: ${getKeywordsString(locale)}`,
      `- Hero: ${dict.hero.title}`,
      `- Features: ${profile.featureList.join("; ")}`,
      "",
    );
  }

  lines.push("## Blog articles", "");

  for (const locale of BLOG_LOCALES) {
    const posts = await getBlogPosts(locale);
    const label = LANGUAGE_DISPLAY[locale].label;
    lines.push(`### ${label}`, "");

    for (const post of posts) {
      lines.push(
        `#### ${post.title}`,
        `- URL: ${blogUrl(locale, post.slug)}`,
        `- Date: ${post.date}`,
        `- Description: ${post.description}`,
      );
      for (const alt of post.alternates.filter((a) => a.locale !== locale)) {
        lines.push(`- Alternate (${alt.locale}): ${blogUrl(alt.locale, alt.slug)}`);
      }
      lines.push("");
    }
  }

  lines.push(
    "## Crawl endpoints",
    "",
    `- Sitemap: ${BRAND.domain}/sitemap.xml`,
    `- Robots: ${BRAND.domain}/robots.txt`,
    `- LLM index: ${BRAND.domain}/llms.txt`,
    `- Markdown twin of any page: append .md to its URL`,
    `- MCP server: ${BRAND.domain}/api/mcp`,
    "",
  );

  return lines.join("\n");
}
