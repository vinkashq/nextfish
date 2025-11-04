"use client";

import { Breadcrumb as BreadcrumbContainer, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useBreadcrumb } from '@/context/BreadcrumbContext'
import Link from '@/types/link'
import { useSidebar } from './ui/sidebar';
import { Home } from 'lucide-react';

export const links: Link[] = []

export default function Breadcrumb() {
  const { heading } = useBreadcrumb()
  const { isMobile } = useSidebar()

  if (!heading || isMobile) return null
  
  return (
    <BreadcrumbContainer className="w-full px-8 mt-4 hidden lg:block">
      <BreadcrumbList className="leading-8">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Home size="16" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {links.map((link) => (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={link.url}>
                {link.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ))}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-base leading-8 h-8">{heading}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbContainer>
  )
}
