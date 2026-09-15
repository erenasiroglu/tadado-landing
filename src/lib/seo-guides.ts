import type { Locale } from "@/lib/i18n-config";

export interface SeoGuideLink {
  slug: string;
  label: string;
}

const GUIDES: Partial<Record<Locale, SeoGuideLink[]>> = {
  en: [
    { slug: "how-to-play-taboo", label: "How to play Taboo (Forbidden Words)" },
    { slug: "how-to-play-heads-up", label: "How to play Heads Up charades" },
    { slug: "best-word-game-apps", label: "Best word game apps for mobile" },
    { slug: "word-guessing-games-like-taboo", label: "Word guessing games like Taboo" },
    { slug: "taboo-vs-heads-up", label: "Taboo vs Heads Up: which to play?" },
  ],
  tr: [
    { slug: "yasakli-kelimeler-nasil-oynanir", label: "Tabu nasıl oynanır?" },
    { slug: "alninda-tahmin-nasil-oynanir", label: "Alnında Tahmin nasıl oynanır?" },
    { slug: "en-iyi-kelime-oyunu-uygulamalari", label: "En iyi kelime oyunu uygulamaları" },
    { slug: "tabu-benzeri-kelime-oyunlari", label: "Tabu benzeri kelime oyunları" },
    { slug: "tabu-mu-alninda-tahmin-mi", label: "Tabu mu, Alnında Tahmin mi?" },
  ],
};

export function getSeoGuides(locale: Locale): SeoGuideLink[] {
  return GUIDES[locale] ?? GUIDES.en ?? [];
}
