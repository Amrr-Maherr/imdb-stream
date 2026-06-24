import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, User, CreditCard, Shield, Wrench, Star, Compass, ThumbsUp, Tv, Lock } from "lucide-react"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "HelpCenter" })
  return { title: t("title") }
}

const popularIcons: Record<string, typeof User> = {
  account: User,
  billing: CreditCard,
  privacy: Shield,
  troubleshooting: Wrench,
  ratings: Star,
  content: Search,
}

const popularKeys = ["account", "billing", "privacy", "troubleshooting", "ratings", "content"] as const

const categoryIcons: Record<string, typeof Compass> = {
  gettingStarted: Compass,
  accountBilling: CreditCard,
  ratingsReviews: Star,
  contentDiscovery: Search,
  technical: Wrench,
  privacySecurity: Shield,
}

const categoryKeys = [
  "gettingStarted",
  "accountBilling",
  "ratingsReviews",
  "contentDiscovery",
  "technical",
  "privacySecurity",
] as const

export default async function HelpCenterPage() {
  const t = await getTranslations("HelpCenter")

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-gradient-to-b from-brand/10 via-brand/5 to-background py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.79_0.175_88/0.15),transparent_70%)]" />
        <div className="app-container relative">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("hero.subtitle")}
            </p>
            <div className="relative mx-auto mt-8 max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t("hero.searchPlaceholder")}
                className="pl-10"
                aria-label={t("hero.searchPlaceholder")}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="app-container py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {t("popular.heading")}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {popularKeys.map((key) => {
              const Icon = popularIcons[key]
              return (
                <Card key={key} className="group border-border/50 shadow-sm transition-all hover:shadow-md hover:border-brand/30">
                  <CardContent className="flex items-start gap-4 p-5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-foreground">
                        {t(`popular.${key}`)}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {t(`popular.${key}Desc`)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 border-y border-border/50">
        <div className="app-container py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {t("categories.heading")}
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categoryKeys.map((key) => {
                const Icon = categoryIcons[key]
                return (
                  <Card key={key} className="group border-border/50 shadow-sm transition-all hover:shadow-md hover:border-brand/30">
                    <CardContent className="p-6">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                        <Icon className="size-6" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-foreground">
                        {t(`categories.${key}`)}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {t(`categories.${key}Desc`)}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="app-container py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {t("cta.heading")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t("cta.subheading")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90" asChild>
              <Link href="/contact">
                <User className="size-4" />
                {t("cta.contactButton")}
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/faq">
                {t("cta.faqButton")}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
