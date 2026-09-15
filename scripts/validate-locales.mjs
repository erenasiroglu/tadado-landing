import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dictDir = join(root, "src/dictionaries");
const en = JSON.parse(readFileSync(join(dictDir, "en.json"), "utf8"));

function collectKeys(obj, prefix = "") {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...collectKeys(value, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

const required = collectKeys(en);
const files = readdirSync(dictDir).filter((f) => f.endsWith(".json"));
let failed = false;

for (const file of files) {
  const locale = file.replace(".json", "");
  const data = JSON.parse(readFileSync(join(dictDir, file), "utf8"));
  const present = collectKeys(data);
  const missing = required.filter((key) => !present.includes(key));
  if (missing.length > 0) {
    failed = true;
    console.error(`[${locale}] missing keys:\n  - ${missing.join("\n  - ")}`);
  }
}

if (failed) {
  process.exit(1);
}

console.log(`Validated ${files.length} locale files against en.json`);
