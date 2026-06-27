"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Square,
  Star,
} from "lucide-react";
import { MovieInfo } from "./movie-info";
import { MovieActions } from "./movie-actions";
import { GenreTags } from "./genre-tags";
import { MovieBackground } from "./movie-background";

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
        },
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
      new window.YT.Player("youtube-player", {
        videoId: trailerKey,
        width: "100%",
        height: "100%",
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
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const first = document.getElementsByTagName("script")[0];
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
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <section className="relative w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
      {/* Background layer – z-0 */}
      <div ref={containerRef} className="absolute inset-0">
        <MovieBackground
          trailerKey={trailerKey}
          backdropPath={backdropPath}
          title={title}
        />
      </div>

      {/* Gradient overlays – z-10 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10" />

      {/* Content overlay – z-20 */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-16 md:pb-20">
        <div className="w-full mx-auto app-container">
          <MovieInfo
            title={title}
            year={year}
            certification={certification}
            runtime={runtime}
            tagline={tagline}
            overlay
          />

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <Star className="size-5 fill-rating-star text-rating-star" />
            <span className="text-lg font-bold text-white">
              {voteAverage.toFixed(1)}
            </span>
            <span className="text-sm text-white/60">
              · {voteCount.toLocaleString()} votes
            </span>
          </div>

          {/* Genres */}
          <div className="mt-3">
            <GenreTags genres={genres} overlay />
          </div>

          {/* Overview */}
          {overview && (
            <p className="mt-3 text-sm text-white/80 line-clamp-2 max-w-2xl leading-relaxed">
              {overview}
            </p>
          )}

          {/* Actions */}
          <div className="mt-4">
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

      {/* Video controls toolbar */}
      {ready && trailerKey && (
        <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-black/60 backdrop-blur-sm">
          <div className="py-2 flex items-center gap-2 app-container">
            <button
              onClick={togglePlay}
              className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <Pause className="size-4" />
              ) : (
                <Play className="size-4 ml-0.5" />
              )}
            </button>
            <button
              onClick={handleStop}
              className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Stop"
            >
              <Square className="size-3.5" />
            </button>
            <div className="w-px h-5 bg-white/20 mx-1" />
            <button
              onClick={toggleMute}
              className={`flex size-9 items-center justify-center rounded-lg transition-colors ${
                muted
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-brand/30 text-brand hover:bg-brand/40"
              }`}
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <VolumeX className="size-4" />
              ) : (
                <Volume2 className="size-4" />
              )}
            </button>
            <div className="flex-1" />
            {playing && (
              <span className="flex items-center gap-1.5 text-xs text-white/60">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand" />
                </span>
                Playing
              </span>
            )}
            {!playing && <span className="text-xs text-white/60">Paused</span>}
            <button
              onClick={toggleFullscreen}
              className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {fullscreen ? (
                <Minimize className="size-4" />
              ) : (
                <Maximize className="size-4" />
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
