"use client"

import { Calendar } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { MOCK_YEAR } from "./constants"

function YearSelect() {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => String(currentYear - i))

  return (
    <Select defaultValue={MOCK_YEAR}>
      <SelectTrigger className="h-8 min-w-[8rem] text-xs">
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
