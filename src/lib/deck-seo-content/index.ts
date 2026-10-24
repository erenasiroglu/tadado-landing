import type { DeckKey } from "@/lib/deck-cards";
import type { DeckPageContent } from "@/lib/deck-page-types";
import { isFullContentLocale } from "@/lib/i18n-fallback";
import type { Locale } from "@/lib/i18n-config";

import { EN_DECK_PAGES } from "./en";
import { GENIUS_DECK_PAGES } from "./genius";
import { LOCALE_DECK_BODIES } from "./locale-bodies";
import { LOCALE_DECK_STUBS } from "./locale-stubs";
import { LOCALE_DECK_STUBS_BUILT } from "./locale-stubs-build";
import { TR_DECK_PAGES } from "./tr";

function mergeStub(base: DeckPageContent, stub: Partial<DeckPageContent>): DeckPageContent {
  return { ...base, ...stub };
}

export function getDeckPageContent(locale: Locale, key: DeckKey): DeckPageContent {
  if (key === "genius") {
    return GENIUS_DECK_PAGES[locale];
  }

  if (locale === "tr") {
    return TR_DECK_PAGES[key];
  }

  const en = EN_DECK_PAGES[key];

  if (locale === "en") {
    return en;
  }

  const built = LOCALE_DECK_STUBS_BUILT[locale]?.[key];
  const manual = LOCALE_DECK_STUBS[locale]?.[key];
  const body = LOCALE_DECK_BODIES[locale]?.[key];
  const mergedStub = { ...body, ...built, ...manual };

  return mergeStub(en, mergedStub);
}

const DECK_HUB_COPY: Partial<Record<Locale, { title: string; description: string }>> = {
  tr: {
    title: "Tadado oyun desteleri",
    description:
      "Tadado Mix ücretsiz başlangıç destesi ve temalı paketler: Sinema, Seyahat, Spor, Kahramanlar, Yaz ve Gece Oyunları. Tabu ve Heads Up için tek telefon.",
  },
  es: {
    title: "Mazos de juego Tadado",
    description:
      "Tadado Mix gratis y mazos temáticos: Cine, Viajes, Deporte, Héroes, Verano y Juegos nocturnos. Tabú y Heads Up en un móvil.",
  },
  de: {
    title: "Tadado Spieldecks",
    description:
      "Tadado Mix kostenlos plus Themen-Decks: Kino, Reisen, Sport, Helden, Sommer und Nachtspiele. Tabu und Heads Up auf einem Handy.",
  },
  fr: {
    title: "Paquets de jeu Tadado",
    description:
      "Tadado Mix gratuit et paquets thématiques : Cinéma, Voyage, Sport, Héros, Été et Jeux nocturnes. Tabou et Heads Up sur un téléphone.",
  },
  "pt-BR": {
    title: "Baralhos do Tadado",
    description:
      "Tadado Mix grátis e baralhos temáticos: Cinema, Viagem, Esporte, Heróis, Verão e Jogos Noturnos. Tabu e Heads Up em um só celular.",
  },
  it: {
    title: "Mazzi di gioco Tadado",
    description:
      "Tadado Mix gratis e mazzi a tema: Cinema, Viaggi, Sport, Eroi, Estate e Giochi notturni. Tabù e Heads Up su un solo telefono.",
  },
  pl: {
    title: "Talie do gry Tadado",
    description:
      "Darmowa talia Tadado Mix i talie tematyczne: Kino, Podróże, Sport, Bohaterowie, Lato i Gry nocne. Tabu i Heads Up na jednym telefonie.",
  },
  el: {
    title: "Τράπουλες παιχνιδιού Tadado",
    description:
      "Δωρεάν Tadado Mix και θεματικές τράπουλες: Σινεμά, Ταξίδια, Αθλητισμός, Ήρωες, Καλοκαίρι και Νυχτερινά παιχνίδια. Ταμπού και Heads Up σε ένα κινητό.",
  },
  ru: {
    title: "Колоды Tadado",
    description:
      "Бесплатная колода Tadado Mix и тематические колоды: Кино, Путешествия, Спорт, Герои, Лето и Ночные игры. Табу и Heads Up на одном телефоне.",
  },
  ja: {
    title: "Tadadoのゲームデッキ",
    description:
      "無料のTadado Mixと、シネマ、トラベル、スポーツ、ヒーローズ、サマー、ナイトゲームのテーマデッキ。1台のスマホでタブーもHeads Upも。",
  },
  ko: {
    title: "Tadado 게임 덱",
    description:
      "무료 Tadado Mix와 시네마, 트래블, 스포츠, 히어로즈, 썸머, 나이트 게임 테마 덱. 휴대폰 한 대로 터부와 Heads Up을 즐기세요.",
  },
  zh: {
    title: "Tadado 游戏卡组",
    description:
      "免费的 Tadado Mix 入门卡组，以及影院、旅行、运动、英雄、夏日和夜间游戏主题卡组。一部手机玩禁忌词和 Heads Up。",
  },
  ar: {
    title: "مجموعات ألعاب Tadado",
    description:
      "مجموعة Tadado Mix المجانية ومجموعات بمواضيع: السينما والسفر والرياضة والأبطال والصيف وألعاب الليل. تابو وHeads Up على هاتف واحد.",
  },
  hi: {
    title: "Tadado गेम डेक",
    description:
      "मुफ़्त Tadado Mix स्टार्टर डेक और थीम डेक: सिनेमा, यात्रा, खेल, नायक, गर्मी और रात के गेम। एक फ़ोन पर टैबू और Heads Up।",
  },
  id: {
    title: "Dek permainan Tadado",
    description:
      "Dek awal Tadado Mix gratis plus dek bertema: Sinema, Perjalanan, Olahraga, Pahlawan, Musim Panas, dan Permainan Malam. Tabu dan Heads Up di satu ponsel.",
  },
  vi: {
    title: "Bộ bài Tadado",
    description:
      "Bộ Tadado Mix miễn phí cùng các bộ chủ đề: Điện ảnh, Du lịch, Thể thao, Anh hùng, Mùa hè và Game đêm. Tabu và Heads Up trên một điện thoại.",
  },
};

const EN_DECK_HUB_COPY = {
  title: "Tadado game decks",
  description:
    "Free Tadado Mix starter deck plus themed packs: Cinema, Travel, Sport, Heroes, Summer, and Night Games. Taboo and Heads Up on one phone.",
} as const;

export function getDeckHubCopy(locale: Locale): { title: string; description: string } {
  if (isFullContentLocale(locale)) {
    return DECK_HUB_COPY[locale] ?? (locale === "en" ? EN_DECK_HUB_COPY : DECK_HUB_COPY.tr!);
  }

  return DECK_HUB_COPY[locale] ?? EN_DECK_HUB_COPY;
}
