"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { SORT_OPTIONS, PARAM_KEYS } from "./constants"

function SortSelect() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const value = searchParams.get(PARAM_KEYS.sort) ?? "popularity.desc"
  const active = SORT_OPTIONS.find((o) => o.value === value)
  const Icon = active?.icon ?? SORT_OPTIONS[0].icon

  function handleChange(val: string) {
    const params = new URLSearchParams(searchParams)
    params.set(PARAM_KEYS.sort, val)
    params.set(PARAM_KEYS.page, "1")
    router.push(`?${params.toString()}`)
  }

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="h-9 min-w-[8.5rem] text-xs">
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
