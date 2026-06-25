"use client"

import { Star } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { RATING_OPTIONS, PARAM_KEYS } from "./constants"

function RatingSelect() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const value = searchParams.get(PARAM_KEYS.rating) ?? "any"

  function handleChange(val: string) {
    const params = new URLSearchParams(searchParams)
    if (val === "any" || val === "0") {
      params.delete(PARAM_KEYS.rating)
    } else {
      params.set(PARAM_KEYS.rating, val)
    }
    params.set(PARAM_KEYS.page, "1")
    router.push(`?${params.toString()}`)
  }

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="h-9 min-w-[8.5rem] text-xs">
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
