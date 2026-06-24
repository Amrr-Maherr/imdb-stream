import { getTranslations } from "next-intl/server"
import { FaqClient } from "./FaqClient"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Faq" })
  return { title: t("title") }
}

const categoryItems: Record<string, string[]> = {
  account: ["q1", "q2", "q3"],
  ratings: ["q4", "q5", "q6"],
  content: ["q7", "q8", "q9"],
  technical: ["q10", "q11"],
  privacy: ["q12"],
}

export default async function FaqPage() {
  const t = await getTranslations("Faq")

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
          </div>
        </div>
      </section>

      <section className="app-container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <FaqClient
            items={t.raw("items") as Record<string, { q: string; a: string }>}
            categories={{
              all: t("categories.all"),
              account: t("categories.account"),
              ratings: t("categories.ratings"),
              content: t("categories.content"),
              technical: t("categories.technical"),
              privacy: t("categories.privacy"),
            }}
            categoryItems={categoryItems}
            searchPlaceholder={t("hero.searchPlaceholder")}
          />
        </div>
      </section>
    </div>
  )
}
