import type { HeroTab } from "@/lib/landing-variants";

export interface HeroExperimentVariant {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  visual: HeroTab;
}

export const DEFAULT_HERO_EXPERIMENT: HeroExperimentVariant = {
  headline: "One phone. Your friends. Let the chaos begin.",
  subheadline: "Taboo, Heads Up, and AI custom decks built for game nights.",
  ctaPrimary: "GET TADADO · FREE",
  ctaSecondary: "SEE HOW IT WORKS",
  visual: "taboo",
};

export const HERO_EXPERIMENTS = {
  control: DEFAULT_HERO_EXPERIMENT,
  headsupFirst: {
    ...DEFAULT_HERO_EXPERIMENT,
    visual: "headsup" as HeroTab,
  },
} as const;

export type HeroExperimentKey = keyof typeof HERO_EXPERIMENTS;
