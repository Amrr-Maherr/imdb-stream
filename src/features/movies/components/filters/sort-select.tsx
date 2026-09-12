"use client"

import { useTranslations } from "next-intl"
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
  const t = useTranslations("Filters")
  const router = useRouter()
  const searchParams = useSearchParams()
  const value = searchParams.get(PARAM_KEYS.sort) ?? "popularity.desc"

  const sortLabels: Record<string, string> = {
    "popularity.desc": t("mostPopular"),
    "vote_average.desc": t("highestRated"),
    "primary_release_date.desc": t("newestRelease"),
    "revenue.desc": t("highestRevenue"),
  }

  function handleChange(val: string) {
    const params = new URLSearchParams(searchParams)
    params.set(PARAM_KEYS.sort, val)
    params.set(PARAM_KEYS.page, "1")
    router.push(`?${params.toString()}`)
  }

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="h-9 min-w-[8.5rem] text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {sortLabels[opt.value]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { SortSelect }
