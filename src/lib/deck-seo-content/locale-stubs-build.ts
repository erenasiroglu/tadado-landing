import type { DeckKey } from "@/lib/deck-cards";
import { SEO_DECK_KEYS } from "@/lib/deck-slugs";
import type { DeckPageContent } from "@/lib/deck-page-types";
import type { Dictionary } from "@/lib/i18n-types";
import type { Locale } from "@/lib/i18n-config";

import arDict from "@/dictionaries/ar.json";
import deDict from "@/dictionaries/de.json";
import elDict from "@/dictionaries/el.json";
import esDict from "@/dictionaries/es.json";
import frDict from "@/dictionaries/fr.json";
import hiDict from "@/dictionaries/hi.json";
import idDict from "@/dictionaries/id.json";
import itDict from "@/dictionaries/it.json";
import jaDict from "@/dictionaries/ja.json";
import koDict from "@/dictionaries/ko.json";
import plDict from "@/dictionaries/pl.json";
import ptBRDict from "@/dictionaries/pt-BR.json";
import ruDict from "@/dictionaries/ru.json";
import viDict from "@/dictionaries/vi.json";
import zhDict from "@/dictionaries/zh.json";

type Stub = Pick<
  DeckPageContent,
  "metaTitle" | "metaDescription" | "h1" | "heroSubtitle" | "whatIsTitle" | "whatIsBody" | "imageAlt"
>;

type Template = {
  metaTitle: (name: string) => string;
  metaDescription: (name: string, taboo: string, headsUp: string) => string;
  heroSubtitle: (name: string) => string;
  whatIsTitle: (name: string) => string;
  whatIsBody: (name: string, taboo: string, headsUp: string) => string;
  imageAlt: (name: string) => string;
};

