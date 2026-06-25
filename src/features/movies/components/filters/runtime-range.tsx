"use client"

import { Clock } from "lucide-react"
import { Input } from "@/shared/components/ui/input"
import { MOCK_RUNTIME_MIN, MOCK_RUNTIME_MAX } from "./constants"

function RuntimeRange() {
  return (
    <div data-slot="filter-runtime-range" className="flex items-center gap-1.5">
      <Clock className="size-3.5 shrink-0 text-muted-foreground" />
      <Input
        defaultValue={MOCK_RUNTIME_MIN}
        className="h-8 w-14 text-xs"
        type="number"
        min={0}
        max={500}
        aria-label="Runtime min"
        placeholder="Min"
      />
      <span className="text-xs text-muted-foreground">—</span>
      <Input
        defaultValue={MOCK_RUNTIME_MAX}
        className="h-8 w-14 text-xs"
        type="number"
        min={0}
        max={500}
        aria-label="Runtime max"
        placeholder="Max"
      />
      <span className="text-xs text-muted-foreground">min</span>
    </div>
  )
}

export { RuntimeRange }
