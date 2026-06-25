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
  const active = SORT_OPTIONS.find((o) => o.label === MOCK_SORT)
  const Icon = active?.icon ?? SORT_OPTIONS[0].icon

  return (
    <Select defaultValue="popularity">
      <SelectTrigger className="h-8 w-36 text-xs">
        <Icon className="size-3.5 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((opt) => {
          const OptIcon = opt.icon
          return (
            <SelectItem key={opt.value} value={opt.value}>
              <OptIcon className="size-3.5" />
              {opt.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export { SortSelect }
