import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card"
import { Check, X } from "lucide-react"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Subscription" })
  return { title: t("title") }
}

const comparisonFeatures = [
  "browsing",
  "ratings",
  "watchlist",
  "adFree",
  "aiRecommendations",
  "earlyAccess",
  "prioritySupport",
  "apiAccess",
  "analytics",
  "teamFeatures",
] as const

const featureMatrix: Record<string, Record<string, boolean>> = {
  free: {
    browsing: true,
    ratings: true,
    watchlist: true,
    adFree: false,
    aiRecommendations: false,
    earlyAccess: false,
    prioritySupport: false,
    apiAccess: false,
    analytics: false,
    teamFeatures: false,
  },
  pro: {
    browsing: true,
    ratings: true,
    watchlist: true,
    adFree: true,
    aiRecommendations: true,
    earlyAccess: true,
    prioritySupport: true,
    apiAccess: false,
    analytics: false,
    teamFeatures: false,
  },
  enterprise: {
    browsing: true,
    ratings: true,
    watchlist: true,
    adFree: true,
    aiRecommendations: true,
    earlyAccess: true,
    prioritySupport: true,
    apiAccess: true,
    analytics: true,
    teamFeatures: true,
  },
}

export default async function SubscriptionPage() {
  const t = await getTranslations("Subscription")

  const plans = ["free", "pro", "enterprise"] as const

  const planFeatures = plans.map((key) => ({
    key,
    name: t(`plans.${key}.name`),
    price: t(`plans.${key}.price`),
    period: t(`plans.${key}.period`),
    description: t(`plans.${key}.description`),
    features: t.raw(`plans.${key}.features`) as string[],
    cta: t(`plans.${key}.cta`),
    popular: key === "pro",
  }))

  const faqs = [1, 2, 3, 4, 5] as const

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand/20 via-background to-background pb-20 pt-24">
        <div className="app-container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className={`text-sm font-medium ${true ? "text-foreground" : "text-muted-foreground"}`}>
                {t("hero.toggle")}
              </span>
              <div className="flex h-8 w-14 items-center rounded-full border border-border bg-muted p-1">
                <div className="h-6 w-6 rounded-full bg-brand shadow-sm" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {t("hero.toggleAnnual")}
              </span>
              <span className="rounded-full bg-brand/20 px-2.5 py-0.5 text-xs font-semibold text-brand">
                {t("hero.saveText")}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.79_0.175_88_/_0.15),transparent_70%)]" />
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="app-container">
          <div className="grid gap-8 md:grid-cols-3">
            {planFeatures.map((plan) => (
              <Card
                key={plan.key}
                className={`relative flex flex-col border ${
                  plan.popular
                    ? "border-brand/50 shadow-glow ring-1 ring-brand/30"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block rounded-full bg-brand px-4 py-1 text-xs font-bold text-brand-foreground">
                      {t("plans.pro.popular")}
                    </span>
                  </div>
                )}
                <CardHeader className={plan.popular ? "pt-8" : ""}>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-6">
                  <ul className="flex-1 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <Link href="#">
                      {plan.cta}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="bg-muted/50 py-16">
        <div className="app-container">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">
            {t("comparison.heading")}
          </h2>

          <div className="hidden overflow-hidden rounded-xl border border-border md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    {t("comparison.feature")}
                  </th>
                  {plans.map((key) => (
                    <th key={key} className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                      {t(`comparison.${key}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <tr
                    key={feature}
                    className={`border-b border-border text-sm ${
                      i % 2 === 0 ? "bg-background" : "bg-muted/20"
                    }`}
                  >
                    <td className="px-6 py-4 text-foreground">
                      {t(`comparison.rows.${feature}`)}
                    </td>
                    {plans.map((key) => {
                      const isAvailable = featureMatrix[key]?.[feature] ?? false
                      return (
                        <td key={key} className="px-6 py-4 text-center">
                          {isAvailable ? (
                            <Check className="mx-auto h-5 w-5 text-brand" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-muted-foreground/50" />
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 md:hidden">
            {plans.map((key) => (
              <Card key={key} className="border-border">
                <CardHeader>
                  <CardTitle className="text-xl">{t(`comparison.${key}`)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {comparisonFeatures.map((feature) => {
                      const isAvailable = featureMatrix[key]?.[feature] ?? false
                      return (
                        <li key={feature} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {t(`comparison.rows.${feature}`)}
                          </span>
                          {isAvailable ? (
                            <Check className="h-4 w-4 text-brand" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground/50" />
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="app-container">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">
            {t("faq.heading")}
          </h2>
          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((num) => (
              <details
                key={num}
                className="group rounded-xl border border-border bg-card transition-colors open:border-brand/30"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-base font-medium text-foreground">
                  {t(`faq.q${num}.q`)}
                  <span className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="border-t border-border px-6 py-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(`faq.q${num}.a`)}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-brand/20 via-brand/10 to-background py-20">
        <div className="app-container relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              {t("cta.heading")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("cta.subheading")}
            </p>
            <div className="mt-8">
              <Button size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90" asChild>
                <Link href="#">
                  {t("cta.button")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,oklch(0.79_0.175_88_/_0.12),transparent_60%)]" />
      </section>
    </div>
  )
}
