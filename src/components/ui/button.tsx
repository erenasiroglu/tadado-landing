import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-extrabold tracking-tight transition duration-200 ease-pop hover:scale-[1.03] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 outline-none select-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ring [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "surface-obsidian text-cream focus-visible:outline-cream",
        outline:
          "bg-paper/80 text-ink shadow-pill hover:bg-paper aria-expanded:bg-paper",
        secondary: "bg-paper/80 text-ink shadow-pill hover:bg-paper",
        ghost: "text-ink hover:bg-lilac aria-expanded:bg-lilac",
        destructive: "bg-crimson text-white focus-visible:outline-white",
        link: "text-ink underline-offset-4 hover:underline hover:scale-100 active:scale-100",
      },
      size: {
        default: "h-12 px-7 text-base",
        xs: "h-8 gap-1 px-4 text-xs",
        sm: "h-10 px-5 text-sm",
        lg: "h-16 px-10 text-xl",
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
