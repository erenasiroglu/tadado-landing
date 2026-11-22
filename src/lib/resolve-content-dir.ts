import "server-only";

import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function isContentDir(dir: string, segment: "blog" | "legal"): boolean {
  try {
    const base = path.join(dir, "content", segment);
    return fs.existsSync(base) && fs.statSync(base).isDirectory();
  } catch {
    return false;
  }
}

function resolveViaRequire(
  segment: "blog" | "legal",
  moduleUrl: string | URL,
): string | undefined {
  let modulePath: string;
  try {
    modulePath = fileURLToPath(moduleUrl);
  } catch {
    return undefined;
  }

  let require: NodeRequire;
  try {
    require = createRequire(modulePath);
  } catch {
    return undefined;
  }

  const probe =
    segment === "blog" ? "en/best-word-game-apps.mdx" : "en/terms-of-use.mdx";

  for (let depth = 2; depth <= 10; depth++) {
    const prefix = "../".repeat(depth);
    try {
      const resolved = require.resolve(`${prefix}content/${segment}/${probe}`);
      return path.join(resolved, "..", "..");
    } catch {
      continue;
    }
  }

  return undefined;
}

function collectContentDirCandidates(
  segment: "blog" | "legal",
  moduleUrl: string | URL,
): string[] {
  const relative = path.join("content", segment);
  const seen = new Set<string>();
  const candidates: string[] = [];

  const push = (base: string) => {
    const candidate = path.join(base, relative);
    if (seen.has(candidate)) return;
    seen.add(candidate);
    candidates.push(candidate);
  };

  const viaRequire = resolveViaRequire(segment, moduleUrl);
  if (viaRequire && !seen.has(viaRequire)) {
    seen.add(viaRequire);
    candidates.push(viaRequire);
  }

  const openNextRel = path.join("server-functions", "default", "content", segment);
  push(path.join(process.cwd(), openNextRel));
  push(path.join(process.cwd(), ".open-next", openNextRel));
  push(path.resolve("server-functions", "default", "content", segment));

  if (isContentDir(process.cwd(), segment)) {
    push(process.cwd());
  }

  let moduleDir: string | undefined;
  try {
    moduleDir = path.dirname(fileURLToPath(moduleUrl));
  } catch {
    moduleDir = undefined;
  }

  if (moduleDir) {
    push(moduleDir);
    let dir = moduleDir;
    for (let depth = 0; depth < 12; depth++) {
      push(dir);
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }

  const entry = process.argv[1];
  if (entry) {
    let entryDir = path.dirname(path.resolve(entry));
    for (let depth = 0; depth < 8; depth++) {
      push(entryDir);
      const parent = path.dirname(entryDir);
      if (parent === entryDir) break;
      entryDir = parent;
    }
  }

  return candidates;
}

/**
 * OpenNext on Cloudflare copies traced `content/` next to the server handler
 * (`server-functions/default/content/...`), while `process.cwd()` may differ.
 * Callers that read MDX at request time should pass their own `import.meta.url`
 * (e.g. from `blog.ts`) so require.resolve can locate bundled MDX files.
 */
export function resolveContentDir(
  segment: "blog" | "legal",
  moduleUrl: string | URL = import.meta.url,
): string {
  for (const candidate of collectContentDirCandidates(segment, moduleUrl)) {
    try {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
        return candidate;
      }
    } catch {
      continue;
    }
  }

  try {
    const fallback = path.join(path.dirname(fileURLToPath(moduleUrl)), "content", segment);
    return fallback;
  } catch {
    return path.join(process.cwd(), "content", segment);
  }
}