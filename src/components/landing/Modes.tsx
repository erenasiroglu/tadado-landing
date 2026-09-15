import { Badge } from "@/components/ui/badge";
import {
  getHeadsUpPauseLabel,
  getHeadsUpTimerLabel,
} from "@/lib/game-preview-tokens";
import type { Dictionary, Locale } from "@/lib/i18n";

import { AnimatedPhoneShell } from "./AnimatedPhoneShell";
import { LandingSection } from "./LandingSection";
import { ForbiddenWordsPreview } from "./previews/ForbiddenWordsPreview";
import { HeadsUpPreview } from "./previews/HeadsUpPreview";
import { PhoneFrame } from "./PhoneFrame";
import { SectionHeading } from "./SectionHeading";

interface ModesProps {
  locale: Locale;
  dict: Dictionary;
}

const HEADS_UP_PHONE_WIDTH = 320;

export function Modes({ locale, dict }: ModesProps) {
  return (
    <LandingSection id="modes" tone="contrast" reveal>
      <SectionHeading title={dict.modes.title} subtitle={dict.modes.subtitle} />
      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
        <div className="surface-card flex flex-col overflow-hidden p-6">
          <h3 className="text-lg font-bold text-cream">{dict.modes.tabooTitle}</h3>
          <p className="mt-2 text-cream/75">{dict.modes.tabooBody}</p>
          <div className="relative mt-6 flex flex-1 items-center justify-center">
            <div className="preview-ambient-glow" aria-hidden />
            <AnimatedPhoneShell>
              <PhoneFrame orientation="portrait" width={220}>
                <ForbiddenWordsPreview shellWidth={220} />
              </PhoneFrame>
            </AnimatedPhoneShell>
          </div>
        </div>

        <div className="surface-card relative flex flex-col overflow-hidden p-6">
          <Badge className="absolute right-4 top-4 border-amber/30 bg-amber/15 text-amber">
            {dict.modes.newBadge}
          </Badge>
          <h3 className="text-lg font-bold text-cream">{dict.modes.headsUpTitle}</h3>
          <p className="mt-2 text-cream/75">{dict.modes.headsUpBody}</p>
          <div className="relative mt-6 flex flex-1 items-center justify-center">
            <div className="preview-ambient-glow" aria-hidden />
            <AnimatedPhoneShell delay="short">
              <PhoneFrame orientation="landscape" width={HEADS_UP_PHONE_WIDTH}>
                <HeadsUpPreview
                  shellWidth={HEADS_UP_PHONE_WIDTH}
                  timer={getHeadsUpTimerLabel(locale)}
                  pauseLabel={getHeadsUpPauseLabel(locale)}
                />
              </PhoneFrame>
            </AnimatedPhoneShell>
          </div>
        </div>
      </div>
    </LandingSection>
  );
}
