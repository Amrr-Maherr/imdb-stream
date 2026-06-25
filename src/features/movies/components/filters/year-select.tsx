"use client"

import { Calendar } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { PARAM_KEYS } from "./constants"

function YearSelect() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const value = searchParams.get(PARAM_KEYS.year) ?? "any"
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => String(currentYear - i))

  function handleChange(val: string) {
    const params = new URLSearchParams(searchParams)
    if (val === "any") {
      params.delete(PARAM_KEYS.year)
    } else {
      params.set(PARAM_KEYS.year, val)
    }
    params.set(PARAM_KEYS.page, "1")
    router.push(`?${params.toString()}`)
  }

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="h-9 min-w-[8.5rem] text-xs">
        <Calendar className="size-3.5 shrink-0 text-muted-foreground" />
        <SelectValue placeholder="Year" />
      </SelectTrigger>
      <SelectContent className="max-h-60">
        <SelectItem value="any">All Years</SelectItem>
        {years.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { YearSelect }
