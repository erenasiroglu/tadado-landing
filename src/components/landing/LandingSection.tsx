import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface LandingSectionProps {
  id?: string;
  tone?: "default" | "contrast";
  className?: string;
  reveal?: boolean;
  children: React.ReactNode;
}

export function LandingSection({
  id,
  tone = "default",
  className,
  reveal = false,
  children,
}: LandingSectionProps) {
  const shell = <div className="section-shell">{children}</div>;

  return (
    <section
      id={id}
      className={cn(
        "relative isolate py-20",
        tone === "contrast" ? "bg-[#1c1129]" : "bg-[#2a0a3b]",
        className,
      )}
    >
      {reveal ? <Reveal as="div">{shell}</Reveal> : shell}
    </section>
  );
}
