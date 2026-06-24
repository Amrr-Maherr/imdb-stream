"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const badges: { label: string; variant: "brand" | "secondary" }[] = [
  { label: "Action", variant: "brand" },
  { label: "Sci-Fi", variant: "brand" },
  { label: "English", variant: "secondary" },
  { label: "2020 — 2024", variant: "secondary" },
  { label: "7+ Rating", variant: "secondary" },
  { label: "90 — 180 min", variant: "secondary" },
  { label: "Movie", variant: "secondary" },
]

function ActiveFilterBadges() {
  if (badges.length === 0) return null

  return (
    <div data-slot="filter-active-badges" className="flex flex-wrap items-center gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">Active:</span>
      {badges.map((badge) => (
        <Badge key={badge.label} variant={badge.variant} className="gap-1 pe-1">
          {badge.label}
          <button
            type="button"
            className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-black/10 dark:hover:bg-white/10"
            aria-label={`Remove ${badge.label} filter`}
          >
            <X className="size-2.5" />
          </button>
        </Badge>
      ))}
    </div>
  )
}

export { ActiveFilterBadges }
