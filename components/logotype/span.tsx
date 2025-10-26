import { appName } from "@/config";

export default function LogotypeSpan({
  className,
  ...props
}: React.ComponentProps<"span"> & {
  className?: string
}) {
  return (
    <span className={className} {...props}>{appName}</span>
  )
}
