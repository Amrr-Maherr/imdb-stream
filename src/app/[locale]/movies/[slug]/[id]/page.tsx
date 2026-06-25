import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { fetchApi } from "@/shared/services/fetchApi";
import type { TMDBMovieDetails } from "@/shared/types/tmdb";
import { MovieHero } from "@/features/movies/components/detail/movie-hero";
import { MovieCollection } from "@/features/movies/components/detail/movie-collection";
import { MovieMainContent } from "@/features/movies/components/detail/movie-main-content";
import { MovieSidebarColumn } from "@/features/movies/components/detail/movie-sidebar-column";

interface Props {
  params: Promise<{ locale: string; slug: string; id: string }>;
}

const APPEND_PARAMS = [
  "account_states", "alternative_titles", "credits", "external_ids",
  "images", "keywords", "lists", "recommendations", "release_dates",
  "reviews", "similar", "translations", "videos", "watch/providers",
].join(",");

async function getMovie(id: string) {
  return fetchApi<TMDBMovieDetails>({
    endpoint: `movie/${id}?append_to_response=${APPEND_PARAMS}`,
    revalidate: 3600,
  });
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const movie = await getMovie(id);
    return {
      title: movie.title,
      description: movie.tagline || movie.overview?.slice(0, 160),
    };
  } catch {
    return { title: "Movie" };
  }
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;

  let movie: TMDBMovieDetails;
  try {
    movie = await getMovie(id);
  } catch {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-background p-8">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <AlertCircle className="size-12 text-muted-foreground" />
          <h1 className="text-2xl font-bold text-foreground">Movie not found</h1>
          <p className="text-muted-foreground">
            We couldn&apos;t find the movie you&apos;re looking for. It may not
            exist or there was an error loading it.
          </p>
          <Link
            href="/"
            className="mt-2 inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90 transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const year = movie.release_date?.slice(0, 4) ?? "";
  const trailers = (movie.videos?.results ?? []).filter(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"),
  );
  const director = movie.credits?.crew?.find((c) => c.job === "Director");
  const writers = (movie.credits?.crew ?? []).filter((c) => c.department === "Writing");
  const usRelease = (movie.release_dates?.results ?? []).find((r) => r.iso_3166_1 === "US");
  const certification = usRelease?.release_dates?.[0]?.certification ?? "";

  return (
    <div className="flex flex-col flex-1 bg-background">
      <MovieHero
        backdropPath={movie.backdrop_path}
        title={movie.title}
        year={year}
        certification={certification}
        runtime={movie.runtime}
        tagline={movie.tagline}
        overview={movie.overview}
        voteAverage={movie.vote_average}
        voteCount={movie.vote_count}
        genres={movie.genres ?? []}
        trailerKey={trailers[0]?.key ?? null}
        imdbId={movie.external_ids?.imdb_id ?? null}
        homepage={movie.homepage || null}
      />

      <div className="w-full mx-auto app-container mt-8 md:mt-10 pb-16 space-y-8">
        {movie.belongs_to_collection && (
          <MovieCollection collection={movie.belongs_to_collection} />
        )}

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          <MovieMainContent
            movie={movie}
            directorName={director?.name ?? null}
            writers={writers.map((w) => w.name)}
          />
          <MovieSidebarColumn movie={movie} />
        </div>
      </div>
    </div>
  );
}
