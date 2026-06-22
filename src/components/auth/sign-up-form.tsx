"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Mail, User, Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { useForm, SubmitHandler } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import useRegister from "@/features/auth/hooks/useRegister"
import AuthStatusMessage from "@/features/auth/components/AuthStatusMessage"

export function SignUpForm() {
  const t = useTranslations("Auth.signUp")
  const { register: registerUser, firebaseError } = useRegister()
  const [showPassword, setShowPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  type Inputs = {
    name: string
    email: string
    password: string
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await registerUser(data)
      if (result?.user) {
        setSuccessMessage("Your account has been created successfully.")
        reset()
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="items-center text-center">
        <CardTitle>{t("heading")}</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("nameLabel")}</Label>
            <div className="relative">
              <Input
                id="name"
                type="text"
                placeholder={t("namePlaceholder")}
                className={`peer pe-9 ${errors.name ? "border-red-700" : ""}`}
                {...register("name", {
                  required: "Name is required",
                })}
              />
              <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <User size={16} strokeWidth={2} aria-hidden="true" />
              </div>
            </div>
            {errors.name?.message && (
              <AuthStatusMessage
                message={errors.name.message || null}
                type="error"
                className="mt-2 text-sm text-red-600"
              />
            )}
          </div>

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
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 hover:text-foreground transition-colors"
                aria-label={showPassword ? t("hidePassword") : t("showPassword")}
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

          {firebaseError && (
            <AuthStatusMessage
              message={firebaseError || null}
              type="error"
              className="mt-2 text-sm text-red-600"
            />
          )}
          {successMessage && (
            <AuthStatusMessage
              message={successMessage || null}
              type="success"
              className="mt-2 text-sm text-green-600"
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
            {isSubmitting ? t("creating") : t("submit")}
          </Button>

          <p className="text-sm text-muted-foreground">
            {t("hasAccount")}{" "}
            <Link
              href="/auth/signin"
              className="text-brand hover:text-brand/80 font-medium transition-colors"
            >
              {t("signIn")}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
