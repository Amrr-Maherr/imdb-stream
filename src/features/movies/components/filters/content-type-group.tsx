"use client"

import { cn } from "@/shared/utils/utils"
import { CONTENT_TYPES, MOCK_CONTENT_TYPE } from "./constants"

function ContentTypeGroup() {
  return (
    <div
      data-slot="filter-content-type"
      className="flex items-center rounded-lg border border-border bg-background p-0.5"
      role="group"
      aria-label="Content type"
    >
      {CONTENT_TYPES.map((type) => {
        const Icon = type.icon
        const isActive = type.value === MOCK_CONTENT_TYPE
        return (
          <button
            key={type.value}
            type="button"
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
              isActive
                ? "bg-brand text-brand-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="size-3" />
            <span className="hidden sm:inline">{type.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export { ContentTypeGroup }
