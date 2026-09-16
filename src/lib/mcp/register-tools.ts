import type { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

import { LOCALES } from "@/lib/i18n-config";

export function registerMcpTools(server: McpServer): void {
  server.registerTool(
    "ping",
    {
      description: "Health check — returns server identity with no side effects",
      inputSchema: z.object({}),
    },
    async () => ({
      content: [
        {
          type: "text",
          text: JSON.stringify({ ok: true, server: "tadado-landing-mcp" }),
        },
      ],
    }),
  );

  server.registerTool(
    "get_landing_meta",
    {
      description: "Returns Tadado landing site metadata (name, supported locales)",
      inputSchema: z.object({}),
    },
    async () => ({
      content: [
        {
          type: "text",
          text: JSON.stringify({
            site: "Tadado",
            url: "https://tadado.app",
            locales: LOCALES,
          }),
        },
      ],
    }),
  );
}
