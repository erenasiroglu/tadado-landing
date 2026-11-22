import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** @deprecated Use `buttonVariants({ variant: "default" })` */
export function ctaGradientClass(className?: string) {
  return buttonVariants({ variant: "default", className });
}

/** @deprecated Use `buttonVariants({ variant: "secondary" })` */
export function ctaAmberClass(className?: string) {
  return buttonVariants({ variant: "secondary", className });
}

/** @deprecated Use `buttonVariants({ variant: "store" })` */
export function storeBadgeClass(className?: string) {
  return buttonVariants({ variant: "store", className });
}

/** @deprecated Use `buttonVariants({ variant: "default", size: "sm" })` */
export function primarySolidClass(className?: string) {
  return buttonVariants({ variant: "default", size: "sm", className });
}

export function ctaPrimaryClass(className?: string) {
  return buttonVariants({ variant: "default", className });
}

export function ctaCreamClass(className?: string) {
  return buttonVariants({ variant: "cream", className });
}