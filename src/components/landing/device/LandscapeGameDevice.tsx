import { DEFAULT_LANDSCAPE_DEVICE_WIDTH } from "@/lib/device-mockup-tokens";

import { DeviceFloat } from "./DeviceFloat";
import { DeviceMockup } from "./DeviceMockup";

interface LandscapeGameDeviceProps {
  children: React.ReactNode;
  width?: number;
  className?: string;
  float?: boolean;
  showGlow?: boolean;
  label?: string;
}

/** Landscape device for Heads Up gameplay (19.5:9 rotated). */
export function LandscapeGameDevice({
  children,
  width = DEFAULT_LANDSCAPE_DEVICE_WIDTH,
  className,
  float = false,
  showGlow = true,
  label = "Heads Up gameplay on landscape phone",
}: LandscapeGameDeviceProps) {
  const device = (
    <DeviceMockup
      orientation="landscape"
      width={width}
      showGlow={showGlow}
      label={label}
      className={className}
    >
      {children}
    </DeviceMockup>
  );

  if (!float) return device;

  return <DeviceFloat amplitude={4}>{device}</DeviceFloat>;
}
