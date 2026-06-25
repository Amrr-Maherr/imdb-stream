"use client"

import { Film } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { GENRES, PARAM_KEYS } from "./constants"

function GenreDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const value = searchParams.get(PARAM_KEYS.genre) ?? "any"

  function handleChange(val: string) {
    const params = new URLSearchParams(searchParams)
    if (val === "any") {
      params.delete(PARAM_KEYS.genre)
    } else {
      params.set(PARAM_KEYS.genre, val)
    }
    params.set(PARAM_KEYS.page, "1")
    router.push(`?${params.toString()}`)
  }

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="h-9 min-w-[8.5rem] text-xs">
        <Film className="size-3.5 shrink-0 text-muted-foreground" />
        <SelectValue placeholder="Genre" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">All Genres</SelectItem>
        {GENRES.map((genre) => (
          <SelectItem key={genre.value} value={genre.value}>
            {genre.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { GenreDropdown }
