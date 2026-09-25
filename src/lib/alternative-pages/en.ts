import type { AlternativePageContent } from "./types";

const DISCLAIMER =
  "Game names such as Taboo®, Heads Up!®, and Charades refer to well-known party game formats. Third-party app names (including Nebuu) are trademarks of their respective owners. Tadado is developed by Tadado Game Development and is not affiliated with, endorsed by, or sponsored by Hasbro, Warner Bros. Discovery, or other publishers. Feature notes reflect our product at the time of writing and may differ in other apps; check each store listing before you buy.";

const EN_PAGES: Record<
  AlternativePageContent["id"],
  Omit<AlternativePageContent, "id">
> = {
  charades: {
    metaTitle: "Charades App Alternative | Tadado Party Word Game",
    metaDescription:
      "Looking for a charades app for game night? Tadado combines acting-style Heads Up play with team Taboo modes, a free starter deck, no ads, and AI custom decks.",
    h1: "A modern charades app alternative for real groups",
    heroSubtitle:
      "One phone, two ways to play: describe words without saying them, or hold the screen to your forehead. Built for laughs, not subscriptions.",
    introTitle: "Why people search for charades alternatives",
    introParagraphs: [
      "Classic charades is simple: act out a word while friends guess. Many mobile apps copy that loop but add long ads, paywalls before the first round, or thin word lists that repeat after one night.",
      "Tadado is built for the same energy as charades nights, with structured modes that keep score, teams, and timers fair. You get Heads Up-style rounds plus Forbidden Words (Taboo-style) in one download—so the group is not stuck installing two different apps.",
    ],
    reasonsTitle: "Why groups pick Tadado over typical charades apps",
    reasons: [
      "Heads Up mode for classic “phone on your forehead” guessing",
      "Forbidden Words mode when you want team-based Taboo-style rounds",
      "Free Tadado Mix deck so you can start without paying",
      "Themed packs (Cinema, Travel, Summer, and more) for variety",
      "AI deck builder for inside jokes and custom topics",
      "No ads and no subscription—pay once only for optional packs",
      "Works offline once downloaded—great for cabins and travel",
    ],
    compareTitle: "Tadado vs typical charades apps",
    compareSubtitle: "Honest feature comparison for game-night hosts.",
    compareColumnTadado: "Tadado",
    compareColumnOther: "Typical charades apps",
    compareRows: [
      { feature: "Acting / Heads Up style mode", tadado: "yes", alternative: "yes" },
      { feature: "Team word game (Taboo-style) in same app", tadado: "yes", alternative: "no" },
      { feature: "Free starter content", tadado: "yes", alternative: "partial" },
      { feature: "No ads during play", tadado: "yes", alternative: "no" },
      { feature: "No subscription required", tadado: "yes", alternative: "no" },
      { feature: "AI custom decks", tadado: "yes", alternative: "no" },
      { feature: "Themed word packs", tadado: "yes", alternative: "partial" },
      { feature: "17 languages", tadado: "yes", alternative: "partial" },
    ],
    compareNote:
      "Charades apps excel at one format. Tadado is for hosts who want acting rounds and forbidden-word rounds in one place, with a free deck to try first.",
    faqTitle: "Charades alternative FAQ",
    faq: [
      {
        q: "Can Tadado replace a charades app?",
        a: "Yes for most groups. Use Heads Up mode for acting and guessing. If you also play Taboo-style team games, you do not need a second app.",
      },
      {
        q: "Do we need multiple phones?",
        a: "No. Pass one phone between players or teams—the way most charades nights already work.",
      },
      {
        q: "Is Tadado free?",
        a: "Tadado Mix is free. Optional themed decks are a one-time purchase, not a subscription.",
      },
    ],
    disclaimer: DISCLAIMER,
    ctaTitle: "Try Tadado on your next game night",
    ctaBody: "Download free, open Tadado Mix, and switch between Heads Up and Forbidden Words in seconds.",
    ctaButton: "Download Tadado free",
    relatedTitle: "More comparisons",
  },
  taboo: {
    metaTitle: "Taboo App Alternative | Forbidden Words on Tadado",
    metaDescription:
      "Compare Taboo-style apps with Tadado: team Forbidden Words mode, Heads Up in one app, free Tadado Mix, no ads, AI decks, and one-time deck packs.",
    h1: "Taboo app alternative: Forbidden Words on one phone",
    heroSubtitle:
      "Same party energy as Taboo—describe the word without the forbidden clues—with modes and decks designed for repeat game nights.",
    introTitle: "Looking for a Taboo-style app that respects game night?",
    introParagraphs: [
      "Taboo is the classic team word game: clue-giver, timer, and a list of words you must not say. Many apps recreate that format but interrupt rounds with video ads or lock most cards behind VIP subscriptions.",
      "Tadado includes a dedicated Forbidden Words mode alongside Heads Up. Start with the free Tadado Mix deck, add themed packs when you want fresh words, or generate an AI deck around your friend group’s inside jokes—without installing a second app for charades night.",
    ],
    reasonsTitle: "Why Taboo fans switch to Tadado",
    reasons: [
      "Forbidden Words mode built for teams, timers, and scorekeeping",
      "Heads Up mode in the same app for variety between rounds",
      "Free starter deck—play tonight before buying anything",
      "No ads between turns",
      "One-time deck prices instead of recurring subscriptions",
      "AI-generated decks for birthdays, trips, or themed parties",
      "Word difficulty scoring to keep clues fair for mixed groups",
    ],
    compareTitle: "Tadado vs typical Taboo-style apps",
    compareSubtitle: "What matters when the timer is running.",
    compareColumnTadado: "Tadado",
    compareColumnOther: "Typical Taboo-style apps",
    compareRows: [
      { feature: "Forbidden Words / Taboo-style mode", tadado: "yes", alternative: "yes" },
      { feature: "Heads Up mode included", tadado: "yes", alternative: "no" },
      { feature: "Free starter deck", tadado: "yes", alternative: "partial" },
      { feature: "No ads", tadado: "yes", alternative: "no" },
      { feature: "No subscription", tadado: "yes", alternative: "no" },
      { feature: "AI custom decks", tadado: "yes", alternative: "partial" },
      { feature: "Themed packs (movies, travel, sports…)", tadado: "yes", alternative: "partial" },
      { feature: "Offline play", tadado: "yes", alternative: "partial" },
    ],
    compareNote:
      "If your group only plays Taboo-style rounds, Tadado focuses on smooth timers and clean UI. If you also play charades, you get both without extra installs.",
    faqTitle: "Taboo alternative FAQ",
    faq: [
      {
        q: "Is Tadado the official Taboo app?",
        a: "No. Tadado is an independent party game by Tadado Game Development. Forbidden Words mode follows the familiar Taboo-style format players expect at home.",
      },
      {
        q: "How many players do we need?",
        a: "Works great from four players upward. Split into two teams, pass the phone for each turn.",
      },
      {
        q: "Can we use custom words?",
        a: "Yes. Use the AI deck builder to generate cards for your theme, language, and group.",
      },
    ],
    disclaimer: DISCLAIMER,
    ctaTitle: "Play Forbidden Words free tonight",
    ctaBody: "Install Tadado, choose Forbidden Words, and open Tadado Mix—no signup wall before the first round.",
    ctaButton: "Get Tadado free",
    relatedTitle: "Related alternatives",
  },
  "heads-up": {
    metaTitle: "Heads Up Alternative | Charades Mode in Tadado",
    metaDescription:
      "Heads Up-style app alternative: hold the phone, guess the word, keep the score. Tadado adds Taboo-style teams, free Mix deck, no ads, and AI decks.",
    h1: "Heads Up alternative with more than one mode",
    heroSubtitle:
      "Fast forehead guessing when you want charades energy—plus Forbidden Words when the group wants teams and banned clues.",
    introTitle: "Heads Up fans want speed—not paywalls",
    introParagraphs: [
      "Heads Up made phone-on-forehead guessing famous: tilt to pass, shout answers, race the clock. Copycat apps often shrink free decks, push celebrity packs behind subscriptions, or show ads right when the room gets loud.",
      "Tadado’s Heads Up mode delivers the same social loop with clear scoring and themed decks. When half the group prefers Taboo-style clues, switch modes in the same session—no second download.",
    ],
    reasonsTitle: "Why players choose Tadado over Heads Up-only apps",
    reasons: [
      "Heads Up mode with tilt-friendly flow and timers",
      "Forbidden Words for team rounds between acting games",
      "Free Tadado Mix to test with your group first",
      "Themed decks for movie night, travel, or summer parties",
      "AI decks for custom categories in minutes",
      "No ads and no mandatory subscription",
      "17 language options for mixed-language friend groups",
    ],
    compareTitle: "Tadado vs typical Heads Up-style apps",
    compareSubtitle: "Side-by-side for party hosts.",
    compareColumnTadado: "Tadado",
    compareColumnOther: "Typical Heads Up-style apps",
    compareRows: [
      { feature: "Forehead / Heads Up guessing", tadado: "yes", alternative: "yes" },
      { feature: "Taboo-style team mode", tadado: "yes", alternative: "no" },
      { feature: "Free content to start", tadado: "yes", alternative: "partial" },
      { feature: "No ads", tadado: "yes", alternative: "no" },
      { feature: "No subscription", tadado: "yes", alternative: "no" },
      { feature: "AI custom categories", tadado: "yes", alternative: "no" },
      { feature: "One-time themed packs", tadado: "yes", alternative: "partial" },
      { feature: "Difficulty scoring", tadado: "yes", alternative: "no" },
    ],
    compareNote:
      "Dedicated Heads Up apps go deep on one celebrity deck. Tadado trades that for breadth: two core modes, fair pricing, and decks you can tailor with AI.",
    faqTitle: "Heads Up alternative FAQ",
    faq: [
      {
        q: "Does Tadado work like Heads Up?",
        a: "Yes. Choose Heads Up mode, hold the phone on your forehead, and guess words before time runs out.",
      },
      {
        q: "Is Tadado affiliated with Heads Up?",
        a: "No. Tadado is independent. Heads Up! is a trademark of its owner; we offer a similar social format plus extra modes.",
      },
      {
        q: "Which deck should we start with?",
        a: "Tadado Mix is free and balanced for mixed groups. Add Cinema, Summer, or other packs when you want a theme.",
      },
    ],
    disclaimer: DISCLAIMER,
    ctaTitle: "Download and play Heads Up mode free",
    ctaBody: "Get Tadado, pick Heads Up, and start with Tadado Mix—upgrade only if your group wants more themes.",
    ctaButton: "Download Tadado",
    relatedTitle: "Explore other alternatives",
  },
  nebuu: {
    metaTitle: "Nebu Alternative | Tadado Party Game (EN)",
    metaDescription:
      "Comparing Nebuu-style party word apps with Tadado: two game modes, free Mix deck, no ads, no subscription, AI decks, and one-time themed packs.",
    h1: "Tadado as a Nebuu alternative for party word games",
    heroSubtitle:
      "If you are comparing Turkish party apps—or want one clean install for Taboo-style and Heads Up nights—here is how Tadado stacks up.",
    introTitle: "Party apps should earn trust on night one",
    introParagraphs: [
      "Apps like Nebuu helped popularize mobile Taboo and charades in Turkey. Players often look for the same thing next: more words, less friction, and pricing that does not punish a single game night.",
      "Tadado is built by a small game team focused on one product: fast rounds, no ad breaks, and both Forbidden Words and Heads Up in one app. You can start free with Tadado Mix, then add themed decks once—not on a monthly clock.",
    ],
    reasonsTitle: "Reasons groups try Tadado after other party apps",
    reasons: [
      "Two core modes instead of juggling multiple installs",
      "Free Tadado Mix—verify the vibe before spending",
      "No ads during gameplay",
      "Optional packs are one-time purchases, not subscriptions",
      "AI deck builder for custom Turkish or English nights",
      "17 languages for friends abroad or exchange students",
      "Offline-friendly once the app is installed",
    ],
    compareTitle: "Tadado vs typical party apps (e.g. Nebuu-style)",
    compareSubtitle: "Feature-focused comparison; check each app’s store page for current pricing.",
    compareColumnTadado: "Tadado",
    compareColumnOther: "Many party word apps",
    compareRows: [
      { feature: "Taboo-style + Heads Up in one app", tadado: "yes", alternative: "partial" },
      { feature: "Free starter deck", tadado: "yes", alternative: "partial" },
      { feature: "No ads in rounds", tadado: "yes", alternative: "no" },
      { feature: "No subscription required to play", tadado: "yes", alternative: "no" },
      { feature: "AI custom decks", tadado: "yes", alternative: "no" },
      { feature: "Themed deck store", tadado: "yes", alternative: "yes" },
      { feature: "Word difficulty scoring", tadado: "yes", alternative: "partial" },
      { feature: "17 languages", tadado: "yes", alternative: "partial" },
    ],
    compareNote:
      "Every app updates over time. Use this page to see what Tadado optimizes for—fair game nights—then try the free deck with your group.",
    faqTitle: "Nebu / party app FAQ",
    faq: [
      {
        q: "Is Tadado copying Nebuu?",
        a: "No. Tadado is an original app by Tadado Game Development. We compare common party-game features so you can choose what fits.",
      },
      {
        q: "Is Tadado good for Turkish game nights?",
        a: "Yes. UI and cards support Turkish, and you can build AI decks in Turkish for your group.",
      },
      {
        q: "How do I switch from another app?",
        a: "Install Tadado, play Tadado Mix free, and bookmark your favorite mode. No account required to start.",
      },
    ],
    disclaimer: DISCLAIMER,
    ctaTitle: "Try Tadado free with your group",
    ctaBody: "Download once, play Forbidden Words or Heads Up tonight, and add themed decks only if you want more.",
    ctaButton: "Download Tadado free",
    relatedTitle: "More alternatives",
  },
};

export function getEnAlternativePage(id: AlternativePageContent["id"]): AlternativePageContent {
  const page = EN_PAGES[id];
  return { id, ...page };
}

export const EN_ALTERNATIVE_PAGES = EN_PAGES;
