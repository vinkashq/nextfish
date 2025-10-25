import { ModeToggle } from '@/components/mode-toggle'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { appName, legalBusinessName } from '@/lib/const'
import { Metadata } from 'next'
import { Separator } from '@/components/ui/separator'
import Breadcrumb from '@/components/breadcrumb'
import { BreadcrumbProvider } from '@/context/BreadcrumbContext'
import Toaster from '@/components/toaster'

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
                <header className="flex w-full h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4 w-full">
                    <SidebarTrigger className="size-9" />
                    <Separator
                      orientation="vertical"
                      className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb />
                    <div className='grow'></div>
                  </div>
                </header>
                <div className="flex flex-col gap-4 p-4 pt-0">
                  {children}
                </div>
                <footer className="w-full flex gap-4 justify-between text-xs text-neutral-500 p-4">
                  <div className="text-center lg:text-left leading-9 px-2">
                    &copy; {new Date().getFullYear()} {legalBusinessName}
                  </div>
                  <ModeToggle />
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
