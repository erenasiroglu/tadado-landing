import type { Dictionary, Locale } from "@/lib/i18n";

import { StoreBadges } from "@/components/landing/StoreBadges";
import { SOCIAL_LINKS } from "@/lib/social";

interface PostCtaProps {
  locale: Locale;
  dict: Dictionary;
}

export function PostCta({ locale, dict }: PostCtaProps) {
  return (
    <aside className="glass mt-12 rounded-2xl p-8 text-center">
      <h3 className="text-xl font-bold text-cream">{dict.cta.title}</h3>
      <StoreBadges locale={locale} a11y={dict.a11y} className="mt-6 justify-center" />
      <p className="mt-6 text-sm text-cream/65">
        Join the community on{" "}
        <a href={SOCIAL_LINKS.instagram.href} className="text-amber hover:underline" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>{" "}
        and{" "}
        <a href={SOCIAL_LINKS.tiktok.href} className="text-amber hover:underline" target="_blank" rel="noopener noreferrer">
          TikTok
        </a>
        .
      </p>
    </aside>
  );
}
