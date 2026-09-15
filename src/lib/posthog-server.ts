import { PostHog } from "posthog-node";

import { isPostHogEnabled, POSTHOG_HOST, POSTHOG_PROJECT_TOKEN } from "@/lib/posthog-config";

export function getPostHogServer() {
  if (!isPostHogEnabled()) return null;

  return new PostHog(POSTHOG_PROJECT_TOKEN, {
    host: POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
}
