"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Mail, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useForm, SubmitHandler } from "react-hook-form"

import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card"
import useForgotPassword from "@/features/auth/hooks/useForgotPassword"
import AuthStatusMessage from "@/features/auth/components/AuthStatusMessage"

export function ForgotPasswordForm() {
  const t = useTranslations("Auth.forgotPassword")
  const { forgotPassword, firebaseError } = useForgotPassword()
  const [sent, setSent] = useState(false)

  type Inputs = {
    email: string
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await forgotPassword(data)
    if (result?.success) {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <Card className="border-border/50 shadow-lg">
        <CardHeader className="items-center text-center">
          <CardTitle>{t("checkEmail")}</CardTitle>
          <CardDescription>{t("sentDescription")}</CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand/80 transition-colors"
          >
            <ArrowLeft size={16} />
            {t("backToSignIn")}
          </Link>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="items-center text-center">
        <CardTitle>{t("heading")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("emailLabel")}</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                className={`peer pe-9 ${errors.email ? "border-red-700" : ""}`}
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <Mail size={16} strokeWidth={2} aria-hidden="true" />
              </div>
            </div>
            {errors.email?.message && (
              <AuthStatusMessage
                message={errors.email.message || null}
                type="error"
                className="mt-2 text-sm text-red-600"
              />
            )}
          </div>

          {firebaseError && (
            <AuthStatusMessage
              message={firebaseError || null}
              type="error"
              className="mt-2 text-sm text-red-600"
            />
          )}
        </CardContent>

        <CardFooter className="flex-col gap-4">
          <Button
            type="submit"
            className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="animate-spin" />}
            {isSubmitting ? t("sending") : t("submit")}
          </Button>

          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            {t("backToSignIn")}
          </Link>
        </CardFooter>
      </form>
    </Card>
  )
}
