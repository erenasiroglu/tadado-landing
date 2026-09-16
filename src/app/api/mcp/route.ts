import { instrument } from "@posthog/mcp";
import { createMcpHandler } from "mcp-handler";

import { getMcpPostHog } from "@/lib/mcp/posthog";
import { registerMcpTools } from "@/lib/mcp/register-tools";

const posthog = getMcpPostHog();

if (!posthog) {
  console.warn(
    "[mcp] PostHog MCP analytics disabled — set POSTHOG_PROJECT_TOKEN in environment",
  );
}

const handler = createMcpHandler(
  (server) => {
    if (posthog) instrument(server, posthog);
    registerMcpTools(server);
  },
  {
    serverInfo: { name: "tadado-landing-mcp", version: "1.0.0" },
  },
);

async function withFlush(req: Request): Promise<Response> {
  const res = await handler(req);
  if (posthog) await posthog.flush();
  return res;
}

export { withFlush as GET, withFlush as POST };
