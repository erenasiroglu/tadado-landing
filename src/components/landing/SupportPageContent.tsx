import Link from "next/link";
import { HelpCircle, Mail, Shield, ShoppingBag, Wrench } from "lucide-react";

import { BRAND } from "@/lib/brand";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n-config";

import { SectionHeading } from "./SectionHeading";

const TOPIC_ICONS = {
  faq: HelpCircle,
  billing: ShoppingBag,
  privacy: Shield,
  bug: Wrench,
} as const;

interface SupportPageContentProps {
  dict: Dictionary;
  locale: Locale;
}

function topicHref(
  locale: Locale,
  kind: Dictionary["support"]["topics"][number]["kind"],
  emailSubject: string,
): string {
  switch (kind) {
    case "faq":
      return `${localeHref(locale)}#faq`;
    case "privacy":
      return localeHref(locale, "privacy-policy");
    case "billing":
      return `mailto:${BRAND.supportEmail}?subject=${encodeURIComponent(`${emailSubject} — billing`)}`;
    case "bug":
      return `mailto:${BRAND.supportEmail}?subject=${encodeURIComponent(`${emailSubject} — bug report`)}`;
    default:
      return `mailto:${BRAND.supportEmail}`;
  }
}

export function SupportPageContent({ dict, locale }: SupportPageContentProps) {
  const content = dict.support;
  const mailHref = `mailto:${BRAND.supportEmail}?subject=${encodeURIComponent(content.emailSubject)}`;

  return (
    <div className="max-w-3xl">
      <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
      <p className="mt-6 leading-relaxed text-cream/75">{content.intro}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {content.topics.map((topic) => {
          const Icon = TOPIC_ICONS[topic.kind as keyof typeof TOPIC_ICONS] ?? HelpCircle;
          const href = topicHref(locale, topic.kind, content.emailSubject);
          const isMail = href.startsWith("mailto:");

          return (
            <article key={topic.kind} className="surface-card flex h-full flex-col p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber/15 text-amber">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="mt-4 text-lg font-bold text-cream">{topic.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/70">{topic.body}</p>
              {isMail ? (
                <a
                  href={href}
                  className="mt-4 inline-block text-sm font-semibold text-amber hover:text-amber/80"
                >
                  {topic.cta} →
                </a>
              ) : (
                <Link
                  href={href}
                  className="mt-4 inline-block text-sm font-semibold text-amber hover:text-amber/80"
                >
                  {topic.cta} →
                </Link>
              )}
            </article>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-amber/25 bg-amber/[0.06] p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber/15 text-amber">
            <Mail className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <h2 className="text-lg font-bold text-cream">{content.emailCta}</h2>
            <p className="mt-2 text-sm text-cream/70">{content.responseNote}</p>
            <a
              href={mailHref}
              className="mt-4 inline-flex text-sm font-semibold text-amber hover:text-amber/80"
            >
              {BRAND.supportEmail} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
