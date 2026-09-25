import Image from "next/image";
import Link from "next/link";

import { buildDeckOverlayStyle, DECK_CARD_CONFIGS } from "@/lib/deck-cards";
import { SEO_DECK_KEYS } from "@/lib/deck-catalog";
import { getDeckHubCopy } from "@/lib/deck-seo-content";
import { deckSlugFor } from "@/lib/deck-slugs";
import type { Dictionary, Locale } from "@/lib/i18n";

interface DecksHubGridProps {
  locale: Locale;
  dict: Dictionary;
}

export function DecksHubGrid({ locale, dict }: DecksHubGridProps) {
  const hub = getDeckHubCopy(locale);

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight text-cream sm:text-4xl">{hub.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-cream/75">{hub.description}</p>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SEO_DECK_KEYS.map((key) => {
          const item = dict.decks.items[key];
          const config = DECK_CARD_CONFIGS[key];
          const href = `/${locale}/decks/${deckSlugFor(locale, key)}`;

          return (
            <li key={key}>
              <Link
                href={href}
                className="group surface-card block overflow-hidden transition hover:border-amber/30"
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden"
                  style={{ backgroundColor: config.illustrationBackgroundColor }}
                >
                  <Image
                    src={config.image}
                    alt={`Tadado ${item.name} deck`}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    style={{
                      objectPosition: config.objectPosition ?? "center",
                      transform: `scale(${config.illustrationScale})`,
                    }}
                    sizes="(max-width: 640px) 100vw, 320px"
                  />
                  <div className="absolute inset-0" style={buildDeckOverlayStyle(config)} />
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-bold text-cream group-hover:text-amber">{item.name}</h2>
                  <p className="mt-2 text-sm text-cream/70">{item.desc}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
