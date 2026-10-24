import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { ShareLinkActions } from "@/components/landing/share/ShareLinkActions";
import { BRAND } from "@/lib/brand";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";
import {
  buildAppDeepLink,
  fillTemplate,
  getSharedDeckPreview,
  getShareLinkCopy,
  normalizeReferralSource,
  normalizeShareCode,
} from "@/lib/share-links";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/d/[code]">): Promise<Metadata> {
  const { lang, code: rawCode } = await params;
  if (!hasLocale(lang)) return {};
  const copy = getShareLinkCopy(lang);
  const code = normalizeShareCode(rawCode);
  const deck = code ? await getSharedDeckPreview(code) : null;

  const title = deck ? fillTemplate(copy.deckMetaTitle, { name: deck.name }) : copy.notFoundTitle;
  const description = deck
    ? fillTemplate(copy.deckMetaDescription, { name: deck.name })
    : copy.notFoundBody;
  const url = `${BRAND.domain}/d/${code ?? rawCode}`;

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function SharedDeckPage({
  params,
  searchParams,
}: PageProps<"/[lang]/d/[code]">) {
  const { lang, code: rawCode } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const query = await searchParams;
  const dict = await getDictionary(locale);
  const copy = getShareLinkCopy(locale);
  const code = normalizeShareCode(rawCode);
  const deck = code ? await getSharedDeckPreview(code) : null;
  const referralCode = normalizeShareCode(query.r);

  const appLink = deck
    ? buildAppDeepLink(`d/${deck.code}`, {
        r: referralCode,
        s: normalizeReferralSource(query.s ?? "deck"),
      })
    : buildAppDeepLink("ai-create", {});

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main className="flex-1">
        <div className="section-shell py-10 md:py-16">
          <div className="surface-card mx-auto flex max-w-xl flex-col gap-8 p-6 md:p-10">
            {deck ? (
              <>
                <div className="flex flex-col gap-3 text-center">
                  <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#b77905]">
                    {copy.deckKicker}
                  </span>
                  <h1 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
                    {deck.name}
                  </h1>
                  <p className="text-sm font-semibold text-ink/60">
                    {[
                      deck.creator_name ? fillTemplate(copy.deckBy, { name: deck.creator_name }) : null,
                      fillTemplate(copy.deckCards, { count: deck.card_count }),
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {deck.description ? (
                    <p className="text-base text-ink/75">{deck.description}</p>
                  ) : null}
                </div>

                {deck.samples.length > 0 ? (
                  <section className="flex flex-col gap-3" aria-label={copy.deckSamples}>
                    <h2 className="text-sm font-extrabold uppercase tracking-wide text-ink/55">
                      {copy.deckSamples}
                    </h2>
                    <ul className="grid gap-3 sm:grid-cols-3">
                      {deck.samples.map((sample) => (
                        <li
                          key={sample.word}
                          className="flex flex-col gap-2 rounded-2xl bg-plum p-4 text-cream shadow-pill"
                        >
                          <span className="text-lg font-extrabold leading-tight">{sample.word}</span>
                          <span className="text-xs leading-relaxed text-cream/70">
                            {(sample.forbidden_words ?? []).slice(0, 5).join(" · ")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}
              </>
            ) : (
              <div className="flex flex-col gap-3 text-center">
                <h1 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
                  {copy.notFoundTitle}
                </h1>
                <p className="text-base text-ink/70">{copy.notFoundBody}</p>
              </div>
            )}

            <ShareLinkActions
              locale={locale}
              appLink={appLink}
              openInAppLabel={copy.openInApp}
              appStoreLabel={dict.a11y.appStore}
              googlePlayLabel={dict.a11y.googlePlay}
              hint={copy.deckInstallHint}
              code={referralCode}
              codeLabel={copy.inviteCodeLabel}
              copyLabel={copy.copy}
              copiedLabel={copy.copied}
            />
          </div>
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
