import { User } from "lucide-react"

import { Button } from "@/components/ui/button"

export function GuestAuth() {
  return (
    <Button
      type="button"
      variant="ghost"
      className="w-full gap-2 text-muted-foreground hover:text-foreground"
    >
      <User size={16} strokeWidth={2} />
      Continue as Guest
    </Button>
  )
}
