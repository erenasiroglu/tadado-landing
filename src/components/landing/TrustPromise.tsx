import { CreditCard, Gift, HeartHandshake, UserRound } from "lucide-react";
import Link from "next/link";

import { localeHref, type Dictionary, type Locale } from "@/lib/i18n";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface TrustPromiseProps {
  locale: Locale;
  dict: Dictionary;
}

const ICONS = [UserRound, Gift, HeartHandshake, CreditCard];

/** Plain-language privacy and purchase promise, backed by the privacy policy. */
export function TrustPromise({ locale, dict }: TrustPromiseProps) {
  const { trust } = dict;

  return (
    <LandingSection id="promise" analyticsSection="trust" reveal>
      <SectionHeading eyebrow={trust.eyebrow} title={trust.title} subtitle={trust.subtitle} />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {trust.items.map((item, index) => {
          const Icon = ICONS[index] ?? HeartHandshake;
          return (
            <li key={item.title} className="flex flex-col rounded-lg surface-paper p-7">
              <span
                className="flex size-12 items-center justify-center rounded-sm surface-obsidian"
                aria-hidden
              >
                <Icon className="size-5" strokeWidth={2.25} />
              </span>
              <h3 className="mt-6 text-lg leading-snug font-extrabold tracking-[-0.02em] text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 text-center">
        <Link
          href={localeHref(locale, "privacy-policy")}
          className="text-sm font-bold text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink"
        >
          {trust.privacyLink}
        </Link>
      </p>
    </LandingSection>
  );
}
