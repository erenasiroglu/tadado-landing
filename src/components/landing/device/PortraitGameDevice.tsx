import { DEFAULT_PORTRAIT_DEVICE_WIDTH } from "@/lib/device-mockup-tokens";

import { DeviceFloat } from "./DeviceFloat";
import { DeviceMockup } from "./DeviceMockup";

interface PortraitGameDeviceProps {
  children: React.ReactNode;
  width?: number;
  className?: string;
  float?: boolean;
  showGlow?: boolean;
  label?: string;
}

/** Portrait device for Forbidden Words / Taboo gameplay (9:19.5). */
export function PortraitGameDevice({
  children,
  width = DEFAULT_PORTRAIT_DEVICE_WIDTH,
  className,
  float = false,
  showGlow = true,
  label = "Forbidden Words gameplay on portrait phone",
}: PortraitGameDeviceProps) {
  const device = (
    <DeviceMockup
      orientation="portrait"
      width={width}
      showGlow={showGlow}
      label={label}
      className={className}
    >
      {children}
    </DeviceMockup>
  );

  if (!float) return device;

  return <DeviceFloat>{device}</DeviceFloat>;
}
