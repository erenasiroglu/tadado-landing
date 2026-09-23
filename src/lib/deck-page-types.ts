import type { DeckKey } from "@/lib/deck-cards";

export interface DeckPageFaqItem {
  q: string;
  a: string;
}

export interface DeckPageContent {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  whatIsTitle: string;
  whatIsBody: string;
  insideTitle: string;
  insideBullets: string[];
  samplesTitle: string;
  sampleWords: string[];
  playTitle: string;
  playBody: string;
  relatedSectionTitle: string;
  imageAlt: string;
  faq?: DeckPageFaqItem[];
}

export type DeckPageContentMap = Record<DeckKey, DeckPageContent>;
