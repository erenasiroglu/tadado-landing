import "server-only";

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import { CONTENT_FALLBACK_LOCALE, mayUseEnglishContentFallback } from "@/lib/i18n-fallback";
import { LOCALES, type Locale } from "@/lib/i18n-config";
import { resolveContentDir } from "@/lib/resolve-content-dir";

export type LegalPageId = "terms-of-use" | "privacy-policy";

let legalContentDir: string | undefined;

function getLegalContentDir(): string {
  if (legalContentDir) {
    try {
      if (fs.existsSync(legalContentDir)) return legalContentDir;
    } catch {
      legalContentDir = undefined;
    }
  }
  legalContentDir = resolveContentDir("legal", import.meta.url);
  return legalContentDir;
}

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
  const contentDir = getLegalContentDir();
  const localized = path.join(contentDir, locale, `${id}.mdx`);
  let filePath = localized;
  if (!fs.existsSync(filePath)) {
    if (!mayUseEnglishContentFallback(locale)) return null;
    filePath = path.join(contentDir, CONTENT_FALLBACK_LOCALE, `${id}.mdx`);
  }
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
