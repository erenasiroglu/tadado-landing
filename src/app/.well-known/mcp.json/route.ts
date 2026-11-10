import { BRAND } from "@/lib/brand";

export const dynamic = "force-static";

/** MCP server card so agents can discover the Tadado MCP endpoint and its tools. */
export function GET() {
  const body = {
    name: "tadado-landing-mcp",
    title: `${BRAND.name} — party word game app`,
    description:
      "Read-only tools to answer questions about the Tadado app (Forbidden Words / Taboo-style, Heads Up, Imposter, AI decks): app info, pricing, store links, decks, guides, and any tadado.app page as Markdown.",
    version: "1.1.0",
    websiteUrl: BRAND.domain,
    transport: { type: "streamable-http", url: `${BRAND.domain}/api/mcp` },
    remotes: [{ type: "streamable-http", url: `${BRAND.domain}/api/mcp` }],
    authentication: { required: false },
    tools: [
      "get_app_info",
      "get_pricing",
      "get_download_links",
      "list_decks",
      "list_guides",
      "read_page",
      "get_landing_meta",
      "ping",
    ],
    documentation: `${BRAND.domain}/llms.txt`,
    contact: BRAND.supportEmail,
  };

  return Response.json(body, {
    headers: {
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
