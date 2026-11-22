import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/** Landing UI button variants — prefer these over one-off classes. */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 box-border border-0 bg-clip-border text-center font-extrabold tracking-tight antialiased outline-none select-none transition-[transform,background-color,border-color,box-shadow,filter] duration-200 ease-pop disabled:pointer-events-none disabled:opacity-50 [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ring [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /** Primary CTA on light backgrounds */
        default:
          "rounded-full surface-obsidian text-cream shadow-md hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-cream",
        /** Primary CTA on dark / obsidian panels */
        cream:
          "rounded-full bg-cream text-ink shadow-md ring-1 ring-cream/40 hover:bg-white hover:ring-white/60 hover:scale-[1.02] active:scale-[0.98] [color:var(--ink)]",
        /** Seasonal primary (Halloween) */
        accent:
          "rounded-full bg-(--pumpkin) text-ink shadow-[0_12px_28px_rgb(242_113_28/0.28)] hover:brightness-105 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-(--pumpkin)",
        /** Bordered actions, links as buttons */
        outline:
          "rounded-lg border border-border/80 bg-background/90 text-ink shadow-sm hover:border-lilac/80 hover:bg-lilac/40 active:scale-[0.99]",
        /** Filled quiet actions */
        secondary:
          "rounded-lg bg-mist/75 text-ink shadow-sm hover:bg-lilac/50 active:scale-[0.99]",
        /** Low emphasis on light backgrounds */
        ghost:
          "rounded-lg bg-transparent text-ink hover:bg-lilac/45 active:scale-[0.99]",
        /** Secondary actions on dark / obsidian panels */
        ghostOnDark:
          "rounded-lg border border-cream/50 bg-cream/10 text-cream shadow-sm hover:border-cream/70 hover:bg-cream/20 active:scale-[0.99]",
        /** App Store / Google Play */
        store:
          "h-12 max-w-full min-w-0 rounded-full bg-cream px-4 text-sm text-ink shadow-sm hover:bg-white hover:scale-[1.02] active:scale-[0.98] sm:px-5",
        link: "rounded-lg bg-transparent px-0 text-ink underline-offset-4 hover:underline hover:scale-100 active:scale-100",
        destructive: "rounded-lg bg-crimson text-white",
      },
      size: {
        default: "h-12 px-7 text-base",
        xs: "h-8 gap-1 px-4 text-xs",
        sm: "h-10 px-5 text-sm",
        lg: "h-14 px-9 text-lg",
        icon: "size-12",
        "icon-xs": "size-8",
        "icon-sm": "size-10",
        "icon-lg": "size-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }