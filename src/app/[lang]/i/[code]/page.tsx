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
  getShareLinkCopy,
  normalizeReferralSource,
  normalizeShareCode,
} from "@/lib/share-links";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/i/[code]">): Promise<Metadata> {
  const { lang, code } = await params;
  if (!hasLocale(lang)) return {};
  const copy = getShareLinkCopy(lang);
  const url = `${BRAND.domain}/i/${normalizeShareCode(code) ?? code}`;

  return {
    title: copy.inviteTitle,
    description: copy.inviteBody,
    robots: { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: { title: copy.inviteTitle, description: copy.inviteBody, url, type: "website" },
    twitter: { card: "summary_large_image", title: copy.inviteTitle, description: copy.inviteBody },
  };
}

export default async function InvitePage({ params, searchParams }: PageProps<"/[lang]/i/[code]">) {
  const { lang, code: rawCode } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const query = await searchParams;
  const dict = await getDictionary(locale);
  const copy = getShareLinkCopy(locale);
  const referralCode = normalizeShareCode(rawCode);

  const appLink = referralCode
    ? buildAppDeepLink(`i/${referralCode}`, { s: normalizeReferralSource(query.s) })
    : buildAppDeepLink("", {});

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main className="flex-1">
        <div className="section-shell py-10 md:py-16">
          <div className="surface-card mx-auto flex max-w-xl flex-col gap-8 p-6 md:p-10">
            <div className="flex flex-col gap-3 text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#b77905]">
                {copy.inviteKicker}
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
                {copy.inviteTitle}
              </h1>
              <p className="text-base text-ink/75">{copy.inviteBody}</p>
            </div>

            <ShareLinkActions
              locale={locale}
              appLink={appLink}
              openInAppLabel={copy.openInApp}
              appStoreLabel={dict.a11y.appStore}
              googlePlayLabel={dict.a11y.googlePlay}
              hint={copy.inviteCodeHint}
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
