"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { SORT_OPTIONS, MOCK_SORT } from "./constants"

function SortSelect() {
  const active = SORT_OPTIONS.find((o) => o.value === MOCK_SORT)
  const Icon = active?.icon ?? SORT_OPTIONS[0].icon

  return (
    <Select defaultValue={MOCK_SORT}>
      <SelectTrigger className="h-8 min-w-[8.5rem] text-xs">
        <Icon className="size-3.5 shrink-0 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((opt) => {
          const OptIcon = opt.icon
          return (
            <SelectItem key={opt.value} value={opt.value}>
              <span className="flex items-center gap-2">
                <OptIcon className="size-3.5" />
                {opt.label}
              </span>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export { SortSelect }
