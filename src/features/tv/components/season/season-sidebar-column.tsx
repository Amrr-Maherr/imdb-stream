import {
  Star,
  Calendar,
  BarChart3,
  Languages,
  Users,
  Link2,
} from "lucide-react";
import type { TVSeasonDetails, TVSeason } from "@/shared/types/tmdb";
import { MovieSection } from "@/features/movies/components/detail/movie-section";
import { MovieExternalLinks } from "@/features/movies/components/detail/movie-external-links";
import { MovieVideos } from "@/features/movies/components/detail/movie-videos";
import { CrewCard } from "@/features/movies/components/detail/crew-card";
import { FadeIn } from "@/features/movies/components/detail/fade-in";
import { Slider } from "@/shared/components/ui/slider";
import { TvSeasons } from "@/features/tv/components/detail/tv-seasons";

type SeasonSidebarColumnProps = {
  season: TVSeasonDetails;
  allSeasons: TVSeason[];
  tvSlug: string;
  tvId: string;
};

export function SeasonSidebarColumn({
  season,
  allSeasons,
  tvSlug,
  tvId,
}: SeasonSidebarColumnProps) {
  const allCrew = season.aggregate_credits?.crew ?? season.credits?.crew ?? [];
  const videos = season.videos?.results ?? [];
  const languages = season.episodes.reduce((acc: Set<string>, ep) => {
    // Episodes don't have language data on season endpoint
    return acc;
  }, new Set<string>());

  const externalIds = season.external_ids
    ? {
        imdb_id: season.external_ids.imdb_id,
        facebook_id: null as string | null,
        instagram_id: null as string | null,
        twitter_id: null as string | null,
        wikidata_id: null as string | null,
      }
    : null;

  return (
    <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-10">
      <FadeIn delay={0.05}>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
            Season Statistics
          </h3>
          <div className="space-y-3">
            {season.air_date && (
              <div className="flex items-center gap-3">
                <Calendar className="size-4 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Air Date</p>
                  <p className="text-sm text-foreground">
                    {new Date(season.air_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <BarChart3 className="size-4 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Episodes</p>
                <p className="text-sm text-foreground">
                  {season.episodes.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="size-4 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Vote Average</p>
                <p className="text-sm text-foreground font-medium">
                  {season.vote_average.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {allCrew.length > 0 && (
        <FadeIn delay={0.1}>
          <MovieSection title="Crew" icon={<Users className="size-5" />}>
            <Slider
              slidesPerView={3}
              slidesMobilePerView={4}
              spaceBetween={14}
              grabCursor
              freeMode
              className="-mx-4 sm:-mx-0 px-4 sm:px-0 pb-8"
            >
              {allCrew.slice(0, 20).map((m, idx) => (
                <CrewCard
                  key={`${m.credit_id}-${idx}`}
                  id={m.id}
                  name={m.name}
                  job={m.job}
                  department={m.department}
                  profilePath={m.profile_path}
                  creditId={m.credit_id}
                />
              ))}
            </Slider>
          </MovieSection>
        </FadeIn>
      )}

      {videos.length > 0 && (
        <FadeIn delay={0.15}>
          <MovieSection title="Videos" icon={null}>
            <MovieVideos videos={videos} />
          </MovieSection>
        </FadeIn>
      )}

      {allSeasons?.length > 1 && (
        <FadeIn delay={0.2}>
          <TvSeasons seasons={allSeasons} tvId={Number(tvId)} tvSlug={tvSlug} />
        </FadeIn>
      )}

      {externalIds && (
        <FadeIn delay={0.25}>
          <MovieSection
            title="External Links"
            icon={<Link2 className="size-5" />}
          >
            <MovieExternalLinks ids={externalIds} homepage={null} />
          </MovieSection>
        </FadeIn>
      )}
    </div>
  );
}
