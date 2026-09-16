# Tadado Landing

Marketing site for [Tadado](https://tadado.app) — Taboo & Heads Up party word game with AI decks.

## Stack

- Next.js 16.3 (App Router)
- Tailwind CSS 4
- 17 locales (`/en`, `/tr`, …)
- EN/TR SEO blog (`/en/blog`, `/tr/blog`)
- Static export-ready legal pages (`/terms-of-use`, `/privacy-policy`)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — root redirects to your browser locale.

## Environment

Copy `.env.example` to `.env.local` and set:

- `APPLE_TEAM_ID` — for Universal Links
- `ANDROID_SHA256_FINGERPRINT` — for Android App Links
- `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` — PostHog project API key (US Cloud)
- `NEXT_PUBLIC_POSTHOG_PROJECT_ID` — PostHog project ID (`433517`)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics 4 (default: `G-LYSWJHHH9L`)
- `NEXT_PUBLIC_META_PIXEL_ID` — Meta (Facebook) Pixel ID
- `NEXT_PUBLIC_TIKTOK_PIXEL_ID` — TikTok Pixel ID

### Analytics events (PostHog investor dashboards)

Key events in `src/lib/analytics-events.ts`:

| Event | Use case |
| --- | --- |
| `deck_play_click` | Most clicked deck → App Store |
| `deck_card_view` | Deck catalog impressions |
| `download_click` | Funnel by source (`deck_catalog`, `hero_badges`, `pricing`, …) |
| `section_view` | Scroll depth per landing section |
| `ai_demo_*` | AI deck builder engagement |
| `newsletter_signup` | Waitlist conversions |
| `affiliate_apply_click` | Creator program interest |

In PostHog: create insights grouped by `deck_id` or `source` on `deck_play_click` / `download_click`.

### Google Analytics 4 (`G-LYSWJHHH9L`)

All landing events are mirrored to GA4 with recommended conversion events:

| Custom event | GA4 recommended event | Use in reports |
| --- | --- | --- |
| `download_click` | `generate_lead` | Conversions → Leads, filter `lead_source` |
| `deck_play_click` | `select_item` | Monetization → E-commerce, `item_id` = deck |
| `deck_card_view` | `view_item` | Deck impressions |
| `newsletter_signup` | `sign_up` | User acquisition |
| `section_view` | `view_item_list` | Scroll depth by section |
| `affiliate_apply_click` | `generate_lead` | Creator funnel |

**GA4 Admin → Custom definitions:** register event parameters as custom dimensions:
`deck_id`, `deck_name`, `source`, `section_id`, `platform`, `locale`, `utm_source`, `utm_medium`, `utm_campaign` (see `src/lib/ga4.ts` → `GA4_CUSTOM_DIMENSIONS`).

**Mark as conversions:** `generate_lead`, `sign_up`, `select_item` (Admin → Events → Mark as conversion).

**Debug:** run dev with `debug_mode` enabled, open GA4 → Admin → DebugView.

### UTM & attribution

Landing UTM params (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `utm_id`) and click IDs (`fbclid`, `ttclid`, `gclid`) are captured on first and last touch (30-day window) and forwarded to GA4, PostHog, Meta Pixel, and TikTok Pixel.

Preset campaign links live in `src/lib/utm-campaigns.ts`. Example:

```ts
import { getCampaignUrl } from "@/lib/utm-campaigns";

getCampaignUrl("instagramBio", "/tr"); // Instagram bio → Turkish landing
getCampaignUrl("metaAds", "/en", "hero_cta");
```

### MCP server (PostHog MCP Analytics)

A minimal read-only MCP endpoint is available at `/api/mcp` (streamable HTTP). Tool calls are instrumented with `@posthog/mcp` and sent to PostHog project `433517`.

**Required env** (server-side only):

- `POSTHOG_PROJECT_TOKEN` — same project API key as `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`
- `POSTHOG_HOST` — `https://us.i.posthog.com` (US Cloud ingestion)

**Tools:** `ping`, `get_landing_meta` (no side effects).

**Verify:** after calling `ping`, check [MCP Analytics activity](https://us.posthog.com/project/433517/mcp-analytics/activity) for a `$mcp_tool_call` event from `tadado-landing-mcp`.

### PostHog self-driving

PostHog is wired via `src/instrumentation-client.ts` with a first-party `/ingest` proxy.

To enable [self-driving](https://posthog.com/docs/self-driving/setup) (signals, scouts, GitHub agents), run locally with Node.js **22.22+**:

```bash
npx -y @posthog/wizard@latest self-driving
```

## Deploy

Target domain: **tadado.app** (Vercel recommended).

```bash
npm run build
npm start
```

## Support

tadado.ai@gmail.com
