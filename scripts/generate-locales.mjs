import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const en = JSON.parse(
  readFileSync(join(root, "src/dictionaries/en.json"), "utf8"),
);

const overrides = {
  es: {
    meta: {
      title: "Tadado — Juego de Tabú y Heads Up para Fiestas",
      description:
        "Juega Tabú y Heads Up en una app. Crea mazos con IA en segundos. Mazo Tadado Mix gratis. Sin anuncios. Sin suscripción.",
    },
    hero: {
      badge: "Juego de palabras con IA",
      title: "El juego de fiesta con Tabú, Heads Up y mazos IA",
      subtitle:
        "Describe, adivina, hazlo tuyo. Dos modos, mazos IA personalizados y packs temáticos.",
      trust: "Tadado Mix gratis · Sin anuncios · Sin suscripción",
      ctaPrimary: "Descargar",
    },
    nav: { pricing: "Precios", blog: "Blog", download: "Descargar" },
  },
  de: {
    meta: {
      title: "Tadado — Tabu & Heads Up Party-Wortspiel",
      description:
        "Spiele Tabu und Heads Up in einer App. Erstelle KI-Decks in Sekunden. Tadado Mix gratis. Keine Werbung. Kein Abo.",
    },
    hero: {
      badge: "KI-Wörter-Ratespiel",
      title: "Das Party-Wortspiel mit Tabu, Heads Up & KI-Decks",
      subtitle:
        "Beschreiben, raten, dein Deck erstellen. Zwei Modi, KI-Decks und thematische Karten.",
      trust: "Tadado Mix gratis · Keine Werbung · Kein Abo",
      ctaPrimary: "App laden",
    },
    nav: { pricing: "Preise", blog: "Blog", download: "Laden" },
  },
  fr: {
    meta: {
      title: "Tadado — Jeu Tabou & Heads Up pour Fêtes",
      description:
        "Jouez au Tabou et Heads Up dans une app. Créez des decks IA en secondes. Tadado Mix gratuit. Sans pub. Sans abonnement.",
    },
    hero: {
      badge: "Jeu de mots avec IA",
      title: "Le jeu de fête avec Tabou, Heads Up et decks IA",
      subtitle:
        "Décris, devine, crée ton deck. Deux modes, decks IA et packs thématiques.",
      trust: "Tadado Mix gratuit · Sans pub · Sans abonnement",
      ctaPrimary: "Télécharger",
    },
    nav: { pricing: "Tarifs", blog: "Blog", download: "Télécharger" },
  },
  it: {
    meta: {
      title: "Tadado — Gioco Tabù & Heads Up per Feste",
      description:
        "Gioca a Tabù e Heads Up in un'app. Crea mazzi IA in secondi. Tadado Mix gratis. Senza pubblicità. Senza abbonamento.",
    },
    hero: {
      badge: "Gioco di parole con IA",
      title: "Il gioco di festa con Tabù, Heads Up e mazzi IA",
      subtitle:
        "Descrivi, indovina, crea il tuo mazzo. Due modalità, mazzi IA e pacchetti tematici.",
      trust: "Tadado Mix gratis · Senza pubblicità · Senza abbonamento",
      ctaPrimary: "Scarica",
    },
    nav: { pricing: "Prezzi", blog: "Blog", download: "Scarica" },
  },
  "pt-BR": {
    meta: {
      title: "Tadado — Jogo de Tabu & Heads Up para Festas",
      description:
        "Jogue Tabu e Heads Up em um app. Crie baralhos com IA em segundos. Tadado Mix grátis. Sem anúncios. Sem assinatura.",
    },
    hero: {
      badge: "Jogo de palavras com IA",
      title: "O jogo de festa com Tabu, Heads Up e baralhos IA",
      subtitle:
        "Descreva, adivinhe, faça o seu. Dois modos, baralhos IA e packs temáticos.",
      trust: "Tadado Mix grátis · Sem anúncios · Sem assinatura",
      ctaPrimary: "Baixar",
    },
    nav: { pricing: "Preços", blog: "Blog", download: "Baixar" },
  },
  ja: {
    meta: {
      title: "Tadado — タブー＆ヘッズアップ パーティー言葉ゲーム",
      description:
        "タブーとヘッズアップを1つのアプリで。AIデッキを数秒で作成。Tadado Mix無料。広告なし。サブスクなし。",
    },
    hero: {
      badge: "AIワード推理ゲーム",
      title: "タブー、ヘッズアップ、AIデッキのパーティーゲーム",
      subtitle: "説明して、当てて、自分のデッキを。2モード、AIデッキ、テーマパック。",
      trust: "Tadado Mix無料 · 広告なし · サブスクなし",
      ctaPrimary: "ダウンロード",
    },
    nav: { pricing: "料金", blog: "ブログ", download: "ダウンロード" },
  },
  ko: {
    meta: {
      title: "Tadado — 금지어 & 헤즈업 파티 단어 게임",
      description:
        "금지어 게임과 헤즈업을 한 앱에서. AI 덱을 몇 초 만에. Tadado Mix 무료. 광고 없음. 구독 없음.",
    },
    hero: {
      badge: "AI 단어 맞히기 게임",
      title: "금지어, 헤즈업, AI 덱 파티 게임",
      subtitle: "설명하고, 맞히고, 내 덱을 만드세요. 2가지 모드, AI 덱, 테마 팩.",
      trust: "Tadado Mix 무료 · 광고 없음 · 구독 없음",
      ctaPrimary: "다운로드",
    },
    nav: { pricing: "가격", blog: "블로그", download: "다운로드" },
  },
  zh: {
    meta: {
      title: "Tadado — 禁忌词与 Heads Up 派对猜词游戏",
      description:
        "在一个应用中玩禁忌词和 Heads Up。秒级创建 AI 牌组。Tadado Mix 免费。无广告。无订阅。",
    },
    hero: {
      badge: "AI 猜词游戏",
      title: "禁忌词、Heads Up 与 AI 牌组的派对游戏",
      subtitle: "描述、猜测、打造自己的牌组。两种模式、AI 牌组、主题包。",
      trust: "Tadado Mix 免费 · 无广告 · 无订阅",
      ctaPrimary: "下载",
    },
    nav: { pricing: "价格", blog: "博客", download: "下载" },
  },
  ar: {
    meta: {
      title: "Tadado — لعبة تابو و Heads Up للحفلات",
      description:
        "العب تابو و Heads Up في تطبيق واحد. أنشئ مجموعات بالذكاء الاصطناعي. Tadado Mix مجاني. بدون إعلانات. بدون اشتراك.",
    },
    hero: {
      badge: "لعبة تخمين كلمات بالذكاء الاصطناعي",
      title: "لعبة الحفلات مع تابو و Heads Up ومجموعات AI",
      subtitle: "اشرح، خمّن، اصنع مجموعتك. وضعان، مجموعات AI، حزم مواضيع.",
      trust: "Tadado Mix مجاني · بدون إعلانات · بدون اشتراك",
      ctaPrimary: "تحميل",
    },
    nav: { pricing: "الأسعار", blog: "المدونة", download: "تحميل" },
  },
  ru: {
    meta: {
      title: "Tadado — Табу и Heads Up для вечеринок",
      description:
        "Играйте в Табу и Heads Up в одном приложении. Создавайте колоды ИИ за секунды. Tadado Mix бесплатно. Без рекламы. Без подписки.",
    },
    hero: {
      badge: "Игра в слова с ИИ",
      title: "Вечеринка с Табу, Heads Up и колодами ИИ",
      subtitle: "Объясняй, угадывай, создай колоду. Два режима, ИИ-колоды, тематические паки.",
      trust: "Tadado Mix бесплатно · Без рекламы · Без подписки",
      ctaPrimary: "Скачать",
    },
    nav: { pricing: "Цены", blog: "Блог", download: "Скачать" },
  },
  pl: {
    meta: {
      title: "Tadado — Tabu i Heads Up na imprezę",
      description:
        "Graj w Tabu i Heads Up w jednej aplikacji. Twórz talie AI w sekundy. Tadado Mix za darmo. Bez reklam. Bez subskrypcji.",
    },
    hero: {
      badge: "Gra w zgadywanie słów z AI",
      title: "Imprezowa gra słowna: Tabu, Heads Up i talie AI",
      subtitle: "Opisuj, zgaduj, stwórz talię. Dwa tryby, talie AI, pakiety tematyczne.",
      trust: "Tadado Mix za darmo · Bez reklam · Bez subskrypcji",
      ctaPrimary: "Pobierz",
    },
    nav: { pricing: "Ceny", blog: "Blog", download: "Pobierz" },
  },
  el: {
    meta: {
      title: "Tadado — Taboo & Heads Up παιχνίδι πάρτι",
      description:
        "Παίξε Taboo και Heads Up σε ένα app. Δημιούργησε deck ΤΝ σε δευτερόλεπτα. Tadado Mix δωρεάν. Χωρίς διαφημίσεις. Χωρίς συνδρομή.",
    },
    hero: {
      badge: "Παιχνίδι λέξεων με AI",
      title: "Το παιχνίδι πάρτι με Taboo, Heads Up και deck AI",
      subtitle: "Περίγραψε, μάντεψε, φτιάξε το deck σου. Δύο modes, AI decks, θεματικά πακέτα.",
      trust: "Tadado Mix δωρεάν · Χωρίς διαφημίσεις · Χωρίς συνδρομή",
      ctaPrimary: "Λήψη",
    },
    nav: { pricing: "Τιμές", blog: "Blog", download: "Λήψη" },
  },
  hi: {
    meta: {
      title: "Tadado — Taboo & Heads Up पार्टी शब्द खेल",
      description:
        "एक ऐप में Taboo और Heads Up खेलें। AI डेक सेकंडों में बनाएं। Tadado Mix मुफ्त। कोई विज्ञापन नहीं। कोई सब्सक्रिप्शन नहीं।",
    },
    hero: {
      badge: "AI शब्द अनुमान खेल",
      title: "Taboo, Heads Up और AI डेक के साथ पार्टी गेम",
      subtitle: "बताओ, अनुमान लगाओ, अपना डेक बनाओ। दो मोड, AI डेक, थीम पैक।",
      trust: "Tadado Mix मुफ्त · कोई विज्ञापन नहीं · कोई सब्सक्रिप्शन नहीं",
      ctaPrimary: "डाउनलोड",
    },
    nav: { pricing: "मूल्य", blog: "ब्लॉग", download: "डाउनलोड" },
  },
  id: {
    meta: {
      title: "Tadado — Game Tabu & Heads Up Pesta",
      description:
        "Main Tabu dan Heads Up dalam satu app. Buat deste AI dalam detik. Tadado Mix gratis. Tanpa iklan. Tanpa langganan.",
    },
    hero: {
      badge: "Game tebak kata AI",
      title: "Game pesta dengan Tabu, Heads Up & deste AI",
      subtitle: "Jelaskan, tebak, buat deste sendiri. Dua mode, deste AI, paket tema.",
      trust: "Tadado Mix gratis · Tanpa iklan · Tanpa langganan",
      ctaPrimary: "Unduh",
    },
    nav: { pricing: "Harga", blog: "Blog", download: "Unduh" },
  },
  vi: {
    meta: {
      title: "Tadado — Game Taboo & Heads Up Tiệc Tùng",
      description:
        "Chơi Taboo và Heads Up trong một app. Tạo bộ bài AI trong vài giây. Tadado Mix miễn phí. Không quảng cáo. Không đăng ký.",
    },
    hero: {
      badge: "Game đoán từ AI",
      title: "Game tiệc với Taboo, Heads Up và bộ bài AI",
      subtitle: "Mô tả, đoán, tạo bộ bài riêng. Hai chế độ, bộ bài AI, gói chủ đề.",
      trust: "Tadado Mix miễn phí · Không quảng cáo · Không đăng ký",
      ctaPrimary: "Tải xuống",
    },
    nav: { pricing: "Giá", blog: "Blog", download: "Tải xuống" },
  },
};

function deepMerge(base, patch) {
  const out = { ...base };
  for (const [k, v] of Object.entries(patch)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      out[k] = deepMerge(base[k] ?? {}, v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

for (const [locale, patch] of Object.entries(overrides)) {
  const merged = deepMerge(en, patch);
  writeFileSync(
    join(root, `src/dictionaries/${locale}.json`),
    `${JSON.stringify(merged, null, 2)}\n`,
  );
}

console.log("Generated", Object.keys(overrides).length, "locale files");
