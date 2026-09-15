import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const posts = {
  en: [
    {
      slug: "how-to-play-taboo",
      title: "How to Play Taboo: Forbidden Words Rules & Tips for Game Night",
      description:
        "Learn classic Taboo rules, team setup, and scoring tips. Play free with Tadado Mix or create AI decks on iOS and Android.",
      date: "2026-03-01",
      body: `Taboo — also called Forbidden Words — is one of the best party games for groups who love fast thinking and loud laughter. One player describes a target word while avoiding a list of forbidden clues. If the team guesses before time runs out, you score.

## Basic rules

Split into two teams. On your turn, pick a card with one target word and several forbidden words. Describe the target without saying any forbidden word or obvious rhymes. Your team shouts guesses. Pass if you are stuck, but passes are limited.

## Winning strategy

Keep clues short. Use stories, categories, and comparisons instead of spelling or rhyming. Harder cards often score more in Tadado, so balance risk and speed.

## Play Taboo on your phone

Tadado brings Taboo to mobile with team timers, pass limits, and themed decks. Start free with **Tadado Mix**, unlock Summer, Cinema, Travel and more for $0.99 each, or generate a custom AI deck for $2.99.`,
    },
    {
      slug: "how-to-play-heads-up",
      title: "How to Play Heads Up Charades: Forehead Game Rules on Your Phone",
      description:
        "How to play Heads Up charades: hold your phone on your forehead, get clues from friends, and tilt to score. Complete party guide.",
      date: "2026-03-02",
      body: `Heads Up turns your phone into a classic forehead guessing game. Hold the device above your eyes so only friends can read the word. They give clues without saying the word itself. Tilt down when you get it right, tilt up to skip.

## Setup

Choose a deck, set round length, and pick who holds the phone first. Landscape mode works best so everyone can see the word clearly.

## Why groups love it

Heads Up is perfect for birthdays, road trips, and quick icebreakers. No complicated boards — just one phone and a room full of opinions.

## Heads Up + AI in Tadado

In Tadado, the same decks work in Forbidden Words and Heads Up. Create an AI deck about your friend group, office, or favorite fandom, then play it on your forehead in seconds.`,
    },
    {
      slug: "taboo-vs-heads-up",
      title: "Taboo vs Heads Up: Which Party Word Game Fits Your Group?",
      description:
        "Compare Taboo and Heads Up gameplay, team dynamics, and when to play each mode. Both are free to try in Tadado.",
      date: "2026-03-03",
      body: `Taboo and Heads Up are both word-guessing party games, but the energy is different. Taboo is team-based and strategic. Heads Up is performative and fast.

## Taboo strengths

Great for competitive groups, game nights with scoring, and players who like structure. Teams alternate turns and track points across rounds.

## Heads Up strengths

Better for mixed skill levels and spectators. One person performs while everyone else coaches. Clips are perfect for TikTok and Instagram.

## Use the same deck twice

Tadado lets you switch modes without rebuilding content. Try Tadado Mix free, then unlock themed packs or AI decks once you know what your group prefers.`,
    },
    {
      slug: "best-party-games-for-game-night",
      title: "Best Party Games for Game Night in 2026 (No Board Required)",
      description:
        "Seven mobile-friendly party games for friends, including word games like Taboo and Heads Up. Start with Tadado free.",
      date: "2026-03-04",
      body: `The best game night lineup mixes quick starters with games that escalate energy. Word games remain the easiest to teach and the hardest to put down.

## Why word games win

Everyone already knows how to talk. No pieces to lose, no long rulebooks. Phones become the host.

## Build your lineup

Start with a 60-second warm-up round, move into team Taboo, then switch to Heads Up for highlight moments. Add custom AI decks for inside jokes.

## Keep it affordable

Tadado is free to download with Tadado Mix included. Optional decks are $0.99. No ads and no subscription — guests can join immediately.`,
    },
    {
      slug: "create-ai-word-game-deck",
      title: "How to Create a Custom AI Word Game Deck in Seconds",
      description:
        "Generate Taboo and Heads Up cards from any topic with AI. Step-by-step guide for Tadado deck creation.",
      date: "2026-03-05",
      body: `Custom decks turn a generic party game into your group's inside joke machine. With Tadado, you type a topic and AI writes playable cards with forbidden words and difficulty levels.

## Step 1: Pick a topic

Be specific: "2000s pop punk", "Marvel Phase 4", or "our office legends". Specific topics produce funnier, fairer cards.

## Step 2: Choose language and difficulty

Tadado supports many languages for deck creation. Harder cards can score more in Forbidden Words mode.

## Step 3: Play both modes

Your AI deck works in Taboo and Heads Up without extra work. AI deck creation is a one-time $2.99 purchase handled by Apple or Google.`,
    },
    {
      slug: "icebreaker-games-for-groups",
      title: "Icebreaker Games for Groups, Teams, and Office Hangouts",
      description:
        "Break the silence with fast word games. Taboo and Heads Up work for new teams, dinners, and remote meetups.",
      date: "2026-03-06",
      body: `Icebreakers fail when they feel forced. Word games work because they create shared moments quickly — someone mispronounces a clue, everyone laughs, the room relaxes.

## Low-pressure starters

Use easy decks first. Tadado Mix is designed as a quick-start pack for mixed groups.

## Scale from 4 to 12 players

Split into two teams for Taboo, rotate the phone for Heads Up. Timers keep rounds short so shy players are not on stage too long.

## Follow up with custom content

Once the group loosens up, generate an AI deck about your company, class, or trip. It signals that the night is about your people, not a generic template.`,
    },
    {
      slug: "word-guessing-games-like-taboo",
      title: "Word Guessing Games Like Taboo for iPhone and Android",
      description:
        "Looking for Taboo-style apps? Compare mobile word games and see why Tadado combines Taboo, Heads Up, and AI decks.",
      date: "2026-03-07",
      body: `If you search for games like Taboo, you usually want three things: quick setup, funny clues, and enough content that the night does not repeat.

## What to look for

Offline play matters for cottages and flights. Clear forbidden-word rules matter for fair scoring. Multiple modes extend replay value.

## Why players switch to Tadado

Tadado combines Forbidden Words (Taboo-style) and Heads Up in one app, ships with themed decks, and adds AI generation for unlimited topics. Free Tadado Mix removes friction for first-time groups.

## Pricing transparency

Theme decks are $0.99 each. AI deck creation is $2.99. No ads, no subscription. Download on the App Store or Google Play and invite your group in one tap.`,
    },
    {
      slug: "best-word-game-apps",
      title: "Best Word Game Apps for Mobile in 2026 (Taboo, Charades & More)",
      description:
        "Compare the best free word game apps for iPhone and Android. Taboo, Heads Up charades, party games, and why Tadado ranks among the top picks.",
      date: "2026-03-08",
      body: `Searching for the best word game apps usually means you want something fast to learn, fun with friends, and worth keeping on your home screen. Here is what to look for and how Tadado compares.

## What makes a great mobile word game app?

**Quick setup.** No account walls, no long tutorials. Open the app, pick a deck, start playing.

**Multiple modes.** Taboo-style team games and Heads Up charades extend replay value without downloading two apps.

**Fair pricing.** Free starter content, optional packs, no ads, and no subscription trap.

**Custom content.** AI deck builders let you play about your office, trip, or favorite show instead of generic lists.

## Best word game apps by use case

**Game night with teams:** Taboo (Forbidden Words) apps with timers, pass limits, and scoring.

**Birthdays and icebreakers:** Heads Up charades apps where one person holds the phone on their forehead.

**Families and mixed ages:** Simple UI, short rounds, and easy decks like Tadado Mix.

**Power users:** Themed packs plus AI generation for unlimited topics.

## Why Tadado is a top word game app

Tadado combines **Taboo**, **Heads Up charades**, and **AI deck creation** in one ad-free app. Start free with Tadado Mix, unlock Cinema, Sport, Travel and more for $0.99 each, or generate a custom AI deck for $2.99. Available in 17 languages on iOS and Android.

If you are comparing word guessing games like Taboo or looking for a charades app that does not nickel-and-dime you every week, Tadado is built for exactly that.`,
    },
  ],
  tr: [
    {
      slug: "yasakli-kelimeler-nasil-oynanir",
      title: "Tabu Nasıl Oynanır? Yasaklı Kelimeler Kuralları ve İpuçları",
      description:
        "Tabu nasıl oynanır? Takım kuralları, yasaklı kelimeler, puanlama ve ipuçları. Tadado Mix ile ücretsiz oyna veya yapay zeka destesi oluştur.",
      date: "2026-03-01",
      body: `Tabu nasıl oynanır sorusunun cevabı basit: Yasaklı Kelimeler, hızlı düşünen ve bol kahkahalı gruplar için en iyi parti oyunlarından biri. Bir oyuncu ana kelimeyi anlatırken yasaklı ipuçlarını kullanamaz. Süre dolmadan takım bilirse puan alır.

## Temel kurallar

İki takıma bölün. Sıranızda bir ana kelime ve yasaklı kelimeler olan kart seçin. Yasaklı kelimeyi veya bariz kafiyeleri söylemeyin. Takımınız tahmin eder. Takılırsanız pas verin; pas limiti vardır.

## Kazanma stratejisi

İpuçlarını kısa tutun. Heceleme yerine hikâye, kategori ve benzetme kullanın. Tadado'da zor kartlar daha fazla puan verebilir.

## Telefonda tabu oyna

Tadado, tabuyu mobilde takım süresi, pas limiti ve temalı destelerle sunar. **Tadado Mix** ile ücretsiz başla, Yaz, Sinema, Seyahat gibi desteleri $0.99'a aç veya $2.99'a yapay zeka destesi oluştur.`,
    },
    {
      slug: "alninda-tahmin-nasil-oynanir",
      title: "Alnında Tahmin Nasıl Oynanır? Heads Up Charades Rehberi",
      description:
        "Alnında Tahmin (Heads Up charades) nasıl oynanır? Telefonu alnına koy, ipucu al, doğru bilince aşağı eğ. Partiler için tam rehber.",
      date: "2026-03-02",
      body: `Alnında Tahmin, telefonu klasik alın oyununa çevirir. Cihazı gözlerinin üstüne koy; kelimeyi sadece arkadaşlar görür. Kelimeyi söylemeden ipucu verirler. Bildin mi telefonu aşağı, bilemedin mi yukarı eğ.

## Kurulum

Deste seç, tur süresini ayarla, telefonu tutacak kişiyi belirle. Yatay mod kelimenin net görünmesini sağlar.

## Neden sevilir

Doğum günleri, yolculuklar ve hızlı tanışma oyunları için ideal. Karmaşık tahta yok — bir telefon ve bol enerji yeter.

## Tadado'da Alnında + yapay zeka

Tadado'da aynı desteler hem Yasaklı Kelimeler hem Alnında Tahmin modunda çalışır. Arkadaş grubun, ofis veya favori fandom için yapay zeka destesi oluştur, saniyeler içinde alnında oyna.`,
    },
    {
      slug: "tabu-mu-alninda-tahmin-mi",
      title: "Tabu mu Alnında Tahmin mi? Hangi Mod Grubuna Uyar?",
      description:
        "Tabu ve Alnında Tahmin oynanışını karşılaştır. İki modu da Tadado'da ücretsiz dene.",
      date: "2026-03-03",
      body: `Tabu ve Alnında Tahmin kelime tahmin oyunlarıdır ama enerji farklıdır. Tabu takım bazlı ve stratejik. Alnında Tahmin daha gösterişli ve hızlı.

## Tabu ne zaman?

Rekabetçi gruplar, puanlı oyun geceleri ve yapı seven oyuncular için. Takımlar sırayla oynar.

## Alnında Tahmin ne zaman?

Karışık seviyeler ve izleyiciler için. Bir kişi sahne alır, herkes koçluk yapar. Klipler TikTok ve Instagram için harika.

## Aynı desteyi iki kez kullan

Tadado mod değiştirmeni içerik yeniden kurmadan sağlar. Tadado Mix ile ücretsiz dene, grubunun sevdiği moda göre deste aç.`,
    },
    {
      slug: "en-iyi-parti-oyunlari",
      title: "2026'nın En İyi Parti Oyunları (Tahta Gerektirmez)",
      description:
        "Arkadaşlar için yedi mobil parti oyunu fikri. Tabu ve Alnında Tahmin ile Tadado'da ücretsiz başla.",
      date: "2026-03-04",
      body: `En iyi oyun gecesi listesi hızlı başlangıçlar ve yükselen enerji karışımıdır. Kelime oyunları öğretmesi en kolay, bırakması en zor türlerden.

## Neden kelime oyunları

Herkes zaten konuşmayı biliyor. Kaybolan parça yok, uzun kural kitabı yok. Telefon sunucu olur.

## Listeni kur

60 saniyelik ısınma, takım tabusu, sonra highlight için Alnında Tahmin. İç şakalar için yapay zeka destesi ekle.

## Uygun fiyat

Tadado ücretsiz indirilir, Tadado Mix dahil. İsteğe bağlı desteler $0.99. Reklamsız, abonelik yok.`,
    },
    {
      slug: "yapay-zeka-ile-kendi-deste",
      title: "Yapay Zeka ile Kendi Kelime Oyunu Desteni Nasıl Oluşturursun?",
      description:
        "Her konudan Tabu ve Alnında Tahmin kartları üret. Tadado yapay zeka deste rehberi.",
      date: "2026-03-05",
      body: `Özel desteler genel parti oyununu grubunun iç şakasına çevirir. Tadado'da konu yazarsın, yapay zeka yasaklı kelimeler ve zorluk seviyeleriyle kart üretir.

## Adım 1: Konu seç

Spesifik ol: "2000'ler pop punk", "Marvel 4. faz" veya "ofis efsanelerimiz". Spesifik konular daha adil ve komik kart verir.

## Adım 2: Dil ve zorluk

Tadado birçok dilde deste oluşturur. Zor kartlar Yasaklı Kelimeler modunda daha fazla puan verebilir.

## Adım 3: İki modda oyna

Yapay zeka destesi ek iş olmadan iki modda çalışır. Oluşturma $2.99 tek seferlik; Apple veya Google üzerinden.`,
    },
    {
      slug: "tanisma-oyunlari-gruplar",
      title: "Gruplar ve Ekipler İçin Tanışma Oyunları",
      description:
        "Sessizliği kıran hızlı kelime oyunları. Tabu ve Alnında Tahmin yeni ekipler için ideal.",
      date: "2026-03-06",
      body: `Tanışma oyunları zoraki hissedilirse işe yaramaz. Kelime oyunları ortak anılar yaratır — biri ipucunu yanlış söyler, herkes güler, ortam açılır.

## Düşük baskı başlangıç

Önce kolay desteler. Tadado Mix karışık gruplar için hızlı başlangıç paketi.

## 4'ten 12 oyuncuya

Tabu için iki takım, Alnında Tahmin için telefonu döndür. Süre kısa tutulur, utangaç oyuncular uzun süre sahne kalmaz.

## Özel içerikle devam et

Ortam açıldığında şirket, sınıf veya gezi hakkında yapay zeka destesi oluştur. Gece sizin hikâyenizle ilgili olduğunu gösterir.`,
    },
    {
      slug: "tabu-benzeri-kelime-oyunlari",
      title: "Tabu Benzeri Kelime Oyunları (iPhone ve Android)",
      description:
        "Tabu tarzı uygulama arıyorsan karşılaştır. Tadado Tabu, Alnında Tahmin ve yapay zeka destelerini birleştirir.",
      date: "2026-03-07",
      body: `Tabu benzeri oyun arayanlar genelde üç şey ister: hızlı kurulum, komik ipuçları ve tekrar etmeyen içerik.

## Nelere bakmalı

Kır evi ve uçuş için offline oyun. Adil puan için net yasaklı kelime kuralları. Birden fazla mod tekrar değerini artırır.

## Oyuncular neden Tadado'ya geçiyor

Tadado Yasaklı Kelimeler ve Alnında Tahmin'i tek uygulamada sunar, temalı desteler verir ve yapay zeka ile sınırsız konu ekler. Ücretsiz Tadado Mix ilk gruplar için bariyeri kaldırır.

## Şeffaf fiyat

Temalı desteler $0.99. Yapay zeka deste oluşturma $2.99. Reklamsız, abonelik yok. App Store veya Google Play'den indir.`,
    },
    {
      slug: "en-iyi-kelime-oyunu-uygulamalari",
      title: "En İyi Kelime Oyunu Uygulamaları 2026 (Tabu, Alnında Tahmin ve Daha Fazlası)",
      description:
        "iPhone ve Android için en iyi ücretsiz kelime oyunu uygulamaları. Tabu, Alnında Tahmin ve Tadado'nun neden listede olduğunu keşfet.",
      date: "2026-03-08",
      body: `En iyi kelime oyunu uygulaması ararken çoğu kişi üç şey ister: hızlı başlangıç, arkadaşlarla eğlence ve telefonda kalıcı bir uygulama. İşte nelere bakmalısın ve Tadado nerede öne çıkıyor.

## İyi bir mobil kelime oyununda ne olmalı?

**Hızlı kurulum.** Uzun kayıt veya kural kitabı olmamalı. Uygulamayı aç, deste seç, oyna.

**Birden fazla mod.** Tabu tarzı takım oyunu ve Alnında Tahmin (Heads Up charades) tek uygulamada olmalı.

**Adil fiyat.** Ücretsiz başlangıç, isteğe bağlı paketler, reklam ve abonelik tuzağı olmamalı.

**Özel içerik.** Yapay zeka deste oluşturma, ofis, tatil veya dizi konularında oynamanı sağlar.

## Kullanım senaryosuna göre en iyi uygulamalar

**Oyun gecesi / takım oyunu:** Tabu (Yasaklı Kelimeler) uygulamaları, süre ve pas limiti ile.

**Doğum günü ve tanışma:** Alnında Tahmin uygulamaları, telefon alında charades tarzı.

**Aile ve karışık yaş:** Basit arayüz, kısa turlar, Tadado Mix gibi kolay desteler.

**İçerik isteyenler:** Temalı paketler + yapay zeka ile sınırsız konu.

## Tadado neden listede?

Tadado **Tabu**, **Alnında Tahmin** ve **yapay zeka deste oluşturmayı** reklamsız tek uygulamada sunar. Tadado Mix ile ücretsiz başla, Sinema, Spor, Seyahat gibi desteleri $0.99'a aç veya $2.99'a özel yapay zeka destesi oluştur. 17 dilde iOS ve Android'de.

Tabu benzeri oyun veya charades uygulaması arıyorsan ve haftalık abonelik ödemek istemiyorsan, Tadado tam bu iş için tasarlandı.`,
    },
  ],
};

for (const [locale, items] of Object.entries(posts)) {
  const dir = join(root, "content/blog", locale);
  mkdirSync(dir, { recursive: true });
  for (const post of items) {
    const content = `---
title: "${post.title.replace(/"/g, '\\"')}"
description: "${post.description.replace(/"/g, '\\"')}"
date: "${post.date}"
---

${post.body}
`;
    writeFileSync(join(dir, `${post.slug}.mdx`), content);
  }
}

console.log("Blog posts generated");
