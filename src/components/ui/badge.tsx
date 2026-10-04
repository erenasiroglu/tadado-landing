import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ring has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "accent-pill text-[0.75rem] text-cream",
        secondary: "bg-paper/80 text-ink shadow-pill normal-case tracking-tight font-extrabold",
        destructive: "bg-crimson text-white normal-case tracking-tight font-extrabold",
        outline: "bg-paper/80 text-ink shadow-pill normal-case tracking-tight font-extrabold",
        ghost: "hover:bg-lilac text-ink normal-case tracking-tight font-extrabold",
        link: "text-ink underline-offset-4 hover:underline normal-case tracking-tight font-extrabold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
