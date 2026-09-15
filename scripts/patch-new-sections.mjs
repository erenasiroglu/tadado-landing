import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dictDir = join(root, "src/dictionaries");

const patches = {
  es: {
    ai: {
      demoTitle: "Creador de mazos IA",
      demoHeadline: "Crea tu mazo en 30 segundos.",
      demoSubtitle: "Describe cualquier tema. La IA escribe cartas Tabú: palabra objetivo y pistas prohibidas. Tu grupo juega al instante.",
      inputLabel: "Tu tema",
      inputPlaceholder: "p. ej. películas Marvel, éxitos de los 90, chistes de oficina…",
      quickIdeas: "Ideas rápidas",
      difficulty: "Dificultad",
      difficultyEasy: "Fácil",
      difficultyMedium: "Media",
      difficultyHard: "Difícil",
      generateButton: "Generar mi mazo",
      generating: "Escribiendo cartas…",
      demoPreviewLabel: "Vista previa",
    },
    trending: {
      title: "Las cartas que todos buscan esta noche.",
      badge: "Tendencia",
      subtitle: "Cuando algo explota, se convierte en carta tabú. Spider-Man: Brand New Day y Obsession están de moda, además de The Odyssey, fútbol y más.",
      allCards: "Todas las cartas en tendencia →",
      compare: { title: "¿Lo comparas con otro juego?", guides: "Guías e ideas para la noche de juegos →" },
    },
    decks: { newBadge: "NUEVO" },
    faq: { title: "Preguntas, respondidas.", subtitle: "Todo lo que necesitas saber antes de tu próxima noche de juegos." },
  },
  de: {
    ai: {
      demoTitle: "KI-Deck-Builder",
      demoHeadline: "Erstelle dein Deck in 30 Sekunden.",
      demoSubtitle: "Beschreibe jedes Thema. Die KI schreibt Tabu-Karten: Zielwort plus verbotene Hinweise. Deine Gruppe spielt sofort.",
      inputLabel: "Dein Thema",
      inputPlaceholder: "z. B. Marvel-Filme, 90er Hits, Büro-Witze…",
      quickIdeas: "Schnelle Ideen",
      difficulty: "Schwierigkeit",
      difficultyEasy: "Leicht",
      difficultyMedium: "Mittel",
      difficultyHard: "Schwer",
      generateButton: "Deck generieren",
      generating: "Karten werden geschrieben…",
      demoPreviewLabel: "Vorschau",
    },
    trending: {
      title: "Die Karten, nach denen heute Abend alle suchen.",
      badge: "Trend",
      subtitle: "Wenn etwas viral geht, wird es eine Tabu-Karte. Spider-Man: Brand New Day und Obsession sind im Trend, plus The Odyssey, Fußball und mehr.",
      allCards: "Alle Trend-Karten →",
      compare: { title: "Vergleichst du es mit einem anderen Spiel?", guides: "Guides und Spieleabend-Ideen →" },
    },
    decks: { newBadge: "NEU" },
    faq: { title: "Fragen, beantwortet.", subtitle: "Alles, was du vor dem nächsten Spieleabend wissen musst." },
  },
  it: {
    ai: { demoTitle: "Creatore mazzi IA", demoHeadline: "Crea il tuo mazzo in 30 secondi.", demoSubtitle: "Descrivi un argomento. L'IA scrive carte Tabù: parola obiettivo e indizi vietati. Il gruppo gioca subito.", inputLabel: "Il tuo argomento", inputPlaceholder: "es. film Marvel, hit anni 90, battute d'ufficio…", quickIdeas: "Idee rapide", difficulty: "Difficoltà", difficultyEasy: "Facile", difficultyMedium: "Media", difficultyHard: "Difficile", generateButton: "Genera il mio mazzo", generating: "Scrittura carte…", demoPreviewLabel: "Anteprima" },
    trending: { title: "Le carte che tutti cercano stasera.", badge: "Di tendenza", subtitle: "Quando qualcosa esplode, diventa una carta tabù. Spider-Man: Brand New Day e Obsession sono di tendenza, più The Odyssey, calcio e altro.", allCards: "Tutte le carte di tendenza →", compare: { title: "Lo confronti con un altro gioco?", guides: "Guide e idee per la serata giochi →" } },
    decks: { newBadge: "NUOVO" },
    faq: { title: "Domande, risposte.", subtitle: "Tutto ciò che devi sapere prima della prossima serata giochi." },
  },
  "pt-BR": {
    ai: { demoTitle: "Criador de baralhos IA", demoHeadline: "Crie seu baralho em 30 segundos.", demoSubtitle: "Descreva qualquer tema. A IA cria cartas Tabu: palavra-alvo e pistas proibidas. Seu grupo joga na hora.", inputLabel: "Seu tema", inputPlaceholder: "ex. filmes Marvel, hits dos 90, piadas de escritório…", quickIdeas: "Ideias rápidas", difficulty: "Dificuldade", difficultyEasy: "Fácil", difficultyMedium: "Médio", difficultyHard: "Difícil", generateButton: "Gerar meu baralho", generating: "Escrevendo cartas…", demoPreviewLabel: "Prévia" },
    trending: { title: "As cartas que todos procuram hoje à noite.", badge: "Em alta", subtitle: "Quando algo explode, vira carta tabu. Spider-Man: Brand New Day e Obsession estão em alta, além de The Odyssey, futebol e mais.", allCards: "Todas as cartas em alta →", compare: { title: "Comparando com outro jogo?", guides: "Guias e ideias para a noite de jogos →" } },
    decks: { newBadge: "NOVO" },
    faq: { title: "Perguntas, respondidas.", subtitle: "Tudo o que você precisa saber antes da próxima noite de jogos." },
  },
  pl: {
    ai: { demoTitle: "Kreator talii AI", demoHeadline: "Stwórz talię w 30 sekund.", demoSubtitle: "Opisz dowolny temat. AI tworzy karty Tabu: słowo docelowe i zakazane podpowiedzi. Twoja grupa gra od razu.", inputLabel: "Twój temat", inputPlaceholder: "np. filmy Marvel, hity lat 90., żarty biurowe…", quickIdeas: "Szybkie pomysły", difficulty: "Poziom", difficultyEasy: "Łatwy", difficultyMedium: "Średni", difficultyHard: "Trudny", generateButton: "Wygeneruj talię", generating: "Pisanie kart…", demoPreviewLabel: "Podgląd" },
    trending: { title: "Karty, których szukają dziś wieczorem.", badge: "Na czasie", subtitle: "Gdy coś wybucha, staje się kartą tabu. Spider-Man: Brand New Day i Obsession są na czasie, plus The Odyssey, piłka i więcej.", allCards: "Wszystkie trendy karty →", compare: { title: "Porównujesz z inną grą?", guides: "Poradniki i pomysły na wieczór gier →" } },
    decks: { newBadge: "NOWE" },
    faq: { title: "Pytania, odpowiedzi.", subtitle: "Wszystko, co musisz wiedzieć przed kolejnym wieczorem gier." },
  },
  ru: {
    ai: { demoTitle: "ИИ-создатель колод", demoHeadline: "Создайте колоду за 30 секунд.", demoSubtitle: "Опишите любую тему. ИИ пишет карты Taboo: целевое слово и запретные подсказки. Группа играет сразу.", inputLabel: "Ваша тема", inputPlaceholder: "напр. фильмы Marvel, хиты 90-х, офисные шутки…", quickIdeas: "Быстрые идеи", difficulty: "Сложность", difficultyEasy: "Легко", difficultyMedium: "Средне", difficultyHard: "Сложно", generateButton: "Создать колоду", generating: "Пишем карты…", demoPreviewLabel: "Предпросмотр" },
    trending: { title: "Карты, которые ищут сегодня вечером.", badge: "В тренде", subtitle: "Когда что-то взрывает интернет, это становится картой taboo. Spider-Man: Brand New Day и Obsession в тренде, плюс The Odyssey, футбол и другое.", allCards: "Все трендовые карты →", compare: { title: "Сравниваете с другой игрой?", guides: "Гайды и идеи для игрового вечера →" } },
    decks: { newBadge: "НОВОЕ" },
    faq: { title: "Вопросы и ответы.", subtitle: "Всё, что нужно знать перед следующим игровым вечером." },
  },
  ja: {
    ai: { demoTitle: "AIデッキビルダー", demoHeadline: "30秒でデッキを作成。", demoSubtitle: "テーマを入力するだけ。AIがタブーカードを作成：対象ワードと禁止ヒント。すぐにプレイできます。", inputLabel: "テーマ", inputPlaceholder: "例：マーベル映画、90年代ヒット、オフィスジョーク…", quickIdeas: "クイックアイデア", difficulty: "難易度", difficultyEasy: "かんたん", difficultyMedium: "普通", difficultyHard: "むずかしい", generateButton: "デッキを生成", generating: "カードを作成中…", demoPreviewLabel: "プレビュー" },
    trending: { title: "今夜みんなが探しているカード。", badge: "トレンド", subtitle: "話題になったものはタブーカードに。Spider-Man: Brand New DayとObsessionがトレンド中。The Odyssey、サッカーなども。", allCards: "すべてのトレンドカード →", compare: { title: "他のゲームと比べていますか？", guides: "ガイドとゲームナイトのアイデア →" } },
    decks: { newBadge: "新着" },
    faq: { title: "質問と回答。", subtitle: "次のゲームナイトの前に知っておくべきこと。" },
  },
  ko: {
    ai: { demoTitle: "AI 덱 빌더", demoHeadline: "30초 만에 덱을 만드세요.", demoSubtitle: "주제를 입력하세요. AI가 타부 카드를 작성합니다: 목표 단어와 금지 단서. 그룹이 바로 플레이합니다.", inputLabel: "주제", inputPlaceholder: "예: 마블 영화, 90년대 히트곡, 회사 농담…", quickIdeas: "빠른 아이디어", difficulty: "난이도", difficultyEasy: "쉬움", difficultyMedium: "보통", difficultyHard: "어려움", generateButton: "내 덱 생성", generating: "카드 작성 중…", demoPreviewLabel: "미리보기" },
    trending: { title: "오늘 밤 모두가 찾는 카드.", badge: "트렌드", subtitle: "뜨는 것은 타부 카드가 됩니다. Spider-Man: Brand New Day와 Obsession이 트렌드 중이며 The Odyssey, 축구 등도 있습니다.", allCards: "모든 트렌드 카드 →", compare: { title: "다른 게임과 비교 중인가요?", guides: "가이드와 게임 나이트 아이디어 →" } },
    decks: { newBadge: "신규" },
    faq: { title: "질문과 답변.", subtitle: "다음 게임 나이트 전에 알아야 할 모든 것." },
  },
  zh: {
    ai: { demoTitle: "AI 卡组生成器", demoHeadline: "30 秒创建你的卡组。", demoSubtitle: "描述任何主题。AI 编写 Taboo 卡片：目标词和禁用提示。你的小组立刻开玩。", inputLabel: "你的主题", inputPlaceholder: "例如：漫威电影、90 年代金曲、办公室笑话…", quickIdeas: "快速灵感", difficulty: "难度", difficultyEasy: "简单", difficultyMedium: "中等", difficultyHard: "困难", generateButton: "生成我的卡组", generating: "正在编写卡片…", demoPreviewLabel: "预览卡片" },
    trending: { title: "今晚大家都在搜的卡片。", badge: "热门", subtitle: "当某件事爆火时，它就会变成 taboo 卡片。Spider-Man: Brand New Day 和 Obsession 正在热门，还有 The Odyssey、足球等。", allCards: "所有热门卡片 →", compare: { title: "在和其他游戏比较吗？", guides: "指南和游戏之夜灵感 →" } },
    decks: { newBadge: "新品" },
    faq: { title: "问题，已解答。", subtitle: "下次游戏之夜前你需要了解的一切。" },
  },
  ar: {
    ai: { demoTitle: "منشئ مجموعة بالذكاء الاصطناعي", demoHeadline: "أنشئ مجموعتك في 30 ثانية.", demoSubtitle: "صف أي موضوع. يكتب الذكاء الاصطناعي بطاقات تابو: الكلمة المستهدفة والتلميحات المحظورة. مجموعتك تلعب فورًا.", inputLabel: "موضوعك", inputPlaceholder: "مثلًا: أفلام مارفل، أغاني التسعينيات، نكات المكتب…", quickIdeas: "أفكار سريعة", difficulty: "الصعوبة", difficultyEasy: "سهل", difficultyMedium: "متوسط", difficultyHard: "صعب", generateButton: "أنشئ مجموعتي", generating: "جارٍ كتابة البطاقات…", demoPreviewLabel: "معاينة البطاقة" },
    trending: { title: "البطاقات التي يبحث عنها الجميع الليلة.", badge: "رائج", subtitle: "عندما ينتشر شيء ما، يصبح بطاقة تابو. Spider-Man: Brand New Day و Obsession رائجان الآن، بالإضافة إلى The Odyssey والكرة وغيرها.", allCards: "كل البطاقات الرائجة →", compare: { title: "هل تقارنه بلعبة أخرى؟", guides: "أدلة وأفكار لسهرة الألعاب →" } },
    decks: { newBadge: "جديد" },
    faq: { title: "أسئلة، بإجابات.", subtitle: "كل ما تحتاج معرفته قبل سهرة الألعاب القادمة." },
  },
  hi: {
    ai: { demoTitle: "AI डेक बिल्डर", demoHeadline: "30 सेकंड में अपना डेक बनाएं।", demoSubtitle: "कोई भी विषय लिखें। AI Taboo कार्ड बनाता है: लक्ष्य शब्द और वर्जित संकेत। आपका समूह तुरंत खेलता है।", inputLabel: "आपका विषय", inputPlaceholder: "जैसे Marvel movies, 90s pop hits, office jokes…", quickIdeas: "त्वरित विचार", difficulty: "कठिनाई", difficultyEasy: "आसान", difficultyMedium: "मध्यम", difficultyHard: "कठिन", generateButton: "मेरा डेक बनाएं", generating: "कार्ड लिखे जा रहे हैं…", demoPreviewLabel: "पूर्वावलोकन" },
    trending: { title: "आज रात सब जिन कार्डों को खोज रहे हैं।", badge: "ट्रेंडिंग", subtitle: "जब कुछ वायरल होता है, वह taboo कार्ड बन जाता है। Spider-Man: Brand New Day और Obsession अभी ट्रेंड में हैं, साथ में The Odyssey, फुटबॉल और अधिक।", allCards: "सभी ट्रेंडिंग कार्ड →", compare: { title: "किसी दूसरे गेम से तुलना कर रहे हैं?", guides: "गाइड और गेम नाइट आइडिया →" } },
    decks: { newBadge: "नया" },
    faq: { title: "सवाल, जवाब।", subtitle: "अगली गेम नाइट से पहले आपको जो जानना जरूरी है।" },
  },
  id: {
    ai: { demoTitle: "Pembuat Deste AI", demoHeadline: "Buat deste Anda dalam 30 detik.", demoSubtitle: "Jelaskan topik apa pun. AI menulis kartu Tabu: kata target dan petunjuk terlarang. Grup Anda langsung bermain.", inputLabel: "Topik Anda", inputPlaceholder: "mis. film Marvel, lagu 90-an, jokes kantor…", quickIdeas: "Ide cepat", difficulty: "Tingkat", difficultyEasy: "Mudah", difficultyMedium: "Sedang", difficultyHard: "Sulit", generateButton: "Buat deste saya", generating: "Menulis kartu…", demoPreviewLabel: "Pratinjau" },
    trending: { title: "Kartu yang dicari semua orang malam ini.", badge: "Trending", subtitle: "Saat sesuatu meledak, itu jadi kartu tabu. Spider-Man: Brand New Day dan Obsession sedang trending, plus The Odyssey, sepak bola, dan lainnya.", allCards: "Semua kartu trending →", compare: { title: "Membandingkan dengan game lain?", guides: "Panduan dan ide malam game →" } },
    decks: { newBadge: "BARU" },
    faq: { title: "Pertanyaan, terjawab.", subtitle: "Semua yang perlu Anda tahu sebelum malam game berikutnya." },
  },
  vi: {
    ai: { demoTitle: "Trình tạo bộ bài AI", demoHeadline: "Tạo bộ bài trong 30 giây.", demoSubtitle: "Mô tả bất kỳ chủ đề nào. AI viết thẻ Taboo: từ mục tiêu và gợi ý bị cấm. Nhóm của bạn chơi ngay.", inputLabel: "Chủ đề của bạn", inputPlaceholder: "vd. phim Marvel, hit thập niên 90, đùa văn phòng…", quickIdeas: "Ý tưởng nhanh", difficulty: "Độ khó", difficultyEasy: "Dễ", difficultyMedium: "Vừa", difficultyHard: "Khó", generateButton: "Tạo bộ bài của tôi", generating: "Đang viết thẻ…", demoPreviewLabel: "Xem trước" },
    trending: { title: "Các thẻ mọi người đang tìm tối nay.", badge: "Xu hướng", subtitle: "Khi điều gì bùng nổ, nó trở thành thẻ taboo. Spider-Man: Brand New Day và Obsession đang hot, cùng The Odyssey, bóng đá và hơn thế.", allCards: "Tất cả thẻ xu hướng →", compare: { title: "So sánh với game khác?", guides: "Hướng dẫn và ý tưởng đêm chơi game →" } },
    decks: { newBadge: "MỚI" },
    faq: { title: "Câu hỏi, đã trả lời.", subtitle: "Mọi thứ bạn cần biết trước đêm chơi game tiếp theo." },
  },
  el: {
    ai: { demoTitle: "Δημιουργός τράπουλας AI", demoHeadline: "Φτιάξτε την τράπουλα σας σε 30 δευτερόλεπτα.", demoSubtitle: "Περιγράψτε οποιοδήποτε θέμα. Η AI γράφει κάρτες Taboo: λέξη-στόχος και απαγορευμένες ενδείξεις. Η ομάδα σας παίζει αμέσως.", inputLabel: "Το θέμα σας", inputPlaceholder: "π.χ. ταινίες Marvel, hits των 90s, αστεία γραφείου…", quickIdeas: "Γρήγορες ιδέες", difficulty: "Δυσκολία", difficultyEasy: "Εύκολο", difficultyMedium: "Μέτριο", difficultyHard: "Δύσκολο", generateButton: "Δημιουργία τράπουλας", generating: "Γράφονται κάρτες…", demoPreviewLabel: "Προεπισκόπηση" },
    trending: { title: "Οι κάρτες που ψάχνουν όλοι απόψε.", badge: "Τάση", subtitle: "Όταν κάτι εκρήγνυται, γίνεται κάρτα taboo. Spider-Man: Brand New Day και Obsession είναι στη μόδα, μαζί με The Odyssey, ποδόσφαιρο και άλλα.", allCards: "Όλες οι κάρτες τάσης →", compare: { title: "Το συγκρίνετε με άλλο παιχνίδι;", guides: "Οδηγοί και ιδέες για βραδιά παιχνιδιού →" } },
    decks: { newBadge: "ΝΕΟ" },
    faq: { title: "Ερωτήσεις, απαντήσεις.", subtitle: "Όλα όσα χρειάζεστε πριν την επόμενη βραδιά παιχνιδιού." },
  },
  fr: {
    ai: {
      demoTitle: "Créateur de deck IA",
      demoHeadline: "Créez votre deck en 30 secondes.",
      demoSubtitle: "Décrivez n'importe quel sujet. L'IA écrit des cartes Tabou : mot cible et indices interdits. Votre groupe joue tout de suite.",
      inputLabel: "Votre sujet",
      inputPlaceholder: "ex. films Marvel, hits des années 90, blagues de bureau…",
      quickIdeas: "Idées rapides",
      difficulty: "Difficulté",
      difficultyEasy: "Facile",
      difficultyMedium: "Moyen",
      difficultyHard: "Difficile",
      generateButton: "Générer mon deck",
      generating: "Écriture des cartes…",
      demoPreviewLabel: "Aperçu",
    },
    trending: {
      title: "Les cartes que tout le monde cherche ce soir.",
      badge: "Tendance",
      subtitle: "Quand quelque chose explose, ça devient une carte tabou. Spider-Man: Brand New Day et Obsession sont tendance, plus The Odyssey, le foot et plus.",
      allCards: "Toutes les cartes tendance →",
      compare: { title: "Vous comparez avec un autre jeu ?", guides: "Guides et idées de soirée jeux →" },
    },
    decks: { newBadge: "NOUVEAU" },
    faq: { title: "Questions, réponses.", subtitle: "Tout ce qu'il faut savoir avant votre prochaine soirée jeux." },
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

const en = JSON.parse(readFileSync(join(dictDir, "en.json"), "utf8"));

for (const [locale, patch] of Object.entries(patches)) {
  const current = JSON.parse(readFileSync(join(dictDir, `${locale}.json`), "utf8"));
  const merged = deepMerge(deepMerge(en, current), patch);
  writeFileSync(join(dictDir, `${locale}.json`), `${JSON.stringify(merged, null, 2)}\n`);
}

// tr is maintained manually
const tr = JSON.parse(readFileSync(join(dictDir, "tr.json"), "utf8"));
writeFileSync(join(dictDir, "tr.json"), `${JSON.stringify(tr, null, 2)}\n`);

console.log("Patched locale files with new sections");
