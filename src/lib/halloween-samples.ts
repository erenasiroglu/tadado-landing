import type { Locale } from "@/lib/i18n-config";

export interface HalloweenSampleCard {
  word: string;
  forbidden: readonly string[];
}

/**
 * Real cards from the app's free HALLOWEEN deck (Supabase `cards`, Oct 2026), one set per card language.
 * Locales without their own card language show the English cards, as the app does.
 */
const SAMPLES: Partial<Record<Locale, readonly HalloweenSampleCard[]>> = {
  en: [
    { word: "Werewolf", forbidden: ["Full moon", "Howl", "Fur", "Transform"] },
    { word: "Vampire", forbidden: ["Blood", "Fangs", "Dracula", "Bite"] },
    { word: "Witch", forbidden: ["Broom", "Hat", "Spell", "Cauldron"] },
    { word: "Ghost", forbidden: ["Boo", "Spirit", "Haunted", "White sheet"] },
    { word: "Pumpkin", forbidden: ["Orange", "Carve", "Patch", "Pie"] },
    { word: "Mummy", forbidden: ["Egypt", "Bandages", "Pyramid", "Wrapped"] },
  ],
  tr: [
    { word: "Kurt adam", forbidden: ["Dolunay", "Ulumak", "Tüy", "Dönüşmek"] },
    { word: "Vampir", forbidden: ["Kan", "Sivri diş", "Drakula", "Isırmak"] },
    { word: "Cadı", forbidden: ["Süpürge", "Şapka", "Büyü", "Kazan"] },
    { word: "Hayalet", forbidden: ["Ruh", "Çarşaf", "Böö", "Görünmez"] },
    { word: "Balkabağı", forbidden: ["Turuncu", "Oymak", "Tatlı", "Sonbahar"] },
    { word: "Mumya", forbidden: ["Mısır", "Sargı bezi", "Piramit", "Firavun"] },
  ],
  es: [
    { word: "Hombre lobo", forbidden: ["Luna llena", "Aullar", "Pelo", "Transformarse"] },
    { word: "Vampiro", forbidden: ["Sangre", "Colmillos", "Drácula", "Morder"] },
    { word: "Bruja", forbidden: ["Escoba", "Sombrero", "Hechizo", "Caldero"] },
    { word: "Fantasma", forbidden: ["Espíritu", "Sábana", "Bu", "Aparecer"] },
    { word: "Calabaza", forbidden: ["Naranja", "Tallar", "Vela", "Otoño"] },
    { word: "Momia", forbidden: ["Egipto", "Vendas", "Pirámide", "Faraón"] },
  ],
  "pt-BR": [
    { word: "Lobisomem", forbidden: ["Lua cheia", "Uivar", "Pelo", "Transformar"] },
    { word: "Vampiro", forbidden: ["Sangue", "Presas", "Drácula", "Morder"] },
    { word: "Bruxa", forbidden: ["Vassoura", "Chapéu", "Feitiço", "Caldeirão"] },
    { word: "Fantasma", forbidden: ["Espírito", "Lençol", "Bu", "Assombrar"] },
    { word: "Abóbora", forbidden: ["Laranja", "Esculpir", "Doce", "Outono"] },
    { word: "Múmia", forbidden: ["Egito", "Faixas", "Pirâmide", "Faraó"] },
  ],
  fr: [
    { word: "Loup-garou", forbidden: ["Pleine lune", "Hurler", "Poils", "Transformer"] },
    { word: "Vampire", forbidden: ["Sang", "Crocs", "Dracula", "Mordre"] },
    { word: "Sorcière", forbidden: ["Balai", "Chapeau", "Sort", "Chaudron"] },
    { word: "Fantôme", forbidden: ["Esprit", "Drap", "Bouh", "Hanter"] },
    { word: "Citrouille", forbidden: ["Orange", "Creuser", "Soupe", "Automne"] },
    { word: "Momie", forbidden: ["Égypte", "Bandelettes", "Pyramide", "Pharaon"] },
  ],
  de: [
    { word: "Werwolf", forbidden: ["Vollmond", "Heulen", "Fell", "Verwandeln"] },
    { word: "Vampir", forbidden: ["Blut", "Eckzähne", "Dracula", "Beißen"] },
    { word: "Hexe", forbidden: ["Besen", "Hut", "Zauber", "Kessel"] },
    { word: "Gespenst", forbidden: ["Geist", "Bettlaken", "Buh", "Spuk"] },
    { word: "Kürbis", forbidden: ["Orange", "Schnitzen", "Suppe", "Herbst"] },
    { word: "Mumie", forbidden: ["Ägypten", "Binden", "Pyramide", "Pharao"] },
  ],
  zh: [
    { word: "狼人", forbidden: ["满月", "嚎叫", "变身", "毛"] },
    { word: "吸血鬼", forbidden: ["血", "尖牙", "德古拉", "咬"] },
    { word: "女巫", forbidden: ["扫帚", "尖帽子", "魔法", "魔药"] },
    { word: "鬼", forbidden: ["幽灵", "吓人", "白色", "飘"] },
    { word: "南瓜", forbidden: ["橙色", "雕刻", "秋天", "蔬菜"] },
    { word: "木乃伊", forbidden: ["埃及", "绷带", "金字塔", "法老"] },
  ],
  ar: [
    { word: "مستذئب", forbidden: ["بدر", "عواء", "يتحول", "شعر"] },
    { word: "مصاص دماء", forbidden: ["أنياب", "دراكولا", "عض", "ليل"] },
    { word: "ساحرة", forbidden: ["مكنسة", "قبعة", "سحر", "قدر"] },
    { word: "شبح", forbidden: ["روح", "أبيض", "يطير", "مخيف"] },
    { word: "يقطين", forbidden: ["برتقالي", "نحت", "خريف", "قرع"] },
    { word: "مومياء", forbidden: ["مصر", "أربطة", "هرم", "فرعون"] },
  ],
  ru: [
    { word: "Оборотень", forbidden: ["Полнолуние", "Волк", "Выть", "Превращение"] },
    { word: "Вампир", forbidden: ["Кровь", "Клыки", "Дракула", "Укус"] },
    { word: "Ведьма", forbidden: ["Метла", "Шляпа", "Заклинание", "Котёл"] },
    { word: "Привидение", forbidden: ["Дух", "Простыня", "Бу", "Призрак"] },
    { word: "Тыква", forbidden: ["Оранжевая", "Вырезать", "Каша", "Осень"] },
    { word: "Мумия", forbidden: ["Египет", "Бинты", "Пирамида", "Фараон"] },
  ],
  ja: [
    { word: "狼男", forbidden: ["満月", "遠吠え", "変身", "毛"] },
    { word: "吸血鬼", forbidden: ["血", "牙", "ドラキュラ", "噛む"] },
    { word: "魔女", forbidden: ["ほうき", "帽子", "魔法", "大鍋"] },
    { word: "幽霊", forbidden: ["うらめしや", "白い着物", "足がない", "成仏"] },
    { word: "かぼちゃ", forbidden: ["オレンジ", "くり抜く", "煮物", "秋"] },
    { word: "ミイラ", forbidden: ["エジプト", "包帯", "ピラミッド", "ファラオ"] },
  ],
  it: [
    { word: "Lupo mannaro", forbidden: ["Luna piena", "Ululare", "Peli", "Trasformarsi"] },
    { word: "Vampiro", forbidden: ["Sangue", "Canini", "Dracula", "Mordere"] },
    { word: "Strega", forbidden: ["Scopa", "Cappello", "Incantesimo", "Calderone"] },
    { word: "Fantasma", forbidden: ["Spirito", "Lenzuolo", "Bu", "Apparire"] },
    { word: "Zucca", forbidden: ["Arancione", "Intagliare", "Orto", "Autunno"] },
    { word: "Mummia", forbidden: ["Egitto", "Bende", "Piramide", "Faraone"] },
  ],
  el: [
    { word: "Λυκάνθρωπος", forbidden: ["Πανσέληνος", "Ουρλιάζει", "Τρίχες", "Μεταμόρφωση"] },
    { word: "Βρικόλακας", forbidden: ["Αίμα", "Δόντια", "Δράκουλας", "Δάγκωμα"] },
    { word: "Μάγισσα", forbidden: ["Σκούπα", "Καπέλο", "Ξόρκι", "Καζάνι"] },
    { word: "Φάντασμα", forbidden: ["Πνεύμα", "Σεντόνι", "Μπου", "Στοιχειωμένο"] },
    { word: "Κολοκύθα", forbidden: ["Πορτοκαλί", "Σκαλίζω", "Φθινόπωρο", "Κολοκυθόπιτα"] },
    { word: "Μούμια", forbidden: ["Αίγυπτος", "Επίδεσμοι", "Πυραμίδα", "Φαραώ"] },
  ],
};

export function getHalloweenSamples(locale: Locale): readonly HalloweenSampleCard[] {
  return SAMPLES[locale] ?? SAMPLES.en ?? [];
}
