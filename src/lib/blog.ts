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
import { BLOG_LOCALES, type Locale } from "@/lib/i18n-config";

export interface BlogPost {
  slug: string;
  locale: Locale;
  articleId?: ArticleId;
  title: string;
  description: string;
  date: string;
  alternates: { slug: string; locale: Locale }[];
  contentHtml: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

async function parsePost(locale: Locale, slug: string): Promise<BlogPost | null> {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  const match = findArticleBySlug(locale, slug);
  const alternates = match ? getArticleAlternates(match.articleId, locale) : [];

  return {
    slug,
    locale,
    articleId: match?.articleId,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? new Date().toISOString().slice(0, 10)),
    alternates,
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
