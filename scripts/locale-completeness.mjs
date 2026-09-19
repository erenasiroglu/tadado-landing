import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { isAllowedIdentical } from "./lib/i18n-allowlist.mjs";
import { collectLeaves, loadDictionaries } from "./lib/i18n-utils.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dictDir = join(root, "src/dictionaries");
const { en, locales } = loadDictionaries(dictDir);
const enLeaves = collectLeaves(en);
const total = enLeaves.length;

const failOnUntranslated = process.argv.includes("--fail");
const verbose = process.argv.includes("--verbose");
const localeArg = process.argv.find((a) => a.startsWith("--locale="));
const onlyLocale = localeArg?.split("=")[1];

let failed = false;

console.log(`Checking ${total} keys across ${Object.keys(locales).length} locales\n`);

for (const [locale, data] of Object.entries(locales).sort()) {
  if (onlyLocale && locale !== onlyLocale) continue;

  const untranslated = [];
  for (const [path, enValue] of enLeaves) {
    const localeValue = path.split(".").reduce((acc, key) => acc?.[key], data);
    if (localeValue === enValue && !isAllowedIdentical(path)) {
      untranslated.push(path);
    }
  }

  const translated = total - untranslated.length;
  const pct = Math.round((translated / total) * 100);
  const status = untranslated.length === 0 ? "OK" : "INCOMPLETE";
  console.log(`[${locale}] ${status} — ${translated}/${total} (${pct}%)`);

  if (untranslated.length > 0) {
    failed = true;
    if (verbose) {
      const preview = untranslated.slice(0, 20);
      for (const key of preview) {
        console.log(`  - ${key}`);
      }
      if (untranslated.length > 20) {
        console.log(`  ... and ${untranslated.length - 20} more`);
      }
    }
  }
}

if (failed) {
  console.error("\nSome locales still contain English copy. Run: npm run locales:translate");
  if (failOnUntranslated) process.exit(1);
} else {
  console.log("\nAll locales fully translated.");
}
