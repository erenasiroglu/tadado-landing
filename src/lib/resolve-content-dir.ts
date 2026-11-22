import "server-only";

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

  if (isContentDir(process.cwd(), segment)) {
    push(process.cwd());
  }

  const moduleDir = path.dirname(fileURLToPath(moduleUrl));
  push(moduleDir);

  let dir = moduleDir;
  for (let depth = 0; depth < 12; depth++) {
    push(dir);
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
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
 * (e.g. from `blog.ts`) so the walk starts near the bundled server chunk.
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

  return path.join(path.dirname(fileURLToPath(moduleUrl)), "content", segment);
}