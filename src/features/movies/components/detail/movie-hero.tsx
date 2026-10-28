'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Square, Star } from 'lucide-react';
import { MovieInfo } from './movie-info';
import { MovieActions } from './movie-actions';
import { GenreTags } from './genre-tags';
import { MovieBackground } from './movie-background';

type Genre = { id: number; name: string };

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  media_type?: string;
};

type MovieHeroProps = {
  backdropPath: string | null;
  title: string;
  year: string;
  endYear?: string | null;
  certification: string;
  runtime: number;
  tagline: string | null;
  overview: string;
  voteAverage: number;
  voteCount: number;
  genres: Genre[];
  trailerKey: string | null;
  imdbId: string | null;
  homepage: string | null;
  movie: Movie;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        config: {
          videoId: string;
          width?: string | number;
          height?: string | number;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getPlayerState: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getIframe: () => HTMLIFrameElement;
}

const PLAYING = 1;
const PAUSED = 2;

export function MovieHero({
  backdropPath,
  title,
  year,
  endYear,
  certification,
  runtime,
  tagline,
  overview,
  voteAverage,
  voteCount,
  genres,
  trailerKey,
  imdbId,
  homepage,
  movie,
}: MovieHeroProps) {
  const t = useTranslations('MovieDetail');
  const tc = useTranslations('Common');
  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [ready, setReady] = useState(false);
  const playerReady = useRef(false);

  useEffect(() => {
    if (!trailerKey) return;

    const initPlayer = () => {
      if (!window.YT || playerReady.current) return;
      playerReady.current = true;
      new window.YT.Player('youtube-player', {
        videoId: trailerKey,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: trailerKey,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            playerRef.current = event.target;
            setReady(true);
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === PLAYING) setPlaying(true);
            else if (event.data === PAUSED) setPlaying(false);
          },
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const first = document.getElementsByTagName('script')[0];
      first.parentNode?.insertBefore(tag, first);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }
  }, [trailerKey]);

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (playing) player.pauseVideo();
    else player.playVideo();
  }, [playing]);

  const handleStop = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    player.seekTo(0, false);
    player.pauseVideo();
  }, []);

  const toggleMute = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (player.isMuted()) {
      player.unMute();
      setMuted(false);
    } else {
      player.mute();
      setMuted(true);
    }
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      await el.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handler = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <section className="relative w-full min-h-[640px] overflow-hidden bg-black md:min-h-0 md:aspect-[16/9] lg:aspect-[21/9] lg:max-h-[88vh]">
      {/* Background layer */}
      <div ref={containerRef} className="absolute inset-0">
        <MovieBackground trailerKey={trailerKey} backdropPath={backdropPath} title={title} />
      </div>

      {/* Text protection: darken behind the copy only, keep the artwork vivid on the far side */}
      <div className="pointer-events-none absolute inset-0 z-10 scrim-bottom" />
      <div className="pointer-events-none absolute inset-0 z-10 hidden scrim-start md:block" />

      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-10 md:pb-16">
        <div className="w-full mx-auto app-container">
          <div className="flex items-end gap-8 lg:gap-10">
            {movie.poster_path && (
              <div className="relative hidden aspect-2/3 w-44 shrink-0 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20 md:block lg:w-56">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="224px"
                  priority
                />
              </div>
            )}
            <div className="min-w-0 max-w-3xl">
              <MovieInfo
                title={title}
                year={year}
                endYear={endYear}
                certification={certification}
                runtime={runtime}
                tagline={tagline}
                overlay
              />

              {/* Rating */}
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                {voteAverage > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-rating-star px-2.5 py-1 text-brand-foreground">
                    <Star className="size-4 fill-current" />
                    <span className="text-base font-bold leading-none">
                      {voteAverage.toFixed(1)}
                    </span>
                    <span className="text-xs font-medium opacity-75">
                      {t('votes', { count: voteCount })}
                    </span>
                  </span>
                )}
                <GenreTags genres={genres} overlay />
              </div>

              {/* Overview */}
              {overview && (
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 line-clamp-3 sm:text-base">
                  {overview}
                </p>
              )}

              {/* Actions */}
              <div className="mt-6">
                <MovieActions
                  trailerKey={trailerKey}
                  imdbId={imdbId}
                  homepage={homepage}
                  title={title}
                  overlay
                  movie={movie}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact trailer controls: top on mobile so they never cover the copy */}
      {ready && trailerKey && (
        <div className="absolute end-4 top-20 z-30 flex items-center gap-1 rounded-full bg-black/55 p-1 ring-1 ring-white/15 backdrop-blur-md md:end-8 md:top-auto md:bottom-6">
          <button
            onClick={togglePlay}
            className="flex size-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
            aria-label={playing ? tc('pause') : tc('play')}
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4 ms-0.5" />}
          </button>
          <button
            onClick={handleStop}
            className="flex size-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
            aria-label={tc('stop')}
          >
            <Square className="size-3.5" />
          </button>
          <button
            onClick={toggleMute}
            className={`flex size-9 items-center justify-center rounded-full transition-colors ${
              muted
                ? 'text-white hover:bg-white/15'
                : 'bg-brand text-brand-foreground hover:bg-brand/90'
            }`}
            aria-label={muted ? tc('unmute') : tc('mute')}
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
          <span className="hidden items-center gap-1.5 px-2 text-xs text-white/70 sm:flex">
            {playing ? (
              <>
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand" />
                </span>
                {tc('playing')}
              </>
            ) : (
              tc('paused')
            )}
          </span>
          <button
            onClick={toggleFullscreen}
            className="flex size-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
            aria-label={fullscreen ? tc('exitFullscreen') : tc('fullscreen')}
          >
            {fullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
          </button>
        </div>
      )}
    </section>
  );
}
