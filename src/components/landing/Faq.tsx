import { Mail } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BRAND } from "@/lib/brand";
import type { Dictionary } from "@/lib/i18n";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface FaqProps {
  dict: Dictionary;
}

export function Faq({ dict }: FaqProps) {
  return (
    <LandingSection id="faq" tone="contrast" reveal>
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
        <div className="lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
          <SectionHeading
            title={dict.faq.title}
            subtitle={dict.faq.subtitle}
            align="left"
          />
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm font-semibold text-cream">{dict.footer.support}</p>
            <a
              href={`mailto:${BRAND.supportEmail}`}
              className="mt-2 inline-flex items-center gap-2 text-sm text-lavender transition-colors hover:text-amber"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              {BRAND.supportEmail}
            </a>
          </div>
        </div>

        <Accordion className="lg:col-span-3 grid gap-3">
          {dict.faq.items.map((item, index) => (
            <AccordionItem
              key={item.q}
              value={`item-${index}`}
              className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] px-5 shadow-sm shadow-black/10 transition-colors hover:border-white/15 border-b-0"
            >
              <AccordionTrigger
                className="py-4 text-left text-[15px] font-semibold leading-snug text-cream hover:text-amber hover:no-underline sm:text-base"
              >
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-cream/75 sm:text-[15px]">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </LandingSection>
  );
}
