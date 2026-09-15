import { Bot, Gamepad2, Languages, Sparkles } from "lucide-react";

import type { Dictionary } from "@/lib/i18n";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface WhatMakesSpecialProps {
  dict: Dictionary;
}

const icons = [Gamepad2, Bot, Sparkles, Languages];

export function WhatMakesSpecial({ dict }: WhatMakesSpecialProps) {
  return (
    <LandingSection id="special" tone="contrast">
      <SectionHeading title={dict.special.title} subtitle={dict.special.subtitle} />
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {dict.special.items.map((item, index) => {
          const Icon = icons[index] ?? Sparkles;
          return (
            <div key={item.title} className="surface-card h-full p-6 sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber/15 text-amber">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-bold text-cream">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">{item.body}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-8 text-center text-xs font-medium uppercase tracking-wider text-lavender/70">
        {dict.special.developer}
      </p>
    </LandingSection>
  );
}
