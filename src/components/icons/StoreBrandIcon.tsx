import { cn } from "@/lib/utils";

interface StoreBrandIconProps {
  platform: "ios" | "android";
  className?: string;
}

export function StoreBrandIcon({ platform, className }: StoreBrandIconProps) {
  if (platform === "android") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn("shrink-0", className)}
        aria-hidden
        fill="currentColor"
      >
        <path d="M3.18 2.77A1.5 1.5 0 0 0 2.25 4.1v15.8c0 .5.27.96.7 1.2l.23.13 8.86-8.86v-.42L3.18 2.77z" />
        <path d="M16.5 14.24 12.9 11.5l-2.64 2.64 4.74 2.74c.76.44 1.72.11 2.14-.66l.36-.68-1-.7z" />
        <path d="m10.26 9.86 2.64-2.64-4.74-2.74c-.76-.44-1.72-.11-2.14.66l-.36.68 1 .7z" />
        <path d="M16.86 8.5 12.9 11.5l3.6 2.74 2.5-1.44c.9-.52.9-1.8 0-2.32l-2.14-1.24z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("shrink-0", className)}
      aria-hidden
      fill="currentColor"
    >
      <path
        d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
      />
    </svg>
  );
}
