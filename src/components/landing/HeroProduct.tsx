"use client";

import type { Dictionary } from "@/lib/i18n";

import { HeroLaunchVideo } from "./HeroLaunchVideo";

interface HeroProductProps {
  a11y: Dictionary["a11y"];
}

export function HeroProduct({ a11y }: HeroProductProps) {
  return <HeroLaunchVideo a11y={a11y} />;
}
