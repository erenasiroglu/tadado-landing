import type { Locale } from "@/lib/i18n-config";

export type AiDemoDifficulty = "easy" | "medium" | "hard";

export interface AiDemoSample {
  topic: string;
  word: string;
  forbidden: string[];
}

type LocaleSamples = Record<AiDemoDifficulty, AiDemoSample>;

const EN_SAMPLES: LocaleSamples = {
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

const SAMPLES_BY_LOCALE: Partial<Record<Locale, LocaleSamples>> = {
  en: EN_SAMPLES,
  tr: {
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
  },
  es: {
    easy: { topic: "Animales de casa", word: "GATO", forbidden: ["MASCOTA", "MAULLAR", "GATITO", "PATA"] },
    medium: { topic: "Películas Marvel", word: "SPIDER-MAN", forbidden: ["MARVEL", "TELARAÑA", "HÉROE", "NUEVA YORK"] },
    hard: { topic: "Leyendas del fútbol", word: "ZIDANE", forbidden: ["FRANCIA", "REAL MADRID", "MEDIO", "BALÓN"] },
  },
  de: {
    easy: { topic: "Haustiere", word: "KATZE", forbidden: ["TIER", "MIAU", "KÄTZCHEN", "PFOTE"] },
    medium: { topic: "Marvel-Filme", word: "SPIDER-MAN", forbidden: ["MARVEL", "NETZ", "HELD", "NEW YORK"] },
    hard: { topic: "Fußballlegenden", word: "ZIDANE", forbidden: ["FRANKREICH", "REAL MADRID", "MITTELFELD", "BALLON"] },
  },
  fr: {
    easy: { topic: "Animaux de compagnie", word: "CHAT", forbidden: ["ANIMAL", "MIAOU", "CHATON", "PATTE"] },
    medium: { topic: "Films Marvel", word: "SPIDER-MAN", forbidden: ["MARVEL", "TOILE", "HÉROS", "NEW YORK"] },
    hard: { topic: "Légendes du foot", word: "ZIDANE", forbidden: ["FRANCE", "REAL MADRID", "MILIEU", "BALLON"] },
  },
  it: {
    easy: { topic: "Animali domestici", word: "GATTO", forbidden: ["ANIMALE", "MIAO", "GATTINO", "ZAMPA"] },
    medium: { topic: "Film Marvel", word: "SPIDER-MAN", forbidden: ["MARVEL", "RAGNO", "EROE", "NEW YORK"] },
    hard: { topic: "Leggende del calcio", word: "ZIDANE", forbidden: ["FRANCIA", "REAL MADRID", "CENTRO", "BALLON"] },
  },
  "pt-BR": {
    easy: { topic: "Animais de estimação", word: "GATO", forbidden: ["PET", "MIAU", "GATINHO", "PATA"] },
    medium: { topic: "Filmes Marvel", word: "SPIDER-MAN", forbidden: ["MARVEL", "TEIA", "HERÓI", "NOVA YORK"] },
    hard: { topic: "Lendas do futebol", word: "ZIDANE", forbidden: ["FRANÇA", "REAL MADRID", "MEIO", "BOLA"] },
  },
  pl: {
    easy: { topic: "Zwierzęta domowe", word: "KOT", forbidden: ["ZWIERZĘ", "MIAU", "KOCIAK", "ŁAPA"] },
    medium: { topic: "Filmy Marvel", word: "SPIDER-MAN", forbidden: ["MARVEL", "PAJĄK", "BOHATER", "NEW YORK"] },
    hard: { topic: "Legendy piłki", word: "ZIDANE", forbidden: ["FRANCJA", "REAL MADRID", "POMOCNIK", "BALLON"] },
  },
  el: {
    easy: { topic: "Κατοικίδια", word: "ΓΑΤΑ", forbidden: ["ΖΩΟ", "ΝΙΑΟΥΡΙΣΜΑ", "ΓΑΤΑΚΙ", "ΠΑΤΑ"] },
    medium: { topic: "Ταινίες Marvel", word: "SPIDER-MAN", forbidden: ["MARVEL", "ΙΣΤΟΣ", "ΗΡΩΑΣ", "NEW YORK"] },
    hard: { topic: "Θρύλοι ποδοσφαίρου", word: "ZIDANE", forbidden: ["ΓΑΛΛΙΑ", "REAL MADRID", "ΜΕΣΟ", "BALLON"] },
  },
  ru: {
    easy: { topic: "Домашние животные", word: "КОТ", forbidden: ["ПИТОМЕЦ", "МЯУ", "КОТЁНОК", "ЛАПА"] },
    medium: { topic: "Фильмы Marvel", word: "SPIDER-MAN", forbidden: ["MARVEL", "ПАУТИНА", "ГЕРОЙ", "НЬЮ-ЙОРК"] },
    hard: { topic: "Легенды футбола", word: "ZIDANE", forbidden: ["ФРАНЦИЯ", "REAL MADRID", "ПОЛУЗАЩИТНИК", "BALLON"] },
  },
  ja: {
    easy: { topic: "ペット", word: "ネコ", forbidden: ["動物", "ニャー", "子猫", "足"] },
    medium: { topic: "マーベル映画", word: "SPIDER-MAN", forbidden: ["MARVEL", "クモ", "ヒーロー", "ニューヨーク"] },
    hard: { topic: "サッカーの伝説", word: "ZIDANE", forbidden: ["フランス", "REAL MADRID", "MF", "BALLON"] },
  },
  ko: {
    easy: { topic: "반려동물", word: "고양이", forbidden: ["동물", "야옹", "새끼고양이", "발"] },
    medium: { topic: "마블 영화", word: "SPIDER-MAN", forbidden: ["MARVEL", "거미", "히어로", "뉴욕"] },
    hard: { topic: "축구 전설", word: "ZIDANE", forbidden: ["프랑스", "REAL MADRID", "미드필더", "BALLON"] },
  },
  zh: {
    easy: { topic: "宠物", word: "猫", forbidden: ["动物", "喵", "小猫", "爪子"] },
    medium: { topic: "漫威电影", word: "SPIDER-MAN", forbidden: ["MARVEL", "蜘蛛", "英雄", "纽约"] },
    hard: { topic: "足球传奇", word: "ZIDANE", forbidden: ["法国", "REAL MADRID", "中场", "BALLON"] },
  },
  ar: {
    easy: { topic: "حيوانات منزلية", word: "قطة", forbidden: ["حيوان", "مواء", "هرة", "قدم"] },
    medium: { topic: "أفلام مارفل", word: "SPIDER-MAN", forbidden: ["MARVEL", "شبكة", "بطل", "نيويورك"] },
    hard: { topic: "أساطير كرة القدم", word: "ZIDANE", forbidden: ["فرنسا", "REAL MADRID", "وسط", "BALLON"] },
  },
  hi: {
    easy: { topic: "पालतू जानवर", word: "बिल्ली", forbidden: ["जानवर", "म्याऊँ", "बच्चा", "पंजा"] },
    medium: { topic: "Marvel movies", word: "SPIDER-MAN", forbidden: ["MARVEL", "जाला", "हीरो", "NEW YORK"] },
    hard: { topic: "फुटबॉल legends", word: "ZIDANE", forbidden: ["FRANCE", "REAL MADRID", "MIDFIELD", "BALLON"] },
  },
  id: {
    easy: { topic: "Hewan peliharaan", word: "KUCING", forbidden: ["HEWAN", "MEONG", "ANAK KUCING", "CAKAR"] },
    medium: { topic: "Film Marvel", word: "SPIDER-MAN", forbidden: ["MARVEL", "JARING", "HERO", "NEW YORK"] },
    hard: { topic: "Legenda sepak bola", word: "ZIDANE", forbidden: ["PRANCIS", "REAL MADRID", "GELANDANG", "BALLON"] },
  },
  vi: {
    easy: { topic: "Thú cưng", word: "MÈO", forbidden: ["ĐỘNG VẬT", "MEO", "MÈO CON", "VUỐT"] },
    medium: { topic: "Phim Marvel", word: "SPIDER-MAN", forbidden: ["MARVEL", "MẠNG", "ANH HÙNG", "NEW YORK"] },
    hard: { topic: "Huyền thoại bóng đá", word: "ZIDANE", forbidden: ["PHÁP", "REAL MADRID", "TIỀN VỆ", "BALLON"] },
  },
};

export function getAiDemoSample(locale: Locale, difficulty: AiDemoDifficulty): AiDemoSample {
  const samples = SAMPLES_BY_LOCALE[locale] ?? EN_SAMPLES;
  return samples[difficulty];
}
