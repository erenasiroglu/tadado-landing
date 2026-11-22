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

/**
 * OpenNext on Cloudflare copies traced `content/` next to the server handler
 * (`server-functions/default/content/...`), while `process.cwd()` may differ.
 */
export function resolveContentDir(segment: "blog" | "legal"): string {
  const relative = path.join("content", segment);

  if (isContentDir(process.cwd(), segment)) {
    return path.join(process.cwd(), relative);
  }

  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  let dir = moduleDir;
  for (let depth = 0; depth < 10; depth++) {
    const candidate = path.join(dir, relative);
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
      return candidate;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  return path.join(process.cwd(), relative);
}