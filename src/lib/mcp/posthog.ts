import { PostHog } from "posthog-node";

let mcpPostHog: PostHog | null | undefined;

export function getMcpPostHog(): PostHog | null {
  if (mcpPostHog !== undefined) return mcpPostHog;

  const token = process.env.POSTHOG_PROJECT_TOKEN;
  const host = process.env.POSTHOG_HOST ?? "https://us.i.posthog.com";

  if (!token) {
    mcpPostHog = null;
    return null;
  }

  mcpPostHog = new PostHog(token, { host, flushAt: 1, flushInterval: 0 });
  return mcpPostHog;
}
