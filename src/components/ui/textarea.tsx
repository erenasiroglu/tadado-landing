import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-24 w-full rounded-lg border border-input bg-paper px-4 py-3 text-base font-medium text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-crimson md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
