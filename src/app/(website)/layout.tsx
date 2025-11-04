import Header from '@/components/header'
import Footer from "@/components/footer"

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto flex flex-col justify-between px-2 md:px-4 lg:px-6 min-h-svh">
      <Header />
      <main className="my-4 flex flex-col items-center justify-center px-2 md:px-4 lg:px-6 grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
