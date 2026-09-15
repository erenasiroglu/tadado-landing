import type { Locale } from "@/lib/i18n-config";

export type TrendingGameMode = "taboo" | "headsup";

export interface TrendingGroup {
  id: string;
  label: string;
  deckLabel: string;
  words: string[];
  mode: TrendingGameMode;
}

export interface TrendingContent {
  groups: TrendingGroup[];
  compareGames: string[];
}

const TRENDING_EN: TrendingContent = {
  groups: [
    {
      id: "cinema",
      label: "In cinemas now",
      deckLabel: "Spider-Man: Brand New Day",
      words: ["SPIDER MAN", "MARVEL", "HERO", "WEB", "NEW YORK"],
      mode: "taboo",
    },
    {
      id: "streaming",
      label: "Streaming now",
      deckLabel: "Obsession",
      words: ["OBSESSION", "NETFLIX", "DRAMA", "SERIES", "STREAMING"],
      mode: "taboo",
    },
    {
      id: "odyssey",
      label: "Trending deck",
      deckLabel: "The Odyssey",
      words: ["THE ODYSSEY", "GREEK", "EPIC", "HOMER", "FILM"],
      mode: "taboo",
    },
    {
      id: "football",
      label: "Trending deck",
      deckLabel: "Champions League nights",
      words: ["REAL MADRID", "FOOTBALL", "SPAIN", "GOAL", "CHAMPIONS"],
      mode: "taboo",
    },
    {
      id: "headsup-cinema",
      label: "Heads Up",
      deckLabel: "Spider-Man: Brand New Day",
      words: ["SPIDER MAN"],
      mode: "headsup",
    },
    {
      id: "headsup-streaming",
      label: "Heads Up",
      deckLabel: "Obsession",
      words: ["OBSESSION"],
      mode: "headsup",
    },
    {
      id: "headsup-odyssey",
      label: "Heads Up",
      deckLabel: "The Odyssey",
      words: ["THE ODYSSEY"],
      mode: "headsup",
    },
    {
      id: "headsup-football",
      label: "Heads Up",
      deckLabel: "Champions League nights",
      words: ["REAL MADRID"],
      mode: "headsup",
    },
  ],
  compareGames: ["Heads Up!", "Nebuu", "Charades", "the Taboo board game"],
};

const TRENDING_TR: TrendingContent = {
  groups: [
    {
      id: "cinema",
      label: "Şimdi sinemalarda",
      deckLabel: "Spider-Man: Brand New Day",
      words: ["SPIDER MAN", "MARVEL", "KAHRAMAN", "AĞ", "NEW YORK"],
      mode: "taboo",
    },
    {
      id: "streaming",
      label: "Şimdi yayında",
      deckLabel: "Obsession",
      words: ["OBSESSION", "NETFLIX", "DİZİ", "DRAMA", "YAYIN"],
      mode: "taboo",
    },
    {
      id: "odyssey",
      label: "Trend deste",
      deckLabel: "The Odyssey",
      words: ["THE ODYSSEY", "YUNAN", "EPİK", "HOMEROS", "FİLM"],
      mode: "taboo",
    },
    {
      id: "football",
      label: "Trend deste",
      deckLabel: "Şampiyonlar Ligi geceleri",
      words: ["REAL MADRID", "FUTBOL", "İSPANYA", "GOL", "ŞAMPİYON"],
      mode: "taboo",
    },
    {
      id: "headsup-cinema",
      label: "Alnında Tahmin",
      deckLabel: "Spider-Man: Brand New Day",
      words: ["SPIDER MAN"],
      mode: "headsup",
    },
    {
      id: "headsup-streaming",
      label: "Alnında Tahmin",
      deckLabel: "Obsession",
      words: ["OBSESSION"],
      mode: "headsup",
    },
    {
      id: "headsup-odyssey",
      label: "Alnında Tahmin",
      deckLabel: "The Odyssey",
      words: ["THE ODYSSEY"],
      mode: "headsup",
    },
    {
      id: "headsup-football",
      label: "Alnında Tahmin",
      deckLabel: "Şampiyonlar Ligi geceleri",
      words: ["REAL MADRID"],
      mode: "headsup",
    },
  ],
  compareGames: ["Heads Up!", "Nebuu", "Charades", "Taboo masa oyunu"],
};

const TRENDING_BY_LOCALE: Partial<Record<Locale, TrendingContent>> = {
  en: TRENDING_EN,
  tr: TRENDING_TR,
};

export function getTrendingContent(locale: Locale): TrendingContent {
  return TRENDING_BY_LOCALE[locale] ?? TRENDING_EN;
}

export const AI_QUICK_PICKS: Partial<Record<Locale, string[]>> = {
  en: ["Marvel movies", "90s pop hits", "Office jokes", "Champions League", "Oscar films", "Road trip"],
  tr: ["Marvel filmleri", "90'lar hitleri", "Ofis şakaları", "Şampiyonlar Ligi", "Oscar filmleri", "Yolculuk"],
  es: ["Películas Marvel", "Éxitos de los 90", "Chistes de oficina", "Champions League", "Películas Oscar", "Road trip"],
  de: ["Marvel-Filme", "90er Hits", "Büro-Witze", "Champions League", "Oscar-Filme", "Roadtrip"],
  fr: ["Films Marvel", "Hits des années 90", "Blagues de bureau", "Ligue des champions", "Films Oscar", "Road trip"],
  it: ["Film Marvel", "Hit anni 90", "Battute d'ufficio", "Champions League", "Film Oscar", "Road trip"],
  "pt-BR": ["Filmes Marvel", "Hits dos 90", "Piadas de escritório", "Champions League", "Filmes Oscar", "Road trip"],
  zh: ["漫威电影", "90年代金曲", "办公室笑话", "欧冠", "奥斯卡电影", "公路旅行"],
  hi: ["Marvel movies", "90s pop hits", "Office jokes", "Champions League", "Oscar films", "Road trip"],
  id: ["Film Marvel", "Lagu 90-an", "Jokes kantor", "Champions League", "Film Oscar", "Road trip"],
  vi: ["Phim Marvel", "Hit thập niên 90", "Đùa văn phòng", "Champions League", "Phim Oscar", "Road trip"],
  ar: ["أفلام مارفل", "أغاني التسعينيات", "نكات المكتب", "دوري الأبطال", "أفلام الأوسكار", "رحلة برية"],
  ru: ["Фильмы Marvel", "Хиты 90-х", "Офисные шутки", "Лига чемпионов", "Оскаровские фильмы", "Road trip"],
  ja: ["マーベル映画", "90年代ヒット", "オフィスジョーク", "チャンピオンズリーグ", "アカデミー作品", "ロードトリップ"],
  ko: ["마블 영화", "90년대 히트곡", "회사 농담", "챔피언스리그", "오스카 영화", "로드트립"],
  pl: ["Filmy Marvel", "Hity lat 90.", "Żarty biurowe", "Liga Mistrzów", "Filmy Oscarowe", "Road trip"],
  el: ["Ταινίες Marvel", "Hits των 90s", "Αστεία γραφείου", "Champions League", "Ταινίες Oscar", "Road trip"],
};

export function getAiQuickPicks(locale: Locale): string[] {
  return AI_QUICK_PICKS[locale] ?? AI_QUICK_PICKS.en ?? [];
}
