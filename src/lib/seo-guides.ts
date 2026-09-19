import {
  ARTICLE_REGISTRY,
  type ArticleId,
} from "@/lib/article-registry";
import type { Locale } from "@/lib/i18n-config";

export interface SeoGuideLink {
  slug: string;
  label: string;
}

const GUIDE_ARTICLE_IDS: ArticleId[] = [
  "how-to-play-taboo",
  "how-to-play-heads-up",
  "best-word-game-apps",
  "word-games-like-taboo",
  "taboo-vs-heads-up",
];

const GUIDE_LABELS: Partial<Record<Locale, Partial<Record<ArticleId, string>>>> = {
  en: {
    "how-to-play-taboo": "How to play Taboo (Forbidden Words)",
    "how-to-play-heads-up": "How to play Heads Up charades",
    "best-word-game-apps": "Best word game apps for mobile",
    "word-games-like-taboo": "Word guessing games like Taboo",
    "taboo-vs-heads-up": "Taboo vs Heads Up: which to play?",
  },
  tr: {
    "how-to-play-taboo": "Tabu nasıl oynanır?",
    "how-to-play-heads-up": "Alnında Tahmin nasıl oynanır?",
    "best-word-game-apps": "En iyi kelime oyunu uygulamaları",
    "word-games-like-taboo": "Tabu benzeri kelime oyunları",
    "taboo-vs-heads-up": "Tabu mu, Alnında Tahmin mi?",
  },
  es: {
    "how-to-play-taboo": "Cómo jugar al Tabú",
    "how-to-play-heads-up": "Cómo jugar Heads Up",
    "best-word-game-apps": "Mejores apps de palabras",
    "word-games-like-taboo": "Juegos de palabras como Tabú",
    "taboo-vs-heads-up": "Tabú vs Heads Up",
  },
  de: {
    "how-to-play-taboo": "Tabu spielen: Anleitung",
    "how-to-play-heads-up": "Heads Up spielen",
    "best-word-game-apps": "Beste Wortspiel-Apps",
    "word-games-like-taboo": "Wortspiele wie Tabu",
    "taboo-vs-heads-up": "Tabu vs Heads Up",
  },
  fr: {
    "how-to-play-taboo": "Comment jouer au Tabou",
    "how-to-play-heads-up": "Comment jouer à Heads Up",
    "best-word-game-apps": "Meilleures apps de mots",
    "word-games-like-taboo": "Jeux de mots comme Tabou",
    "taboo-vs-heads-up": "Tabou vs Heads Up",
  },
  it: {
    "how-to-play-taboo": "Come giocare a Tabù",
    "how-to-play-heads-up": "Come giocare a Heads Up",
    "best-word-game-apps": "Migliori app di parole",
    "word-games-like-taboo": "Giochi di parole come Tabù",
    "taboo-vs-heads-up": "Tabù vs Heads Up",
  },
  "pt-BR": {
    "how-to-play-taboo": "Como jogar Tabu",
    "how-to-play-heads-up": "Como jogar Heads Up",
    "best-word-game-apps": "Melhores apps de palavras",
    "word-games-like-taboo": "Jogos de palavras como Tabu",
    "taboo-vs-heads-up": "Tabu vs Heads Up",
  },
  pl: {
    "how-to-play-taboo": "Jak grać w Tabu",
    "how-to-play-heads-up": "Jak grać w Heads Up",
    "best-word-game-apps": "Najlepsze aplikacje słowne",
    "word-games-like-taboo": "Gry słowne jak Tabu",
    "taboo-vs-heads-up": "Tabu vs Heads Up",
  },
  el: {
    "how-to-play-taboo": "Πώς να παίξετε Taboo",
    "how-to-play-heads-up": "Πώς να παίξετε Heads Up",
    "best-word-game-apps": "Καλύτερες εφαρμογές λέξεων",
    "word-games-like-taboo": "Παιχνίδια λέξεων σαν Taboo",
    "taboo-vs-heads-up": "Taboo vs Heads Up",
  },
  ru: {
    "how-to-play-taboo": "Как играть в Taboo",
    "how-to-play-heads-up": "Как играть в Heads Up",
    "best-word-game-apps": "Лучшие приложения со словами",
    "word-games-like-taboo": "Словесные игры как Taboo",
    "taboo-vs-heads-up": "Taboo vs Heads Up",
  },
  ja: {
    "how-to-play-taboo": "Tabooの遊び方",
    "how-to-play-heads-up": "Heads Upの遊び方",
    "best-word-game-apps": "おすすめワードゲームアプリ",
    "word-games-like-taboo": "Tabooのような言葉ゲーム",
    "taboo-vs-heads-up": "Taboo vs Heads Up",
  },
  ko: {
    "how-to-play-taboo": "Taboo 하는 방법",
    "how-to-play-heads-up": "Heads Up 하는 방법",
    "best-word-game-apps": "최고의 단어 게임 앱",
    "word-games-like-taboo": "Taboo 같은 단어 게임",
    "taboo-vs-heads-up": "Taboo vs Heads Up",
  },
  zh: {
    "how-to-play-taboo": "如何玩 Taboo",
    "how-to-play-heads-up": "如何玩 Heads Up",
    "best-word-game-apps": "最佳文字游戏应用",
    "word-games-like-taboo": "像 Taboo 的猜词游戏",
    "taboo-vs-heads-up": "Taboo vs Heads Up",
  },
  ar: {
    "how-to-play-taboo": "كيف تلعب Taboo",
    "how-to-play-heads-up": "كيف تلعب Heads Up",
    "best-word-game-apps": "أفضل تطبيقات ألعاب الكلمات",
    "word-games-like-taboo": "ألعاب تخمين الكلمات مثل Taboo",
    "taboo-vs-heads-up": "Taboo مقابل Heads Up",
  },
  hi: {
    "how-to-play-taboo": "Taboo कैसे खेलें",
    "how-to-play-heads-up": "Heads Up कैसे खेलें",
    "best-word-game-apps": "सर्वश्रेष्ठ शब्द गेम ऐप",
    "word-games-like-taboo": "Taboo जैसे शब्द खेल",
    "taboo-vs-heads-up": "Taboo vs Heads Up",
  },
  id: {
    "how-to-play-taboo": "Cara bermain Taboo",
    "how-to-play-heads-up": "Cara bermain Heads Up",
    "best-word-game-apps": "Aplikasi game kata terbaik",
    "word-games-like-taboo": "Game kata seperti Taboo",
    "taboo-vs-heads-up": "Taboo vs Heads Up",
  },
  vi: {
    "how-to-play-taboo": "Cách chơi Taboo",
    "how-to-play-heads-up": "Cách chơi Heads Up",
    "best-word-game-apps": "Ứng dụng trò chơi từ hay nhất",
    "word-games-like-taboo": "Trò chơi đoán từ như Taboo",
    "taboo-vs-heads-up": "Taboo vs Heads Up",
  },
};

export function getSeoGuides(locale: Locale): SeoGuideLink[] {
  const labels = GUIDE_LABELS[locale] ?? GUIDE_LABELS.en ?? {};
  const fallback = GUIDE_LABELS.en ?? {};

  return GUIDE_ARTICLE_IDS.flatMap((articleId) => {
    const slug = ARTICLE_REGISTRY[articleId][locale];
    if (!slug) return [];
    const label = labels[articleId] ?? fallback[articleId] ?? articleId;
    return [{ slug, label }];
  });
}
