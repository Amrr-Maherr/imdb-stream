"use client"

import { Film } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { GENRES, MOCK_GENRE } from "./constants"

function GenreDropdown() {
  return (
    <Select defaultValue={MOCK_GENRE}>
      <SelectTrigger className="h-8 min-w-[8.5rem] text-xs">
        <Film className="size-3.5 shrink-0 text-muted-foreground" />
        <SelectValue placeholder="Genre" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">All Genres</SelectItem>
        {GENRES.map((genre) => (
          <SelectItem key={genre} value={genre}>
            {genre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { GenreDropdown }
