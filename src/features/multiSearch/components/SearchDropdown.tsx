"use client";

import { SearchResultItem, type SearchResult } from "./SearchResultItem";

type SearchDropdownProps = {
  results: SearchResult[];
  onNavigate: () => void;
};

export function SearchDropdown({ results, onNavigate }: SearchDropdownProps) {
  if (results.length === 0) return null;

  return (
    <div className="scrollbar-thin absolute left-0 right-0 top-full z-50 mt-1 max-h-[70vh] overflow-y-auto rounded-xl border border-border bg-card shadow-lg">
      <div className="py-1">
        {results.slice(0, 8).map((result) => (
          <SearchResultItem
            key={`${result.media_type}-${result.id}`}
            result={result}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}
