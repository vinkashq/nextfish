import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { appName, appTitle } from '@/config'
import { Metadata } from 'next'
import Toaster from '@/components/toaster'

export const metadata: Metadata = {
  title: {
    default: `${appName} - ${appTitle}`,
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
      <body className="[--header-height:calc(--spacing(16))]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
