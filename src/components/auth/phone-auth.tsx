"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useForm, SubmitHandler } from "react-hook-form"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import usePhoneAuth from "@/features/auth/hooks/usePhoneAuth"
import AuthStatusMessage from "@/features/auth/components/AuthStatusMessage"

export function PhoneAuth() {
  const t = useTranslations("Auth.phone")
  const { step, loading, firebaseError, sendOtp, verifyOtp, reset } = usePhoneAuth()
  const [phone, setPhone] = useState<string>()
  const [success, setSuccess] = useState(false)

  type OtpInputs = {
    otp: string
  }

  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm<OtpInputs>()

  const onSendOtp = async () => {
    if (!phone) return
    await sendOtp(phone)
  }

  const onVerifyOtp: SubmitHandler<OtpInputs> = async (data) => {
    const result = await verifyOtp(data.otp)
    if (result) setSuccess(true)
  }

  if (success) {
    return (
      <div className="space-y-4">
        <AuthStatusMessage
          message={t("success")}
          type="success"
          className="text-sm text-green-600"
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div id="recaptcha-container" />

      {step === "phone" ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="auth-phone">{t("phoneLabel")}</Label>
            <PhoneInput
              international
              defaultCountry="US"
              value={phone}
              onChange={setPhone}
              className="flex [&>input]:flex-1 [&>input]:h-9 [&>input]:rounded-lg [&>input]:border [&>input]:border-input [&>input]:bg-background [&>input]:px-3 [&>input]:text-sm [&>input]:shadow-xs [&>input]:outline-none [&>input]:transition-[color,box-shadow] [&>input]:file:inline-flex [&>input]:file:border-0 [&>input]:file:bg-transparent [&>input]:file:text-sm [&>input]:file:font-medium [&>input]:placeholder:text-muted-foreground/70 [&>input]:focus-visible:border-ring [&>input]:focus-visible:ring-3 [&>input]:focus-visible:ring-ring/50"
            />
          </div>

          {firebaseError && (
            <AuthStatusMessage
              message={firebaseError || null}
              type="error"
              className="text-sm text-red-600"
            />
          )}

          <Button
            type="button"
            onClick={onSendOtp}
            disabled={loading || !phone}
            className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold"
          >
            {loading && <Loader2 className="animate-spin" />}
            {loading ? t("sendingOtp") : t("sendOtp")}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleOtpSubmit(onVerifyOtp)} className="space-y-4">
          <div className="space-y-3 pt-2">
            <Label className="text-center block">{t("otpLabel")}</Label>
            <div className="relative">
              <Input
                id="auth-otp"
                type="text"
                inputMode="numeric"
                placeholder={t("otpPlaceholder")}
                className={`text-center ${otpErrors.otp ? "border-red-700" : ""}`}
                {...registerOtp("otp", {
                  required: "Verification code is required",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "Code must be 6 digits",
                  },
                })}
              />
            </div>
            {otpErrors.otp?.message && (
              <AuthStatusMessage
                message={otpErrors.otp.message || null}
                type="error"
                className="text-sm text-red-600"
              />
            )}
          </div>

          {firebaseError && (
            <AuthStatusMessage
              message={firebaseError || null}
              type="error"
              className="text-sm text-red-600"
            />
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold"
          >
            {loading && <Loader2 className="animate-spin" />}
            {loading ? t("verifyingOtp") : t("verifyOtp")}
          </Button>

          <button
            type="button"
            disabled={loading}
            onClick={reset}
            className="flex w-full items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            <ArrowLeft size={14} />
            {t("backToPhone")}
          </button>
        </form>
      )}
    </div>
  )
}
