import type { Locale } from "@/lib/i18n-config";

export type AiDemoDifficulty = "easy" | "medium" | "hard";

export interface AiDemoSample {
  topic: string;
  word: string;
  forbidden: string[];
}

const EN_SAMPLES: Record<AiDemoDifficulty, AiDemoSample> = {
  easy: {
    topic: "Family animals",
    word: "CAT",
    forbidden: ["PET", "MEOW", "KITTEN", "PAW"],
  },
  medium: {
    topic: "Marvel movies",
    word: "SPIDER-MAN",
    forbidden: ["MARVEL", "WEB", "HERO", "NEW YORK"],
  },
  hard: {
    topic: "European football legends",
    word: "ZIDANE",
    forbidden: ["FRANCE", "REAL MADRID", "MIDFIELD", "BALLON"],
  },
};

const TR_SAMPLES: Record<AiDemoDifficulty, AiDemoSample> = {
  easy: {
    topic: "Ev hayvanları",
    word: "KEDİ",
    forbidden: ["HAYVAN", "MİYAV", "PATİ", "TÜY"],
  },
  medium: {
    topic: "Marvel filmleri",
    word: "SPIDER-MAN",
    forbidden: ["MARVEL", "AĞ", "KAHRAMAN", "NEW YORK"],
  },
  hard: {
    topic: "Futbol efsaneleri",
    word: "ZİDANE",
    forbidden: ["FRANSA", "REAL MADRID", "ORTA SAHA", "BALLON"],
  },
};

export function getAiDemoSample(locale: Locale, difficulty: AiDemoDifficulty): AiDemoSample {
  const samples = locale === "tr" ? TR_SAMPLES : EN_SAMPLES;
  return samples[difficulty];
}
