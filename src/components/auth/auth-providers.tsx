import { Phone } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { EmailPasswordAuth } from "./email-password-auth"
import { GoogleAuth } from "./google-auth"
import { GuestAuth } from "./guest-auth"
import { AuthDivider } from "./auth-divider"

export function AuthProviders() {
  return (
    <div className="space-y-4">
      <EmailPasswordAuth />

      <AuthDivider />

      <GoogleAuth />

      <AuthDivider />

      <Link href="/auth/phone" className="block">
        <Button
          type="button"
          variant="outline"
          className="w-full gap-2"
        >
          <Phone size={16} strokeWidth={2} />
          Continue with Phone
        </Button>
      </Link>

      <AuthDivider />

      <GuestAuth />
    </div>
  )
}
