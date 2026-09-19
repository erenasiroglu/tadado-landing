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

interface TrendingLabels {
  cinema: string;
  streaming: string;
  odyssey: string;
  football: string;
  headsup: string;
  compareGames: string[];
}

const BASE_GROUPS: Omit<TrendingGroup, "label">[] = [
  {
    id: "cinema",
    deckLabel: "Spider-Man: Brand New Day",
    words: ["SPIDER MAN", "MARVEL", "HERO", "WEB", "NEW YORK"],
    mode: "taboo",
  },
  {
    id: "streaming",
    deckLabel: "Obsession",
    words: ["OBSESSION", "NETFLIX", "DRAMA", "SERIES", "STREAMING"],
    mode: "taboo",
  },
  {
    id: "odyssey",
    deckLabel: "The Odyssey",
    words: ["THE ODYSSEY", "GREEK", "EPIC", "HOMER", "FILM"],
    mode: "taboo",
  },
  {
    id: "football",
    deckLabel: "Champions League nights",
    words: ["REAL MADRID", "FOOTBALL", "SPAIN", "GOAL", "CHAMPIONS"],
    mode: "taboo",
  },
  {
    id: "headsup-cinema",
    deckLabel: "Spider-Man: Brand New Day",
    words: ["SPIDER MAN"],
    mode: "headsup",
  },
  {
    id: "headsup-streaming",
    deckLabel: "Obsession",
    words: ["OBSESSION"],
    mode: "headsup",
  },
  {
    id: "headsup-odyssey",
    deckLabel: "The Odyssey",
    words: ["THE ODYSSEY"],
    mode: "headsup",
  },
  {
    id: "headsup-football",
    deckLabel: "Champions League nights",
    words: ["REAL MADRID"],
    mode: "headsup",
  },
];

function buildTrending(labels: TrendingLabels): TrendingContent {
  return {
    groups: BASE_GROUPS.map((group) => {
      let label = labels.headsup;
      if (group.id === "cinema" || group.id === "headsup-cinema") label = group.mode === "headsup" ? labels.headsup : labels.cinema;
      else if (group.id === "streaming" || group.id === "headsup-streaming") label = group.mode === "headsup" ? labels.headsup : labels.streaming;
      else if (group.id === "odyssey" || group.id === "headsup-odyssey") label = group.mode === "headsup" ? labels.headsup : labels.odyssey;
      else if (group.id === "football" || group.id === "headsup-football") label = group.mode === "headsup" ? labels.headsup : labels.football;
      return { ...group, label };
    }),
    compareGames: labels.compareGames,
  };
}

