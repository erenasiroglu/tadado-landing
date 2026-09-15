import Link from "next/link";

import { BRAND } from "@/lib/brand";
import { localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface PartnershipsProps {
  dict: Dictionary;
  locale: Locale;
  variant?: "section" | "page";
}

function ContactCard({
  title,
  body,
  cta,
  mailSubject,
}: {
  title: string;
  body: string;
  cta: string;
  mailSubject: string;
}) {
  const href = `mailto:${BRAND.supportEmail}?subject=${encodeURIComponent(mailSubject)}`;

  return (
    <article className="surface-card p-5">
      <h3 className="font-bold text-cream">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-cream/70">{body}</p>
      <a href={href} className="mt-4 inline-block text-sm font-semibold text-amber hover:text-amber/80">
        {cta} →
      </a>
    </article>
  );
}

export function Partnerships({
  dict,
  locale,
  variant = "section",
}: PartnershipsProps) {
  const content = dict.partnerships;
  const isPage = variant === "page";

  const body = (
    <>
      <SectionHeading
        title={content.title}
        subtitle={content.subtitle}
        align={isPage ? "left" : "center"}
      />

      {isPage && content.pageNote ? (
        <p className="mt-6 max-w-2xl text-cream/75 leading-relaxed">{content.pageNote}</p>
      ) : null}

      <div className={cn("grid gap-4 md:grid-cols-3", isPage ? "mt-10" : "mt-10")}>
        <ContactCard
          title={content.deckRequest.title}
          body={content.deckRequest.body}
          cta={content.deckRequest.cta}
          mailSubject={content.deckRequest.subject}
        />
        <ContactCard
          title={content.collaboration.title}
          body={content.collaboration.body}
          cta={content.collaboration.cta}
          mailSubject={content.collaboration.subject}
        />
        <ContactCard
          title={content.investors.title}
          body={content.investors.body}
          cta={content.investors.cta}
          mailSubject={content.investors.subject}
        />
      </div>

      {isPage ? (
        <p className="mt-8 text-sm text-lavender">
          <a href={`mailto:${BRAND.supportEmail}`} className="hover:text-amber">
            {BRAND.supportEmail}
          </a>
        </p>
      ) : null}

      {!isPage ? (
        <p className="mt-8 text-center">
          <Link
            href={localeHref(locale, "partnerships")}
            className="text-sm font-semibold text-amber hover:text-amber/80"
          >
            {content.learnMore} →
          </Link>
        </p>
      ) : null}
    </>
  );

  if (isPage) {
    return <div>{body}</div>;
  }

  return (
    <LandingSection id="partnerships">
      {body}
    </LandingSection>
  );
}
