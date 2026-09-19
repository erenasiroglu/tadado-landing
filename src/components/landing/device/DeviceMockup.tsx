import { PHONE_SHELL } from "@/lib/design-tokens";
import { getDeviceMetrics } from "@/lib/device-mockup-tokens";
import { cn } from "@/lib/utils";

import { GameScreen } from "./GameScreen";

export interface DeviceMockupProps {
  children: React.ReactNode;
  orientation?: "portrait" | "landscape";
  width?: number;
  className?: string;
  showGlow?: boolean;
  label?: string;
}

export function DeviceMockup({
  children,
  orientation = "portrait",
  width,
  className,
  showGlow = true,
  label,
}: DeviceMockupProps) {
  const isLandscape = orientation === "landscape";
  const defaultWidth = isLandscape ? 360 : 240;
  const outerWidth = width ?? defaultWidth;
  const metrics = getDeviceMetrics(outerWidth, orientation);

  return (
    <div
      className={cn("device-mockup relative mx-auto", className)}
      style={{ width: metrics.outerWidth, paddingBottom: 10 * metrics.scale }}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {showGlow ? (
        <div
          className="device-mockup__glow"
          style={{
            width: metrics.outerWidth * 0.86,
            height: metrics.outerHeight * (isLandscape ? 0.28 : 0.22),
          }}
          aria-hidden
        />
      ) : null}

      <div
        className="device-mockup__device"
        style={{
          width: metrics.outerWidth,
          height: metrics.outerHeight,
          borderRadius: metrics.outerRadius,
          padding: metrics.framePadding,
        }}
      >
        <div
          className="device-mockup__screen"
          style={{
            borderRadius: metrics.screenRadius,
            backgroundColor: PHONE_SHELL.screenBg,
          }}
        >
          <div
            className="device-mockup__edge-highlight"
            style={{ borderRadius: metrics.screenRadius }}
            aria-hidden
          />

          <GameScreen>{children}</GameScreen>

          {!isLandscape ? (
            <div
              className="device-mockup__home-indicator"
              style={{
                width: Math.max(36, 52 * metrics.scale),
                height: Math.max(3, 3 * metrics.scale),
                bottom: Math.max(6, 8 * metrics.scale),
              }}
              aria-hidden
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function useDeviceInnerWidth(outerWidth: number, orientation: "portrait" | "landscape") {
  return getDeviceMetrics(outerWidth, orientation).innerWidth;
}
