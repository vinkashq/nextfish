"use client"

import { useBreadcrumb } from "@/context/BreadcrumbContext"

export default function BreadcrumbHeading({ text }: { text: string }) {
  const { setHeading } = useBreadcrumb()
  setHeading(text)
  return null
}
