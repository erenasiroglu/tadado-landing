import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dictDir = join(root, "src/dictionaries");
const en = JSON.parse(readFileSync(join(dictDir, "en.json"), "utf8"));

const FORCE_REPLACE_KEYS = ["hero", "proof", "stats", "productBenefits", "community"];

function deepMerge(base, patch, path = "") {
  const output = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    const nextPath = path ? `${path}.${key}` : key;
    const forceReplace = FORCE_REPLACE_KEYS.includes(key);

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      base[key] &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key]) &&
      !forceReplace
    ) {
      output[key] = deepMerge(base[key], value, nextPath);
    } else if (forceReplace || !(key in base)) {
      output[key] = value;
    }
  }
  return output;
}

for (const file of readdirSync(dictDir).filter((name) => name.endsWith(".json") && name !== "en.json")) {
  const path = join(dictDir, file);
  const locale = JSON.parse(readFileSync(path, "utf8"));
  const merged = deepMerge(locale, en);
  writeFileSync(path, `${JSON.stringify(merged, null, 2)}\n`);
  console.log(`Patched ${file}`);
}

console.log("Done patching locale files with missing keys from en.json");
