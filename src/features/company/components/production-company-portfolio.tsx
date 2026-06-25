"use client";

import type { TMDBCompanyMovie, TMDBMovie } from "@/shared/types/tmdb";
import { MovieCard } from "@/features/movies/components/listing/movie-card";
import { MediaRow } from "@/features/movies/components/listing/media-row";

type ProductionCompanyPortfolioProps = {
  movies: TMDBCompanyMovie[];
};

export function ProductionCompanyPortfolio({ movies }: ProductionCompanyPortfolioProps) {
  const popularWorks = [...movies]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 20);

  const recentWorks = [...movies]
    .filter((m) => m.release_date)
    .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
    .slice(0, 20);

  const topRated = [...movies]
    .filter((m) => m.vote_count > 10)
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 20);

  const sections = [
    ...(popularWorks.length > 0
      ? [
          {
            title: "Popular Works",
            subtitle: "Most popular productions",
            slidesPerView: 5 as const,
            slidesMobilePerView: 2.5 as const,
            spaceBetween: 16 as const,
            items: popularWorks,
          },
        ]
      : []),
    ...(recentWorks.length > 0
      ? [
          {
            title: "Recent Works",
            subtitle: "Latest releases",
            slidesPerView: 4 as const,
            slidesMobilePerView: 2 as const,
            spaceBetween: 20 as const,
            items: recentWorks,
          },
        ]
      : []),
    ...(topRated.length > 0
      ? [
          {
            title: "Top Rated",
            subtitle: "Highest rated productions",
            slidesPerView: 3.5 as const,
            slidesMobilePerView: 1.5 as const,
            spaceBetween: 24 as const,
            items: topRated,
          },
        ]
      : []),
  ];

  if (sections.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-bold text-foreground mb-6">Productions</h2>
        <p className="text-muted-foreground">No productions available.</p>
      </section>
    );
  }

  return (
    <section className="space-y-10">
      {sections.map((section) => (
        <MediaRow
          key={section.title}
          title={section.title}
          subtitle={section.subtitle}
          slidesPerView={section.slidesPerView}
          slidesMobilePerView={section.slidesMobilePerView}
          spaceBetween={section.spaceBetween}
        >
          {section.items.map((movie) => (
            <MovieCard key={movie.id} movie={movie as TMDBMovie} />
          ))}
        </MediaRow>
      ))}
    </section>
  );
}
