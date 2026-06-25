"use client"

import { Input } from "@/shared/components/ui/input"
import { MOCK_YEAR_FROM, MOCK_YEAR_TO } from "./constants"

function YearRange() {
  return (
    <div data-slot="filter-year-range" className="flex items-center gap-1.5">
      <Input
        defaultValue={MOCK_YEAR_FROM}
        className="h-8 w-[4.5rem] text-xs"
        type="number"
        min={1900}
        max={2030}
        aria-label="Year from"
        placeholder="From"
      />
      <span className="text-xs text-muted-foreground">—</span>
      <Input
        defaultValue={MOCK_YEAR_TO}
        className="h-8 w-[4.5rem] text-xs"
        type="number"
        min={1900}
        max={2030}
        aria-label="Year to"
        placeholder="To"
      />
    </div>
  )
}

export { YearRange }
