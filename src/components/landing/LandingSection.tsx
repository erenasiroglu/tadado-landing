"use client";

import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";
import { Reveal } from "@/components/motion/Reveal";
import type { SectionId } from "@/lib/analytics-events";
import { isNightLandingTheme } from "@/lib/landing-theme";
import { cn } from "@/lib/utils";

interface LandingSectionProps {
  id?: string;
  analyticsSection?: SectionId;
  tone?: "default" | "soft" | "contrast" | "heroBlend";
  density?: "default" | "compact";
  className?: string;
  reveal?: boolean;
  children: React.ReactNode;
}

export function LandingSection({
  id,
  analyticsSection,
  tone = "default",
  density = "default",
  className,
  reveal = false,
  children,
}: LandingSectionProps) {
  const night = isNightLandingTheme();
  const bandTone = night && tone === "default" ? "soft" : tone;
  const shell = <div className="section-shell">{children}</div>;
  const content = reveal ? <Reveal as="div">{shell}</Reveal> : shell;
  const tracked = analyticsSection ? (
    <SectionViewTracker sectionId={analyticsSection}>{content}</SectionViewTracker>
  ) : (
    content
  );

  return (
    <section
      id={id}
      className={cn(
        "landing-section-band",
        (bandTone === "soft" || bandTone === "heroBlend") && "landing-section-band--soft",
        bandTone === "contrast" && "landing-section-band--mist",
        bandTone === "heroBlend" && "landing-section-band--hero-blend",
        density === "compact" ? "py-10 md:py-12" : "section-gap",
        className,
      )}
    >
      <div className="landing-section-band__inner">{tracked}</div>
    </section>
  );
}
