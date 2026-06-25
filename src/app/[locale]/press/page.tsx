import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Press" })
  return { title: t("title") }
}

export default async function PressPage() {
  const t = await getTranslations("Press")
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
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-foreground">{t("section1.heading")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("section1.body")}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-foreground">{t("section2.heading")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("section2.body")}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-foreground">{t("section3.heading")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("section3.body")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
