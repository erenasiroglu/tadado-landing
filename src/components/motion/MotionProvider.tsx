"use client";

import { LazyMotion } from "motion/react";

// Animation features are fetched after hydration, keeping them out of the initial bundle.
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
