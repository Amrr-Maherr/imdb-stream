"use client";

import { useTranslations } from "next-intl";
import { MovieCard } from "@/features/movies/components/listing/movie-card";
import { TvCard } from "@/features/movies/components/listing/tv-card";
import { toTMDBMovie, toTMDBTV } from "@/features/movies/services/mapper";
import { useFavorites } from "../hooks/useFavorites";
import { EmptyState } from "@/shared/components/empty-state";
import { DeleteAllButton } from "@/shared/components/delete-all-button";
import { FavoritesSkeleton } from "./favorites-skeleton";

export function FavoritesList() {
  const t = useTranslations("Favorites");
  const { favorites, loading, deleting, deleteAll } = useFavorites();

  if (loading) {
    return <FavoritesSkeleton />;
  }

  if (favorites.length === 0) {
    return (
      <EmptyState
        title={t("emptyTitle")}
        description={t("emptyDescription")}
        actionLabel={t("browseButton")}
        actionHref="/"
      />
    );
  }

  return (
    <div className="app-container py-25">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <DeleteAllButton onClick={deleteAll} deleting={deleting} />
      </div>
      <div className="flex flex-wrap justify-start gap-3 md:gap-4">
        {favorites.map((item) => {
          const movie = item.movie;
          if (!movie) return null;

          if (movie.media_type === "tv") {
            return <TvCard key={item.id} tv={toTMDBTV(movie)} />;
          }

          return <MovieCard key={item.id} movie={toTMDBMovie(movie)} />;
        })}
      </div>
    </div>
  );
}
