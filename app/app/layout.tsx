import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { appName, legalBusinessName, privacyPolicyUrl, termsOfServiceUrl } from '@/config'
import { Metadata } from 'next'
import Breadcrumb from '@/components/breadcrumb'
import { BreadcrumbProvider } from '@/context/BreadcrumbContext'
import Toaster from '@/components/toaster'
import Link from 'next/link'
import LogotypeSvg from '@/components/logotype/svg'
import HeaderAccountMenu from '@/components/header/account-menu'
import Header from '@/components/header'
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: {
    default: appName,
    template: `%s - ${appName}`,
  },
};

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider className="flex flex-col items-center justify-between min-h-dvh">
      <Header />
      <div className="w-full flex flex-1">
        <AppSidebar />
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
