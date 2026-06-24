import { getTranslations } from "next-intl/server"
import { Shield, Settings, BarChart3, Megaphone, Cookie, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Props {
  params: Promise<{ locale: string }>
}

const categoryConfig = [
  { key: "essential", Icon: Shield },
  { key: "functional", Icon: Settings },
  { key: "analytics", Icon: BarChart3 },
  { key: "advertising", Icon: Megaphone },
] as const

const manageConfig = [
  { key: "browserSettings" },
  { key: "optOut" },
  { key: "impact" },
] as const

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Cookies" })
  return { title: t("title") }
}

export default async function CookiesPage() {
  const t = await getTranslations("Cookies")

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand/20 via-background to-background pb-20 pt-24">
        <div className="app-container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand">
              <Cookie className="size-4" />
              <span>{t("hero.subtitle")}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              {t("hero.description")}
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.79_0.175_88_/_0.15),transparent_70%)]" />
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="app-container">
          <div className="mx-auto max-w-5xl">
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Info className="size-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">{t("intro.heading")}</h2>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t("intro.body")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cookie Categories */}
      <section className="bg-muted/50 py-16">
        <div className="app-container">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-10 text-center text-3xl font-bold text-foreground">{t("categories.heading")}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {categoryConfig.map(({ key, Icon }) => (
                <Card
                  key={key}
                  className="group border-border/50 shadow-sm transition-all duration-300 hover:border-brand/30 hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand group-hover:bg-brand/20">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {t(`categories.${key}.name`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(`categories.${key}.desc`)}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {(t.raw(`categories.${key}.examples`) as string[]).map((example) => (
                        <li key={example} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="size-1.5 shrink-0 rounded-full bg-brand/60" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Managing Cookies */}
      <section className="py-16">
        <div className="app-container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-foreground">{t("manage.heading")}</h2>
              <p className="mt-3 text-base text-muted-foreground">{t("manage.body")}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {manageConfig.map(({ key }) => (
                <Card key={key} className="border-border/50 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground">
                      {t(`manage.${key}`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(`manage.${key}Desc`)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Third-Party Cookies */}
      <section className="bg-muted/50 py-16">
        <div className="app-container">
          <div className="mx-auto max-w-5xl">
            <Card className="border-border/50 bg-card shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Megaphone className="size-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">{t("thirdParty.heading")}</h2>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t("thirdParty.body")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Updates & Contact */}
      <section className="py-16">
        <div className="app-container">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground">{t("updates.heading")}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("updates.body")}</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground">{t("contact.heading")}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("contact.body")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
