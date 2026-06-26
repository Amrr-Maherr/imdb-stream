"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useEffect, useState } from "react";
import MultiSearch from "@/features/multiSearch/services/multiSearch";

export default function SearchBar({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  async function handleSearch(query: string) {
    try {
      if (!query.trim()) return;

      const response = await MultiSearch({ query });
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  if (open) {
    return (
      <div className="flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1">
        <Search className="size-4 shrink-0 text-muted-foreground" />

        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-7 w-32 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground md:w-40"
          autoFocus
        />

        <button
          onClick={onToggle}
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Close search"
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <Button variant="ghost" size="icon" onClick={onToggle} aria-label="Search">
      <Search className="size-4" />
    </Button>
  );
}
