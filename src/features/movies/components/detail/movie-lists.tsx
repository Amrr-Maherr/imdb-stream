"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, Heart, List } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { slugify } from "@/shared/utils/slugify";

type MovieList = {
  id: number;
  name: string;
  description: string;
  favorite_count: number;
  item_count: number;
  list_type: string;
  poster_path: string | null;
};

type MovieListsProps = {
  lists: MovieList[];
};

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";
const DISPLAY_LIMIT = 4;

export function MovieLists({ lists }: MovieListsProps) {
  const [expanded, setExpanded] = useState(false);
  if (lists.length === 0) return null;

  const visible = expanded ? lists : lists.slice(0, DISPLAY_LIMIT);
  const hasMore = lists.length > DISPLAY_LIMIT;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {visible.map((list) => (
        <Link
          key={list.id}
          href={`/list/${slugify(list.name)}/${list.id}`}
          className="group block"
        >
          <Card className="h-full transition-colors group-hover:bg-muted">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {list.poster_path ? (
                    <Image
                      src={`${TMDB_IMAGE_BASE}/w92${list.poster_path}`}
                      alt={list.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-muted-foreground">
                      <List className="size-5" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground truncate group-hover:text-brand transition-colors">
                    {list.name}
                  </p>
                  {list.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {list.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      <List className="size-3" />
                      {list.item_count}
                    </span>
                    {list.favorite_count > 0 && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Heart className="size-3" />
                        {list.favorite_count}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
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
            <>Show More ({lists.length - DISPLAY_LIMIT} more) <ChevronDown className="size-3.5" /></>
          )}
        </button>
      )}
    </div>
  );
}
