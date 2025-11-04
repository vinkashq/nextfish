"use client"

import { useBreadcrumb } from "@/context/BreadcrumbContext"
import { useEffect } from "react"

export default function BreadcrumbHeading({ text }: { text: string }) {
  const { setHeading } = useBreadcrumb()

  useEffect(() => {
    setHeading(text)
  }, [text, setHeading])

  return null
}
