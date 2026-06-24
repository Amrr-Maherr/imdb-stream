import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Heart,
  Briefcase,
  TrendingUp,
  Calendar,
  Clock,
  Gift,
  ArrowRight,
} from "lucide-react"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Careers" })
  return { title: t("title") }
}

const benefitIcons = [Heart, Briefcase, TrendingUp, Calendar, Clock, Gift] as const
const benefitKeys = ["health", "equity", "growth", "flexibility", "timeoff", "perks"] as const

const processSteps = [1, 2, 3, 4, 5] as const

export default async function CareersPage() {
  const t = await getTranslations("Careers")

  const values = t.raw("culture.values") as string[]
  const positions = t.raw("positions.list") as {
    title: string
    dept: string
    loc: string
    type: string
  }[]

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
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="#positions">
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.79_0.175_88_/_0.15),transparent_70%)]" />
      </section>

      {/* Culture */}
      <section className="py-16">
        <div className="app-container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                {t("culture.heading")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {t("culture.body")}
              </p>
            </div>
            <div className="space-y-4">
              {values.map((value, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="mt-1.5 flex h-3 w-3 shrink-0 rounded-full bg-brand" />
                  <span className="text-base text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/50 py-16">
        <div className="app-container">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">
            {t("benefits.heading")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefitKeys.map((key, i) => {
              const Icon = benefitIcons[i]
              return (
                <Card key={key} className="border-border transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 text-brand">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="mt-3 text-xl">
                      {t(`benefits.${key}`)}
                    </CardTitle>
                    <CardDescription>
                      {t(`benefits.${key}Desc`)}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-16">
        <div className="app-container">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">
            {t("positions.heading")}
          </h2>

          <div className="hidden overflow-hidden rounded-xl border border-border md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    {t("positions.title")}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    {t("positions.department")}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    {t("positions.location")}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    {t("positions.type")}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                    {t("positions.apply")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {positions.map((job, i) => (
                  <tr
                    key={i}
                    className={`border-b border-border text-sm ${
                      i % 2 === 0 ? "bg-background" : "bg-muted/20"
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-foreground">
                      {job.title}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {t(`positions.${job.dept}`)}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {t(`positions.${job.loc}`)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        {t(`positions.${job.type}`)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="#">
                          {t("positions.apply")}
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 md:hidden">
            {positions.map((job, i) => (
              <Card key={i} className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <CardDescription>
                    {t(`positions.${job.dept}`)} &middot; {t(`positions.${job.loc}`)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {t(`positions.${job.type}`)}
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="#">
                      {t("positions.apply")}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="bg-muted/50 py-16">
        <div className="app-container">
          <h2 className="mb-14 text-center text-3xl font-bold text-foreground">
            {t("process.heading")}
          </h2>
          <div className="relative">
            <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2 md:block" />
            <div className="hidden items-start justify-between gap-4 md:flex">
              {processSteps.map((num) => (
                <div key={num} className="relative flex flex-1 flex-col items-center text-center">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-base font-bold text-brand-foreground shadow-md">
                    {num}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {t(`process.step${num}`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t(`process.step${num}Desc`)}
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-8 md:hidden">
              {processSteps.map((num) => (
                <div key={num} className="relative flex gap-6">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground shadow-md">
                    {num}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {t(`process.step${num}`)}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t(`process.step${num}Desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
                  <ArrowRight className="ml-2 h-4 w-4" />
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
