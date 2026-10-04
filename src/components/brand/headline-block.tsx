import { cn } from "@/lib/utils";

import { AccentPill } from "./accent-pill";

interface HeadlineBlockProps {
  eyebrow?: string;
  title: React.ReactNode;
  accent?: string;
  lead?: string;
  className?: string;
}

export function HeadlineBlock({ eyebrow, title, accent, lead, className }: HeadlineBlockProps) {
  return (
    <div className={cn("flex flex-col items-center gap-6 text-center", className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="text-display-xl text-balance">
        {title}
        {accent ? (
          <>
            <br />
            <AccentPill>{accent}</AccentPill>
          </>
        ) : null}
      </h1>
      {lead ? <p className="max-w-2xl text-xl text-muted-foreground">{lead}</p> : null}
    </div>
  );
}
