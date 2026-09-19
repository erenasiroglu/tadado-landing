import type { Locale } from "@/lib/i18n-config";

export type ArticleId =
  | "how-to-play-taboo"
  | "how-to-play-heads-up"
  | "taboo-vs-heads-up"
  | "best-party-games"
  | "create-ai-deck"
  | "icebreaker-games"
  | "word-games-like-taboo"
  | "best-word-game-apps";

export const ARTICLE_REGISTRY: Record<ArticleId, Partial<Record<Locale, string>>> = {
  "how-to-play-taboo": {
    en: "how-to-play-taboo",
    tr: "yasakli-kelimeler-nasil-oynanir",
    es: "como-jugar-tabu",
    de: "tabu-spielanleitung",
    fr: "comment-jouer-tabou",
    it: "come-giocare-tabu",
    "pt-BR": "como-jogar-tabu",
    pl: "jak-grac-w-tabu",
    el: "pos-na-paixete-tampou",
    ru: "kak-igrat-v-tabu",
    ja: "tabu-no-horikata",
    ko: "tabu-igeom-bangbeop",
    zh: "ru-he-wan-tabu",
    ar: "kayfa-talabu-tabu",
    hi: "taboo-kaise-khelein",
    id: "cara-bermain-tabu",
    vi: "cach-choi-tabu",
  },
  "how-to-play-heads-up": {
    en: "how-to-play-heads-up",
    tr: "alninda-tahmin-nasil-oynanir",
    es: "como-jugar-heads-up",
    de: "heads-up-spielanleitung",
    fr: "comment-jouer-heads-up",
    it: "come-giocare-heads-up",
    "pt-BR": "como-jogar-heads-up",
    pl: "jak-grac-w-heads-up",
    el: "pos-na-paixete-heads-up",
    ru: "kak-igrat-heads-up",
    ja: "heads-up-no-horikata",
    ko: "heads-up-igeom-bangbeop",
    zh: "ru-he-wan-heads-up",
    ar: "kayfa-talabu-heads-up",
    hi: "heads-up-kaise-khelein",
    id: "cara-bermain-heads-up",
    vi: "cach-choi-heads-up",
  },
  "taboo-vs-heads-up": {
    en: "taboo-vs-heads-up",
    tr: "tabu-mu-alninda-tahmin-mi",
    es: "tabu-vs-heads-up",
    de: "tabu-vs-heads-up",
    fr: "tabou-vs-heads-up",
    it: "tabu-vs-heads-up",
    "pt-BR": "tabu-vs-heads-up",
    pl: "tabu-vs-heads-up",
    el: "tabu-vs-heads-up",
    ru: "tabu-vs-heads-up",
    ja: "tabu-vs-heads-up",
    ko: "tabu-vs-heads-up",
    zh: "tabu-vs-heads-up",
    ar: "tabu-vs-heads-up",
    hi: "taboo-vs-heads-up",
    id: "tabu-vs-heads-up",
    vi: "tabu-vs-heads-up",
  },
  "best-party-games": {
    en: "best-party-games-for-game-night",
    tr: "en-iyi-parti-oyunlari",
    es: "mejores-juegos-de-fiesta",
    de: "beste-partyspiele",
    fr: "meilleurs-jeux-de-soiree",
    it: "migliori-giochi-da-festa",
    "pt-BR": "melhores-jogos-de-festa",
    pl: "najlepsze-gry-imprezowe",
    el: "kalytera-paichnidia-parti",
    ru: "luchshie-igry-dlya-vecherinki",
    ja: "saikou-no-paati-geemu",
    ko: "choegoui-pati-geim",
    zh: "zuihao-pai-dui-youxi",
    ar: "afdal-aylaab-alhafla",
    hi: "sabse-acchi-party-games",
    id: "game-pesta-terbaik",
    vi: "tro-choi-tiec-tot-nhat",
  },
  "create-ai-deck": {
    en: "create-ai-word-game-deck",
    tr: "yapay-zeka-ile-kendi-deste",
    es: "crear-mazo-ia",
    de: "ki-deck-erstellen",
    fr: "creer-un-deck-ia",
    it: "crea-mazzo-ia",
    "pt-BR": "criar-baralho-ia",
    pl: "tworzenie-talii-ai",
    el: "dimiourgia-trapoulas-ai",
    ru: "sozdat-kolodu-ii",
    ja: "ai-dekki-sakusei",
    ko: "ai-dek-mandeulgi",
    zh: "chuangjian-ai-kapai",
    ar: "insha-deck-ai",
    hi: "ai-deck-banayein",
    id: "buat-deck-ai",
    vi: "tao-bo-bai-ai",
  },
  "icebreaker-games": {
    en: "icebreaker-games-for-groups",
    tr: "tanisma-oyunlari-gruplar",
    es: "juegos-rompehielos",
    de: "icebreaker-spiele",
    fr: "jeux-briser-glace",
    it: "giochi-rompighiaccio",
    "pt-BR": "jogos-quebra-gelo",
    pl: "gry-lamacze-lodow",
    el: "paichnidia-synesis",
    ru: "igry-dlya-znakomstva",
    ja: "aisu-bureeka-geemu",
    ko: "aisubeureikeo-geim",
    zh: "bingpo-youxi",
    ar: "aylaab-kasr-aljilid",
    hi: "icebreaker-games",
    id: "game-pembuka",
    vi: "tro-choi-pha-bang",
  },
  "word-games-like-taboo": {
    en: "word-guessing-games-like-taboo",
    tr: "tabu-benzeri-kelime-oyunlari",
    es: "juegos-de-palabras-como-tabu",
    de: "wortspiele-wie-tabu",
    fr: "jeux-de-mots-comme-tabou",
    it: "giochi-di-parole-come-tabu",
    "pt-BR": "jogos-de-palavras-como-tabu",
    pl: "gry-slowne-jak-tabu",
    el: "paichnidia-lekseon-san-tampou",
    ru: "slovesnye-igry-kak-tabu",
    ja: "tabu-no-you-na-kotoba-geemu",
    ko: "tabu-gateun-dan-eo-geim",
    zh: "xiang-tabu-de-youxi",
    ar: "aylaab-kalimat-mithl-tabu",
    hi: "taboo-jaisi-games",
    id: "game-kata-seperti-tabu",
    vi: "tro-choi-tu-nhu-tabu",
  },
  "best-word-game-apps": {
    en: "best-word-game-apps",
    tr: "en-iyi-kelime-oyunu-uygulamalari",
    es: "mejores-apps-de-palabras",
    de: "beste-wortspiel-apps",
    fr: "meilleures-apps-mots",
    it: "migliori-app-parole",
    "pt-BR": "melhores-apps-de-palavras",
    pl: "najlepsze-aplikacje-slowne",
    el: "kalyteres-efarmoges-lekseon",
    ru: "luchshie-prilozheniya-slov",
    ja: "saikou-no-kotoba-apuri",
    ko: "choegoui-dan-eo-aep",
    zh: "zuihao-danci-youxi-app",
    ar: "afdal-tatbiqat-alkalimat",
    hi: "best-word-game-apps",
    id: "aplikasi-game-kata-terbaik",
    vi: "ung-dung-tro-choi-tu-tot-nhat",
  },
};

export function getArticleSlug(articleId: ArticleId, locale: Locale): string | undefined {
  return ARTICLE_REGISTRY[articleId][locale];
}

export function findArticleBySlug(
  locale: Locale,
  slug: string,
): { articleId: ArticleId; slug: string } | null {
  for (const [articleId, slugs] of Object.entries(ARTICLE_REGISTRY) as [
    ArticleId,
    Partial<Record<Locale, string>>,
  ][]) {
    if (slugs[locale] === slug) {
      return { articleId, slug };
    }
  }
  return null;
}

export function getArticleAlternates(
  articleId: ArticleId,
  locale: Locale,
): { slug: string; locale: Locale }[] {
  const slugs = ARTICLE_REGISTRY[articleId];
  return (Object.entries(slugs) as [Locale, string][]).map(([loc, slug]) => ({
    locale: loc,
    slug,
  }));
}
