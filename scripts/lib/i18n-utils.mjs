import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export function collectLeaves(obj, prefix = "") {
  const leaves = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      leaves.push(...collectLeaves(value, path));
    } else {
      leaves.push([path, value]);
    }
  }
  return leaves;
}

export function collectKeys(obj, prefix = "") {
  return collectLeaves(obj, prefix).map(([path]) => path);
}

export function getByPath(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export function setByPath(obj, path, value) {
  const keys = path.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== "object" || Array.isArray(current[key])) {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
}

export function deepMerge(base, patch) {
  const out = { ...base };
  for (const [k, v] of Object.entries(patch)) {
    if (v && typeof v === "object" && !Array.isArray(v) && !Array.isArray(base[k])) {
      out[k] = deepMerge(base[k] ?? {}, v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

export function loadDictionaries(dictDir) {
  const en = JSON.parse(readFileSync(join(dictDir, "en.json"), "utf8"));
  const files = readdirSync(dictDir).filter((f) => f.endsWith(".json") && f !== "en.json");
  const locales = {};
  for (const file of files) {
    const locale = file.replace(".json", "");
    locales[locale] = JSON.parse(readFileSync(join(dictDir, file), "utf8"));
  }
  return { en, locales };
}

export function findUntranslated(en, localeData) {
  const enLeaves = collectLeaves(en);
  const untranslated = [];
  for (const [path, enValue] of enLeaves) {
    const localeValue = getByPath(localeData, path);
    if (localeValue === enValue) {
      untranslated.push({ path, value: enValue });
    }
  }
  return untranslated;
}

export function buildNestedFromLeaves(leaves) {
  const out = {};
  for (const { path, value } of leaves) {
    setByPath(out, path, value);
  }
  return out;
}

export const LOCALE_NAMES = {
  tr: "Turkish",
  es: "Spanish",
  "pt-BR": "Brazilian Portuguese",
  fr: "French",
  de: "German",
  zh: "Chinese (Simplified)",
  hi: "Hindi",
  id: "Indonesian",
  vi: "Vietnamese",
  ar: "Arabic",
  ru: "Russian",
  ja: "Japanese",
  ko: "Korean",
  it: "Italian",
  pl: "Polish",
  el: "Greek",
};

export const TRANSLATION_RULES = `
Translation rules:
- Write natural, native-sounding copy — not word-for-word translation.
- Keep brand names unchanged: Tadado, Taboo, Heads Up, Tadado Mix, App Store, Google Play, Product Hunt, Instagram, TikTok, LinkedIn, Marvel, Netflix, Spider-Man, Game Center.
- Keep placeholders like {{year}} unchanged.
- Keep URLs, email addresses, and #anchor links unchanged.
- Keep game card words in UPPERCASE when they are sample words (e.g. SPIDER MAN).
- Keep currency symbols and prices: $0.99, $2.99, Free.
- Keep multiplier notation: ×2, ×3, ×5.
- Keep arrow symbols: →
- For CTA buttons, use locale-appropriate energetic but clear phrasing.
- Return ONLY valid JSON matching the input structure exactly.
`.trim();
