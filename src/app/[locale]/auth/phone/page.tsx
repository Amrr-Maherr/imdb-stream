import { getTranslations } from "next-intl/server"
import { AuthLayout } from "@/components/auth/auth-layout"
import { PhoneAuth } from "@/components/auth/phone-auth"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Auth" })
  return { title: "Phone" }
}

export default async function PhoneAuthPage() {
  return (
    <AuthLayout title="Sign in with Phone">
      <PhoneAuth />
    </AuthLayout>
  )
}
