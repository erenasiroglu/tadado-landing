import type { Dictionary } from "@/lib/i18n";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface HowToPlayProps {
  dict: Dictionary;
}

interface ModeRulesProps {
  label: string;
  steps: { title: string; body: string }[];
}

function DifficultyTiers({ dict }: { dict: Dictionary["howToPlay"]["difficulty"] }) {
  const tiers = [
    { label: dict.easyLabel, multiplier: dict.easyMultiplier },
    { label: dict.hardLabel, multiplier: dict.hardMultiplier },
    { label: dict.legendaryLabel, multiplier: dict.legendaryMultiplier },
  ];

  return (
    <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
      {tiers.map((tier) => (
        <div
          key={tier.multiplier}
          className="flex flex-col items-center rounded-2xl border border-lavender/30 bg-[#3d1f58]/72 px-3 py-4 text-center sm:px-4 sm:py-5"
        >
          <span className="font-heading text-2xl font-black text-lavender sm:text-3xl">{tier.multiplier}</span>
          <span className="mt-1 text-xs font-semibold text-cream/75 sm:text-sm">{tier.label}</span>
        </div>
      ))}
    </div>
  );
}

function ModeRules({ label, steps }: ModeRulesProps) {
  return (
    <article className="surface-card flex h-full flex-col p-6">
      <h3 className="text-lg font-bold text-cream">{label}</h3>
      <ol className="mt-5 space-y-5">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-3">
            <span
              className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber text-sm font-bold text-[#2a0a3b]"
              aria-hidden
            >
              {index + 1}
            </span>
            <div>
              <h4 className="font-semibold text-cream">{step.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-cream/70">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}

export function HowToPlay({ dict }: HowToPlayProps) {
  const content = dict.howToPlay;

  return (
    <LandingSection id="how-to-play">
      <SectionHeading title={content.title} subtitle={content.subtitle} />

      <div className="mt-10 surface-card p-6 md:p-8">
        <h3 className="text-xl font-bold text-cream">{content.difficulty.title}</h3>
        <p className="mt-2 max-w-2xl text-cream/75">{content.difficulty.subtitle}</p>
        <DifficultyTiers dict={content.difficulty} />
        <p className="mt-6 text-sm leading-relaxed text-cream/80">{content.difficulty.scoreBody}</p>
        <p className="mt-3 text-sm leading-relaxed text-rose-200/80">{content.difficulty.tabooPenalty}</p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <ModeRules label={content.forbiddenWords.modeLabel} steps={content.forbiddenWords.steps} />
        <ModeRules label={content.headsUp.modeLabel} steps={content.headsUp.steps} />
        <ModeRules label={content.aiDeck.modeLabel} steps={content.aiDeck.steps} />
      </div>
    </LandingSection>
  );
}
