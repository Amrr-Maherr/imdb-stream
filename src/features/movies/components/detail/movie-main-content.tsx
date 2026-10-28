import { useTranslations } from 'next-intl';
import type { TMDBMovieDetails } from '@/shared/types/tmdb';
import {
  Building,
  Calendar,
  Languages,
  Link2,
  List,
  MessageSquare,
  Users,
  UserRoundCog,
} from 'lucide-react';
import { MoviePoster } from './movie-poster';
import { MovieOverview } from './movie-overview';
import { MovieSection } from './movie-section';
import { MovieProductionCompanies } from './movie-production-companies';
import { MovieCrewSection } from './movie-crew';
import { FullCastSlider } from './full-cast-slider';
import { MovieVideos } from './movie-videos';
import { MoviePhotos } from './movie-photos';
import { MovieReviews } from './movie-reviews';
import { RelatedMovies } from './related-movies';
import { MovieAlternativeTitles } from './movie-alternative-titles';
import { MovieReleaseDates } from './movie-release-dates';
import { MovieLists } from './movie-lists';
import { MovieExternalLinks } from './movie-external-links';
import { FadeIn } from './fade-in';

type MovieMainContentProps = {
  movie: TMDBMovieDetails;
  directorName: string | null;
  writers: string[];
};

/**
 * Main column of the movie page, grouped the way people scan a title:
 * story → who's in it → trailers & stills → what others think → what to watch next,
 * with reference data (companies, release dates, alt titles…) at the end.
 * Group ids are the targets of the sticky DetailNav.
 */
export function MovieMainContent({ movie, directorName, writers }: MovieMainContentProps) {
  const t = useTranslations('MovieDetail');
  const allCrew = movie.credits?.crew ?? [];
  const cast = movie.credits?.cast ?? [];
  const reviews = movie.reviews?.results ?? [];
  const altTitles = movie.alternative_titles?.titles ?? [];
  const releaseDates = movie.release_dates?.results ?? [];
  const lists = movie.lists?.results ?? [];
  const videos = movie.videos?.results ?? [];
  const recommendations = movie.recommendations?.results ?? [];
  const similar = movie.similar?.results ?? [];
  const hasMedia =
    videos.length > 0 ||
    (movie.images?.backdrops?.length ?? 0) > 0 ||
    (movie.images?.posters?.length ?? 0) > 0;

  return (
    <div className="flex-1 min-w-0 space-y-14">
      <FadeIn>
        <div id="overview" className="scroll-mt-32 flex flex-col gap-6 sm:flex-row lg:gap-8">
          {/* The poster lives in the hero from md up */}
          <div className="mx-auto w-full max-w-[160px] flex-shrink-0 sm:mx-0 sm:max-w-[190px] md:hidden">
            <MoviePoster posterPath={movie.poster_path} title={movie.title} priority />
          </div>
          <div className="flex-1 min-w-0">
            <MovieOverview overview={movie.overview} director={directorName} writers={writers} />
          </div>
        </div>
      </FadeIn>

      {(cast.length > 0 || allCrew.length > 0) && (
        <div id="cast" className="scroll-mt-32 space-y-12">
          {cast.length > 0 && (
            <FadeIn>
              <MovieSection title={t('castTitle')} icon={<Users />}>
                <FullCastSlider cast={cast} />
              </MovieSection>
            </FadeIn>
          )}
          {allCrew.length > 0 && (
            <FadeIn>
              <MovieSection title={t('fullCrew')} icon={<UserRoundCog />}>
                <MovieCrewSection crew={allCrew} />
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
              backdrops={movie.images?.backdrops ?? []}
              posters={movie.images?.posters ?? []}
              logos={movie.images?.logos ?? []}
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
            <RelatedMovies title={t('recommendations')} movies={recommendations} />
          </FadeIn>
          <FadeIn>
            <RelatedMovies title={t('similarMovies')} movies={similar} />
          </FadeIn>
        </div>
      )}

      <div id="details" className="scroll-mt-32 space-y-12">
        {movie.production_companies && movie.production_companies.length > 0 && (
          <FadeIn>
            <MovieSection title={t('productionCompanies')} icon={<Building />}>
              <MovieProductionCompanies companies={movie.production_companies} />
            </MovieSection>
          </FadeIn>
        )}

        {releaseDates.length > 0 && (
          <FadeIn>
            <MovieSection title={t('releaseDates')} icon={<Calendar />}>
              <MovieReleaseDates releaseDates={releaseDates} />
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
            <MovieExternalLinks
              ids={movie.external_ids ?? null}
              homepage={movie.homepage || null}
            />
          </MovieSection>
        </FadeIn>
      </div>
    </div>
  );
}

