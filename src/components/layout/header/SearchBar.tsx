"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchBar({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  if (open) {
    return (
      <div className="flex items-center gap-1 border border-border rounded-md bg-background px-2 py-1">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search"
          className="h-7 w-32 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground md:w-40"
          autoFocus
        />
        <button
          onClick={onToggle}
          className="text-muted-foreground hover:text-foreground transition-colors"
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
