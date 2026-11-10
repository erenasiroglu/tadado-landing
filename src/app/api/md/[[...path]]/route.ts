import { allMarkdownPaths, renderPageMarkdown } from "@/lib/agent-markdown";
import { BRAND } from "@/lib/brand";

/**
 * Markdown twins of public pages for AI agents.
 * Reached via `<page>.md` or `Accept: text/markdown` (see src/proxy.ts); prerendered at build.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return allMarkdownPaths().map((path) => ({ path }));
}

export async function GET(_req: Request, ctx: RouteContext<"/api/md/[[...path]]">) {
  const { path = [] } = await ctx.params;
  const markdown = await renderPageMarkdown(path);
  const canonical = `${BRAND.domain}/${path.join("/")}`;

  if (!markdown) {
    return new Response(`# Not found\n\nNo Markdown version for ${canonical}. See ${BRAND.domain}/llms.txt\n`, {
      status: 404,
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  }

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      Link: `<${canonical}>; rel="canonical"`,
      "X-Robots-Tag": "noindex",
    },
  });
}
