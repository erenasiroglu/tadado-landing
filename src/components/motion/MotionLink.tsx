"use client";

import Link from "next/link";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

import { ctaInteraction } from "@/lib/motion";
import { cn } from "@/lib/utils";

const MotionNextLink = motion.create(Link);

interface MotionLinkProps extends Omit<HTMLMotionProps<"a">, "href"> {
  href: string;
}

function isInternalAppLink(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function MotionLink({ href, children, className, ...props }: MotionLinkProps) {
  const reduceMotion = useReducedMotion();
  const interaction = reduceMotion ? {} : ctaInteraction;
  const classes = cn("box-border", className);

  if (isInternalAppLink(href)) {
    return (
      <MotionNextLink href={href} className={classes} {...interaction} {...props}>
        {children}
      </MotionNextLink>
    );
  }

  return (
    <motion.a href={href} className={classes} {...interaction} {...props}>
      {children}
    </motion.a>
  );
}
