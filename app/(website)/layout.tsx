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
    <div className="container mx-auto flex flex-col justify-between px-2 md:px-4 lg:px-6 min-h-svh">
      <Header />
      <main className="my-4">
        {children}
      </main>
      <Footer />
    </div>
  )
}
