"use client"

import { MapPin } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { COUNTRIES, MOCK_COUNTRY } from "./constants"

function CountryDropdown() {
  return (
    <Select defaultValue={MOCK_COUNTRY}>
      <SelectTrigger className="h-8 min-w-[8.5rem] text-xs">
        <MapPin className="size-3.5 shrink-0 text-muted-foreground" />
        <SelectValue placeholder="Country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">All Countries</SelectItem>
        {COUNTRIES.map((country) => (
          <SelectItem key={country} value={country}>
            {country}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { CountryDropdown }
