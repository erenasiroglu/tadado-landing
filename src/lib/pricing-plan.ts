/**
 * Current Tadado plan (Nov 2026), in USD. Stores may show local currency.
 * Single source for agent-facing copy (llms.txt, Markdown twins, MCP) and JSON-LD offers.
 */
export const PRICING_PLAN = {
  currency: "USD",
  mix: {
    name: "Tadado Mix",
    priceUsd: 0,
    description:
      "Free for everyone. A mixed deck drawn from every Tadado deck, playable in all three modes (Forbidden Words, Heads Up, Imposter).",
  },
  premiumWeekly: {
    name: "Tadado Premium (weekly)",
    priceUsd: 3.99,
    trialDays: 3,
    description:
      "3 days free, then $3.99 per week. Unlocks every premium themed deck. Auto-renews until cancelled in App Store / Google Play settings.",
  },
  aiCreditPacks: [
    { name: "AI credits: 5", credits: 5, priceUsd: 1.99 },
    { name: "AI credits: 15", credits: 15, priceUsd: 4.99 },
    { name: "AI credits: 40", credits: 40, priceUsd: 9.99 },
  ],
  aiCreditDescription: "One AI credit creates one custom deck from any topic you type. Credit packs are one-time purchases.",
  notes: "No ads. Purchases are handled by Apple or Google and can be restored.",
} as const;

/** One-paragraph plain-text summary for LLMs and agents. */
export function pricingSummaryText(): string {
  const p = PRICING_PLAN;
  const packs = p.aiCreditPacks.map((a) => `${a.credits} credits $${a.priceUsd}`).join(", ");
  return [
    `Pricing (USD): the ${p.mix.name} deck is free for everyone and mixes words from every deck in all three modes.`,
    `${p.premiumWeekly.name}: ${p.premiumWeekly.trialDays}-day free trial, then $${p.premiumWeekly.priceUsd}/week for every premium deck.`,
    `AI deck credits (one-time): ${packs}.`,
    p.notes,
  ].join(" ");
}

/** Markdown bullet list of the plan. */
export function pricingMarkdownLines(): string[] {
  const p = PRICING_PLAN;
  return [
    `- **${p.mix.name}:** free. ${p.mix.description.replace(/^Free for everyone\. /, "")}`,
    `- **${p.premiumWeekly.name}:** ${p.premiumWeekly.description}`,
    ...p.aiCreditPacks.map((a) => `- **${a.name}:** $${a.priceUsd} one-time`),
    "",
    `${p.aiCreditDescription} ${p.notes}`,
  ];
}
