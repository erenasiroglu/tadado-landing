import "server-only";

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import { BLOG_LOCALES, type Locale } from "@/lib/i18n-config";

export interface BlogPost {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  date: string;
  alternateSlug?: string;
  alternateLocale?: Locale;
  contentHtml: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

const SLUG_PAIRS: Record<string, { en: string; tr: string }> = {
  "how-to-play-taboo": { en: "how-to-play-taboo", tr: "yasakli-kelimeler-nasil-oynanir" },
  "how-to-play-heads-up": { en: "how-to-play-heads-up", tr: "alninda-tahmin-nasil-oynanir" },
  "taboo-vs-heads-up": { en: "taboo-vs-heads-up", tr: "tabu-mu-alninda-tahmin-mi" },
  "best-party-games-for-game-night": {
    en: "best-party-games-for-game-night",
    tr: "en-iyi-parti-oyunlari",
  },
  "create-ai-word-game-deck": {
    en: "create-ai-word-game-deck",
    tr: "yapay-zeka-ile-kendi-deste",
  },
  "icebreaker-games-for-groups": {
    en: "icebreaker-games-for-groups",
    tr: "tanisma-oyunlari-gruplar",
  },
  "word-guessing-games-like-taboo": {
    en: "word-guessing-games-like-taboo",
    tr: "tabu-benzeri-kelime-oyunlari",
  },
  "best-word-game-apps": {
    en: "best-word-game-apps",
    tr: "en-iyi-kelime-oyunu-uygulamalari",
  },
};

function getAlternate(slug: string, locale: Locale): { slug: string; locale: Locale } | null {
  for (const pair of Object.values(SLUG_PAIRS)) {
    if (pair.en === slug && locale === "en") return { slug: pair.tr, locale: "tr" };
    if (pair.tr === slug && locale === "tr") return { slug: pair.en, locale: "en" };
  }
  return null;
}

async function parsePost(locale: Locale, slug: string): Promise<BlogPost | null> {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  const alternate = getAlternate(slug, locale);

  return {
    slug,
    locale,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? new Date().toISOString().slice(0, 10)),
    alternateSlug: alternate?.slug,
    alternateLocale: alternate?.locale,
    contentHtml: processed.toString(),
  };
}

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  if (!BLOG_LOCALES.includes(locale)) return [];

  const dir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(dir)) return [];

  const slugs = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));

  const posts = await Promise.all(slugs.map((slug) => parsePost(locale, slug)));
  return posts
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getBlogPost(locale: Locale, slug: string): Promise<BlogPost | null> {
  return parsePost(locale, slug);
}

export function getAllBlogSlugs(): { locale: Locale; slug: string }[] {
  const result: { locale: Locale; slug: string }[] = [];
  for (const locale of BLOG_LOCALES) {
    const dir = path.join(CONTENT_DIR, locale);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith(".mdx")) {
        result.push({ locale, slug: file.replace(/\.mdx$/, "") });
      }
    }
  }
  return result;
}
