import { TadadoMascotSvg } from "@/components/team/TadadoMascotSvg";
import { cn } from "@/lib/utils";

const STROKE = "#1a0a1e";

/** The Tadado card mascot wearing the app's Halloween witch hat. */
export function WitchMascot({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)} aria-hidden>
      <TadadoMascotSvg variant="base" className="max-w-none" />
      <svg
        viewBox="0 0 160 220"
        overflow="visible"
        className="pointer-events-none absolute inset-0 h-full w-full"
        focusable="false"
      >
        <path
          d="M48 30 Q58 -6 74 -34 Q84 -54 108 -50 Q94 -42 92 -26 Q100 4 112 30 Z"
          fill="#4b2a85"
          stroke={STROKE}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path d="M52 18 Q80 25 108 18 L111 29 Q80 36 49 29 Z" fill="#f2711c" stroke={STROKE} strokeWidth="3" strokeLinejoin="round" />
        <rect x="72" y="19" width="16" height="12" rx="2.5" fill="#fff4d6" stroke={STROKE} strokeWidth="2.5" />
        <ellipse cx="80" cy="32" rx="58" ry="10" fill="#3a1f6b" stroke={STROKE} strokeWidth="3.5" />
      </svg>
    </div>
  );
}
