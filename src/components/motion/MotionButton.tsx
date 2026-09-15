"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

import { ctaInteraction } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function MotionButton({ children, className, ...props }: HTMLMotionProps<"button">) {
  const reduceMotion = useReducedMotion();
  const interaction = reduceMotion ? {} : ctaInteraction;

  return (
    <motion.button
      type="button"
      className={cn("box-border", className)}
      {...interaction}
      {...props}
    >
      {children}
    </motion.button>
  );
}
