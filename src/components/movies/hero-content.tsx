"use client";

import Link from "next/link";
import { Info, Play, Star } from "lucide-react";
import type { TMDBMovie } from "@/types/tmdb";
import { slugify } from "@/lib/slugify";

export function HeroContent({ movie }: { movie: TMDBMovie }) {
  const releaseYear = movie.release_date?.slice(0, 4);
  const vote = movie.vote_average.toFixed(1);

  return (
    <div className="relative h-full mx-auto app-container">
      <div className="flex h-full flex-col justify-center items-start py-10 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
            {releaseYear && <span className="font-medium">{releaseYear}</span>}
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
              href={`/movies/${slugify(movie.title)}/${movie.id}`}
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground hover:bg-brand/90 transition-all"
            >
              <Play className="size-4 fill-current" />
              Watch
            </Link>

            <Link
              href={`/movies/${slugify(movie.title)}/${movie.id}`}
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all"
            >
              <Info className="size-4" />
              More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
