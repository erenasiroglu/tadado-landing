import "server-only";

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import {
  findArticleBySlug,
  getArticleAlternates,
  type ArticleId,
} from "@/lib/article-registry";
import { getArticleSlug } from "@/lib/article-registry";
import { CONTENT_FALLBACK_LOCALE, mayUseEnglishContentFallback } from "@/lib/i18n-fallback";
import { BLOG_LOCALES, type Locale } from "@/lib/i18n-config";

export interface BlogPostSchemaHowTo {
  name: string;
  steps: string[];
}

export interface BlogPost {
  slug: string;
  locale: Locale;
  articleId?: ArticleId;
  title: string;
  description: string;
  date: string;
  author?: string;
  schemaItemList?: string[];
  schemaHowTo?: BlogPostSchemaHowTo;
  alternates: { slug: string; locale: Locale }[];
  contentHtml: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

async function readPostFile(
  contentLocale: Locale,
  slug: string,
): Promise<{ data: Record<string, unknown>; contentHtml: string } | null> {
  const filePath = path.join(CONTENT_DIR, contentLocale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return { data, contentHtml: processed.toString() };
}

async function parsePost(locale: Locale, slug: string): Promise<BlogPost | null> {
  const match = findArticleBySlug(locale, slug);
  let contentLocale: Locale = locale;
  let contentSlug = slug;

  let file = await readPostFile(contentLocale, contentSlug);
  if (!file && mayUseEnglishContentFallback(locale) && match) {
    const enSlug = getArticleSlug(match.articleId, CONTENT_FALLBACK_LOCALE);
    if (enSlug) {
      const enFile = await readPostFile(CONTENT_FALLBACK_LOCALE, enSlug);
      if (enFile) {
        contentLocale = CONTENT_FALLBACK_LOCALE;
        contentSlug = enSlug;
        file = enFile;
      }
    }
  }

  if (!file) return null;

  const alternates = match ? getArticleAlternates(match.articleId, locale) : [];

  const schemaItemList = Array.isArray(file.data.itemList)
    ? file.data.itemList.map(String)
    : undefined;
  const author =
    typeof file.data.author === "string" && file.data.author.trim()
      ? file.data.author.trim()
      : undefined;

  let schemaHowTo: BlogPostSchemaHowTo | undefined;
  const rawHowTo = file.data.howTo;
  if (rawHowTo && typeof rawHowTo === "object" && !Array.isArray(rawHowTo)) {
    const name = (rawHowTo as { name?: unknown }).name;
    const steps = (rawHowTo as { steps?: unknown }).steps;
    if (typeof name === "string" && Array.isArray(steps) && steps.length > 0) {
      schemaHowTo = { name, steps: steps.map(String) };
    }
  }

  return {
    slug,
    locale,
    articleId: match?.articleId,
    title: String(file.data.title ?? slug),
    description: String(file.data.description ?? ""),
    date: String(file.data.date ?? new Date().toISOString().slice(0, 10)),
    author,
    schemaItemList,
    schemaHowTo,
    alternates,
    contentHtml: file.contentHtml,
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

/** Front-matter `date` of a post, for sitemap `lastModified`. */
export function getBlogPostDate(locale: Locale, slug: string): string | undefined {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  const { data } = matter(fs.readFileSync(filePath, "utf8"));
  return typeof data.date === "string" ? data.date : undefined;
}
