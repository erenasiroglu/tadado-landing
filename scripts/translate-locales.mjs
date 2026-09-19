import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  LOCALE_NAMES,
  TRANSLATION_RULES,
  buildNestedFromLeaves,
  collectLeaves,
  deepMerge,
  findUntranslated,
  getByPath,
  setByPath,
} from "./lib/i18n-utils.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dictDir = join(root, "src/dictionaries");

const LOCALES = [
  "tr", "es", "pt-BR", "fr", "de", "zh", "hi", "id", "vi", "ar", "ru", "ja", "ko", "it", "pl", "el",
];

const BATCH_SIZE = 40;
const API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

function parseArgs() {
  const locales = [];
  let dryRun = false;
  let force = false;
  for (const arg of process.argv.slice(2)) {
    if (arg === "--dry-run") dryRun = true;
    else if (arg === "--force") force = true;
    else if (arg.startsWith("--locale=")) locales.push(arg.split("=")[1]);
    else if (!arg.startsWith("--")) locales.push(arg);
  }
  return { locales: locales.length ? locales : LOCALES, dryRun, force };
}

async function translateBatch(locale, items) {
  if (!API_KEY) {
    throw new Error("OPENAI_API_KEY is required. Set it in your environment.");
  }

  const nested = buildNestedFromLeaves(items);
  const language = LOCALE_NAMES[locale] ?? locale;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a professional native ${language} translator for a mobile party game app landing page.\n${TRANSLATION_RULES}\nThe JSON keys must match the input structure exactly.`,
        },
        {
          role: "user",
          content: `Translate this JSON to ${language}. Return a JSON object with the same nested structure:\n\n${JSON.stringify(nested, null, 2)}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${text}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response from OpenAI");

  const translated = JSON.parse(content);
  const results = [];

  for (const { path } of items) {
    const value = getByPath(translated, path);
    if (value === undefined) {
      throw new Error(`Missing translated key: ${path}`);
    }
    results.push({ path, value });
  }

  return results;
}

async function translateLocale(locale, { dryRun, force }) {
  const en = JSON.parse(readFileSync(join(dictDir, "en.json"), "utf8"));
  const filePath = join(dictDir, `${locale}.json`);
  const current = JSON.parse(readFileSync(filePath, "utf8"));

  let items;
  if (force) {
    items = collectLeaves(en).map(([path, value]) => ({ path, value }));
  } else {
    items = findUntranslated(en, current);
  }

  if (items.length === 0) {
    console.log(`[${locale}] Already complete (${force ? "force skipped" : "no untranslated keys"})`);
    return;
  }

  console.log(`[${locale}] Translating ${items.length} keys...`);
  if (dryRun) return;

  const updated = structuredClone(current);

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);
    const translated = await translateBatch(locale, batch);
    for (const { path, value } of translated) {
      setByPath(updated, path, value);
    }
    console.log(`[${locale}] Progress: ${Math.min(i + BATCH_SIZE, items.length)}/${items.length}`);
    await new Promise((r) => setTimeout(r, 300));
  }

  writeFileSync(filePath, `${JSON.stringify(updated, null, 2)}\n`);
  console.log(`[${locale}] Saved ${filePath}`);
}

const { locales, dryRun, force } = parseArgs();

if (!API_KEY && !dryRun) {
  console.error("Set OPENAI_API_KEY to run translations, or use --dry-run to preview counts.");
  process.exit(1);
}

for (const locale of locales) {
  await translateLocale(locale, { dryRun, force });
}

console.log("Done.");
