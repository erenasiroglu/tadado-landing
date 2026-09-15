"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface AnimatedPhoneShellProps {
  children: React.ReactNode;
  className?: string;
  delay?: "none" | "short" | "medium";
}

const DELAY_SECONDS = {
  none: 0,
  short: 0.6,
  medium: 1.2,
} as const;

export function AnimatedPhoneShell({
  children,
  className,
  delay = "none",
}: AnimatedPhoneShellProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={cn("mx-auto w-fit", className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("mx-auto w-fit", className)}
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: DELAY_SECONDS[delay],
      }}
    >
      {children}
    </motion.div>
  );
}
