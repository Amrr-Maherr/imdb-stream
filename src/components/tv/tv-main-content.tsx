import type { TMDBTVDetails } from "@/types/tmdb";
import { Building, Users, MessageSquare, Languages, List, Link2 } from "lucide-react";
import { MoviePoster } from "@/components/movie/movie-poster";
import { MovieOverview } from "@/components/movie/movie-overview";
import { MovieSection } from "@/components/movie/movie-section";
import { MovieCast } from "@/components/movie/movie-cast";
import { MovieVideos } from "@/components/movie/movie-videos";
import { MoviePhotos } from "@/components/movie/movie-photos";
import { MovieProductionCompanies } from "@/components/movie/movie-production-companies";
import { MovieReviews } from "@/components/movie/movie-reviews";
import { MovieAlternativeTitles } from "@/components/movie/movie-alternative-titles";
import { MovieLists } from "@/components/movie/movie-lists";
import { MovieExternalLinks } from "@/components/movie/movie-external-links";
import { FadeIn } from "@/components/movie/fade-in";
import { CrewCard } from "@/components/movie/crew-card";
import { Slider } from "@/components/ui/slider";
import { TvSeasons } from "./tv-seasons";
import { TvContentRatings } from "./tv-content-ratings";
import { RelatedTvShows } from "./related-tv-shows";

type TvMainContentProps = {
  show: TMDBTVDetails;
  slug: string;
  creators: string[];
};

export function TvMainContent({ show, slug, creators }: TvMainContentProps) {
  const allCrew = show.aggregate_credits?.crew ?? show.credits?.crew ?? [];
  const reviews = show.reviews?.results ?? [];
  const altTitles = show.alternative_titles?.results ?? [];
  const ratings = show.content_ratings?.results ?? [];
  const lists = show.lists?.results ?? [];

  const externalIds = show.external_ids
    ? {
        imdb_id: show.external_ids.imdb_id,
        facebook_id: show.external_ids.facebook_id,
        instagram_id: show.external_ids.instagram_id,
        twitter_id: show.external_ids.twitter_id,
        wikidata_id: null as string | null,
      }
    : null;

  return (
    <div className="flex-1 min-w-0 space-y-10">
      <FadeIn>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-shrink-0 w-full max-w-[200px] mx-auto sm:mx-0">
            <MoviePoster posterPath={show.poster_path} title={show.name} priority />
          </div>
          <div className="flex-1 min-w-0">
            <MovieOverview overview={show.overview} director={null} writers={creators} />
          </div>
        </div>
      </FadeIn>

      {show.production_companies && show.production_companies.length > 0 && (
        <FadeIn delay={0.05}>
          <MovieSection title="Production Companies" icon={<Building className="size-5" />}>
            <MovieProductionCompanies companies={show.production_companies} />
          </MovieSection>
        </FadeIn>
      )}

      {allCrew.length > 0 && (
        <FadeIn delay={0.1}>
          <MovieSection title="Series Crew" icon={<Users className="size-5" />}>
            <Slider
              slidesPerView={6}
              slidesMobilePerView={3}
              spaceBetween={14}
              grabCursor
              freeMode
              className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
            >
              {allCrew.slice(0, 30).map((m, idx) => (
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

      <FadeIn delay={0.15}>
        <MovieCast cast={show.credits?.cast ?? []} />
      </FadeIn>

      <FadeIn delay={0.2}>
        <TvSeasons seasons={show.seasons ?? []} tvId={show.id} tvSlug={slug} />
      </FadeIn>

      {ratings.length > 0 && (
        <FadeIn delay={0.25}>
          <MovieSection title="Content Ratings" icon={<Link2 className="size-5" />}>
            <TvContentRatings ratings={ratings} />
          </MovieSection>
        </FadeIn>
      )}

      <FadeIn delay={0.25}>
        <MovieVideos videos={show.videos?.results ?? []} />
      </FadeIn>

      <FadeIn delay={0.3}>
        <MoviePhotos
          backdrops={show.images?.backdrops ?? []}
          posters={show.images?.posters ?? []}
          logos={show.images?.logos ?? []}
        />
      </FadeIn>

      {reviews.length > 0 && (
        <FadeIn delay={0.35}>
          <MovieSection title="Reviews" icon={<MessageSquare className="size-5" />}>
            <MovieReviews reviews={reviews} />
          </MovieSection>
        </FadeIn>
      )}

      <FadeIn delay={0.4}>
        <RelatedTvShows title="Recommendations" shows={show.recommendations?.results ?? []} />
      </FadeIn>

      <FadeIn delay={0.45}>
        <RelatedTvShows title="Similar Shows" shows={show.similar?.results ?? []} />
      </FadeIn>

      {altTitles.length > 0 && (
        <FadeIn delay={0.5}>
          <MovieSection title="Alternative Titles" icon={<Languages className="size-5" />}>
            <MovieAlternativeTitles titles={altTitles} />
          </MovieSection>
        </FadeIn>
      )}

      {lists.length > 0 && (
        <FadeIn delay={0.55}>
          <MovieSection title="Lists" icon={<List className="size-5" />}>
            <MovieLists lists={lists} />
          </MovieSection>
        </FadeIn>
      )}

      <FadeIn delay={0.6}>
        <MovieSection title="External Links" icon={<Link2 className="size-5" />}>
          <MovieExternalLinks ids={externalIds} homepage={show.homepage || null} />
        </MovieSection>
      </FadeIn>
    </div>
  );
}
