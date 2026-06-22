import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { fetchApi } from "@/services/api/fetchApi";
import type { TMDBMovieDetails } from "@/types/tmdb";
import { MovieHero } from "@/components/movie/movie-hero";
import { MoviePoster } from "@/components/movie/movie-poster";
import { MovieOverview } from "@/components/movie/movie-overview";
import { MovieCast } from "@/components/movie/movie-cast";
import { MovieVideos } from "@/components/movie/movie-videos";
import { MoviePhotos } from "@/components/movie/movie-photos";
import { MovieSidebar } from "@/components/movie/movie-sidebar";
import { RelatedMovies } from "@/components/movie/related-movies";

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

const APPEND_PARAMS = [
  "account_states",
  "alternative_titles",
  "credits",
  "external_ids",
  "images",
  "keywords",
  "lists",
  "recommendations",
  "release_dates",
  "reviews",
  "similar",
  "translations",
  "videos",
  "watch/providers",
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
            We couldn&apos;t find the movie you&apos;re looking for. It may not exist or there was an error
            loading it.
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

      {/* Two-column layout */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-10">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0 w-full max-w-[200px] mx-auto sm:mx-0">
                <MoviePoster posterPath={movie.poster_path} title={movie.title} priority />
              </div>
              <div className="flex-1 min-w-0">
                <MovieOverview
                  overview={movie.overview}
                  director={director?.name ?? null}
                  writers={writers.map((w) => w.name)}
                />
              </div>
            </div>

            <MovieCast cast={movie.credits?.cast ?? []} />

            <MovieVideos videos={movie.videos?.results ?? []} />

            <MoviePhotos
              backdrops={movie.images?.backdrops ?? []}
              posters={movie.images?.posters ?? []}
            />

            <RelatedMovies
              title="Recommendations"
              movies={movie.recommendations?.results ?? []}
            />

            <RelatedMovies
              title="Similar Movies"
              movies={movie.similar?.results ?? []}
            />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <MovieSidebar
              voteAverage={movie.vote_average}
              voteCount={movie.vote_count}
              popularity={movie.popularity}
              budget={movie.budget}
              revenue={movie.revenue}
              status={movie.status}
              originalLanguage={movie.original_language}
              releaseDate={movie.release_date}
              originalTitle={movie.original_title}
              title={movie.title}
              productionCompanies={movie.production_companies ?? []}
              keywords={movie.keywords?.keywords ?? []}
              translationsCount={movie.translations?.translations?.length ?? 0}
              spokenLanguagesCount={movie.spoken_languages?.length ?? 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
