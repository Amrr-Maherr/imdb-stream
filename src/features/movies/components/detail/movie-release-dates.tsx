"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Globe, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";

type ReleaseDateItem = {
  certification: string;
  descriptors: string[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
};

type ReleaseDatesResult = {
  iso_3166_1: string;
  release_dates: ReleaseDateItem[];
};

type MovieReleaseDatesProps = {
  releaseDates: ReleaseDatesResult[];
};

const DISPLAY_LIMIT = 4;

function getCountryName(code: string) {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) || code;
  } catch {
    return code;
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const TYPE_LABELS: Record<number, string> = {
  1: "Premiere",
  2: "Theatrical (limited)",
  3: "Theatrical",
  4: "Digital",
  5: "Physical",
  6: "TV",
};

const TYPE_VARIANTS: Record<number, string> = {
  1: "bg-muted text-muted-foreground",
  2: "bg-muted text-muted-foreground",
  3: "bg-muted text-foreground font-bold",
  4: "bg-muted text-muted-foreground",
  5: "bg-muted text-muted-foreground",
  6: "bg-muted text-muted-foreground",
};

export function MovieReleaseDates({ releaseDates }: MovieReleaseDatesProps) {
  const [expanded, setExpanded] = useState(false);
  if (releaseDates.length === 0) return null;

  const visible = expanded ? releaseDates : releaseDates.slice(0, DISPLAY_LIMIT);
  const hasMore = releaseDates.length > DISPLAY_LIMIT;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {visible.map((r) => (
        <Card key={r.iso_3166_1}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
              <Globe className="size-4 text-muted-foreground shrink-0" />
              <span className="text-sm font-semibold text-foreground">
                {getCountryName(r.iso_3166_1)}
              </span>
            </div>
            <div className="space-y-2.5">
              {r.release_dates.map((rd, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-sm"
                >
                  <CalendarDays className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-foreground font-medium">
                        {formatDate(rd.release_date)}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold leading-none ${TYPE_VARIANTS[rd.type] || "bg-muted text-muted-foreground"}`}
                      >
                        {TYPE_LABELS[rd.type] || `Type ${rd.type}`}
                      </span>
                      {rd.certification && (
                        <span className="inline-flex items-center rounded border border-border px-1.5 py-0.5 text-[11px] font-bold leading-none text-foreground">
                          {rd.certification}
                        </span>
                      )}
                    </div>
                    {rd.note && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {rd.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
            <>Show More ({releaseDates.length - DISPLAY_LIMIT} more) <ChevronDown className="size-3.5" /></>
          )}
        </button>
      )}
    </div>
  );
}
