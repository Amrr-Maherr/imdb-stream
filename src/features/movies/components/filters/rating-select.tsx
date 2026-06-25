"use client"

import { Star } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { RATING_OPTIONS, MOCK_RATING } from "./constants"

function RatingSelect() {
  return (
    <Select defaultValue={MOCK_RATING}>
      <SelectTrigger className="h-8 min-w-[7.5rem] text-xs">
        <Star className="size-3.5 shrink-0 text-amber-500" />
        <SelectValue placeholder="Rating" />
      </SelectTrigger>
      <SelectContent>
        {RATING_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { RatingSelect }
