"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Lock, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"

import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card"
import useResetPassword from "@/features/auth/hooks/useResetPassword"
import AuthStatusMessage from "@/features/auth/components/AuthStatusMessage"

export function ResetPasswordForm() {
  const t = useTranslations("Auth.resetPassword")
  const { resetPassword, firebaseError } = useResetPassword()
  const searchParams = useSearchParams()
  const oobCode = searchParams.get("oobCode")
  const [showPassword, setShowPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  type Inputs = {
    password: string
    confirmPassword: string
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const password = watch("password")

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!oobCode) return

    const result = await resetPassword({
      oobCode,
      newPassword: data.password,
    })

    if (result?.success) {
      setSuccessMessage(t("success"))
    }
  }

  if (!oobCode) {
    return (
      <Card className="border-border/50 shadow-lg">
        <CardHeader className="items-center text-center">
          <CardTitle>{t("heading")}</CardTitle>
          <CardDescription>{t("invalidLink")}</CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link
            href="/auth/forgot-password"
            className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand/80 transition-colors"
          >
            <ArrowLeft size={16} />
            {t("backToSignIn")}
          </Link>
        </CardFooter>
      </Card>
    )
  }

  if (successMessage) {
    return (
      <Card className="border-border/50 shadow-lg">
        <CardHeader className="items-center text-center">
          <CardTitle>{t("success")}</CardTitle>
          <CardDescription>{t("backToSignIn")}</CardDescription>
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
            <Label htmlFor="password">{t("passwordLabel")}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("passwordPlaceholder")}
                className={`peer pe-9 ${errors.password ? "border-red-700" : ""}`}
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Eye size={16} strokeWidth={2} aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.password?.message && (
              <AuthStatusMessage
                message={errors.password.message || null}
                type="error"
                className="mt-2 text-sm text-red-600"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("confirmLabel")}</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder={t("confirmPlaceholder")}
                className={`peer pe-9 ${errors.confirmPassword ? "border-red-700" : ""}`}
                autoComplete="new-password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <Lock size={16} strokeWidth={2} aria-hidden="true" />
              </div>
            </div>
            {errors.confirmPassword?.message && (
              <AuthStatusMessage
                message={errors.confirmPassword.message || null}
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
            {isSubmitting ? t("resetting") : t("submit")}
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
