import type { TMDBTVDetails } from "@/types/tmdb";
import { Tv } from "lucide-react";
import { MovieWatchProviders } from "@/components/movie/movie-watch-providers";
import { FadeIn } from "@/components/movie/fade-in";
import { TvSidebar } from "./tv-sidebar";

type TvSidebarColumnProps = {
  show: TMDBTVDetails;
  creators: string[];
};

export function TvSidebarColumn({ show, creators }: TvSidebarColumnProps) {
  const watchProviders = show["watch/providers"] ?? null;

  return (
    <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-8">
      <FadeIn delay={0.05}>
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
          productionCountries={show.production_countries ?? []}
          keywords={show.keywords?.results ?? []}
          languages={show.languages ?? []}
          translationsCount={show.translations?.translations?.length ?? 0}
          spokenLanguagesCount={show.spoken_languages?.length ?? 0}
          originalName={show.original_name}
          name={show.name}
          inProduction={show.in_production}
          originCountry={show.origin_country ?? []}
        />
      </FadeIn>

      {watchProviders && (
        <FadeIn delay={0.1}>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Tv className="size-4 text-muted-foreground" />
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Watch</h3>
            </div>
            <MovieWatchProviders providers={watchProviders} />
          </div>
        </FadeIn>
      )}
    </div>
  );
}
