import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { deepMerge } from "./lib/i18n-utils.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dictDir = join(root, "src/dictionaries");
const overridesDir = join(root, "scripts/overrides");

const en = JSON.parse(readFileSync(join(dictDir, "en.json"), "utf8"));
const files = readdirSync(overridesDir).filter((f) => f.endsWith(".json"));

for (const file of files) {
  const locale = file.replace(".json", "");
  const override = JSON.parse(readFileSync(join(overridesDir, file), "utf8"));
  const current = JSON.parse(
    readFileSync(join(dictDir, `${locale}.json`), "utf8"),
  );
  const merged = deepMerge(deepMerge(en, current), override);
  writeFileSync(join(dictDir, `${locale}.json`), `${JSON.stringify(merged, null, 2)}\n`);
  console.log(`Applied override: ${locale}`);
}

console.log(`Synced ${files.length} locale overrides against en.json`);
