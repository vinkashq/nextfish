import { cn } from "@/lib/utils";

export default function H1({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn("scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance", className)} {...props}>
      {children}
    </h1>
  )
}
