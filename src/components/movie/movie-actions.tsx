"use client";

import { Heart, ListPlus, Play, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type MovieActionsProps = {
  trailerKey: string | null;
  imdbId: string | null;
  homepage: string | null;
  title: string;
  overlay?: boolean;
};

export function MovieActions({ trailerKey, imdbId, homepage, title, overlay }: MovieActionsProps) {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {trailerKey && (
        <Link
          href={`https://www.youtube.com/watch?v=${trailerKey}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:bg-brand/90 transition-all"
        >
          <Play className="size-4 fill-current" />
          Play Trailer
        </Link>
      )}
      <button
        onClick={() => setInWatchlist((p) => !p)}
        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all ${
          inWatchlist
            ? "border-brand bg-brand/10 text-brand"
            : overlay
              ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
              : "border-border bg-background text-foreground hover:bg-muted"
        }`}
        aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      >
        <ListPlus className="size-4" />
        <span className="hidden sm:inline">{inWatchlist ? "In Watchlist" : "Watchlist"}</span>
      </button>
      <button
        onClick={() => setFavorited((p) => !p)}
        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all ${
          favorited
            ? "border-destructive bg-destructive/10 text-destructive"
            : overlay
              ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
              : "border-border bg-background text-foreground hover:bg-muted"
        }`}
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={`size-4 ${favorited ? "fill-current" : ""}`} />
        <span className="hidden sm:inline">{favorited ? "Favorited" : "Favorite"}</span>
      </button>
      <button
        onClick={handleShare}
        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all ${
          overlay
            ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
            : "border-border bg-background text-foreground hover:bg-muted"
        }`}
        aria-label="Share"
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
