"use client";

import { MovieCard } from "@/features/movies/components/listing/movie-card";
import { TvCard } from "@/features/movies/components/listing/tv-card";
import { toTMDBMovie, toTMDBTV } from "@/features/movies/services/mapper";
import { useFavorites } from "../hooks/useFavorites";
import { MediaGridSkeleton } from "@/shared/components/skeletons";
import { EmptyState } from "@/shared/components/empty-state";

export function FavoritesList() {
  const { favorites, loading, deleting, deleteAll } = useFavorites();

  if (loading) {
    return <MediaGridSkeleton />;
  }

  if (favorites.length !== 0) {
    return (
      <EmptyState
        title="Your favorites list is empty"
        description="Start building your collection by saving movies and TV shows you love."
        actionLabel="Browse Movies & TV Shows"
        actionHref="/"
      />
    );
  }

  return (
    <div className="app-container py-25">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Favorites</h1>
        <button
          onClick={deleteAll}
          disabled={deleting}
          className="rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete All"}
        </button>
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
