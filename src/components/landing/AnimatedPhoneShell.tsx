"use client";

import { DeviceFloat } from "@/components/landing/device/DeviceFloat";
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

/** @deprecated Prefer DeviceFloat on PortraitGameDevice / LandscapeGameDevice. */
export function AnimatedPhoneShell({
  children,
  className,
  delay = "none",
}: AnimatedPhoneShellProps) {
  return (
    <DeviceFloat className={cn(className)} enabled>
      <div style={{ animationDelay: `${DELAY_SECONDS[delay]}s` }}>{children}</div>
    </DeviceFloat>
  );
}
