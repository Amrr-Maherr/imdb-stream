"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { TMDBMovie } from "@/shared/types/tmdb";
import { slugify } from "@/shared/utils/slugify";
import { Slider } from "@/shared/components/ui/slider";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type FeaturedRowProps = {
  title: string;
  spotlight: TMDBMovie;
  genreMap?: Record<number, string>;
  children?: React.ReactNode;
};

export function FeaturedRow({
  title,
  spotlight,
  genreMap,
  children,
}: FeaturedRowProps) {
  const year = spotlight.release_date?.slice(0, 4);
  const vote = spotlight.vote_average.toFixed(1);
  const genres = spotlight.genre_ids
    ?.slice(0, 3)
    .map((id) => genreMap?.[id])
    .filter(Boolean) as string[] | undefined;

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">{title}</h2>
      <div className="flex flex-col gap-6">
        <Link
          href={`/movies/${slugify(spotlight.title)}/${spotlight.id}`}
          className="group relative w-full overflow-hidden rounded-xl bg-muted"
        >
          <div className="relative aspect-[2/1] sm:aspect-[3/1] w-full">
            {spotlight.backdrop_path ? (
              <Image
                src={`${TMDB_IMAGE_BASE}/w1280${spotlight.backdrop_path}`}
                alt={spotlight.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="100vw"
              />
            ) : spotlight.poster_path ? (
              <Image
                src={`${TMDB_IMAGE_BASE}/w500${spotlight.poster_path}`}
                alt={spotlight.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="100vw"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <h3 className="text-lg sm:text-2xl font-bold text-foreground line-clamp-1">
                {spotlight.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs sm:text-sm text-muted-foreground">
                {year && <span>{year}</span>}
                <span className="flex items-center gap-0.5">
                  <Star className="size-3 sm:size-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">{vote}</span>
                </span>
                {spotlight.vote_count > 0 && (
                  <span className="text-muted-foreground/70">
                    ({spotlight.vote_count.toLocaleString()})
                  </span>
                )}
                {genres && genres.length > 0 && (
                  <span className="hidden sm:flex items-center gap-1.5">
                    <span className="text-muted-foreground/40">|</span>
                    {genres.map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 text-[11px] font-medium rounded bg-background/60 text-foreground/80"
                      >
                        {g}
                      </span>
                    ))}
                  </span>
                )}
              </div>
              {spotlight.overview && (
                <p className="hidden sm:block text-sm text-muted-foreground/80 mt-2 line-clamp-2 max-w-2xl">
                  {spotlight.overview}
                </p>
              )}
            </div>
          </div>
        </Link>
        {children && (
          <Slider
            slidesPerView={5}
            slidesMobilePerView={2.5}
            spaceBetween={14}
            grabCursor
            freeMode
          >
            {children}
          </Slider>
        )}
      </div>
    </section>
  );
}
