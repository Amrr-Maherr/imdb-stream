'use client';

import type { TMDBTVDetails } from '@/shared/types/tmdb';
import { useTranslations } from 'next-intl';
import {
  Building,
  Languages,
  Link2,
  List,
  MessageSquare,
  ShieldCheck,
  UserRoundCog,
  Users,
} from 'lucide-react';
import { MoviePoster } from '@/features/movies/components/detail/movie-poster';
import { MovieOverview } from '@/features/movies/components/detail/movie-overview';
import { MovieSection } from '@/features/movies/components/detail/movie-section';
import { FullCastSlider } from '@/features/movies/components/detail/full-cast-slider';
import { MovieVideos } from '@/features/movies/components/detail/movie-videos';
import { MoviePhotos } from '@/features/movies/components/detail/movie-photos';
import { MovieProductionCompanies } from '@/features/movies/components/detail/movie-production-companies';
import { MovieReviews } from '@/features/movies/components/detail/movie-reviews';
import { MovieAlternativeTitles } from '@/features/movies/components/detail/movie-alternative-titles';
import { MovieLists } from '@/features/movies/components/detail/movie-lists';
import { MovieExternalLinks } from '@/features/movies/components/detail/movie-external-links';
import { FadeIn } from '@/features/movies/components/detail/fade-in';
import { CrewCard } from '@/features/movies/components/detail/crew-card';
import { Slider } from '@/shared/components/ui/slider';
import { TvSeasons } from './tv-seasons';
import { TvContentRatings } from './tv-content-ratings';
import { RelatedTvShows } from './related-tv-shows';

type TvMainContentProps = {
  show: TMDBTVDetails;
  slug: string;
  creators: string[];
};

export function TvMainContent({ show, slug, creators }: TvMainContentProps) {
  const t = useTranslations('TvDetail');
  const allCrew = show.aggregate_credits?.crew ?? show.credits?.crew ?? [];
  const allCast = show.aggregate_credits?.cast ?? show.credits?.cast ?? [];
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

  const videos = show.videos?.results ?? [];
  const recommendations = show.recommendations?.results ?? [];
  const similar = show.similar?.results ?? [];
  const hasMedia =
    videos.length > 0 ||
    (show.images?.backdrops?.length ?? 0) > 0 ||
    (show.images?.posters?.length ?? 0) > 0;

  return (
    <div className="flex-1 min-w-0 space-y-14">
      <FadeIn>
        <div id="overview" className="scroll-mt-32 flex flex-col gap-6 sm:flex-row lg:gap-8">
          {/* The poster lives in the hero from md up */}
          <div className="mx-auto w-full max-w-[160px] flex-shrink-0 sm:mx-0 sm:max-w-[190px] md:hidden">
            <MoviePoster posterPath={show.poster_path} title={show.name} priority />
          </div>
          <div className="flex-1 min-w-0">
            <MovieOverview
              overview={show.overview}
              director={null}
              writers={creators}
              writersLabel={t('createdBy')}
            />
          </div>
        </div>
      </FadeIn>

      {(show.seasons?.some((season) => season.season_number > 0) ?? false) && (
        <div id="seasons" className="scroll-mt-32">
          <FadeIn>
            <TvSeasons seasons={show.seasons ?? []} tvId={show.id} tvSlug={slug} />
          </FadeIn>
        </div>
      )}

      {(allCast.length > 0 || allCrew.length > 0) && (
        <div id="cast" className="scroll-mt-32 space-y-12">
          {allCast.length > 0 && (
            <FadeIn>
              <MovieSection title={t('castTitle')} icon={<Users />}>
                <FullCastSlider cast={allCast} />
              </MovieSection>
            </FadeIn>
          )}
          {allCrew.length > 0 && (
            <FadeIn>
              <MovieSection title={t('seriesCrew')} icon={<UserRoundCog />}>
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
        </div>
      )}

      {hasMedia && (
        <div id="media" className="scroll-mt-32 space-y-12">
          <FadeIn>
            <MovieVideos videos={videos} />
          </FadeIn>
          <FadeIn>
            <MoviePhotos
              backdrops={show.images?.backdrops ?? []}
              posters={show.images?.posters ?? []}
              logos={show.images?.logos ?? []}
            />
          </FadeIn>
        </div>
      )}

      {reviews.length > 0 && (
        <FadeIn>
          <MovieSection id="reviews" title={t('reviews')} icon={<MessageSquare />}>
            <MovieReviews reviews={reviews} />
          </MovieSection>
        </FadeIn>
      )}

      {(recommendations.length > 0 || similar.length > 0) && (
        <div id="more" className="scroll-mt-32 space-y-12">
          <FadeIn>
            <RelatedTvShows title={t('recommendations')} shows={recommendations} />
          </FadeIn>
          <FadeIn>
            <RelatedTvShows title={t('similarShows')} shows={similar} />
          </FadeIn>
        </div>
      )}

      <div id="details" className="scroll-mt-32 space-y-12">
        {show.production_companies && show.production_companies.length > 0 && (
          <FadeIn>
            <MovieSection title={t('productionCompanies')} icon={<Building />}>
              <MovieProductionCompanies companies={show.production_companies} />
            </MovieSection>
          </FadeIn>
        )}

        {ratings.length > 0 && (
          <FadeIn>
            <MovieSection title={t('contentRatings')} icon={<ShieldCheck />}>
              <TvContentRatings ratings={ratings} />
            </MovieSection>
          </FadeIn>
        )}

        {altTitles.length > 0 && (
          <FadeIn>
            <MovieSection title={t('alternativeTitles')} icon={<Languages />}>
              <MovieAlternativeTitles titles={altTitles} />
            </MovieSection>
          </FadeIn>
        )}

        {lists.length > 0 && (
          <FadeIn>
            <MovieSection title={t('lists')} icon={<List />}>
              <MovieLists lists={lists} />
            </MovieSection>
          </FadeIn>
        )}

        <FadeIn>
          <MovieSection title={t('externalLinks')} icon={<Link2 />}>
            <MovieExternalLinks ids={externalIds} homepage={show.homepage || null} />
          </MovieSection>
        </FadeIn>
      </div>
    </div>
  );
}

