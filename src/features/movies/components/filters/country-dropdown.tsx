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
import { COUNTRIES, PARAM_KEYS } from "./constants"

function CountryDropdown() {
  const t = useTranslations("Filters")
  const router = useRouter()
  const searchParams = useSearchParams()
  const value = searchParams.get(PARAM_KEYS.country) ?? "any"

  function handleChange(val: string) {
    const params = new URLSearchParams(searchParams)
    if (val === "any") {
      params.delete(PARAM_KEYS.country)
    } else {
      params.set(PARAM_KEYS.country, val)
    }
    params.set(PARAM_KEYS.page, "1")
    router.push(`?${params.toString()}`)
  }

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="h-9 min-w-[8.5rem] text-xs">
        <SelectValue placeholder={t("country")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">{t("allCountries")}</SelectItem>
        {COUNTRIES.map((country) => (
          <SelectItem key={country.value} value={country.value}>
            {t(`countries.${country.value}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { CountryDropdown }
