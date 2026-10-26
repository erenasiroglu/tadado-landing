import { cn } from "@/lib/utils";

interface StoreBrandIconProps {
  platform: "ios" | "android";
  className?: string;
}

export function StoreBrandIcon({ platform, className }: StoreBrandIconProps) {
  if (platform === "android") {
    // The four-colour Play triangle, so it reads as Google Play on any background.
    return (
      <svg viewBox="0 0 24 24" className={cn("shrink-0", className)} aria-hidden>
        <path fill="#00A0FF" d="M3.6 1.6 13.3 12l-9.7 10.4c-.35-.2-.6-.6-.6-1.1V2.7c0-.5.25-.9.6-1.1Z" />
        <path fill="#00D26A" d="M3.6 1.6c.35-.2.8-.2 1.25.05L16.9 8.6 13.3 12 3.6 1.6Z" />
        <path fill="#FF3A44" d="M13.3 12 16.9 15.4 4.85 22.35c-.45.25-.9.25-1.25.05L13.3 12Z" />
        <path fill="#FFC400" d="m16.9 8.6 3.55 2.05c1.05.6 1.05 2.1 0 2.7l-3.55 2.05L13.3 12l3.6-3.4Z" />
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
