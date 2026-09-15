import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";
import { Reveal } from "@/components/motion/Reveal";
import type { SectionId } from "@/lib/analytics-events";
import { cn } from "@/lib/utils";

interface LandingSectionProps {
  id?: string;
  analyticsSection?: SectionId;
  tone?: "default" | "contrast";
  className?: string;
  reveal?: boolean;
  children: React.ReactNode;
}

export function LandingSection({
  id,
  analyticsSection,
  tone = "default",
  className,
  reveal = false,
  children,
}: LandingSectionProps) {
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
        "relative isolate py-20",
        tone === "contrast" ? "bg-[#1c1129]" : "bg-[#2a0a3b]",
        className,
      )}
    >
      {tracked}
    </section>
  );
}
