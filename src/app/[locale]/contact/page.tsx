import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Card, CardContent } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { AnimatedSection } from "@/shared/components/ui/animated-section"
import { Mail, MessageCircle, Phone, Share2 } from "lucide-react"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Contact" })
  return { title: t("title"), description: t("description") }
}

export default async function ContactPage() {
  const t = await getTranslations("Contact")

  const methods = [
    { icon: Mail, key: "email" },
    { icon: MessageCircle, key: "chat" },
    { icon: Phone, key: "phone" },
    { icon: Share2, key: "social" },
  ] as const

  const categories = ["account", "technical", "content", "partnership", "press", "other"] as const

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
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="app-container">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <AnimatedSection>
                <h2 className="text-2xl font-bold text-foreground">{t("form.heading")}</h2>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <form
                  action="/api/contact"
                  method="POST"
                  className="mt-8 space-y-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("form.nameLabel")}</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder={t("form.namePlaceholder")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("form.emailLabel")}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t("form.emailPlaceholder")}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t("form.subjectLabel")}</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder={t("form.subjectPlaceholder")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">{t("form.categoryLabel")}</Label>
                      <select
                        id="category"
                        name="category"
                        className="border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 flex h-9 w-full min-w-0 rounded-lg border px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] md:text-sm"
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>
                          {t("form.categoryPlaceholder")}
                        </option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {t(`form.categories.${cat}`)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t("form.messageLabel")}</Label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder={t("form.messagePlaceholder")}
                      className="border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 flex w-full min-w-0 rounded-lg border px-3 py-2 text-base shadow-xs outline-none transition-[color,box-shadow] md:text-sm"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="bg-brand text-brand-foreground hover:bg-brand/90"
                  >
                    {t("form.submit")}
                  </Button>
                </form>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-2">
              <AnimatedSection delay={0.15}>
                <h2 className="text-2xl font-bold text-foreground">{t("methods.heading")}</h2>
              </AnimatedSection>
              <div className="mt-8 space-y-4">
                {methods.map(({ icon: Icon, key }, i) => (
                  <AnimatedSection key={key} delay={0.15 + i * 0.08}>
                    <Card className="border-border/50 shadow-sm transition-shadow hover:shadow-md">
                      <CardContent className="flex items-start gap-4 p-5">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                          <Icon className="size-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-foreground">{t(`methods.${key}`)}</p>
                          <p className="mt-0.5 text-sm text-muted-foreground">{t(`methods.${key}Desc`)}</p>
                          <p className="mt-1 text-sm font-medium text-brand">{t(`methods.${key}Value`)}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="app-container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <AnimatedSection>
                <h2 className="text-2xl font-bold text-foreground">{t("office.heading")}</h2>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <Card className="mt-8 border-border/50 shadow-sm">
                  <CardContent className="space-y-4 p-8">
                    <div>
                      <p className="text-sm text-muted-foreground">{t("office.address")}</p>
                      <p className="text-sm text-muted-foreground">{t("office.city")}</p>
                      <p className="text-sm text-muted-foreground">{t("office.country")}</p>
                    </div>
                    <div className="border-border/50 border-t pt-4">
                      <p className="text-sm font-medium text-foreground">{t("office.hours")}</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            <div>
              <AnimatedSection>
                <h2 className="text-2xl font-bold text-foreground">{t("faq.heading")}</h2>
              </AnimatedSection>
              <div className="mt-8 space-y-3">
                {([1, 2, 3, 4] as const).map((num) => (
                  <AnimatedSection key={num} delay={0.1 + num * 0.06}>
                    <details className="group border-border/50 rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
                      <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-medium text-foreground">
                        {t(`faq.q${num}`)}
                        <span className="text-muted-foreground transition-transform group-open:rotate-180">
                          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </summary>
                      <div className="border-border/50 border-t px-4 py-3 text-sm text-muted-foreground">
                        {t(`faq.a${num}`)}
                      </div>
                    </details>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
