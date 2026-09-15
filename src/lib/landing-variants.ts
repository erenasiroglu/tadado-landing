import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";

export type HeroTab = "taboo" | "headsup";

interface LandingVariant {
  hero: Partial<Dictionary["hero"]>;
  defaultHeroTab: HeroTab;
}

const VARIANTS: Partial<Record<Locale, LandingVariant>> = {
  en: {
    hero: {
      badge: "Best word game app",
      title: "The best free word game app for Taboo, Heads Up & AI decks",
      subtitle:
        "How to play Taboo and Heads Up charades on one app. Custom AI decks, themed packs, and no ads for game night.",
    },
    defaultHeroTab: "taboo",
  },
  tr: {
    hero: {
      badge: "Tabu nasıl oynanır?",
      title: "Tabu ve Alnında Tahmin: en iyi ücretsiz kelime oyunu uygulaması",
      subtitle:
        "Tabu nasıl oynanır, Alnında Tahmin kuralları ve yapay zeka desteleri tek uygulamada. Reklamsız, abonelik yok.",
    },
    defaultHeroTab: "taboo",
  },
  es: {
    hero: {
      badge: "Mejor app de palabras",
      title: "El mejor juego de tabú y Heads Up en una sola app",
      subtitle:
        "Cómo jugar tabú y charadas Heads Up en el móvil. Mazos con IA, packs temáticos y sin anuncios.",
    },
    defaultHeroTab: "taboo",
  },
  de: {
    hero: {
      badge: "Beste Wortspiel-App",
      title: "Die beste kostenlose Tabu- und Heads-Up-App mit KI-Decks",
      subtitle:
        "Tabu und Heads Up in einer App. KI-Decks, Themenpakete und keine Werbung für den Spieleabend.",
    },
    defaultHeroTab: "taboo",
  },
  fr: {
    hero: {
      badge: "Meilleure app de mots",
      title: "La meilleure app gratuite Tabou, Heads Up et decks IA",
      subtitle:
        "Jouez au Tabou et Heads Up sur une seule app. Decks IA, packs thématiques, sans pub.",
    },
    defaultHeroTab: "taboo",
  },
  "pt-BR": {
    hero: {
      badge: "Melhor app de palavras",
      title: "O melhor app grátis de Tabu, Heads Up e baralhos com IA",
      subtitle:
        "Tabu e Heads Up em um app. Baralhos com IA, pacotes temáticos e sem anúncios.",
    },
    defaultHeroTab: "taboo",
  },
  ja: {
    hero: {
      badge: "最高のワードゲームアプリ",
      title: "タブー・ヘッズアップ・AIデッキが揃う無料パーティーゲーム",
      subtitle: "タブーとヘッズアップを1つのアプリで。AIデッキ、テーマパック、広告なし。",
    },
    defaultHeroTab: "headsup",
  },
  ko: {
    hero: {
      badge: "최고의 단어 게임 앱",
      title: "타부, 헤즈업, AI 덱이 있는 최고의 무료 파티 게임",
      subtitle: "타부와 헤즈업을 한 앱에서. AI 덱, 테마 팩, 광고 없음.",
    },
    defaultHeroTab: "headsup",
  },
};

export function applyLandingVariant(locale: Locale, dict: Dictionary): Dictionary {
  const variant = VARIANTS[locale];
  if (!variant) return dict;

  return {
    ...dict,
    hero: { ...dict.hero, ...variant.hero },
  };
}

export function getDefaultHeroTab(locale: Locale): HeroTab {
  return VARIANTS[locale]?.defaultHeroTab ?? "taboo";
}
