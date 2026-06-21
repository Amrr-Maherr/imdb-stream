import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "About" })
  return { title: t("title") }
}

export default async function AboutPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center bg-background px-4 py-16">
      <div className="w-full max-w-2xl">
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
          <CardHeader>
            <CardTitle>{t("title")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            <p>{t("content")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
