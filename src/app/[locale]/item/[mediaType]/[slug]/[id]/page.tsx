import { fetchApi } from "@/shared/services/fetchApi";
import { ErrorState } from "@/shared/components/error-state";
import type { TMDBMovieDetails, TMDBTVDetails } from "@/shared/types/tmdb";
import { MovieHero } from "@/features/movies/components/detail/movie-hero";
import { MovieCollection } from "@/features/movies/components/detail/movie-collection";
import { MovieMainContent } from "@/features/movies/components/detail/movie-main-content";
import { MovieSidebarColumn } from "@/features/movies/components/detail/movie-sidebar-column";
import { TvMainContent } from "@/features/tv/components/detail/tv-main-content";
import { TvSidebarColumn } from "@/features/tv/components/detail/tv-sidebar-column";

interface Props {
  params: Promise<{ locale: string; mediaType: string; slug: string; id: string }>;
}

const MOVIE_APPEND = [
  "account_states", "alternative_titles", "credits", "external_ids",
  "images", "keywords", "lists", "recommendations", "release_dates",
  "reviews", "similar", "translations", "videos", "watch/providers",
].join(",");

const TV_APPEND = [
  "account_states", "aggregate_credits", "alternative_titles",
  "content_ratings", "credits", "external_ids", "images", "keywords",
  "lists", "recommendations", "reviews", "similar", "translations",
  "videos", "watch/providers",
].join(",");

async function getMovie(id: string) {
  return fetchApi<TMDBMovieDetails>({
    endpoint: `movie/${id}?append_to_response=${MOVIE_APPEND}`,
    revalidate: 3600,
  });
}

async function getTvShow(id: string) {
  return fetchApi<TMDBTVDetails>({
    endpoint: `tv/${id}?append_to_response=${TV_APPEND}`,
    revalidate: 3600,
  });
}

export async function generateMetadata({ params }: Props) {
  const { mediaType, id } = await params;
  try {
    if (mediaType === "movie") {
      const movie = await getMovie(id);
      return {
        title: movie.title,
        description: movie.tagline || movie.overview?.slice(0, 160),
      };
    }
    const show = await getTvShow(id);
    return {
      title: show.name,
      description: show.tagline || show.overview?.slice(0, 160),
    };
  } catch {
    return { title: mediaType === "movie" ? "Movie" : "TV Show" };
  }
}

export default async function ListItemPage({ params }: Props) {
  const { mediaType, id } = await params;

  const { slug } = await params;

  if (mediaType === "movie") {
    return <MovieContent id={id} />;
  }
  if (mediaType === "tv") {
    return <TvContent id={id} slug={slug} />;
  }

  return (
    <ErrorState
      title="Invalid media type"
      description={`The media type "${mediaType}" is not supported.`}
      actionLabel="Go Home"
      actionHref="/"
    />
  );
}

async function MovieContent({ id }: { id: string }) {
  let movie: TMDBMovieDetails;
  try {
    movie = await getMovie(id);
  } catch {
    return (
      <ErrorState
        title="Movie not found"
        description="We couldn't find the movie you're looking for. It may not exist or there was an error loading it."
        actionLabel="Go Home"
        actionHref="/"
      />
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
        movie={movie}
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

async function TvContent({ id, slug }: { id: string; slug: string }) {
  let show: TMDBTVDetails;
  try {
    show = await getTvShow(id);
  } catch {
    return (
      <ErrorState
        title="TV Show not found"
        description="We couldn't find the TV show you're looking for."
        actionLabel="Go Home"
        actionHref="/"
      />
    );
  }

  const year = show.first_air_date?.slice(0, 4) ?? "";
  const trailers = (show.videos?.results ?? []).filter(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"),
  );
  const usRating = (show.content_ratings?.results ?? []).find(
    (r) => r.iso_3166_1 === "US",
  );
  const certification = usRating?.rating ?? "";
  const runtime = show.episode_run_time?.[0] ?? 0;
  const creators = show.created_by?.map((c) => c.name) ?? [];

  return (
    <div className="flex flex-col flex-1 bg-background">
      <MovieHero
        backdropPath={show.backdrop_path}
        title={show.name}
        year={year}
        certification={certification}
        runtime={runtime}
        tagline={show.tagline}
        overview={show.overview}
        voteAverage={show.vote_average}
        voteCount={show.vote_count}
        genres={show.genres ?? []}
        trailerKey={trailers[0]?.key ?? null}
        imdbId={show.external_ids?.imdb_id ?? null}
        homepage={show.homepage || null}
        movie={{ ...show, title: show.name }}
      />

      <div className="w-full mx-auto app-container mt-8 md:mt-10 pb-16 space-y-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          <TvMainContent show={show} slug={slug} creators={creators} />
          <TvSidebarColumn show={show} creators={creators} />
        </div>
      </div>
    </div>
  );
}


