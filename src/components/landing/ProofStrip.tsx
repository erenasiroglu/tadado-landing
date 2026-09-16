import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";
import type { Dictionary } from "@/lib/i18n";

interface ProofStripProps {
  dict: Dictionary;
}

export function ProofStrip({ dict }: ProofStripProps) {
  const items = [
    dict.proof.modes,
    dict.proof.ai,
    dict.proof.languages,
    dict.proof.offline,
    dict.proof.noAds,
  ];

  return (
    <section className="border-y border-white/8 bg-[#2a0a3b]/60 py-4">
      <SectionViewTracker sectionId="proof">
        <div className="section-shell">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-amber/90">
            {dict.proof.players}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
            {items.map((item, index) => (
              <span key={item} className="inline-flex items-center gap-3">
                {index > 0 ? <span className="proof-strip-divider hidden sm:inline-block" aria-hidden /> : null}
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-cream/80 sm:text-xs">
                  {item}
                </span>
              </span>
            ))}
          </div>
        </div>
      </SectionViewTracker>
    </section>
  );
}
