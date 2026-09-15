import type { Dictionary } from "@/lib/i18n";
import { SOCIAL_LINKS } from "@/lib/social";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface CommunityProps {
  dict: Dictionary;
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.01a8.24 8.24 0 0 0 4.77 1.52V7.08a4.85 4.85 0 0 1-1-.39z" />
    </svg>
  );
}

export function Community({ dict }: CommunityProps) {
  const cards = [
    {
      href: SOCIAL_LINKS.instagram.href,
      handle: SOCIAL_LINKS.instagram.handle,
      title: dict.community.instagramCta,
      desc: dict.community.instagramDesc,
      icon: <InstagramIcon className="h-6 w-6" />,
    },
    {
      href: SOCIAL_LINKS.tiktok.href,
      handle: SOCIAL_LINKS.tiktok.handle,
      title: dict.community.tiktokCta,
      desc: dict.community.tiktokDesc,
      icon: <TikTokIcon className="h-6 w-6" />,
    },
  ];

  return (
    <LandingSection id="community" tone="contrast">
      <SectionHeading title={dict.community.title} subtitle={dict.community.subtitle} />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {cards.map((card) => (
          <a
            key={card.href}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="surface-card h-full p-8 transition hover:border-amber/30">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber/15 text-amber">
                  {card.icon}
                </div>
                <div>
                  <p className="font-bold text-cream group-hover:text-amber">{card.title}</p>
                  <p className="text-sm text-lavender">{card.handle}</p>
                </div>
              </div>
              <p className="mt-4 text-cream/70">{card.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </LandingSection>
  );
}
