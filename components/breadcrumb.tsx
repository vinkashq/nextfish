"use client";

import { Breadcrumb as BreadcrumbContainer, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useBreadcrumb } from '@/context/BreadcrumbContext'
import Link from '@/types/link'

export const links: Link[] = []

export default function Breadcrumb() {
  const { heading } = useBreadcrumb()
  
  return (
    <BreadcrumbContainer>
      <BreadcrumbList className="leading-8">
        {links.map((link) => (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={link.url}>
                {link.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ))}
        {heading && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-base leading-8 h-8 mt-0.5">{heading}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </BreadcrumbContainer>
  )
}
