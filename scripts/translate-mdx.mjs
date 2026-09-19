import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { LOCALE_NAMES, TRANSLATION_RULES } from "./lib/i18n-utils.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

const TARGET_LOCALES = [
  "es", "pt-BR", "fr", "de", "zh", "hi", "id", "vi", "ar", "ru", "ja", "ko", "it", "pl", "el",
];

function parseArgs() {
  const locales = [];
  let dryRun = false;
  let type = "blog";
  for (const arg of process.argv.slice(2)) {
    if (arg === "--dry-run") dryRun = true;
    else if (arg.startsWith("--type=")) type = arg.split("=")[1];
    else if (arg.startsWith("--locale=")) locales.push(arg.split("=")[1]);
    else if (!arg.startsWith("--")) locales.push(arg);
  }
  return { locales: locales.length ? locales : TARGET_LOCALES, dryRun, type };
}

function parseMdx(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: "", body: content };
  return { frontmatter: match[1], body: match[2] };
}

async function translateMdx(locale, sourcePath, targetPath, { slugHint }) {
  const source = readFileSync(sourcePath, "utf8");
  const { frontmatter, body } = parseMdx(source);
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
      messages: [
        {
          role: "system",
          content: `You are a professional native ${language} translator for blog posts about mobile party games.\n${TRANSLATION_RULES}\n- Translate YAML frontmatter values (title, description) to ${language}.\n- Translate the MDX body to ${language}.\n- Keep markdown structure, links, and code blocks intact.\n- Suggest a localized URL slug in frontmatter as slug: (lowercase, hyphenated, ${language}).\nReturn format:\n---\n(translated frontmatter)\n---\n(translated body)`,
        },
        {
          role: "user",
          content: `Source article slug hint: ${slugHint}\n\n${source}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${text}`);
  }

  const data = await response.json();
  const translated = data.choices?.[0]?.message?.content?.trim();
  if (!translated) throw new Error("Empty MDX translation response");

  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, `${translated}\n`);
}

async function translateBlog(locales, dryRun) {
  const enDir = join(root, "content/blog/en");
  const files = readdirSync(enDir).filter((f) => f.endsWith(".mdx"));

  for (const locale of locales) {
    const outDir = join(root, "content/blog", locale);
    for (const file of files) {
      const sourcePath = join(enDir, file);
      const slug = file.replace(".mdx", "");
      const targetPath = join(outDir, file);

      if (existsSync(targetPath)) {
        console.log(`[${locale}] Skip existing ${file}`);
        continue;
      }

      console.log(`[${locale}] Translate blog/${file}`);
      if (dryRun) continue;

      await translateMdx(locale, sourcePath, targetPath, { slugHint: slug });
      await new Promise((r) => setTimeout(r, 500));
    }
  }
}

async function translateLegal(locales, dryRun) {
  const pages = ["terms-of-use", "privacy-policy"];

  for (const locale of locales) {
    for (const page of pages) {
      const enPath = join(root, "content/legal/en", `${page}.mdx`);
      const targetPath = join(root, "content/legal", locale, `${page}.mdx`);

      if (!existsSync(enPath)) {
        console.warn(`Missing source: ${enPath}`);
        continue;
      }
      if (existsSync(targetPath)) {
        console.log(`[${locale}] Skip existing legal/${page}`);
        continue;
      }

      console.log(`[${locale}] Translate legal/${page}`);
      if (dryRun) continue;

      await translateMdx(locale, enPath, targetPath, { slugHint: page });
      await new Promise((r) => setTimeout(r, 500));
    }
  }
}

const { locales, dryRun, type } = parseArgs();

if (!API_KEY && !dryRun) {
  console.error("Set OPENAI_API_KEY to run MDX translations, or use --dry-run.");
  process.exit(1);
}

if (type === "blog") await translateBlog(locales, dryRun);
else if (type === "legal") await translateLegal(locales, dryRun);
else {
  await translateBlog(locales, dryRun);
  await translateLegal(locales, dryRun);
}

console.log("Done.");
