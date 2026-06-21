"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function SignInForm() {
  const t = useTranslations("Auth.signIn")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="items-center text-center">
        <CardTitle>{t("heading")}</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("emailLabel")}</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                className="peer pe-9"
                required
              />
              <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <Mail size={16} strokeWidth={2} aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("passwordLabel")}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("passwordPlaceholder")}
                className="peer pe-9"
                required
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
          </div>

          <div className="text-right">
            <Link
              href="/auth/signin"
              className="text-sm text-brand hover:text-brand/80 transition-colors"
            >
              {t("forgotPassword")}
            </Link>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-4">
          <Button
            type="submit"
            className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold"
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin" />}
            {loading ? t("signingIn") : t("submit")}
          </Button>

          <p className="text-sm text-muted-foreground">
            {t("noAccount")}{" "}
            <Link
              href="/auth/signup"
              className="text-brand hover:text-brand/80 font-medium transition-colors"
            >
              {t("createAccount")}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
