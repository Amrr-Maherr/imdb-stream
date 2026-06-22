"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Info, Play, Star } from "lucide-react";
import type { TMDBMovie } from "@/types/tmdb";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type HeroBannerProps = {
  movies: TMDBMovie[];
};

export function HeroBanner({ movies }: HeroBannerProps) {
  const [current, setCurrent] = useState(0);
  const movie = movies[current];

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % movies.length);
  }, [movies.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + movies.length) % movies.length);
  }, [movies.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  if (!movie) return null;

  const releaseYear = movie.release_date?.slice(0, 4);
  const vote = movie.vote_average.toFixed(1);

  return (
    <section className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] max-h-[900px] overflow-hidden">
      {movies.map((m, i) => (
        <div
          key={m.id}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={`${TMDB_IMAGE_BASE}/original${m.backdrop_path}`}
            alt={m.title}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-full flex-col justify-end pb-20 md:pb-32 lg:pb-40 max-w-2xl">
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
              {releaseYear && (
                <span className="font-medium">{releaseYear}</span>
              )}
              <div className="flex items-center gap-1">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-white">{vote}</span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-white/70 line-clamp-3 leading-relaxed max-w-xl">
              {movie.overview}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={`/movies/${movie.id}`}
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground hover:bg-brand/90 transition-all"
              >
                <Play className="size-4 fill-current" />
                Watch
              </Link>
              <Link
                href={`/movies/${movie.id}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all"
              >
                <Info className="size-4" />
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-4 sm:right-8 lg:right-12 flex items-center gap-3">
        <button
          onClick={prev}
          aria-label="Previous movie"
          className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex items-center gap-2">
          {movies.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-brand"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next movie"
          className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white hover:bg-white/20 transition-all"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </section>
  );
}
