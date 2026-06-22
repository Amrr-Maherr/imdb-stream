import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-4">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="IMDb"
              width={100}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="items-center text-center">
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">{children}</CardContent>
        </Card>
      </div>
    </div>
  )
}
