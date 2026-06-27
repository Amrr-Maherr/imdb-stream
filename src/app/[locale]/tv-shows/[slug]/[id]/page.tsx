import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { fetchApi } from "@/shared/services/fetchApi";
import type { TMDBTVDetails } from "@/shared/types/tmdb";
import { MovieHero } from "@/features/movies/components/detail/movie-hero";
import { TvMainContent } from "@/features/tv/components/detail/tv-main-content";
import { TvSidebarColumn } from "@/features/tv/components/detail/tv-sidebar-column";

interface Props {
  params: Promise<{ locale: string; slug: string; id: string }>;
}

const APPEND_PARAMS = [
  "account_states", "aggregate_credits", "alternative_titles",
  "content_ratings", "credits", "external_ids", "images", "keywords",
  "lists", "recommendations", "reviews", "similar", "translations",
  "videos", "watch/providers",
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
          <h1 className="text-2xl font-bold text-foreground">TV Show not found</h1>
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
