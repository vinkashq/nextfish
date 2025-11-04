import { ReactNode } from "react"

export default function PoliciesLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="p-4">
      {children}
    </div>
  )
}
