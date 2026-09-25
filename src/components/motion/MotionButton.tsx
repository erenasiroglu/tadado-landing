"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

import { ctaInteraction } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function MotionButton({
  children,
  className,
  disabled,
  ...props
}: HTMLMotionProps<"button">) {
  const reduceMotion = useReducedMotion();
  const interaction = reduceMotion || disabled ? {} : ctaInteraction;

  return (
    <motion.button
      type="button"
      disabled={disabled}
      className={cn("box-border", className)}
      {...interaction}
      {...props}
    >
      {children}
    </motion.button>
  );
}
