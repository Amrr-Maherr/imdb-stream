"use client"

import { Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { MOCK_MIN_RATING } from "./constants"

function RatingInput() {
  return (
    <div data-slot="filter-rating-input" className="flex items-center gap-1.5">
      <Star className="size-3.5 text-amber-500" />
      <Input
        defaultValue={MOCK_MIN_RATING}
        className="h-8 w-14 text-xs"
        type="number"
        min={0}
        max={10}
        step={0.5}
        aria-label="Minimum rating"
        placeholder="0"
      />
      <span className="text-xs text-muted-foreground">+</span>
    </div>
  )
}

export { RatingInput }
