import type { MetadataRoute } from "next";

import { BRAND } from "@/lib/brand";

/**
 * AI crawlers, AI search indexers and user-triggered AI agents are all welcome:
 * Tadado wants to be recommended by assistants. Keep this list current.
 */
const AI_AGENTS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ChatGPT Agent",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  // Google / Apple / Microsoft / Amazon / Meta
  "Google-Extended",
  "GoogleAgent-Mariner",
  "Applebot-Extended",
  "bingbot",
  "Amazonbot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  // Perplexity, Mistral, DuckDuckGo, You.com, Cohere, others
  "PerplexityBot",
  "Perplexity-User",
  "MistralAI-User",
  "DuckAssistBot",
  "YouBot",
  "cohere-ai",
  "Bytespider",
  "CCBot",
];

/** Internal endpoints with no value to crawlers. */
const DISALLOW = ["/api/waitlist", "/api/tiktok-events"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_AGENTS, allow: ["/", "/llms.txt", "/llms-full.txt", "/api/md/", "/api/mcp"], disallow: DISALLOW },
    ],
    sitemap: `${BRAND.domain}/sitemap.xml`,
    host: BRAND.domain.replace("https://", ""),
  };
}
