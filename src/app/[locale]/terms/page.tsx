import { getTranslations } from "next-intl/server"
import { FileText, CheckCircle, ChevronRight } from "lucide-react"
import { cn } from "@/shared/utils/utils"
import { AnimatedSection } from "@/shared/components/ui/animated-section"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Terms" })
  return { title: t("title"), description: t("description") }
}

const sectionKeys = [
  "acceptance",
  "eligibility",
  "account",
  "content",
  "conduct",
  "ip",
  "thirdParty",
  "disclaimers",
  "liability",
  "termination",
  "governing",
  "contact",
] as const

const itemSections = new Set(["conduct"])

export default async function TermsPage() {
  const t = await getTranslations("Terms")

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-brand/20 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.79_0.175_88/0.12),transparent_50%)]" />
        <div className="app-container relative">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-brand/15 shadow-glow">
              <FileText className="size-8 text-brand" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-2 text-sm font-medium text-brand">
              {t("hero.subtitle")}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
              {t("hero.description")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="app-container">
          <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-12">
            <aside className="relative max-lg:hidden">
              <nav className="sticky top-24 space-y-1">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Sections
                </p>
                {sectionKeys.map((key, i) => (
                  <a
                    key={key}
                    href={`#${key}`}
                    className={cn(
                      "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                      i === 0 && "bg-muted/50 text-foreground"
                    )}
                  >
                    <ChevronRight className="size-3 shrink-0 opacity-0 transition-all group-hover:opacity-100" />
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {t(`sidebar.${key}`)}
                    </span>
                  </a>
                ))}
              </nav>
            </aside>

            <div className="min-w-0">
              <div className="mb-8 -mx-4 overflow-x-auto px-4 lg:hidden">
                <div className="flex gap-2 pb-2">
                  {sectionKeys.map((key) => (
                    <a
                      key={key}
                      href={`#${key}`}
                      className="shrink-0 rounded-full bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-brand/10 hover:text-brand"
                    >
                      {t(`sidebar.${key}`)}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-12">
                {sectionKeys.map((key, i) => (
                  <AnimatedSection key={key} delay={i * 0.05}>
                    <section id={key}>
                      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm md:p-8">
                        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                          {t(`sections.${key}.title`)}
                        </h2>
                        {itemSections.has(key) ? (
                          <ul className="mt-4 space-y-3">
                            {(
                              t.raw(`sections.${key}.items`) as string[]
                            ).map((item: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                                <CheckCircle className="mt-0.5 size-4 shrink-0 text-brand" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-4 text-muted-foreground leading-relaxed">
                            {t(`sections.${key}.body`)}
                          </p>
                        )}
                      </div>
                    </section>
                  </AnimatedSection>
                ))}
              </div>

              <p className="mt-12 text-center text-xs text-muted-foreground">
                {t("hero.subtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
