import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const spinnerVariants = cva(
  "size-4 animate-spin",
  {
    variants: {
      variant: {
        default: "",
        visibleOnDisabled:
          "hidden aria-disabled:block",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Spinner({
  className,
  variant,
  ...props
}: React.ComponentProps<"svg"> &
  VariantProps<typeof spinnerVariants>) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn(spinnerVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Spinner }
