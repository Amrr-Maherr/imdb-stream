"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchInputProps {
  variant?: "desktop" | "mobile"
  className?: string
}

function SearchInput({ variant = "desktop", className }: SearchInputProps) {
  return (
    <div
      data-slot="filter-search-input"
      className={cn(
        "relative w-full",
        variant === "desktop" ? "w-full min-w-0" : "min-w-0 flex-1",
        className
      )}
    >
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        defaultValue=""
        placeholder="Search movies..."
        className={cn(
          "pl-10",
          variant === "desktop" ? "h-9 text-sm" : "h-9 text-sm"
        )}
        aria-label="Search movies"
      />
      <button
        type="button"
        className="absolute right-2.5 top-1/2 hidden -translate-y-1/2 text-muted-foreground hover:text-foreground"
        aria-label="Clear search"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}

export { SearchInput }
