import "server-only";

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import { LOCALES, type Locale } from "@/lib/i18n-config";

export type LegalPageId = "terms-of-use" | "privacy-policy";

const CONTENT_DIR = path.join(process.cwd(), "content/legal");

export interface LegalPage {
  id: LegalPageId;
  locale: Locale;
  title: string;
  description: string;
  updated: string;
  contentHtml: string;
}

export async function getLegalPage(
  locale: Locale,
  id: LegalPageId,
): Promise<LegalPage | null> {
  const localized = path.join(CONTENT_DIR, locale, `${id}.mdx`);
  const fallback = path.join(CONTENT_DIR, "en", `${id}.mdx`);
  const filePath = fs.existsSync(localized) ? localized : fallback;
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);

  return {
    id,
    locale,
    title: String(data.title ?? id),
    description: String(data.description ?? ""),
    updated: String(data.updated ?? ""),
    contentHtml: processed.toString(),
  };
}

export function getAllLegalPaths(): { locale: Locale; id: LegalPageId }[] {
  const ids: LegalPageId[] = ["terms-of-use", "privacy-policy"];
  const result: { locale: Locale; id: LegalPageId }[] = [];
  for (const locale of LOCALES) {
    for (const id of ids) {
      result.push({ locale, id });
    }
  }
  return result;
}
