"use client";

import { Breadcrumb as BreadcrumbContainer, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useBreadcrumb } from '@/context/BreadcrumbContext'
import { appName } from '@/lib/const'
import Link from '@/types/link'

export const links: Link[] = [{
  title: appName,
  url: "/"
}]

export default function Breadcrumb() {
  const { heading } = useBreadcrumb()
  
  return (
    <BreadcrumbContainer>
      <BreadcrumbList>
        {links.map((link) => (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={link.url}>
                {link.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{heading}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbContainer>
  )
}
