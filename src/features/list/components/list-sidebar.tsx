"use client";

import { List as ListIcon, Heart, Film, Tv, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/features/movies/components/detail/fade-in";
import { MovieRating } from "@/features/movies/components/detail/movie-rating";

type ListItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  media_type: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  overview: string;
};

type ListSidebarProps = {
  name: string;
  description: string | null;
  itemCount: number;
  favoriteCount: number;
  listType: string;
  items: ListItem[];
};

export function ListSidebar({
  itemCount,
  favoriteCount,
  listType,
  items,
}: ListSidebarProps) {
  const t = useTranslations("List");
  const avgRating =
    items.length > 0
      ? items.reduce((sum, i) => sum + i.vote_average, 0) / items.length
      : 0;
  const hasMovies = items.some((i) => i.media_type === "movie");
  const hasTV = items.some((i) => i.media_type === "tv");

  return (
    <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-8">
      {/* Statistics Card */}
      <FadeIn delay={0.05}>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
            {t("statistics")}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Film className="size-4 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{t("items")}</p>
                <p className="text-sm text-foreground">{itemCount}</p>
              </div>
            </div>
            {favoriteCount > 0 && (
              <div className="flex items-center gap-3">
                <Heart className="size-4 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{t("favorites")}</p>
                  <p className="text-sm text-foreground">{favoriteCount}</p>
                </div>
              </div>
            )}
            {avgRating > 0 && (
              <div className="flex items-center gap-3">
                <Star className="size-4 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{t("averageRating")}</p>
                  <p className="text-sm text-foreground font-medium">
                    {avgRating.toFixed(1)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </FadeIn>

      {/* Rating Card */}
      {avgRating > 0 && items.length > 0 && (
        <FadeIn delay={0.1}>
          <div className="rounded-xl border border-border bg-card p-5">
            <MovieRating
              voteAverage={avgRating}
              voteCount={items.length}
              popularity={Math.round(
                items.reduce((sum, i) => sum + (i as any).popularity || 0, 0) /
                  items.length,
              )}
            />
          </div>
        </FadeIn>
      )}

      {/* Facts */}
      <FadeIn delay={0.05}>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
            {t("facts")}
          </h3>
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {t("type")}
              </h4>
              <p className="text-sm text-foreground mt-0.5 capitalize">
                {listType}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {t("content")}
              </h4>
              <p className="text-sm text-foreground mt-0.5">
                {hasMovies && hasTV
                  ? t("mixedMoviesTv")
                  : hasMovies
                    ? t("moviesOnly")
                    : t("tvShowsOnly")}
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
