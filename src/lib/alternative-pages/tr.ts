import type { AlternativePageContent } from "./types";

const DISCLAIMER =
  "Tabu, Alnında Tahmin, Charades ve Nebuu gibi adlar ilgili hak sahiplerinin ticari markalarıdır. Tadado, Tadado Game Development tarafından geliştirilen bağımsız bir uygulamadır; Hasbro, Warner Bros. Discovery veya üçüncü taraf uygulama yayıncılarıyla bağlantılı, onlar tarafından onaylanmış veya desteklenmiş değildir. Özellik karşılaştırmaları yazım tarihindeki Tadado sürümüne dayanır; diğer uygulamaların mağaza sayfalarını satın almadan önce kontrol edin.";

const TR_PAGES: Record<
  AlternativePageContent["id"],
  Omit<AlternativePageContent, "id">
> = {
  charades: {
    metaTitle: "Charades Uygulaması Alternatifi | Tadado Parti Oyunu",
    metaDescription:
      "Charades ve pantomim gecesi mi arıyorsun? Tadado’da Alnında Tahmin modu, Tabu tarzı Yasaklı Kelimeler, ücretsiz Tadado Mix, reklamsız oyun ve yapay zeka desteleri.",
    h1: "Oyun geceleri için modern charades alternatifi",
    heroSubtitle:
      "Tek telefon, iki mod: alnında tahmin veya takım halinde yasaklı kelimeler. Abonelik tuzağı yok, gece bitmeden reklam yok.",
    introTitle: "Neden charades alternatifi aranıyor?",
    introParagraphs: [
      "Charades (pantomim) basittir: kelimeyi anlat, arkadaşların tahmin etsin. Birçok mobil uygulama aynı döngüyü kopyalar ama araya uzun reklamlar koyar, ilk turdan önce ödeme ister ya da kelime listesi bir gecede biter.",
      "Tadado aynı sosyal enerjiyi hedefler; skor, takım ve süre net kalır. Alnında Tahmin tarzı turlar ile Yasaklı Kelimeler (Tabu tarzı) tek indirmede—grubun iki ayrı uygulama kurmasına gerek kalmaz.",
    ],
    reasonsTitle: "Gruplar neden tipik charades uygulamaları yerine Tadado’yu seçiyor",
    reasons: [
      "Alnında Tahmin modu: telefonu alına koy, tahmin et",
      "Yasaklı Kelimeler: takım Tabu geceleri için",
      "Ücretsiz Tadado Mix ile hemen başla",
      "Sinema, Seyahat, Yaz gibi temalı desteler",
      "Yapay zeka ile özel deste (doğum günü, tatil, inside joke)",
      "Reklam yok, zorunlu abonelik yok—ek desteler tek seferlik",
      "İndirdikten sonra çevrimdışı oynanabilir",
    ],
    compareTitle: "Tadado vs tipik charades uygulamaları",
    compareSubtitle: "Ev sahibi için dürüst özellik tablosu.",
    compareColumnTadado: "Tadado",
    compareColumnOther: "Tipik charades uygulamaları",
    compareRows: [
      { feature: "Pantomim / Alnında Tahmin modu", tadado: "yes", alternative: "yes" },
      { feature: "Aynı uygulamada Tabu tarzı takım oyunu", tadado: "yes", alternative: "no" },
      { feature: "Ücretsiz başlangıç içeriği", tadado: "yes", alternative: "partial" },
      { feature: "Oyun sırasında reklam yok", tadado: "yes", alternative: "no" },
      { feature: "Abonelik şart değil", tadado: "yes", alternative: "no" },
      { feature: "Yapay zeka özel deste", tadado: "yes", alternative: "no" },
      { feature: "Temalı kelime paketleri", tadado: "yes", alternative: "partial" },
      { feature: "17 dil", tadado: "yes", alternative: "partial" },
    ],
    compareNote:
      "Charades uygulamaları tek formata odaklanır. Tadado, hem anlatma hem yasaklı kelime gecesi isteyen ev sahipleri için tek uygulama sunar.",
    faqTitle: "Charades alternatifi SSS",
    faq: [
      {
        q: "Tadado charades uygulamasının yerini tutar mı?",
        a: "Çoğu grup için evet. Alnında Tahmin modunu kullanın. Tabu tarzı oyun da oynuyorsanız ikinci uygulama gerekmez.",
      },
      {
        q: "Herkesin telefonu gerekir mi?",
        a: "Hayır. Zaten çoğu charades gecesinde tek telefon paylaşılır.",
      },
      {
        q: "Tadado ücretsiz mi?",
        a: "Tadado Mix ücretsizdir. Temalı desteler isteğe bağlı tek seferlik satın almadır.",
      },
    ],
    disclaimer: DISCLAIMER,
    ctaTitle: "Bir sonraki oyun gecende Tadado’yu dene",
    ctaBody: "Ücretsiz indir, Tadado Mix’i aç, saniyeler içinde mod değiştir.",
    ctaButton: "Tadado’yu ücretsiz indir",
    relatedTitle: "Diğer karşılaştırmalar",
  },
  taboo: {
    metaTitle: "Tabu Uygulaması Alternatifi | Tadado Yasaklı Kelimeler",
    metaDescription:
      "Tabu tarzı uygulamalara alternatif: Tadado Yasaklı Kelimeler modu, Alnında Tahmin, ücretsiz Mix destesi, reklam yok, yapay zeka desteleri, abonelik yok.",
    h1: "Tabu alternatifi: Yasaklı Kelimeler tek telefonda",
    heroSubtitle:
      "Evde oynadığın Tabu hissini korur—yasaklı kelimelere takılmadan anlat, takımca gülersin.",
    introTitle: "Tabu tarzı uygulama ararken nelere dikkat etmeli?",
    introParagraphs: [
      "Tabu klasik takım oyunudur: süre, skor ve söyleyemeyeceğin kelimeler. Birçok uygulama formatı kopyalar ama turlar arası video reklam gösterir veya kartların çoğunu VIP aboneliğe kilitler.",
      "Tadado’da Yasaklı Kelimeler modu, Alnında Tahmin ile aynı uygulamada. Ücretsiz Tadado Mix ile bu gece oyna; kelime bitince temalı deste veya yapay zeka destesi ekle.",
    ],
    reasonsTitle: "Tabu sevenlerin Tadado’ya geçme nedenleri",
    reasons: [
      "Takım, süre ve skor için Yasaklı Kelimeler modu",
      "Aynı oturumda Alnında Tahmin ile mod değiştir",
      "Ücretsiz başlangıç destesi—ödemeden dene",
      "Tur arası reklam yok",
      "Tek seferlik deste fiyatları, aylık abonelik değil",
      "Tema için yapay zeka deste oluşturucu",
      "Karışık gruplar için kelime zorluk puanı",
    ],
    compareTitle: "Tadado vs tipik Tabu tarzı uygulamalar",
    compareSubtitle: "Süre işlerken önemli olanlar.",
    compareColumnTadado: "Tadado",
    compareColumnOther: "Tipik Tabu uygulamaları",
    compareRows: [
      { feature: "Yasaklı Kelimeler / Tabu modu", tadado: "yes", alternative: "yes" },
      { feature: "Alnında Tahmin modu dahil", tadado: "yes", alternative: "no" },
      { feature: "Ücretsiz başlangıç destesi", tadado: "yes", alternative: "partial" },
      { feature: "Reklamsız", tadado: "yes", alternative: "no" },
      { feature: "Abonelik zorunlu değil", tadado: "yes", alternative: "no" },
      { feature: "Yapay zeka özel deste", tadado: "yes", alternative: "partial" },
      { feature: "Sinema, spor, seyahat temalı paketler", tadado: "yes", alternative: "partial" },
      { feature: "Çevrimdışı oyun", tadado: "yes", alternative: "partial" },
    ],
    compareNote:
      "Sadece Tabu oynuyorsanız Tadado sade arayüz ve net süreler sunar. Charades gecesi de varsa ikinci uygulama kurmanız gerekmez.",
    faqTitle: "Tabu alternatifi SSS",
    faq: [
      {
        q: "Tadado resmi Tabu uygulaması mı?",
        a: "Hayır. Tadado bağımsız bir parti oyunudur. Yasaklı Kelimeler modu evde alışık olduğun Tabu tarzı akışı hedefler.",
      },
      {
        q: "Kaç kişiyle oynanır?",
        a: "Dört kişiden itibaren ideal. İki takım kurup telefonu sırayla verin.",
      },
      {
        q: "Özel kelime listesi kullanabilir miyiz?",
        a: "Evet. Yapay zeka deste oluşturucu ile tema ve dili seçip kendi desteni üretebilirsin.",
      },
    ],
    disclaimer: DISCLAIMER,
    ctaTitle: "Bu gece Yasaklı Kelimeler’i ücretsiz oyna",
    ctaBody: "Tadado’yu kur, Yasaklı Kelimeler’i seç, Tadado Mix ile ilk turu başlat.",
    ctaButton: "Tadado’yu indir",
    relatedTitle: "İlgili alternatifler",
  },
  "heads-up": {
    metaTitle: "Alnında Tahmin Alternatifi | Tadado Heads Up Modu",
    metaDescription:
      "Heads Up / Alnında Tahmin alternatifi: telefonu alına koy, kelimeyi tahmin et. Tadado’da Tabu modu, ücretsiz Mix, reklam yok, yapay zeka desteleri.",
    h1: "Alnında Tahmin alternatifi—tek uygulamada iki mod",
    heroSubtitle:
      "Heads Up hızını seviyorsan Alnında Tahmin modu; takım oyunu isteyenler için Yasaklı Kelimeler aynı indirmede.",
    introTitle: "Alnında Tahmin sevenler hız ister, paywall değil",
    introParagraphs: [
      "Alnında Tahmin (Heads Up) telefonu alına koyup kelimeyi bağırarak tahmin etmeyi popülerleştirdi. Benzer uygulamalar sık sık ücretsiz desteyi küçültür, ünlü paketleri aboneliğe bağlar veya odanın en gürültülü anında reklam gösterir.",
      "Tadado’da Alnında Tahmin modu aynı sosyal döngüyü net skor ve temalı destelerle sunar. Grubun yarısı Tabu tarzı oynamak istediğinde oturum içinde mod değiştir—ikinci indirme yok.",
    ],
    reasonsTitle: "Sadece Heads Up uygulaması yerine Tadado’yu seçenler",
    reasons: [
      "Alnında Tahmin modu ve süre yönetimi",
      "Takım turları için Yasaklı Kelimeler",
      "Grubu test etmek için ücretsiz Tadado Mix",
      "Film gecesi, yaz partisi için temalı desteler",
      "Dakikalar içinde yapay zeka deste",
      "Reklam yok, zorunlu abonelik yok",
      "Yabancı arkadaşlar için 17 dil desteği",
    ],
    compareTitle: "Tadado vs tipik Alnında Tahmin uygulamaları",
    compareSubtitle: "Ev sahibi için yan yana tablo.",
    compareColumnTadado: "Tadado",
    compareColumnOther: "Tipik Heads Up uygulamaları",
    compareRows: [
      { feature: "Alnında Tahmin / forehead oyunu", tadado: "yes", alternative: "yes" },
      { feature: "Tabu tarzı takım modu", tadado: "yes", alternative: "no" },
      { feature: "Ücretsiz başlangıç", tadado: "yes", alternative: "partial" },
      { feature: "Reklam yok", tadado: "yes", alternative: "no" },
      { feature: "Abonelik yok", tadado: "yes", alternative: "no" },
      { feature: "Yapay zeka özel kategori", tadado: "yes", alternative: "no" },
      { feature: "Tek seferlik temalı paketler", tadado: "yes", alternative: "partial" },
      { feature: "Zorluk puanlama", tadado: "yes", alternative: "no" },
    ],
    compareNote:
      "Tek mod uygulamaları derin paket satar. Tadado genişlik sunar: iki mod, adil fiyat, yapay zeka ile kişiselleştirme.",
    faqTitle: "Alnında Tahmin alternatifi SSS",
    faq: [
      {
        q: "Tadado Heads Up gibi mi?",
        a: "Evet. Alnında Tahmin modunu seç, telefonu alına koy, süre dolmadan kelimeyi tahmin et.",
      },
      {
        q: "Tadado, Heads Up ile bağlantılı mı?",
        a: "Hayır. Bağımsız uygulamayız. Benzer sosyal format sunuyoruz; ek modlar da var.",
      },
      {
        q: "Hangi desteyle başlamalıyız?",
        a: "Tadado Mix ücretsiz ve karışık gruplar için dengeli. Tema istediğinizde Sinema, Yaz vb. ekleyin.",
      },
    ],
    disclaimer: DISCLAIMER,
    ctaTitle: "Alnında Tahmin modunu ücretsiz dene",
    ctaBody: "Tadado’yu indir, modu seç, Tadado Mix ile başla—beğenirsen temalı deste al.",
    ctaButton: "Tadado’yu indir",
    relatedTitle: "Diğer alternatifler",
  },
  nebuu: {
    metaTitle: "Nebuu Alternatifi | Tadado ile Parti Kelime Oyunu",
    metaDescription:
      "Nebuu ve benzeri parti uygulamalarına alternatif: Tadado’da Tabu + Alnında Tahmin, ücretsiz Mix, reklam yok, abonelik yok, yapay zeka desteleri. Oyun gecesi için dene.",
    h1: "Nebuu alternatifi: Oyun gecesi için Tadado",
    heroSubtitle:
      "Türkiye’de parti kelime oyunlarını seviyorsan—tek uygulamada iki mod, reklamsız turlar ve ücretsiz başlangıç destesi.",
    introTitle: "Nebuu kullananlar neden Tadado’ya bakıyor?",
    introParagraphs: [
      "Nebuu, mobil Tabu ve charades kültürünü Türkiye’de yaygınlaştıran uygulamalardan biridir. Birçok oyuncu bir sonraki adımda aynı şeyi ister: kelimeler bitsin, reklam gecenin ritmini bozmasın, fiyat adil olsun.",
      "Tadado küçük bir oyun ekibinin tek ürünü. Odak: hızlı turlar, tur arası reklam yok, Yasaklı Kelimeler ve Alnında Tahmin aynı indirmede. Tadado Mix ile bu akşam ücretsiz oyna; beğenirsen temalı desteleri tek seferlik al—aylık abonelik tuzağı yok.",
    ],
    reasonsTitle: "Tadado’yu Nebuu ve benzeri uygulamalara tercih edenler",
    reasons: [
      "İki ana mod—Tabu gecesi ve alnında tahmin için ayrı uygulama yok",
      "Tadado Mix ücretsiz: grubunla önce dene, sonra karar ver",
      "Oyun sırasında reklam gösterilmez",
      "İsteğe bağlı desteler abonelik değil, tek seferlik satın alma",
      "Türkçe yapay zeka deste—doğum günü, okul grubu, tatil teması",
      "17 dil: Erasmus, yabancı misafir, Türk diasporası",
      "İndirdikten sonra internet olmadan da oynanabilir",
      "300.000+ oynanan oyun—aktif topluluk ve düzenli içerik güncellemeleri",
    ],
    compareTitle: "Tadado vs Nebuu tarzı parti uygulamaları",
    compareSubtitle:
      "Özellik odaklı karşılaştırma; güncel fiyat ve paketler için her uygulamanın mağaza sayfasına bakın.",
    compareColumnTadado: "Tadado",
    compareColumnOther: "Nebuu ve benzeri uygulamalar",
    compareRows: [
      { feature: "Tabu + Alnında Tahmin tek uygulamada", tadado: "yes", alternative: "partial" },
      { feature: "Ücretsiz başlangıç destesi", tadado: "yes", alternative: "partial" },
      { feature: "Tur boyunca reklam yok", tadado: "yes", alternative: "no" },
      { feature: "Oynamak için abonelik şart değil", tadado: "yes", alternative: "no" },
      { feature: "Yapay zeka ile özel deste", tadado: "yes", alternative: "no" },
      { feature: "Temalı deste mağazası", tadado: "yes", alternative: "yes" },
      { feature: "Kelime zorluk puanı", tadado: "yes", alternative: "partial" },
      { feature: "17 dil desteği", tadado: "yes", alternative: "partial" },
      { feature: "Gizli aylık ücret yok (tek seferlik ekstra)", tadado: "yes", alternative: "partial" },
    ],
    compareNote:
      "Her uygulama zamanla güncellenir. Tadado’nun önceliği adil oyun gecesi: ücretsiz deneme, reklamsız akış, iki mod. Kararı grubunla Tadado Mix ile ver.",
    faqTitle: "Nebuu alternatifi SSS",
    faq: [
      {
        q: "Tadado Nebuu’nun kopyası mı?",
        a: "Hayır. Tadado Game Development’ın özgün uygulamasıdır. Nebuu bağımsız bir markadır; bu sayfa seçim yapman için özellikleri yan yana koyar.",
      },
      {
        q: "Nebuu’dan Tadado’ya geçmek zor mu?",
        a: "Hayır. Uygulamayı indir, Tadado Mix ile bir tur oyna. Hesap zorunluluğu olmadan başlayabilirsin.",
      },
      {
        q: "Tadado Türkçe mi?",
        a: "Evet. Arayüz ve kartlar Türkçe destekler; yapay zeka destelerini de Türkçe üretebilirsin.",
      },
      {
        q: "Neden reklamsız önemli?",
        a: "Parti oyununda momentum kaybolur. Tadado tur arası video reklam göstermez; gece akışı sizde kalır.",
      },
    ],
    disclaimer: DISCLAIMER,
    ctaTitle: "Grubunla Tadado’yu ücretsiz dene",
    ctaBody:
      "Tek indirme: Yasaklı Kelimeler veya Alnında Tahmin. Beğenirsen temalı deste ekle—risk yok, Mix zaten ücretsiz.",
    ctaButton: "Tadado’yu ücretsiz indir",
    relatedTitle: "Diğer alternatif sayfaları",
  },
};

export function getTrAlternativePage(id: AlternativePageContent["id"]): AlternativePageContent {
  const page = TR_PAGES[id];
  return { id, ...page };
}

export const TR_ALTERNATIVE_PAGES = TR_PAGES;
