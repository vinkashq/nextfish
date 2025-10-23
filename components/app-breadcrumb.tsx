import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Link from '@/types/link'

export const links: Link[] = [{
  title: "Vinkas",
  url: "https://vinkas.com"
}, {
  title: "NextFish",
  url: "/"
}]

export default function AppBreadcrumb() {
  return (
    <Breadcrumb>
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
          <BreadcrumbPage>Dashboard</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
