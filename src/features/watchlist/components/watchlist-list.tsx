"use client";

import { MovieCard } from "@/features/movies/components/listing/movie-card";
import { TvCard } from "@/features/movies/components/listing/tv-card";
import { toTMDBMovie, toTMDBTV } from "@/features/movies/services/mapper";
import { useWatchlist } from "../hooks/useWatchlist";

export function WatchlistList() {
  const { watchlist, loading, deleting, deleteAll } = useWatchlist();

  if (loading) {
    return (
      <div className="app-container py-12">
        <h1 className="text-2xl font-bold mb-6">Watchlist</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (watchlist.length === 0) {
    return (
      <div className="app-container py-12">
        <h1 className="text-2xl font-bold mb-6">Watchlist</h1>
        <p className="text-sm text-muted-foreground">
          No items in watchlist yet.
        </p>
      </div>
    );
  }

  return (
    <div className="app-container py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Watchlist</h1>
        <button
          onClick={deleteAll}
          disabled={deleting}
          className="rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete All"}
        </button>
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
