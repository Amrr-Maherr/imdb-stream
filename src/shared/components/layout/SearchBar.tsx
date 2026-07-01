"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import MultiSearch from "@/features/multiSearch/services/multiSearch";
import { SearchDropdown } from "@/features/multiSearch/components/SearchDropdown";
import type { SearchResult } from "@/features/multiSearch/components/SearchResultItem";

export default function SearchBar({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations("Header");

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastQueryRef = useRef("");

  useEffect(() => {
    if (!open) return;

    const trimmed = searchQuery.trim();
    if (!trimmed || trimmed === lastQueryRef.current) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const data = await MultiSearch({ query: trimmed });
        if (data) {
          lastQueryRef.current = trimmed;
          setResults(data.results ?? []);
        }
      } catch {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, open]);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onToggle();
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onToggle]);

  if (open) {
    return (
      <div ref={containerRef} className="relative">
        <div className="flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1">
          <Search className="size-4 shrink-0 text-muted-foreground" />

          <input
            type="text"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-7 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground md:w-[500px]"
            autoFocus
          />

          <button
            onClick={onToggle}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label={t("closeSearch")}
          >
            <X className="size-4" />
          </button>
        </div>

        <SearchDropdown results={results} onNavigate={onToggle} />
      </div>
    );
  }

  return (
    <Button variant="ghost" size="icon" onClick={onToggle} aria-label={t("search")}>
      <Search className="size-4" />
    </Button>
  );
}
