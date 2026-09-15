import { PHONE_SHELL } from "@/lib/design-tokens";
import {
  PHONE_LANDSCAPE_RATIO,
  PHONE_PORTRAIT_RATIO,
} from "@/lib/game-preview-tokens";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: React.ReactNode;
  orientation?: "portrait" | "landscape";
  width?: number;
  className?: string;
}

export function PhoneFrame({
  children,
  orientation = "portrait",
  width,
  className,
}: PhoneFrameProps) {
  const isLandscape = orientation === "landscape";
  const shellWidth = width ?? (isLandscape ? 320 : 240);
  const shellHeight = isLandscape
    ? shellWidth * PHONE_LANDSCAPE_RATIO
    : shellWidth * PHONE_PORTRAIT_RATIO;
  const scale = shellWidth / 236;
  const outerRadius = shellWidth * (isLandscape ? 0.1 : 0.14);
  const framePadding = Math.max(3, 3.5 * scale);
  const screenRadius = Math.max(outerRadius - framePadding, 12 * scale);

  return (
    <div
      className={cn("phone-mockup relative mx-auto", className)}
      style={{ width: shellWidth, paddingBottom: 12 * scale }}
    >
      <div
        className="phone-mockup__glow"
        style={{ width: shellWidth * 0.88, height: shellHeight * 0.35 }}
        aria-hidden
      />

      <div
        className="phone-mockup__device"
        style={{
          width: shellWidth,
          height: shellHeight,
          borderRadius: outerRadius,
          padding: framePadding,
        }}
      >
        <div
          className="phone-mockup__screen"
          style={{
            borderRadius: screenRadius,
            backgroundColor: PHONE_SHELL.screenBg,
          }}
        >
          {isLandscape ? (
            <div
              className="phone-mockup__island phone-mockup__island--landscape"
              style={{
                width: Math.max(7, 8 * scale),
                height: Math.max(20, 24 * scale),
                left: Math.max(7, 8 * scale),
              }}
              aria-hidden
            />
          ) : (
            <div
              className="phone-mockup__island"
              style={{
                width: Math.max(52, 58 * scale),
                height: Math.max(16, 18 * scale),
                top: Math.max(10, 12 * scale),
              }}
              aria-hidden
            />
          )}

          <div className="phone-mockup__content">{children}</div>

          {!isLandscape ? (
            <div
              className="phone-mockup__home-indicator"
              style={{
                width: Math.max(38, 56 * scale),
                height: Math.max(3, 3.5 * scale),
                bottom: Math.max(7, 9 * scale),
              }}
              aria-hidden
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
