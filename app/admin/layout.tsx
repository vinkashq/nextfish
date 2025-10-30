import AdminSidebar from "@/components/sidebar/admin"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Metadata } from 'next'
import Breadcrumb from '@/components/breadcrumb'
import { BreadcrumbProvider } from '@/context/BreadcrumbContext'
import Header from '@/components/header'
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: {
    default: "Admin console",
    template: `%s - Admin console`,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider className="flex flex-col items-center justify-between min-h-dvh">
      <Header hasSidebar={true} />
      <div className="w-full flex flex-1">
        <AdminSidebar />
        <SidebarInset className="flex flex-col items-center justify-between min-h-[calc(100svh-var(--header-height))]">
          <BreadcrumbProvider>
            <Breadcrumb />
            <div className="w-full h-full flex flex-col justify-center px-2 md:px-4">
              {children}
            </div>
            <Footer />
          </BreadcrumbProvider>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
