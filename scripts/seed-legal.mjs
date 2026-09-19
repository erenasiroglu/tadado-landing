import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const legalDir = join(root, "content/legal");

const LOCALES = [
  "tr", "es", "pt-BR", "fr", "de", "zh", "hi", "id", "vi", "ar", "ru", "ja", "ko", "it", "pl", "el",
];

const PAGES = ["terms-of-use", "privacy-policy"];

let created = 0;

for (const locale of LOCALES) {
  for (const page of PAGES) {
    const enPath = join(legalDir, "en", `${page}.mdx`);
    const outPath = join(legalDir, locale, `${page}.mdx`);
    if (existsSync(outPath)) continue;
    mkdirSync(join(legalDir, locale), { recursive: true });
    writeFileSync(outPath, readFileSync(enPath, "utf8"));
    created++;
    console.log(`Seeded legal/${locale}/${page}.mdx`);
  }
}

console.log(`Created ${created} legal files.`);
