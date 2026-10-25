import { cn } from "@/lib/utils";

/** Symmetric bat silhouette, drawn in a 64×28 box. */
const BAT_PATH =
  "M32 11 L35 6 L36.5 10.5 Q46 6 60 6 Q55 9 55 14 Q50 11 46 15 Q42 13 39 19 Q36 18 32 24 Q28 18 25 19 Q22 13 18 15 Q14 11 9 14 Q9 9 4 6 Q18 6 27.5 10.5 L29 6 Z";

/** Quarter spider web anchored at the top-left corner of a 240×240 box. */
const WEB_PATH = (() => {
  const angles = [0, 18, 36, 54, 72, 90].map((deg) => (deg * Math.PI) / 180);
  const rings = [46, 92, 142, 196];
  const point = (r: number, a: number) => [r * Math.cos(a), r * Math.sin(a)] as const;
  const fmt = (n: number) => n.toFixed(1);

  const spokes = angles.map((a) => {
    const [x, y] = point(240, a);
    return `M0 0L${fmt(x)} ${fmt(y)}`;
  });
  const threads = rings.map((r) =>
    angles
      .map((a, i) => {
        const [x, y] = point(r, a);
        if (i === 0) return `M${fmt(x)} ${fmt(y)}`;
        // Each thread sags toward the corner between two spokes.
        const [cx, cy] = point(r * 0.86, (a + angles[i - 1]) / 2);
        return `Q${fmt(cx)} ${fmt(cy)} ${fmt(x)} ${fmt(y)}`;
      })
      .join(""),
  );
  return [...spokes, ...threads].join("");
})();

export function Bat({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 28" className={className} style={style} aria-hidden focusable="false">
      <path d={BAT_PATH} fill="currentColor" />
    </svg>
  );
}

function Web({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden focusable="false">
      <path d={WEB_PATH} fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function Moon({ className, idSuffix }: { className?: string; idSuffix: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden focusable="false">
      <defs>
        <radialGradient id={`hw-moon-glow-${idSuffix}`} cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="#F2711C" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#F2711C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`hw-moon-face-${idSuffix}`} cx="38%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#FFF1E2" />
          <stop offset="100%" stopColor="#F8C79C" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="100" fill={`url(#hw-moon-glow-${idSuffix})`} />
      <circle cx="100" cy="100" r="54" fill={`url(#hw-moon-face-${idSuffix})`} />
      <circle cx="84" cy="88" r="9" fill="#E9A777" opacity="0.35" />
      <circle cx="116" cy="114" r="6" fill="#E9A777" opacity="0.3" />
      <circle cx="108" cy="80" r="4" fill="#E9A777" opacity="0.3" />
    </svg>
  );
}

interface HalloweenDecorProps {
  /** `light` sits on the white hero, `dark` on the midnight event card. */
  tone: "light" | "dark";
  className?: string;
}

/**
 * Faint moon, bats and corner web, matching the in-app Halloween skin.
 * Pure SVG + CSS: no JS, hidden from assistive tech, still when reduced motion is on.
 */
export function HalloweenDecor({ tone, className }: HalloweenDecorProps) {
  return (
    <div
      className={cn("halloween-decor pointer-events-none absolute inset-0 overflow-hidden", `halloween-decor--${tone}`, className)}
      aria-hidden
    >
      <Web className="halloween-decor__web" />
      <Moon className="halloween-decor__moon" idSuffix={tone} />
      <Bat className="halloween-decor__bat halloween-decor__bat--1" style={{ "--bat": 0 } as React.CSSProperties} />
      <Bat className="halloween-decor__bat halloween-decor__bat--2" style={{ "--bat": 1 } as React.CSSProperties} />
      <Bat className="halloween-decor__bat halloween-decor__bat--3" style={{ "--bat": 2 } as React.CSSProperties} />
    </div>
  );
}
