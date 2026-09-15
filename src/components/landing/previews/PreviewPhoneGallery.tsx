import { Children } from "react";

import { cn } from "@/lib/utils";

interface PreviewPhoneGalleryProps {
  children: React.ReactNode;
  className?: string;
  layout?: "fan" | "stack";
}

export function PreviewPhoneGallery({
  children,
  className,
  layout = "fan",
}: PreviewPhoneGalleryProps) {
  const items = Children.toArray(children);
  const isStack = layout === "stack";

  return (
    <div
      className={cn(
        "flex cursor-default select-none justify-center",
        isStack ? "flex-col items-center gap-3" : "items-end gap-1 sm:gap-3",
        className,
      )}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "pointer-events-none transition-transform",
            !isStack && "origin-bottom",
            !isStack && index === 0 && "-translate-y-1 -rotate-5 sm:-rotate-4",
            !isStack && index === 1 && "z-10 translate-y-2 rotate-5 sm:rotate-4",
            !isStack && index > 1 && "z-20",
          )}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
