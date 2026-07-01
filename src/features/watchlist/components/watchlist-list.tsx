"use client";

import { MovieCard } from "@/features/movies/components/listing/movie-card";
import { TvCard } from "@/features/movies/components/listing/tv-card";
import { toTMDBMovie, toTMDBTV } from "@/features/movies/services/mapper";
import { useWatchlist } from "../hooks/useWatchlist";
import { EmptyState } from "@/shared/components/empty-state";
import { MediaGridSkeleton } from "@/shared/components/skeletons";
import { DeleteAllButton } from "@/shared/components/delete-all-button";

export function WatchlistList() {
  const { watchlist, loading, deleting, deleteAll } = useWatchlist();

  if (loading) {
    return <MediaGridSkeleton />;
  }

  if (watchlist.length === 0) {
    return (
      <EmptyState
        title="Your watchlist is empty"
        description="Start building your collection by saving movies and TV shows you love."
        actionLabel="Browse Movies & TV Shows"
        actionHref="/"
      />
    );
  }

  return (
    <div className="app-container py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Watchlist</h1>
        <DeleteAllButton onClick={deleteAll} deleting={deleting} />
      </div>
      <div className="flex flex-wrap justify-start gap-3 md:gap-4">
        {watchlist.map((item) => {
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
