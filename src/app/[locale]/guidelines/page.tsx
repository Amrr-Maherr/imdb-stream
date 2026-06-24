import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Heart,
  MessageSquare,
  Eye,
  FileText,
  CheckCircle,
  Flag,
  Lightbulb,
  BookOpen,
  AlignLeft,
  Users,
  Lock,
  ArrowRight,
} from "lucide-react"

interface Props {
  params: Promise<{ locale: string }>
}

const ruleConfig = [
  { key: "beRespectful", Icon: Heart },
  { key: "stayRelevant", Icon: MessageSquare },
  { key: "noSpoilers", Icon: Eye },
  { key: "originalContent", Icon: FileText },
  { key: "accurateInfo", Icon: CheckCircle },
  { key: "reportIssues", Icon: Flag },
] as const

const bestPracticeConfig = [
  { key: "constructive", Icon: Lightbulb },
  { key: "citeSources", Icon: BookOpen },
  { key: "useFormatting", Icon: AlignLeft },
  { key: "beInclusive", Icon: Users },
  { key: "respectPrivacy", Icon: Lock },
] as const

const enforcementConfig = [
  { key: "warning", color: "border-l-amber-500", bg: "bg-amber-500/10" },
  { key: "removal", color: "border-l-orange-500", bg: "bg-orange-500/10" },
  { key: "suspension", color: "border-l-red-500", bg: "bg-red-500/10" },
  { key: "permanent", color: "border-l-red-700", bg: "bg-red-700/10" },
] as const

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Guidelines" })
  return { title: t("title") }
}

export default async function GuidelinesPage() {
  const t = await getTranslations("Guidelines")

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
            <div className="mx-auto mt-6 max-w-2xl text-sm text-muted-foreground">
              {t("hero.description")}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.79_0.175_88_/_0.15),transparent_70%)]" />
      </section>

      {/* Community Rules */}
      <section className="py-16">
        <div className="app-container">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">
            {t("rules.heading")}
          </h2>
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ruleConfig.map(({ key, Icon }) => (
              <Card
                key={key}
                className="group border-border/50 shadow-sm transition-all duration-300 hover:border-brand/30 hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand group-hover:bg-brand/20">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(`rules.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`rules.${key}.desc`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-muted/50 py-16">
        <div className="app-container">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">
            {t("bestPractices.heading")}
          </h2>
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bestPracticeConfig.map(({ key, Icon }) => (
              <Card
                key={key}
                className="border-border/50 shadow-sm transition-all duration-300 hover:shadow-md lg:first:col-span-2 lg:first:row-span-1"
              >
                <CardContent className="p-6">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {t(`bestPractices.${key}`)}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {t(`bestPractices.${key}Desc`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Moderation & Enforcement */}
      <section className="py-16">
        <div className="app-container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-foreground">
                {t("moderation.heading")}
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                {t("moderation.body")}
              </p>
            </div>
            <h3 className="mb-6 text-xl font-semibold text-foreground">
              {t("moderation.actions.heading")}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {enforcementConfig.map(({ key, color, bg }) => {
                const full = t(`moderation.actions.${key}`)
                const colonIndex = full.indexOf(":")
                const title = colonIndex !== -1 ? full.slice(0, colonIndex) : full
                const desc = colonIndex !== -1 ? full.slice(colonIndex + 1).trim() : ""
                return (
                  <Card key={key} className={`border-border/50 border-l-4 shadow-sm ${color}`}>
                    <CardContent className="p-5">
                      <div className="mb-2 flex items-center gap-2">
                        <span className={`inline-block size-2 rounded-full ${bg}`} />
                        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <div className="mt-8 rounded-xl border border-border/50 bg-muted/30 p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("moderation.appeal")}
              </p>
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
              <Button
                size="lg"
                className="bg-brand text-brand-foreground hover:bg-brand/90"
                asChild
              >
                <Link href="#">
                  {t("cta.button")}
                  <ArrowRight className="ml-2 size-4" />
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
