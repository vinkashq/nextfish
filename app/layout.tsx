import './globals.css'
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

export const metadata: Metadata = {
  title: {
    default: appName,
    template: `%s - ${appName}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex flex-col items-center justify-between min-h-dvh">
              <BreadcrumbProvider>
                <header className="flex w-full h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
                  <div className="flex items-center gap-2 px-2 md:px-4 w-full">
                    <SidebarTrigger className="size-9" mobileIcon="Menu" mobileOnly={true} />
                    <Link href="/" className="text-muted-foreground"><LogotypeSvg className="h-6" /></Link>
                    <Breadcrumb />
                    <div className='grow'></div>
                    <HeaderAccountMenu />
                  </div>
                </header>
                <div className="w-full pb-4 px-2 md:px-4">
                  {children}
                </div>
                <footer className="w-full flex gap-4 justify-between text-xs text-neutral-500 py-4 px-2 sm:px-4 md:px-6">
                  <div className="text-center lg:text-left">
                    &copy; {new Date().getFullYear()} {legalBusinessName}
                  </div>
                  <div className='flex gap-4'>
                    <Link href={privacyPolicyUrl}>Privacy</Link>
                    <Link href={termsOfServiceUrl}>Terms</Link>
                  </div>
                </footer>
              </BreadcrumbProvider>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