const TEMPLATES: Record<string, Template> = {
  es: {
    metaTitle: (name) => `${name} | Tadado`,
    metaDescription: (name, taboo, headsUp) =>
      `Juega el mazo ${name} en Tadado con ${taboo} y ${headsUp} en un móvil.`,
    heroSubtitle: (name) => `Cartas de ${name} para tu próxima noche de juegos.`,
    whatIsTitle: (name) => `¿Qué es el mazo ${name}?`,
    whatIsBody: (name, taboo, headsUp) =>
      `${name} es un mazo temático en Tadado. Adivina palabras con ${taboo} o ${headsUp} en un solo teléfono.`,
    imageAlt: (name) => `Mazo ${name} Tadado juego de fiesta`,
  },
  de: {
    metaTitle: (name) => `${name} | Tadado`,
    metaDescription: (name, taboo, headsUp) =>
      `Spiele das ${name}-Deck in Tadado mit ${taboo} und ${headsUp} auf einem Handy.`,
    heroSubtitle: (name) => `Themenkarten für ${name} am nächsten Spieleabend.`,
    whatIsTitle: (name) => `Was ist das ${name}-Deck?`,
    whatIsBody: (name, taboo, headsUp) =>
      `${name} ist ein Themen-Deck in Tadado. Rate Wörter mit ${taboo} oder ${headsUp} auf einem Gerät.`,
    imageAlt: (name) => `Tadado ${name} Partyspiel-Deck`,
  },
  fr: {
    metaTitle: (name) => `${name} | Tadado`,
    metaDescription: (name, taboo, headsUp) =>
      `Jouez au paquet ${name} dans Tadado avec ${taboo} et ${headsUp} sur un téléphone.`,
    heroSubtitle: (name) => `Cartes ${name} pour votre prochaine soirée jeux.`,
    whatIsTitle: (name) => `Qu'est-ce que le paquet ${name} ?`,
    whatIsBody: (name, taboo, headsUp) =>
      `${name} est un paquet thématique dans Tadado. Devinez des mots avec ${taboo} ou ${headsUp} sur un seul appareil.`,
    imageAlt: (name) => `Paquet ${name} Tadado jeu de fête`,
  },
  "pt-BR": {
    metaTitle: (name) => `${name} | Tadado`,
    metaDescription: (name, taboo, headsUp) =>
      `Jogue o pacote ${name} no Tadado com ${taboo} e ${headsUp} em um celular. Festa com amigos e casais.`,
    heroSubtitle: (name) => `Cartas temáticas de ${name} para a sua próxima noite de jogos.`,
    whatIsTitle: (name) => `O que é o pacote ${name}?`,
    whatIsBody: (name, taboo, headsUp) =>
      `${name} é um pacote temático no Tadado. Descreva e adivinhe palavras com ${taboo} ou ${headsUp} sem anúncios, em um único aparelho.`,
    imageAlt: (name) => `Pacote ${name} Tadado jogo de festa`,
  },
  zh: {
    metaTitle: (name) => `${name} | Tadado`,
    metaDescription: (name, taboo, headsUp) =>
      `在 Tadado 中玩 ${name} 主题卡包，一部手机即可 ${taboo} 与 ${headsUp}。`,
    heroSubtitle: (name) => `${name} 主题词卡，适合聚会与朋友。`,
    whatIsTitle: (name) => `${name} 是什么？`,
    whatIsBody: (name, taboo, headsUp) =>
      `${name} 是 Tadado 中的主题卡包。用 ${taboo} 或 ${headsUp} 在同一部手机上猜词。`,
    imageAlt: (name) => `Tadado ${name} 聚会词卡`,
  },
  hi: {
    metaTitle: (name) => `${name} | Tadado`,
    metaDescription: (name, taboo, headsUp) =>
      `Tadado में ${name} डेक: एक फोन पर ${taboo} और ${headsUp}।`,
    heroSubtitle: (name) => `${name} थीम कार्ड अगली गेम नाइट के लिए।`,
    whatIsTitle: (name) => `${name} क्या है?`,
    whatIsBody: (name, taboo, headsUp) =>
      `${name} Tadado का थीम डेक है। ${taboo} या ${headsUp} में एक ही फोन पर खेलें।`,
    imageAlt: (name) => `Tadado ${name} पार्टी गेम डेक`,
  },
  id: {
    metaTitle: (name) => `${name} | Tadado`,
    metaDescription: (name, taboo, headsUp) =>
      `Mainkan paket ${name} di Tadado dengan ${taboo} dan ${headsUp} di satu ponsel.`,
    heroSubtitle: (name) => `Kartu bertema ${name} untuk malam permainan berikutnya.`,
    whatIsTitle: (name) => `Apa itu paket ${name}?`,
    whatIsBody: (name, taboo, headsUp) =>
      `${name} adalah paket tematik di Tadado. Tebak kata dengan ${taboo} atau ${headsUp} tanpa iklan.`,
    imageAlt: (name) => `Paket ${name} Tadado permainan pesta`,
  },
  vi: {
    metaTitle: (name) => `${name} | Tadado`,
    metaDescription: (name, taboo, headsUp) =>
      `Chơi bộ ${name} trong Tadado với ${taboo} và ${headsUp} trên một điện thoại.`,
    heroSubtitle: (name) => `Thẻ chủ đề ${name} cho buổi chơi tiếp theo.`,
    whatIsTitle: (name) => `Bộ ${name} là gì?`,
    whatIsBody: (name, taboo, headsUp) =>
      `${name} là bộ thẻ theo chủ đề trong Tadado. Đoán từ với ${taboo} hoặc ${headsUp} trên một máy.`,
    imageAlt: (name) => `Bộ ${name} Tadado trò chơi tiệc`,
  },
  ar: {
    metaTitle: (name) => `${name} | Tadado`,
    metaDescription: (name, taboo, headsUp) =>
      `العب حزمة ${name} في Tadado مع ${taboo} و${headsUp} على هاتف واحد.`,
    heroSubtitle: (name) => `بطاقات ${name} لأمسية اللعب القادمة.`,
    whatIsTitle: (name) => `ما هي حزمة ${name}؟`,
    whatIsBody: (name, taboo, headsUp) =>
      `${name} حزمة موضوعية في Tadado. خمّن الكلمات بـ${taboo} أو ${headsUp} بدون إعلانات.`,
    imageAlt: (name) => `حزمة ${name} Tadado لعبة حفلات`,
  },
  ru: {
    metaTitle: (name) => `${name} | Tadado`,
    metaDescription: (name, taboo, headsUp) =>
      `Колода ${name} в Tadado: ${taboo} и ${headsUp} на одном телефоне.`,
    heroSubtitle: (name) => `Тематические карты ${name} для следующей игровой вечеринки.`,
    whatIsTitle: (name) => `Что такое колода ${name}?`,
    whatIsBody: (name, taboo, headsUp) =>
      `${name} — тематическая колода в Tadado. Угадывайте слова в ${taboo} или ${headsUp} на одном устройстве.`,
    imageAlt: (name) => `Колода ${name} Tadado игра для вечеринки`,
  },
  ja: {
    metaTitle: (name) => `${name} | Tadado`,
    metaDescription: (name, taboo, headsUp) =>
      `Tadadoの${name}デッキで${taboo}と${headsUp}を1台のスマホで。`,
    heroSubtitle: (name) => `次のゲームナイト向けの${name}テーマカード。`,
    whatIsTitle: (name) => `${name}デッキとは？`,
    whatIsBody: (name, taboo, headsUp) =>
      `${name}はTadadoのテーマデッキです。${taboo}または${headsUp}で同じカードを使えます。`,
    imageAlt: (name) => `Tadado ${name} パーティーゲームデッキ`,
  },
  ko: {
    metaTitle: (name) => `${name} | Tadado`,
    metaDescription: (name, taboo, headsUp) =>
      `Tadado ${name} 덱으로 한 대의 폰에서 ${taboo}와 ${headsUp}을 즐기세요.`,
    heroSubtitle: (name) => `다음 게임 밤을 위한 ${name} 테마 카드.`,
    whatIsTitle: (name) => `${name} 덱이란?`,
    whatIsBody: (name, taboo, headsUp) =>
      `${name}는 Tadado의 테마 덱입니다. ${taboo} 또는 ${headsUp}으로 같은 카드를 사용합니다.`,
    imageAlt: (name) => `Tadado ${name} 파티 게임 덱`,
  },
  it: {
    metaTitle: (name) => `${name} | Tadado`,
    metaDescription: (name, taboo, headsUp) =>
      `Gioca il mazzo ${name} su Tadado con ${taboo} e ${headsUp} su un solo telefono.`,
    heroSubtitle: (name) => `Carte a tema ${name} per la prossima serata giochi.`,
    whatIsTitle: (name) => `Cos'è il mazzo ${name}?`,
    whatIsBody: (name, taboo, headsUp) =>
      `${name} è un mazzo tematico in Tadado. Indovina parole con ${taboo} o ${headsUp} senza pubblicità.`,
    imageAlt: (name) => `Mazzo ${name} Tadado gioco di festa`,
  },
  pl: {
    metaTitle: (name) => `${name} | Tadado`,
    metaDescription: (name, taboo, headsUp) =>
      `Talii ${name} w Tadado: ${taboo} i ${headsUp} na jednym telefonie.`,
    heroSubtitle: (name) => `Karty ${name} na kolejną wieczór gier.`,
    whatIsTitle: (name) => `Czym jest talia ${name}?`,
    whatIsBody: (name, taboo, headsUp) =>
      `${name} to tematyczna talia w Tadado. Zgaduj słowa w ${taboo} lub ${headsUp} na jednym urządzeniu.`,
    imageAlt: (name) => `Talia ${name} Tadado gra imprezowa`,
  },
  el: {
    metaTitle: (name) => `${name} | Tadado`,
    metaDescription: (name, taboo, headsUp) =>
      `Παίξτε τη τράπουλα ${name} στο Tadado με ${taboo} και ${headsUp} σε ένα κινητό.`,
    heroSubtitle: (name) => `Θεματικές κάρτες ${name} για το επόμενο game night.`,
    whatIsTitle: (name) => `Τι είναι η τράπουλα ${name};`,
    whatIsBody: (name, taboo, headsUp) =>
      `Η ${name} είναι θεματική τράπουλα στο Tadado. Μαντέψτε λέξεις με ${taboo} ή ${headsUp} σε μία συσκευή.`,
    imageAlt: (name) => `Τράπουλα ${name} Tadado παιχνίδι πάρτι`,
  },
};

