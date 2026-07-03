"use client"

import { useState } from "react"
import { ChevronDown, Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/shared/utils/utils"
import { Input } from "@/shared/components/ui/input"

interface FaqItem {
  q: string
  a: string
}

interface FaqAccordionProps {
  items: Record<string, FaqItem>
  categories?: Record<string, string>
  activeCategory?: string
  onCategoryChange?: (category: string) => void
  showSearch?: boolean
  searchPlaceholder?: string
  className?: string
}

export function FaqAccordion({
  items,
  categories,
  activeCategory = "all",
  onCategoryChange,
  showSearch = true,
  searchPlaceholder: searchPlaceholderProp,
  className,
}: FaqAccordionProps) {
  const t = useTranslations("Ui")
  const searchPlaceholder = searchPlaceholderProp ?? t("faq.searchPlaceholder")
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const filteredItems = Object.entries(items).filter(([key, item]) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className={cn("space-y-6", className)}>
      {showSearch && (
        <div className="relative mx-auto max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            aria-label={searchPlaceholder}
          />
        </div>
      )}

      {categories && onCategoryChange && (
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={t("faq.faqCategories")}>
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={activeCategory === key}
              onClick={() => onCategoryChange(key)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeCategory === key
                  ? "bg-brand text-brand-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-12 text-center">
          <Search className="size-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">{t("faq.noResultsFound", { searchQuery })}</p>
          <button
            onClick={() => setSearchQuery("")}
            className="text-sm text-brand hover:underline"
          >
            {t("faq.clearSearch")}
          </button>
        </div>
      ) : (
        <div className="space-y-3" role="tablist" aria-label={t("faq.frequentlyAskedQuestions")}>
          {filteredItems.map(([key, item]) => (
            <div
              key={key}
              className="rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <button
                onClick={() => toggleItem(key)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                aria-expanded={openItems.has(key)}
                aria-controls={`faq-answer-${key}`}
              >
                <span className="pr-4 text-sm font-medium text-foreground">{item.q}</span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    openItems.has(key) && "rotate-180"
                  )}
                />
              </button>
              <div
                id={`faq-answer-${key}`}
                role="region"
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openItems.has(key) ? "max-h-96" : "max-h-0"
                )}
              >
                <div className="border-t border-border px-5 py-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
