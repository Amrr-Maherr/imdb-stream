"use client"

import { Globe } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { LANGUAGES, PARAM_KEYS } from "./constants"

function LanguageDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const value = searchParams.get(PARAM_KEYS.language) ?? "any"

  function handleChange(val: string) {
    const params = new URLSearchParams(searchParams)
    if (val === "any") {
      params.delete(PARAM_KEYS.language)
    } else {
      params.set(PARAM_KEYS.language, val)
    }
    params.set(PARAM_KEYS.page, "1")
    router.push(`?${params.toString()}`)
  }

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="h-9 min-w-[8.5rem] text-xs">
        <Globe className="size-3.5 shrink-0 text-muted-foreground" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">All Languages</SelectItem>
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            <span className="flex items-center gap-2">
              <span className="flex size-4 items-center justify-center rounded-[2px] border border-border bg-muted text-[9px] font-medium text-muted-foreground">
                {lang.short}
              </span>
              {lang.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { LanguageDropdown }
