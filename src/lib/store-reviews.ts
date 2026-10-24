import "server-only";

import type { Locale } from "@/lib/i18n-config";

const APP_STORE_ID = "6753135485";
const PLAY_PACKAGE = "com.erenasiroglu.tadado";

/** Refresh store data at most every six hours; pages stay static in between (ISR). */
const REVALIDATE_SECONDS = 21600;
const TIMEOUT_MS = 5000;

/** Storefronts summed into one App Store rating and scanned for written reviews. */
const STOREFRONTS = [
  "us",
  "gb",
  "ca",
  "au",
  "ie",
  "nz",
  "tr",
  "de",
  "at",
  "ch",
  "fr",
  "be",
  "nl",
  "es",
  "mx",
  "ar",
  "co",
  "cl",
  "br",
  "pt",
  "it",
  "pl",
  "gr",
  "jp",
  "kr",
  "tw",
  "hk",
  "in",
  "id",
  "vn",
  "sa",
  "ae",
  "eg",
  "se",
] as const;

/** Storefront whose reviews are shown first for each site locale. */
const LOCALE_STOREFRONT: Record<Locale, string> = {
  en: "us",
  tr: "tr",
  es: "es",
  "pt-BR": "br",
  fr: "fr",
  de: "de",
  zh: "tw",
  hi: "in",
  id: "id",
  vi: "vn",
  ar: "sa",
  ru: "us",
  ja: "jp",
  ko: "kr",
  it: "it",
  pl: "pl",
  el: "gr",
};

export interface StoreReview {
  id: string;
  quote: string;
  title: string;
  author: string;
  rating: number;
  date: string;
  storefront: string;
  store: "appStore" | "googlePlay";
}

export interface StoreRating {
  rating: number;
  count: number;
}

export interface StoreReviewData {
  appStore: StoreRating | null;
  googlePlay: StoreRating | null;
  reviews: StoreReview[];
}

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

type Label = { label?: string };
type RssEntry = {
  id?: Label;
  author?: { name?: Label };
  updated?: Label;
  title?: Label;
  content?: Label;
  "im:rating"?: Label;
};

async function appStoreRating(country: string): Promise<StoreRating | null> {
  const data = (await fetchJson(
    `https://itunes.apple.com/lookup?id=${APP_STORE_ID}&country=${country}`,
  )) as {
    results?: { averageUserRating?: number; userRatingCount?: number }[];
  };
  const app = data.results?.[0];
  if (!app?.userRatingCount || !app.averageUserRating) return null;
  return { rating: app.averageUserRating, count: app.userRatingCount };
}

async function appStoreReviews(country: string): Promise<StoreReview[]> {
  const data = (await fetchJson(
    `https://itunes.apple.com/${country}/rss/customerreviews/id=${APP_STORE_ID}/sortBy=mostRecent/json`,
  )) as { feed?: { entry?: RssEntry | RssEntry[] } };
  const raw = data.feed?.entry;
  const entries = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return entries
    .filter((entry) => entry["im:rating"]?.label && entry.content?.label)
    .map((entry) => ({
      id: entry.id?.label ?? `${country}-${entry.updated?.label}`,
      quote: (entry.content?.label ?? "").trim(),
      title: (entry.title?.label ?? "").trim(),
      author: (entry.author?.name?.label ?? "").trim(),
      rating: Number(entry["im:rating"]?.label ?? 0),
      date: entry.updated?.label ?? "",
      storefront: country,
      store: "appStore" as const,
    }));
}

/** Google Play has no public ratings API, so read the rating shown on the public listing. */
async function googlePlayRating(): Promise<StoreRating | null> {
  const response = await fetch(
    `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}&hl=en&gl=us`,
    {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    },
  );
  if (!response.ok) return null;
  const html = await response.text();
  const rating = html.match(/Rated ([0-9.]+) stars out of five stars/)?.[1];
  const count = html.match(/>([0-9][0-9.,]*[KM]?) reviews</)?.[1];
  if (!rating || !count) return null;
  const multiplier = count.endsWith("M")
    ? 1_000_000
    : count.endsWith("K")
      ? 1_000
      : 1;
  return {
    rating: Number(rating),
    count: Math.round(Number(count.replace(/[KM,]/g, "")) * multiplier),
  };
}

const settledValues = <T>(results: PromiseSettledResult<T>[]) =>
  results.flatMap((result) =>
    result.status === "fulfilled" ? [result.value] : [],
  );

/**
 * Live ratings and recent 4–5 star reviews from the stores. Every request is cached for six
 * hours and fails soft, so a slow or blocked store never breaks or delays the page.
 */
export async function getStoreReviewData(
  locale: Locale,
): Promise<StoreReviewData> {
  const [ratings, reviewLists, googlePlay] = await Promise.all([
    Promise.allSettled(STOREFRONTS.map(appStoreRating)),
    Promise.allSettled(STOREFRONTS.map(appStoreReviews)),
    googlePlayRating().catch(() => null),
  ]);

  const counted = settledValues(ratings).filter(
    (item): item is StoreRating => item !== null,
  );
  const count = counted.reduce((sum, item) => sum + item.count, 0);
  const appStore = count
    ? {
        rating:
          counted.reduce((sum, item) => sum + item.rating * item.count, 0) /
          count,
        count,
      }
    : null;

  const home = LOCALE_STOREFRONT[locale];
  const seen = new Set<string>();
  const reviews = settledValues(reviewLists)
    .flat()
    .filter((review) => review.rating >= 4 && review.quote.length >= 20)
    .filter((review) =>
      seen.has(review.id) ? false : (seen.add(review.id), true),
    )
    .sort((a, b) => {
      const local =
        Number(b.storefront === home) - Number(a.storefront === home);
      return local || b.date.localeCompare(a.date);
    })
    .slice(0, 12);

  return { appStore, googlePlay, reviews };
}
