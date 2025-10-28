import Footer from "@/components/footer";
import Logomark from "@/components/logomark";
import LogotypeSvg from "@/components/logotype/svg";
import { Card, CardContent } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="bg-muted-foreground relative hidden md:flex flex-col justify-end items-start">
                <div className="flex gap-2 text-muted m-6">
                  <Logomark className="h-6" />
                  <LogotypeSvg className="h-6" />
                </div>
              </div>
              <main className="p-6 md:p-8 flex flex-col gap-6 justify-between">
                <div className="flex gap-2 justify-center text-muted-foreground md:hidden">
                  <Logomark className="h-6" />
                  <LogotypeSvg className="h-6" />
                </div>
                {children}
              </main>
            </CardContent>
          </Card>
          <Footer />
        </div>
      </div>
    </div>
  )
}
