import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"
import { SignUpForm } from "@/components/auth/sign-up-form"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Auth" })
  return { title: t("signUp.title") }
}

export default async function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-4">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="IMDb"
              width={100}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

        <SignUpForm />
      </div>
    </div>
  )
}
