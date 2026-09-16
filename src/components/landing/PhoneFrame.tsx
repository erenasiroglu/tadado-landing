import { DeviceMockup } from "@/components/landing/device/DeviceMockup";

interface PhoneFrameProps {
  children: React.ReactNode;
  orientation?: "portrait" | "landscape";
  width?: number;
  className?: string;
}

/** @deprecated Prefer PortraitGameDevice / LandscapeGameDevice directly. */
export function PhoneFrame({
  children,
  orientation = "portrait",
  width,
  className,
}: PhoneFrameProps) {
  return (
    <DeviceMockup orientation={orientation} width={width} className={className}>
      {children}
    </DeviceMockup>
  );
}
