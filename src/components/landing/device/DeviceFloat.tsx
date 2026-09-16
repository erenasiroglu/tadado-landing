"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface DeviceFloatProps {
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
  amplitude?: number;
}

export function DeviceFloat({
  children,
  className,
  enabled = true,
  amplitude = 5,
}: DeviceFloatProps) {
  const reduceMotion = useReducedMotion();

  if (!enabled || reduceMotion) {
    return <div className={cn("mx-auto w-fit", className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("mx-auto w-fit", className)}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