const TRENDING_LABELS: Record<Locale, TrendingLabels> = {
  en: {
    cinema: "In cinemas now",
    streaming: "Streaming now",
    odyssey: "Trending deck",
    football: "Trending deck",
    headsup: "Heads Up",
    compareGames: ["Heads Up!", "Nebuu", "Charades", "the Taboo board game"],
  },
  tr: {
    cinema: "Şimdi sinemalarda",
    streaming: "Şimdi yayında",
    odyssey: "Trend deste",
    football: "Trend deste",
    headsup: "Alnında Tahmin",
    compareGames: ["Heads Up!", "Nebuu", "Charades", "Taboo masa oyunu"],
  },
  es: {
    cinema: "En cines ahora",
    streaming: "En streaming",
    odyssey: "Mazo en tendencia",
    football: "Mazo en tendencia",
    headsup: "Heads Up",
    compareGames: ["Heads Up!", "Nebuu", "Charades", "el juego de mesa Tabú"],
  },
  de: {
    cinema: "Jetzt im Kino",
    streaming: "Jetzt im Stream",
    odyssey: "Trend-Deck",
    football: "Trend-Deck",
    headsup: "Heads Up",
    compareGames: ["Heads Up!", "Nebuu", "Charades", "das Tabu-Brettspiel"],
  },
  fr: {
    cinema: "Au cinéma maintenant",
    streaming: "En streaming",
    odyssey: "Deck tendance",
    football: "Deck tendance",
    headsup: "Heads Up",
    compareGames: ["Heads Up!", "Nebuu", "Charades", "le jeu Tabou"],
  },
  it: {
    cinema: "Al cinema ora",
    streaming: "In streaming",
    odyssey: "Mazzo di tendenza",
    football: "Mazzo di tendenza",
    headsup: "Heads Up",
    compareGames: ["Heads Up!", "Nebuu", "Charades", "il gioco da tavolo Tabù"],
  },
  "pt-BR": {
    cinema: "Nos cinemas agora",
    streaming: "Em streaming",
    odyssey: "Baralho em alta",
    football: "Baralho em alta",
    headsup: "Heads Up",
    compareGames: ["Heads Up!", "Nebuu", "Charades", "o jogo de tabuleiro Tabu"],
  },
  pl: {
    cinema: "Teraz w kinach",
    streaming: "Na streamingu",
    odyssey: "Trendująca talia",
    football: "Trendująca talia",
    headsup: "Heads Up",
    compareGames: ["Heads Up!", "Nebuu", "Charades", "gra planszowa Tabu"],
  },
  el: {
    cinema: "Τώρα στις αίθουσες",
    streaming: "Σε streaming",
    odyssey: "Τράπουλα τάσης",
    football: "Τράπουλα τάσης",
    headsup: "Heads Up",
    compareGames: ["Heads Up!", "Nebuu", "Charades", "το επιτραπέζιο Taboo"],
  },
  ru: {
    cinema: "Сейчас в кино",
    streaming: "В стриминге",
    odyssey: "Трендовая колода",
    football: "Трендовая колода",
    headsup: "Heads Up",
    compareGames: ["Heads Up!", "Nebuu", "Charades", "настольная Taboo"],
  },
  ja: {
    cinema: "現在上映中",
    streaming: "配信中",
    odyssey: "トレンドデッキ",
    football: "トレンドデッキ",
    headsup: "Heads Up",
    compareGames: ["Heads Up!", "Nebuu", "Charades", "Tabooボードゲーム"],
  },
  ko: {
    cinema: "지금 상영 중",
    streaming: "스트리밍 중",
    odyssey: "트렌드 덱",
    football: "트렌드 덱",
    headsup: "Heads Up",
    compareGames: ["Heads Up!", "Nebuu", "Charades", "Taboo 보드게임"],
  },
  zh: {
    cinema: "正在上映",
    streaming: "正在热播",
    odyssey: "热门卡组",
    football: "热门卡组",
    headsup: "Heads Up",
    compareGames: ["Heads Up!", "Nebuu", "Charades", "Taboo 桌游"],
  },
  ar: {
    cinema: "في السينما الآن",
    streaming: "يعرض الآن",
    odyssey: "مجموعة رائجة",
    football: "مجموعة رائجة",
    headsup: "Heads Up",
    compareGames: ["Heads Up!", "Nebuu", "Charades", "لعبة Taboo"],
  },
  hi: {
    cinema: "अभी सिनेमाघरों में",
    streaming: "अभी स्ट्रीमिंग पर",
    odyssey: "ट्रेंडिंग डेक",
    football: "ट्रेंडिंग डेक",
    headsup: "Heads Up",
    compareGames: ["Heads Up!", "Nebuu", "Charades", "Taboo बोर्ड गेम"],
  },
  id: {
    cinema: "Sedang di bioskop",
    streaming: "Sedang streaming",
    odyssey: "Deste trending",
    football: "Deste trending",
    headsup: "Heads Up",
    compareGames: ["Heads Up!", "Nebuu", "Charades", "permainan papan Taboo"],
  },
  vi: {
    cinema: "Đang chiếu rạp",
    streaming: "Đang phát sóng",
    odyssey: "Bộ bài thịnh hành",
    football: "Bộ bài thịnh hành",
    headsup: "Heads Up",
    compareGames: ["Heads Up!", "Nebuu", "Charades", "board game Taboo"],
  },
};

export function getTrendingContent(locale: Locale): TrendingContent {
  const labels = TRENDING_LABELS[locale];
  if (!labels) {
    throw new Error(`Missing trending labels for locale: ${locale}`);
  }
  return buildTrending(labels);
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
