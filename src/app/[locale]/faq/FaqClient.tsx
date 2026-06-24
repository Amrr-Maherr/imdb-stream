"use client"

import { useState } from "react"
import { FaqAccordion } from "@/components/ui/faq-accordion"

interface FaqItem {
  q: string
  a: string
}

interface FaqClientProps {
  items: Record<string, FaqItem>
  categories: Record<string, string>
  categoryItems: Record<string, string[]>
  searchPlaceholder?: string
  className?: string
}

export function FaqClient({ items, categories, categoryItems, searchPlaceholder, className }: FaqClientProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredItems =
    activeCategory === "all"
      ? items
      : Object.fromEntries(
          Object.entries(items).filter(([key]) => categoryItems[activeCategory]?.includes(key))
        )

  return (
    <FaqAccordion
      items={filteredItems}
      categories={categories}
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
      showSearch={true}
      searchPlaceholder={searchPlaceholder}
      className={className}
    />
  )
}
