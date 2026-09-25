import type { Transition, Variants } from "motion/react";

/** Shared Motion / Framer Motion tokens for the landing site */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 28,
};

export const easeOut: Transition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
};

/** Subtle hover/tap scale for primary actions (Motion / Framer-style). */
export const ctaInteraction = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: springSnappy,
};

export const cardHover = {
  whileHover: { y: -4, scale: 1.02 },
  transition: { type: "spring" as const, stiffness: 380, damping: 24 },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: easeOut },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: easeOut },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const slideUpBar: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { ...easeOut, duration: 0.35 } },
};
