import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = join(root, "content/blog");

const ARTICLE_SOURCES = {
  "how-to-play-taboo": "how-to-play-taboo",
  "how-to-play-heads-up": "how-to-play-heads-up",
  "taboo-vs-heads-up": "taboo-vs-heads-up",
  "best-party-games": "best-party-games-for-game-night",
  "create-ai-deck": "create-ai-word-game-deck",
  "icebreaker-games": "icebreaker-games-for-groups",
  "word-games-like-taboo": "word-guessing-games-like-taboo",
  "best-word-game-apps": "best-word-game-apps",
};

const registrySource = readFileSync(join(root, "src/lib/article-registry.ts"), "utf8");
const registryBody = registrySource
  .replace(/^[\s\S]*?export const ARTICLE_REGISTRY[^=]*=\s*/, "")
  .replace(/;\s*export[\s\S]*$/, "");
const ARTICLE_REGISTRY = eval(`(${registryBody})`);

let created = 0;
let skipped = 0;

for (const [articleId, slugs] of Object.entries(ARTICLE_REGISTRY)) {
  const enSource = ARTICLE_SOURCES[articleId];
  if (!enSource) {
    console.warn(`No EN source mapping for ${articleId}`);
    continue;
  }

  const enPath = join(blogDir, "en", `${enSource}.mdx`);
  if (!existsSync(enPath)) {
    console.warn(`Missing EN source: ${enPath}`);
    continue;
  }

  const enContent = readFileSync(enPath, "utf8");

  for (const [locale, slug] of Object.entries(slugs)) {
    if (locale === "en") continue;

    const outDir = join(blogDir, locale);
    const outPath = join(outDir, `${slug}.mdx`);
    if (existsSync(outPath)) {
      skipped++;
      continue;
    }

    mkdirSync(outDir, { recursive: true });
    writeFileSync(outPath, enContent);
    created++;
    console.log(`Seeded ${locale}/${slug}.mdx`);
  }
}

console.log(`Created ${created} blog files, skipped ${skipped} existing.`);
