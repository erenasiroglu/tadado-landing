import "server-only";

import { getAllBlogSlugs, getBlogPosts } from "@/lib/blog";
import { BRAND, PRICING } from "@/lib/brand";
import { getDictionary, type Locale } from "@/lib/i18n";
import { BLOG_LOCALES, LOCALES } from "@/lib/i18n-config";
import { LANGUAGE_DISPLAY } from "@/lib/languages";
import { getKeywordsString, getMarketSeoProfile } from "@/lib/seo-keywords";
import { getAppStoreUrl, getPlayStoreUrl } from "@/lib/store-links";

const LOCALE_SUMMARIES: Partial<Record<Locale, string>> = {
  en: "Taboo, Heads Up charades, AI decks. Best free word game app for game night.",
  tr: "Tabu nasıl oynanır, Alnında Tahmin, yapay zeka desteleri. En iyi kelime oyunu uygulaması.",
  es: "Tabú, Heads Up y mazos con IA. Mejor app de juegos de palabras para fiestas.",
  de: "Tabu, Heads Up und KI-Decks. Beste Wortspiel-App für Spieleabende.",
  fr: "Tabou, Heads Up et decks IA. Meilleure app de jeux de mots pour soirées.",
  "pt-BR": "Tabu, Heads Up e decks com IA. Melhor app de jogo de palavras para festas.",
  it: "Tabù, Heads Up e deck IA. Migliore app di giochi di parole per serate.",
  ja: "タブー、ヘッズアップ、AIデッキ。パーティー向けワードゲームアプリ。",
  ko: "금지어 게임, 헤즈업, AI 덱. 파티 단어 게임 앱.",
  zh: "禁忌词、Heads Up、AI卡组。派对猜词游戏应用。",
  ru: "Табу, Heads Up и ИИ-колоды. Лучшее словесное приложение для вечеринок.",
  ar: "تابو، Heads Up ومجموعات ذكاء اصطناعي. أفضل تطبيق ألعاب كلمات.",
  hi: "Taboo, Heads Up और AI डेक। पार्टी वर्ड गेम ऐप।",
  id: "Tabu, Heads Up, dan deste AI. Aplikasi permainan kata terbaik.",
  vi: "Taboo, Heads Up và bộ bài AI. Ứng dụng trò chơi đoán từ tốt nhất.",
  pl: "Tabu, Heads Up i talie AI. Najlepsza aplikacja gier słownych.",
  el: "Taboo, Heads Up και AI τράπουλες. Καλύτερη εφαρμογή παιχνιδιού λέξεων.",
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
    `> ${BRAND.name} is a free mobile word game app that combines Taboo (Forbidden Words), Heads Up charades, and AI deck creation in one place. Available in 17 languages on iOS and Android. No ads. No subscription. ${BRAND.stats.gamesPlayed.toLocaleString("en-US")}+ games played.`,
    "",
    `Developed by ${BRAND.developer}. Pricing: free Tadado Mix deck, themed decks $${PRICING.themeDeckUsd}, AI deck creation $${PRICING.aiDeckUsd}.`,
    "",
    "## Download",
    "",
    `- [App Store (iOS)](${getAppStoreUrl("en")})`,
    `- [Google Play (Android)](${getPlayStoreUrl("en")})`,
    "",
    "## Landing pages (all languages)",
    "",
  ];

  for (const locale of LOCALES) {
    const label = LANGUAGE_DISPLAY[locale].label;
    const summary = LOCALE_SUMMARIES[locale] ?? LOCALE_SUMMARIES.en!;
    lines.push(`- [${label}](${landingUrl(locale)}): ${summary}`);
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
    `- Modes: Taboo (Forbidden Words), Heads Up charades`,
    `- Features: AI deck builder, themed decks, free Tadado Mix, no ads, no subscription`,
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
      if (post.alternateSlug && post.alternateLocale) {
        lines.push(
          `- Alternate (${post.alternateLocale}): ${blogUrl(post.alternateLocale, post.alternateSlug)}`,
        );
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
    "",
  );

  return lines.join("\n");
}
