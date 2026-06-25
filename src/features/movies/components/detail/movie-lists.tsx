import Image from "next/image";
import Link from "next/link";
import { Heart, List } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";

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

export function MovieLists({ lists }: MovieListsProps) {
  if (lists.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {lists.map((list) => (
        <Link key={list.id} href={`/list/${list.id}`} className="group block">
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
  );
}
