"use client";

import { Heart, ListPlus, Loader2, Play, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import { useAddToFavorite } from "../../hooks/useAddToFavorite";
import { useAddToWatchlist } from "../../hooks/usetAddToWatchlist";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  media_type?: string;
};

type MovieActionsProps = {
  trailerKey: string | null;
  imdbId: string | null;
  homepage: string | null;
  title: string;
  overlay?: boolean;
  movie: Movie;
};

export function MovieActions({
  trailerKey,
  imdbId,
  homepage,
  title,
  overlay,
  movie,
}: MovieActionsProps) {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const { loading: favoriteLoading, addToFavorite } = useAddToFavorite();
  const { loading: watchlistLoading, addToWatchlist } = useAddToWatchlist();

  const auth = getAuth();
  const user = auth.currentUser;

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({ title, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {trailerKey && (
        <Link
          href={`https://www.youtube.com/watch?v=${trailerKey}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:bg-brand/90"
        >
          <Play className="size-4 fill-current" />
          Play Trailer
        </Link>
      )}

      {/* Watchlist */}
      <button
        disabled={watchlistLoading}
        onClick={async () => {
          if (!user) {
            toast.error("Please login first.");
            return;
          }

          const result = await addToWatchlist(movie, user);

          if (result.success) {
            setInWatchlist(true);
            toast.success("Added to watchlist!");
          } else {
            toast.error("Failed to add to watchlist.");
          }
        }}
        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-70 ${
          inWatchlist
            ? "border-brand bg-brand/10 text-brand"
            : overlay
              ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
              : "border-border bg-background text-foreground hover:bg-muted"
        }`}
      >
        {watchlistLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <ListPlus className="size-4" />
        )}

        <span className="hidden sm:inline">
          {watchlistLoading
            ? "Adding..."
            : inWatchlist
              ? "In Watchlist"
              : "Watchlist"}
        </span>
      </button>

      {/* Favorite */}
      <button
        disabled={favoriteLoading}
        onClick={async () => {
          if (!user) {
            toast.error("Please login first.");
            return;
          }

          const result = await addToFavorite(movie, user);

          if (result) {
            setFavorited(true);
            toast.success("Added to favorites!");
          } else {
            toast.error("Failed to add to favorites.");
          }
        }}
        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-70 ${
          favorited
            ? "border-red-500 bg-red-500/10 text-red-500"
            : overlay
              ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
              : "border-border bg-background text-foreground hover:bg-muted"
        }`}
      >
        {favoriteLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Heart className={`size-4 ${favorited ? "fill-current" : ""}`} />
        )}

        <span className="hidden sm:inline">
          {favoriteLoading ? "Adding..." : favorited ? "Favorited" : "Favorite"}
        </span>
      </button>

      <button
        onClick={handleShare}
        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all ${
          overlay
            ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
            : "border-border bg-background text-foreground hover:bg-muted"
        }`}
      >
        <Share2 className="size-4" />
        <span className="hidden sm:inline">Share</span>
      </button>

      {homepage && (
        <Link
          href={homepage}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all ${
            overlay
              ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
              : "border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          Website
        </Link>
      )}

      {imdbId && (
        <Link
          href={`https://www.imdb.com/title/${imdbId}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all ${
            overlay
              ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
              : "border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          IMDb
        </Link>
      )}
    </div>
  );
}
