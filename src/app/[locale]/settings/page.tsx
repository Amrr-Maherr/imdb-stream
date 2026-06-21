import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Lock, Bell, Globe, Monitor } from "lucide-react"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Settings" })
  return { title: t("title") }
}

const sections = [
  { key: "account", icon: User },
  { key: "privacy", icon: Lock },
  { key: "notifications", icon: Bell },
  { key: "language", icon: Globe },
  { key: "appearance", icon: Monitor },
] as const

export default async function SettingsPage() {
  const t = await getTranslations("Settings")

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center bg-background px-4 py-16">
      <div className="w-full max-w-lg">
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
          </CardHeader>
          <CardContent className="space-y-3">
            {sections.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <Icon className="size-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{t(`sections.${key}`)}</p>
                  <p className="text-xs text-muted-foreground">{t(`sections.${key}Desc`)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
