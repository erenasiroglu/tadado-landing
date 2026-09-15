import posthog from "posthog-js";

import {
  isPostHogEnabled,
  POSTHOG_PROJECT_TOKEN,
  POSTHOG_UI_HOST,
} from "@/lib/posthog-config";

if (isPostHogEnabled()) {
  posthog.init(POSTHOG_PROJECT_TOKEN, {
    api_host: "/ingest",
    ui_host: POSTHOG_UI_HOST,
    defaults: "2026-05-30",
    capture_pageview: false,
    capture_pageleave: true,
    person_profiles: "identified_only",
  });
}