const TABOO_BY_LOCALE: Partial<Record<Locale, string>> = {
  es: "Tabú",
  de: "Tabu",
  fr: "Tabou",
  "pt-BR": "Tabu",
  zh: "禁忌词",
  hi: "Taboo",
  id: "Tabu",
  vi: "Taboo",
  ar: "تابو",
  ru: "Табу",
  ja: "タブー",
  ko: "금지어",
  it: "Tabù",
  pl: "Tabu",
  el: "Taboo",
};

const DICTS: Record<string, Dictionary> = {
  es: esDict as Dictionary,
  de: deDict as Dictionary,
  fr: frDict as Dictionary,
  "pt-BR": ptBRDict as Dictionary,
  zh: zhDict as Dictionary,
  hi: hiDict as Dictionary,
  id: idDict as Dictionary,
  vi: viDict as Dictionary,
  ar: arDict as Dictionary,
  ru: ruDict as Dictionary,
  ja: jaDict as Dictionary,
  ko: koDict as Dictionary,
  it: itDict as Dictionary,
  pl: plDict as Dictionary,
  el: elDict as Dictionary,
};

function buildForLocale(locale: string): Partial<Record<DeckKey, Stub>> {
  const template = TEMPLATES[locale];
  const dict = DICTS[locale];
  if (!template || !dict) return {};

  const taboo = TABOO_BY_LOCALE[locale as Locale] ?? "Taboo";
  const headsUp = "Heads Up";
  const stubs: Partial<Record<DeckKey, Stub>> = {};

  for (const key of SEO_DECK_KEYS) {
    const name = dict.decks.items[key].name;
    stubs[key] = {
      metaTitle: template.metaTitle(name),
      metaDescription: template.metaDescription(name, taboo, headsUp),
      h1: name,
      heroSubtitle: template.heroSubtitle(name),
      whatIsTitle: template.whatIsTitle(name),
      whatIsBody: template.whatIsBody(name, taboo, headsUp),
      imageAlt: template.imageAlt(name),
    };
  }

  return stubs;
}

export const LOCALE_DECK_STUBS_BUILT: Partial<Record<Locale, Partial<Record<DeckKey, Stub>>>> = {
  es: buildForLocale("es"),
  de: buildForLocale("de"),
  fr: buildForLocale("fr"),
  "pt-BR": buildForLocale("pt-BR"),
  zh: buildForLocale("zh"),
  hi: buildForLocale("hi"),
  id: buildForLocale("id"),
  vi: buildForLocale("vi"),
  ar: buildForLocale("ar"),
  ru: buildForLocale("ru"),
  ja: buildForLocale("ja"),
  ko: buildForLocale("ko"),
  it: buildForLocale("it"),
  pl: buildForLocale("pl"),
  el: buildForLocale("el"),
};
