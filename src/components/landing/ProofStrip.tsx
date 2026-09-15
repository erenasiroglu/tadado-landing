"use client";

import { Bot, Gamepad2, Gift, Languages, Users } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { Dictionary } from "@/lib/i18n";

interface ProofStripProps {
  dict: Dictionary;
}

export function ProofStrip({ dict }: ProofStripProps) {
  const items = [
    { icon: Users, label: dict.proof.players },
    { icon: Gamepad2, label: dict.proof.modes },
    { icon: Bot, label: dict.proof.ai },
    { icon: Languages, label: dict.proof.languages },
    { icon: Gift, label: dict.proof.free },
  ];

  return (
    <section className="bg-[#1c1129] py-6">
      <Stagger
        initial
        className="section-shell flex flex-wrap items-center justify-center gap-6"
      >
        {items.map((item) => (
          <StaggerItem key={item.label}>
            <div className="glass-surface flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-cream">
              <item.icon className="h-4 w-4 text-amber" />
              <span>{item.label}</span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
