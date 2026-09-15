/** PostHog US Cloud — write-only project token (safe for client-side use) */
export const POSTHOG_PROJECT_TOKEN =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ??
  "phc_znpK57z4W29YrsQheXZhm5qyRiXy9ej26o2Dyvyoyv4z";

export const POSTHOG_PROJECT_ID =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_ID ?? "433517";

export const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

export const POSTHOG_UI_HOST = "https://us.posthog.com";

export function isPostHogEnabled(): boolean {
  return Boolean(POSTHOG_PROJECT_TOKEN);
}
