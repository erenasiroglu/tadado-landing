import type { Dictionary } from "@/lib/i18n";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface HowItWorksProps {
  dict: Dictionary;
}

export function HowItWorks({ dict }: HowItWorksProps) {
  return (
    <LandingSection id="how-it-works" analyticsSection="how_it_works" reveal>
      <SectionHeading title={dict.howItWorks.title} />
      <ol className="mt-8 grid gap-6 md:grid-cols-3">
        {dict.howItWorks.steps.map((step, index) => (
          <li key={step.title} className="surface-card h-full p-5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber text-sm font-bold text-[#2a0a3b]">
              {index + 1}
            </span>
            <h3 className="mt-4 text-lg font-bold text-cream">{step.title}</h3>
            <p className="mt-2 text-cream/70">{step.body}</p>
          </li>
        ))}
      </ol>
    </LandingSection>
  );
}
