"use client"

import { Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LANGUAGES, MOCK_LANGUAGE, LANGUAGE_ICONS } from "./constants"

function LanguageDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Globe className="size-3.5" />
          Language
          {MOCK_LANGUAGE && (
            <span className="flex size-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
              1
            </span>
          )}
          <ChevronDown className="size-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LANGUAGES.map((lang) => (
          <DropdownMenuCheckboxItem key={lang} checked={lang === MOCK_LANGUAGE}>
            <span className="flex size-5 items-center justify-center rounded-sm border border-border bg-muted text-[10px] font-medium text-muted-foreground">
              {LANGUAGE_ICONS[lang]}
            </span>
            {lang}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { LanguageDropdown }
