import type { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

import { renderPageMarkdown } from "@/lib/agent-markdown";
import { getAllBlogSlugs, getBlogPosts } from "@/lib/blog";
import { BRAND } from "@/lib/brand";
import { getDeckPageContent } from "@/lib/deck-seo-content";
import { deckPagePath, deckSlugFor, SEO_DECK_KEYS } from "@/lib/deck-slugs";
import { gameComparisonHref, getGameComparisons } from "@/lib/game-comparisons";
import { hasLocale, LOCALES, type Locale } from "@/lib/i18n-config";
import { getModePage, MODE_PAGE_IDS, modePageHref } from "@/lib/mode-pages";
import { PRICING_PLAN } from "@/lib/pricing-plan";
import { getAppStoreUrl, getPlayStoreUrl, getSmartStoreUrl } from "@/lib/store-links";

const localeSchema = z
  .string()
  .optional()
  .describe(`Language code. One of: ${LOCALES.join(", ")}. Defaults to "en".`);

function toLocale(value: string | undefined): Locale {
  return value && hasLocale(value) ? value : "en";
}

function json(data: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
}

function text(value: string) {
  return { content: [{ type: "text" as const, text: value }] };
}

const abs = (path: string) => `${BRAND.domain}${path}`;

/** Read-only tools that let AI agents answer questions about Tadado and send users to the app. */
export function registerMcpTools(server: McpServer): void {
  server.registerTool(
    "ping",
    {
      description: "Health check — returns server identity with no side effects",
      inputSchema: z.object({}),
      annotations: { readOnlyHint: true },
    },
    async () => json({ ok: true, server: "tadado-landing-mcp" }),
  );

  server.registerTool(
    "get_landing_meta",
    {
      description: "Returns Tadado landing site metadata (name, supported locales)",
      inputSchema: z.object({}),
      annotations: { readOnlyHint: true },
    },
    async () => json({ site: BRAND.name, url: BRAND.domain, locales: LOCALES }),
  );

  server.registerTool(
    "get_app_info",
    {
      description:
        "What Tadado is: a party word game app for iOS and Android with Forbidden Words (Taboo-style), Heads Up charades, Imposter and AI-generated decks. Returns summary, platforms, languages, modes and current pricing.",
      inputSchema: z.object({ locale: localeSchema }),
      annotations: { readOnlyHint: true },
    },
    async ({ locale }) => {
      const loc = toLocale(locale);
      return json({
        name: BRAND.name,
        developer: BRAND.developer,
        website: abs(`/${loc}`),
        support: BRAND.supportEmail,
        platforms: ["iOS", "Android"],
        webVersion: false,
        languages: LOCALES,
        gamesPlayed: `${BRAND.stats.gamesPlayed}+`,
        modes: MODE_PAGE_IDS.map((id) => {
          const m = getModePage(loc, id);
          return { id, name: m.name, tagline: m.tagline, url: abs(modePageHref(loc, id)) };
        }),
        pricing: PRICING_PLAN,
        download: downloadLinks(loc),
      });
    },
  );

  server.registerTool(
    "get_pricing",
    {
      description:
        "Current Tadado prices in USD: free Tadado Mix deck, Premium weekly plan with free trial, and AI deck credit packs. Stores may show local currency.",
      inputSchema: z.object({}),
      annotations: { readOnlyHint: true },
    },
    async () => json(PRICING_PLAN),
  );

  server.registerTool(
    "get_download_links",
    {
      description:
        "Store links to install Tadado. Use `smart` when you do not know the user's device: it opens the App Store on iPhone and Google Play on Android.",
      inputSchema: z.object({ locale: localeSchema }),
      annotations: { readOnlyHint: true },
    },
    async ({ locale }) => json(downloadLinks(toLocale(locale))),
  );

  server.registerTool(
    "list_decks",
    {
      description: "Lists Tadado's word decks (themes) with sample words, price and page URL.",
      inputSchema: z.object({ locale: localeSchema }),
      annotations: { readOnlyHint: true },
    },
    async ({ locale }) => {
      const loc = toLocale(locale);
      return json(
        SEO_DECK_KEYS.map((key) => {
          const d = getDeckPageContent(loc, key);
          return {
            id: key,
            slug: deckSlugFor(loc, key),
            name: d.h1,
            description: d.metaDescription,
            sampleWords: d.sampleWords.slice(0, 8),
            access: key === "mix" ? "free" : "premium",
            url: abs(deckPagePath(loc, key)),
          };
        }),
      );
    },
  );

  server.registerTool(
    "list_guides",
    {
      description:
        "Lists how-to-play guides, blog articles and comparison pages (Tadado vs Taboo, Heads Up, Charades and similar games).",
      inputSchema: z.object({ locale: localeSchema }),
      annotations: { readOnlyHint: true },
    },
    async ({ locale }) => {
      const loc = toLocale(locale);
      const posts = await getBlogPosts(loc);
      return json({
        blog: posts.map((p) => ({
          title: p.title,
          description: p.description,
          date: p.date,
          url: abs(`/${loc}/blog/${p.slug}`),
        })),
        comparisons: getGameComparisons(loc).map((c) => ({
          title: c.h1,
          game: c.game,
          url: abs(gameComparisonHref(loc, c.slug)),
        })),
      });
    },
  );

  server.registerTool(
    "read_page",
    {
      description:
        "Returns any tadado.app page as clean Markdown (home, game modes, decks, blog posts, comparisons, alternatives). Pass a URL or path such as /en/modes/heads-up.",
      inputSchema: z.object({
        url: z.string().describe("A tadado.app URL or path, e.g. https://tadado.app/tr/blog/<slug>"),
      }),
      annotations: { readOnlyHint: true },
    },
    async ({ url }) => {
      let path = url.trim();
      try {
        path = new URL(path, BRAND.domain).pathname;
      } catch {
        /* keep raw path */
      }
      const segments = path.replace(/\.md$/, "").split("/").filter(Boolean);
      const markdown = await renderPageMarkdown(segments);
      if (markdown) return text(markdown);
      const known = getAllBlogSlugs().length;
      return text(
        `No Markdown version for ${path}. Supported: /<lang>, /<lang>/modes[/id], /<lang>/decks[/slug], /<lang>/blog[/slug] (${known} posts), /<lang>/compare[/slug], /<lang>/alternatives[/slug]. Index: ${abs("/llms.txt")}`,
      );
    },
  );
}

function downloadLinks(locale: Locale) {
  return {
    smart: getSmartStoreUrl(locale),
    appStore: getAppStoreUrl(locale),
    googlePlay: getPlayStoreUrl(locale),
  };
}
