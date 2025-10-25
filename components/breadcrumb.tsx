"use client";

import { Breadcrumb as BreadcrumbContainer, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useBreadcrumb } from '@/context/BreadcrumbContext'
import Link from '@/types/link'
import { useSidebar } from './ui/sidebar';

export const links: Link[] = []

export default function Breadcrumb() {
  const { heading } = useBreadcrumb()
  const { isMobile } = useSidebar()
  
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
        {heading && !isMobile && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-base leading-8 h-8 mt-0.5">{heading}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </BreadcrumbContainer>
  )
}
