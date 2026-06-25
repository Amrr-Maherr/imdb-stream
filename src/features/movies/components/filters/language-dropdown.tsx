"use client"

import { Globe } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { LANGUAGES, MOCK_LANGUAGE, LANGUAGE_ICONS } from "./constants"

function LanguageDropdown() {
  return (
    <Select defaultValue={MOCK_LANGUAGE}>
      <SelectTrigger className="h-8 min-w-[8.5rem] text-xs">
        <Globe className="size-3.5 shrink-0 text-muted-foreground" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">All Languages</SelectItem>
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang} value={lang}>
            <span className="flex items-center gap-2">
              <span className="flex size-4 items-center justify-center rounded-[2px] border border-border bg-muted text-[9px] font-medium text-muted-foreground">
                {LANGUAGE_ICONS[lang]}
              </span>
              {lang}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { LanguageDropdown }
