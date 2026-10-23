"use client";

import { m, useReducedMotion } from "motion/react";

import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  initial?: boolean;
}

export function Stagger({ children, className, initial = false }: StaggerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={cn(className)}
      variants={staggerContainer}
      initial="hidden"
      animate={initial ? "visible" : undefined}
      whileInView={initial ? undefined : "visible"}
      viewport={initial ? undefined : { once: true, margin: "-40px" }}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div className={cn(className)} variants={fadeUp}>
      {children}
    </m.div>
  );
}
