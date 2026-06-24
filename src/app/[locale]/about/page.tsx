import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Film, Sparkles, Users, Monitor } from "lucide-react"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "About" })
  return { title: t("title"), description: t("description") }
}

const journeyYears = ["1990", "1998", "2002", "2010", "2017", "2020", "2024", "2026"] as const
const featureIcons = [Film, Sparkles, Users, Monitor]
const featureKeys = ["comprehensive", "personalized", "community", "crossPlatform"] as const

export default async function AboutPage() {
  const t = await getTranslations("About")
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-brand/20 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.79_0.175_88/0.12),transparent_50%)]" />
        <div className="app-container relative">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90">
                {t("hero.cta")}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="app-container">
          <div className="grid gap-8 md:grid-cols-2">
            <AnimatedSection>
              <Card className="h-full border-border/50 shadow-sm">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground">{t("mission.heading")}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{t("mission.body")}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <Card className="h-full border-border/50 shadow-sm">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground">{t("vision.heading")}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{t("vision.body")}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="app-container">
          <AnimatedSection>
            <h2 className="text-center text-3xl font-bold text-foreground">{t("stats.heading")}</h2>
          </AnimatedSection>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(["users", "titles", "ratings", "countries"] as const).map((key, i) => (
              <AnimatedSection key={key} delay={i * 0.1}>
                <Card className="border-border/50 text-center shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="p-8">
                    <p className="text-4xl font-bold text-brand md:text-5xl">
                      {t(`stats.${key}`)}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t(`stats.${key}Label`)}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="app-container">
          <AnimatedSection>
            <h2 className="text-center text-3xl font-bold text-foreground">{t("journey.heading")}</h2>
          </AnimatedSection>
          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-border md:left-1/2 md:-translate-x-px md:block" />
            <div className="space-y-12">
              {journeyYears.map((year, i) => {
                const isLeft = i % 2 === 0
                return (
                  <AnimatedSection key={year} delay={i * 0.08}>
                    <div className={`relative flex flex-col items-start md:flex-row md:items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <div className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                        <Card className="border-border/50 inline-block shadow-sm">
                          <CardContent className="p-6">
                            <p className="text-sm text-muted-foreground">{t(`journey.${year}`)}</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="relative z-10 mx-6 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground shadow-md md:mx-0">
                        <span className="hidden md:inline">{year.slice(2)}</span>
                        <span className="md:hidden">{year}</span>
                      </div>
                      <div className="flex-1 max-md:hidden" />
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="app-container">
          <AnimatedSection>
            <h2 className="text-center text-3xl font-bold text-foreground">{t("features.heading")}</h2>
          </AnimatedSection>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featureKeys.map((key, i) => {
              const Icon = featureIcons[i]
              return (
                <AnimatedSection key={key} delay={i * 0.1}>
                  <Card className="border-border/50 h-full shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-8">
                      <div className="flex size-12 items-center justify-center rounded-lg bg-brand/10 text-brand">
                        <Icon className="size-6" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-foreground">
                        {t(`features.${key}`)}
                      </h3>
                      <p className="mt-2 text-muted-foreground leading-relaxed">
                        {t(`features.${key}Desc`)}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-brand/20 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.79_0.175_88/0.12),transparent_50%)]" />
        <div className="app-container relative">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              {t("cta.heading")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("cta.subheading")}
            </p>
            <div className="mt-8">
              <Button size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90">
                <Link href="/">{t("cta.button")}</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
