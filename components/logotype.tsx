import { appName } from "@/lib/const";

export default function Logotype() {
  return (
    <span className="text-2xl font-semibold text-muted-foreground">{appName}</span>
  )
}