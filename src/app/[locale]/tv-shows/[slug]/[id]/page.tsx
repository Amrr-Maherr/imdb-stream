import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { fetchApi } from "@/services/api/fetchApi";
import type { TMDBTVDetails } from "@/types/tmdb";
import { MovieHero } from "@/components/movie/movie-hero";
import { MoviePoster } from "@/components/movie/movie-poster";
import { MovieOverview } from "@/components/movie/movie-overview";
import { MovieCast } from "@/components/movie/movie-cast";
import { MovieVideos } from "@/components/movie/movie-videos";
import { MoviePhotos } from "@/components/movie/movie-photos";
import { MediaRow } from "@/components/movies/media-row";
import { TvCard } from "@/components/movies/tv-card";
import { TvSidebar } from "@/components/tv/tv-sidebar";
import { TvSeasons } from "@/components/tv/tv-seasons";

interface Props {
  params: Promise<{ locale: string; slug: string; id: string }>;
}

const APPEND_PARAMS = [
  "account_states",
  "aggregate_credits",
  "alternative_titles",
  "content_ratings",
  "credits",
  "external_ids",
  "images",
  "keywords",
  "lists",
  "recommendations",
  "reviews",
  "similar",
  "translations",
  "videos",
  "watch/providers",
].join(",");

async function getTvShow(id: string) {
  return fetchApi<TMDBTVDetails>({
    endpoint: `tv/${id}?append_to_response=${APPEND_PARAMS}`,
    revalidate: 3600,
  });
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const show = await getTvShow(id);
    return {
      title: show.name,
      description: show.tagline || show.overview?.slice(0, 160),
    };
  } catch {
    return { title: "TV Show" };
  }
}

export default async function TvShowPage({ params }: Props) {
  const { id, slug } = await params;

  let show: TMDBTVDetails;
  try {
    show = await getTvShow(id);
  } catch {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-background p-8">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <AlertCircle className="size-12 text-muted-foreground" />
          <h1 className="text-2xl font-bold text-foreground">
            TV Show not found
          </h1>
          <p className="text-muted-foreground">
            We couldn&apos;t find the TV show you&apos;re looking for.
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

  const year = show.first_air_date?.slice(0, 4) ?? "";
  const trailers = (show.videos?.results ?? []).filter(
    (v) =>
      v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"),
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
      />

      <div className="w-full mx-auto px-4 app-container mt-8 md:mt-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="flex-1 min-w-0 space-y-10">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0 w-full max-w-[200px] mx-auto sm:mx-0">
                <MoviePoster
                  posterPath={show.poster_path}
                  title={show.name}
                  priority
                />
              </div>
              <div className="flex-1 min-w-0">
                <MovieOverview
                  overview={show.overview}
                  director={null}
                  writers={creators}
                />
              </div>
            </div>

            <MovieCast cast={show.credits?.cast ?? []} />

            <TvSeasons
              seasons={show.seasons ?? []}
              tvId={show.id}
              tvSlug={slug}
            />

            <MovieVideos videos={show.videos?.results ?? []} />

            <MoviePhotos
              backdrops={show.images?.backdrops ?? []}
              posters={show.images?.posters ?? []}
            />

            {show.recommendations &&
              show.recommendations.results.length > 0 && (
                <MediaRow title="Recommendations">
                  {show.recommendations.results.map((tv) => (
                    <TvCard key={tv.id} tv={tv} />
                  ))}
                </MediaRow>
              )}
            {show.similar && show.similar.results.length > 0 && (
              <MediaRow title="Similar Shows">
                {show.similar.results.map((tv) => (
                  <TvCard key={tv.id} tv={tv} />
                ))}
              </MediaRow>
            )}
          </div>

          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <TvSidebar
              voteAverage={show.vote_average}
              voteCount={show.vote_count}
              popularity={show.popularity}
              status={show.status}
              type={show.type}
              originalLanguage={show.original_language}
              firstAirDate={show.first_air_date}
              lastAirDate={show.last_air_date}
              numberOfSeasons={show.number_of_seasons}
              numberOfEpisodes={show.number_of_episodes}
              episodeRuntime={show.episode_run_time}
              networks={show.networks ?? []}
              createdBy={creators}
              productionCompanies={show.production_companies ?? []}
              keywords={show.keywords?.results ?? []}
              languages={show.languages ?? []}
              translationsCount={show.translations?.translations?.length ?? 0}
              spokenLanguagesCount={show.spoken_languages?.length ?? 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
