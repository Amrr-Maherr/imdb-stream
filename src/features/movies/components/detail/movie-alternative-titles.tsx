"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Globe } from "lucide-react";

type AlternativeTitle = {
  iso_3166_1: string;
  title: string;
  type: string;
};

type MovieAlternativeTitlesProps = {
  titles: AlternativeTitle[];
};

const DISPLAY_LIMIT = 6;

function getCountryName(code: string) {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) || code;
  } catch {
    return code;
  }
}

export function MovieAlternativeTitles({
  titles,
}: MovieAlternativeTitlesProps) {
  const [expanded, setExpanded] = useState(false);
  if (titles.length === 0) return null;

  const visible = expanded ? titles : titles.slice(0, DISPLAY_LIMIT);
  const hasMore = titles.length > DISPLAY_LIMIT;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {visible.map((t, i) => (
          <div
            key={`${t.iso_3166_1}-${t.title}-${i}`}
            className="flex items-start gap-2 rounded-lg border border-border bg-card p-3"
          >
            <Globe className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {t.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {getCountryName(t.iso_3166_1)}
                {t.type ? ` · ${t.type}` : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-brand hover:text-brand/80 transition-colors"
        >
          {expanded ? (
            <>Show Less <ChevronUp className="size-3.5" /></>
          ) : (
            <>Show More ({titles.length - DISPLAY_LIMIT} more) <ChevronDown className="size-3.5" /></>
          )}
        </button>
      )}
    </div>
  );
}
