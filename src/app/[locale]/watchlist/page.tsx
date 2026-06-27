"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, writeBatch } from "firebase/firestore";
import { MovieCard } from "@/features/movies/components/listing/movie-card";
import { TvCard } from "@/features/movies/components/listing/tv-card";
import type { TMDBMovie, TMDBTV } from "@/shared/types/tmdb";

type StoredMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  media_type?: string;
};

type WatchlistItem = {
  id: string;
  movie: StoredMovie;
  createdAt: Date;
};

const toTMDBMovie = (m: StoredMovie): TMDBMovie => ({
  id: m.id,
  title: m.title,
  poster_path: m.poster_path ?? null,
  backdrop_path: null,
  overview: "",
  release_date: "",
  vote_average: 0,
  vote_count: 0,
  genre_ids: [],
  original_language: "",
  original_title: m.title,
  popularity: 0,
  video: false,
  adult: false,
});

const toTMDBTV = (m: StoredMovie): TMDBTV => ({
  id: m.id,
  name: m.title,
  poster_path: m.poster_path ?? null,
  backdrop_path: null,
  overview: "",
  first_air_date: "",
  vote_average: 0,
  vote_count: 0,
  genre_ids: [],
  original_language: "",
  original_name: m.title,
  popularity: 0,
  origin_country: [],
});

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const getUserId = (): string | null => {
    try {
      const stored = localStorage.getItem("user_data");
      if (!stored) return null;
      return JSON.parse(stored)?.user?.uid ?? null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const userId = getUserId();
        if (!userId) {
          setLoading(false);
          return;
        }

        const snapshot = await getDocs(
          collection(db, "users", userId, "watchlist"),
        );
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as WatchlistItem[];

        setWatchlist(items);
      } catch {
        console.error("Failed to fetch watchlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const deleteAll = async () => {
    const userId = getUserId();
    if (!userId || watchlist.length === 0) return;

    setDeleting(true);
    try {
      const batch = writeBatch(db);
      watchlist.forEach((item) => {
        batch.delete(doc(db, "users", userId, "watchlist", item.id));
      });
      await batch.commit();
      setWatchlist([]);
    } catch {
      console.error("Failed to delete watchlist");
    } finally {
      setDeleting(false);
    }
  };

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
