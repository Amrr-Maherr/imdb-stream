import { getTranslations } from "next-intl/server"
import { AuthLayout } from "@/features/auth/components/auth-layout"
import { AuthProviders } from "@/features/auth/components/auth-providers"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Auth" })
  return { title: t("signIn.title") }
}

export default async function SignInPage() {
  const t = await getTranslations("Auth")

  return (
    <AuthLayout title={t("signIn.heading")}>
      <AuthProviders />
    </AuthLayout>
  )
}
