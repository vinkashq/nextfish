import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { appName, appTitle } from '@/config'
import { Metadata } from 'next'
import Toaster from '@/components/toaster'
import { FirebaseProvider } from '@/context/firebase/Context'
import { CurrentUserProvider } from '@/context/CurrentUserContext'
import { firebaseOptions } from '@/firebase'

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
          <FirebaseProvider options={firebaseOptions}>
            <CurrentUserProvider>
              {children}
            </CurrentUserProvider>
          </FirebaseProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
