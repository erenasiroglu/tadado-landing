import type { Dictionary } from "@/lib/i18n";

import { LandingSection } from "./LandingSection";

interface ProductBenefitsProps {
  dict: Dictionary;
}

export function ProductBenefits({ dict }: ProductBenefitsProps) {
  return (
    <LandingSection id="product-benefits" analyticsSection="product_benefits" density="compact" reveal>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber/85">
          {dict.productBenefits.eyebrow}
        </p>
        <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-cream sm:text-4xl">
          {dict.productBenefits.title}
        </h2>
        <p className="mt-4 text-lg text-cream/75">{dict.productBenefits.statement}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {dict.productBenefits.details.map((detail) => (
            <span key={detail} className="detail-chip">
              {detail}
            </span>
          ))}
        </div>
      </div>
    </LandingSection>
  );
}
