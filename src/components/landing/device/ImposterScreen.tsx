import { ImposterPreview } from "@/components/landing/previews/ImposterPreview";
import { DEFAULT_PORTRAIT_DEVICE_WIDTH, getDeviceMetrics } from "@/lib/device-mockup-tokens";
import type { GamePreviewLabels } from "@/lib/game-preview-tokens";

import { PortraitGameDevice } from "./PortraitGameDevice";

interface ImposterScreenProps {
  labels: GamePreviewLabels;
  width?: number;
  float?: boolean;
  showGlow?: boolean;
  className?: string;
}

export function ImposterScreen({
  labels,
  width = DEFAULT_PORTRAIT_DEVICE_WIDTH,
  float = false,
  showGlow = true,
  className,
}: ImposterScreenProps) {
  const metrics = getDeviceMetrics(width, "portrait");

  return (
    <PortraitGameDevice
      width={width}
      float={float}
      showGlow={showGlow}
      label={labels.imposterTitle}
      className={className}
    >
      <ImposterPreview shellWidth={metrics.innerWidth} labels={labels} />
    </PortraitGameDevice>
  );
}
