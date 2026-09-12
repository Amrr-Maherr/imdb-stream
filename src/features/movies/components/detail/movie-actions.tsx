'use client';

import { useTranslations } from 'next-intl';
import { Heart, ListPlus, Loader2, Play, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useAddToFavorite } from '../../hooks/useAddToFavorite';
import { useAddToWatchlist } from '../../hooks/useAddToWatchlist';

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
  const t = useTranslations('MovieDetail');
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
      alert(t('linkCopied'));
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
          {t('playTrailer')}
        </Link>
      )}

      {/* Watchlist */}
      <button
        disabled={watchlistLoading}
        onClick={async () => {
          if (!user) {
            toast.error(t('loginRequired'));
            return;
          }

          const result = await addToWatchlist(movie, user);

          if (result.success) {
            setInWatchlist(true);
            toast.success(t('addedToWatchlist'));
          } else {
            toast.error(t('failedWatchlist'));
          }
        }}
        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-70 ${
          inWatchlist
            ? 'border-brand bg-brand/10 text-brand'
            : overlay
              ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
              : 'border-border bg-background text-foreground hover:bg-muted'
        }`}
      >
        {watchlistLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <ListPlus className="size-4" />
        )}

        <span className="hidden sm:inline">
          {watchlistLoading ? t('adding') : inWatchlist ? t('inWatchlist') : t('watchlist')}
        </span>
      </button>

      {/* Favorite */}
      <button
        disabled={favoriteLoading}
        onClick={async () => {
          if (!user) {
            toast.error(t('loginRequired'));
            return;
          }

          const result = await addToFavorite(movie, user);

          if (result) {
            setFavorited(true);
            toast.success(t('addedToFavorites'));
          } else {
            toast.error(t('failedFavorites'));
          }
        }}
        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-70 ${
          favorited
            ? 'border-red-500 bg-red-500/10 text-red-500'
            : overlay
              ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
              : 'border-border bg-background text-foreground hover:bg-muted'
        }`}
      >
        {favoriteLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Heart className={`size-4 ${favorited ? 'fill-current' : ''}`} />
        )}

        <span className="hidden sm:inline">
          {favoriteLoading ? t('adding') : favorited ? t('favorited') : t('favorite')}
        </span>
      </button>

      <button
        onClick={handleShare}
        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all ${
          overlay
            ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
            : 'border-border bg-background text-foreground hover:bg-muted'
        }`}
      >
        <Share2 className="size-4" />
        <span className="hidden sm:inline">{t('share')}</span>
      </button>

      {homepage && (
        <Link
          href={homepage}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all ${
            overlay
              ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
              : 'border-border bg-background text-foreground hover:bg-muted'
          }`}
        >
          {t('website')}
        </Link>
      )}

      {imdbId && (
        <Link
          href={`https://www.imdb.com/title/${imdbId}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all ${
            overlay
              ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
              : 'border-border bg-background text-foreground hover:bg-muted'
          }`}
        >
          {t('imdb')}
        </Link>
      )}
    </div>
  );
}
