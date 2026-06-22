import { Phone, ChevronDown, ArrowLeft } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const COUNTRY_CODES = [
  { code: "US", dial: "+1", flag: "🇺🇸" },
  { code: "GB", dial: "+44", flag: "🇬🇧" },
  { code: "SA", dial: "+966", flag: "🇸🇦" },
  { code: "AE", dial: "+971", flag: "🇦🇪" },
  { code: "EG", dial: "+20", flag: "🇪🇬" },
  { code: "IN", dial: "+91", flag: "🇮🇳" },
  { code: "CA", dial: "+1", flag: "🇨🇦" },
  { code: "AU", dial: "+61", flag: "🇦🇺" },
  { code: "DE", dial: "+49", flag: "🇩🇪" },
  { code: "FR", dial: "+33", flag: "🇫🇷" },
]

export function PhoneAuth() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="auth-phone">Phone Number</Label>
        <div className="flex gap-2">
          <div className="relative shrink-0">
            <button
              type="button"
              className="flex h-9 items-center gap-1 rounded-lg border border-input bg-background px-2.5 text-sm shadow-xs transition-[color,box-shadow] outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30 dark:hover:bg-input/50"
            >
              <span className="text-base leading-none">🇺🇸</span>
              <span className="text-muted-foreground font-medium">+1</span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </button>
          </div>
          <div className="relative flex-1">
            <Input
              id="auth-phone"
              type="tel"
              placeholder="(555) 000-0000"
              className="peer ps-9"
              autoComplete="tel"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <Phone size={16} strokeWidth={2} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <Button
        type="button"
        className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold"
      >
        Send OTP
      </Button>

      <div className="space-y-3 pt-2">
        <Label className="text-center block">Enter verification code</Label>
        <div className="flex justify-center gap-2" role="group" aria-label="OTP input">
          {Array.from({ length: 6 }).map((_, i) => (
            <Input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="h-10 w-9 text-center text-base font-semibold md:h-11 md:w-10 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        <Button
          type="button"
          className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold"
        >
          Verify OTP
        </Button>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Back to phone input
        </button>
      </div>
    </div>
  )
}
