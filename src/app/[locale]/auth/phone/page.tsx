import { getTranslations } from "next-intl/server"
import { AuthLayout } from "@/features/auth/components/auth-layout"
import { PhoneAuth } from "@/features/auth/components/phone-auth"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Auth" })
  return { title: "Phone" }
}

export default async function PhoneAuthPage() {
  const t = await getTranslations("Auth.phone")
  return (
    <AuthLayout title={t("heading")}>
      <PhoneAuth />
    </AuthLayout>
  )
}
