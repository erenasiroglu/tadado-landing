/** Modern smartphone aspect: 9:19.5 portrait, 19.5:9 landscape */
export const PORTRAIT_ASPECT = 19.5 / 9;
export const LANDSCAPE_ASPECT = 9 / 19.5;

export const DEFAULT_PORTRAIT_DEVICE_WIDTH = 240;
export const DEFAULT_LANDSCAPE_DEVICE_WIDTH = 360;
export const DEFAULT_HERO_PORTRAIT_WIDTH = 228;

export interface DeviceMetrics {
  outerWidth: number;
  outerHeight: number;
  innerWidth: number;
  innerHeight: number;
  framePadding: number;
  screenRadius: number;
  outerRadius: number;
  scale: number;
}

export function getDeviceMetrics(
  outerWidth: number,
  orientation: "portrait" | "landscape",
): DeviceMetrics {
  const isLandscape = orientation === "landscape";
  const scale = outerWidth / 236;
  const outerRadius = outerWidth * (isLandscape ? 0.09 : 0.13);
  const framePadding = Math.max(3, 3 * scale);
  const screenRadius = Math.max(outerRadius - framePadding, 10 * scale);
  const outerHeight = isLandscape
    ? outerWidth * LANDSCAPE_ASPECT
    : outerWidth * PORTRAIT_ASPECT;
  const innerWidth = outerWidth - framePadding * 2;
  const innerHeight = outerHeight - framePadding * 2;

  return {
    outerWidth,
    outerHeight,
    innerWidth,
    innerHeight,
    framePadding,
    screenRadius,
    outerRadius,
    scale,
  };
}
