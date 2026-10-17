import { getTranslations } from 'next-intl/server';
import { getHomeData } from '@/features/movies/services/homeData';
import { MediaRow } from './media-row';
import { FeaturedRow } from './featured-row';
import { BannerSection } from './banner-section';
import { PremiumRow } from './premium-row';
import { MovieCard } from './movie-card';
import { TvCard } from './tv-card';
import { PersonCard } from './person-card';
import {
  ProductionCompaniesSection,
  PlatformsSection,
} from '@/features/company/components/company-section';
import { LazySection } from '@/shared/components/lazy-section';
import { FeaturedBannerGrid } from './featured-banner-grid';
import { GenreDiscovery } from './genre-discovery';
import { EditorialSpotlight } from './editorial-spotlight';
import {
  BannerSectionSkeleton,
  EditorialSpotlightSkeleton,
  FeaturedBannerGridSkeleton,
  FeaturedRowSkeleton,
  GenreGridSkeleton,
  PersonRowSkeleton,
  PremiumRowSkeleton,
  SectionRowSkeleton,
} from './home-skeleton';

interface Props {
  locale: string;
}

export async function HomeSections({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'HomePage' });
  const tp = await getTranslations({ locale, namespace: 'Person' });

  const {
    popular,
    topRated,
    nowPlaying,
    upcoming,
    trendingTv,
    popularTv,
    airingToday,
    popularPeople,
    genreMap,
    featuredItems,
    genreTiles,
    topRatedTv,
    spotlight,
  } = await getHomeData(locale);

  return (
    <div className="w-full app-container py-8 space-y-14">
      {/* ── Popular Movies ── Pattern B: Featured Spotlight + Carousel ── */}
      {popular.length > 0 && (
        <LazySection fallback={<FeaturedRowSkeleton />}>
          <FeaturedRow title={t('popularMovies')} spotlight={popular[0]} genreMap={genreMap}>
            {popular.slice(1).map((movie) => (
              <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
            ))}
          </FeaturedRow>
        </LazySection>
      )}

      {/* ── Featured This Week ── Featured Banner Grid ── */}
      {featuredItems.length > 0 && (
        <LazySection fallback={<FeaturedBannerGridSkeleton />}>
          <FeaturedBannerGrid
            title={t('featuredThisWeek')}
            subtitle={t('featuredThisWeekDesc')}
            items={featuredItems}
            viewAllHref="/movies"
            viewAllLabel={t('viewAll')}
          />
        </LazySection>
      )}

      {/* ── Top Rated Movies ── Pattern C: Premium Editorial ── */}
      {topRated.length > 0 && (
        <LazySection fallback={<PremiumRowSkeleton />}>
          <PremiumRow
            title={t('topRated')}
            subtitle={t('topRatedDesc')}
            averageRating={
              topRated.length > 0
                ? topRated.reduce((s, m) => s + m.vote_average, 0) / topRated.length
                : undefined
            }
          >
            {topRated.map((movie) => (
              <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
            ))}
          </PremiumRow>
        </LazySection>
      )}

      {/* ── Now Playing ── Pattern D: Banner Section ── */}
      {nowPlaying.length > 0 && (
        <LazySection fallback={<BannerSectionSkeleton />}>
          <BannerSection title={t('nowPlaying')} subtitle={t('nowPlayingDesc')}>
            {nowPlaying.map((movie) => (
              <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
            ))}
          </BannerSection>
        </LazySection>
      )}

      {/* ── Spotlight ── Pattern F: Premium Actor Spotlight ── */}
      {spotlight && spotlight.credits.length > 0 && (
        <LazySection fallback={<EditorialSpotlightSkeleton />}>
          <EditorialSpotlight
            title={t('spotlight')}
            subtitle={t('spotlightDesc')}
            labels={{
              knownFor: t('knownFor'),
              biography: tp('biography'),
              birth: tp('born'),
              credits: t('spotlightCredits'),
              movies: tp('movies'),
              tvShows: tp('tvShows'),
              averageRating: t('spotlightAverageRating'),
              viewProfile: t('viewProfile'),
              imdb: tp('imdb'),
              movie: tp('movie'),
              tv: tp('tv'),
            }}
            person={spotlight.person}
            stats={spotlight.stats}
            credits={spotlight.credits}
          />
        </LazySection>
      )}

      {/* ── Upcoming Movies ── Coming Soon ── */}
      {upcoming.length > 0 && (
        <LazySection fallback={<SectionRowSkeleton />}>
          <MediaRow
            title={t('upcomingMovies')}
            subtitle={t('upcomingMoviesDesc')}
            slidesPerView={5}
            slidesMobilePerView={2.5}
            spaceBetween={14}
          >
            {upcoming.map((movie) => (
              <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
            ))}
          </MediaRow>
        </LazySection>
      )}

      {/* ── Production Companies ── */}
      <LazySection fallback={<SectionRowSkeleton />}>
        <ProductionCompaniesSection locale={locale} />
      </LazySection>
      <LazySection fallback={<SectionRowSkeleton />}>
        <PlatformsSection locale={locale} />
      </LazySection>

      {/* ── Trending TV ── Standard carousel ── */}
      {trendingTv.length > 0 && (
        <LazySection fallback={<SectionRowSkeleton />}>
          <MediaRow
            title={t('trendingTv')}
            subtitle={t('trendingTvDesc')}
            slidesPerView={5}
            slidesMobilePerView={2.5}
            spaceBetween={14}
          >
            {trendingTv.map((tv) => (
              <TvCard key={tv.id} tv={tv} genreMap={genreMap} />
            ))}
          </MediaRow>
        </LazySection>
      )}

      {/* ── Popular TV ── Standard carousel with different config ── */}
      {popularTv.length > 0 && (
        <LazySection fallback={<SectionRowSkeleton />}>
          <MediaRow
            title={t('popularTv')}
            subtitle={t('popularTvDesc')}
            slidesPerView={5}
            slidesMobilePerView={2.5}
            spaceBetween={14}
          >
            {popularTv.map((tv) => (
              <TvCard key={tv.id} tv={tv} genreMap={genreMap} />
            ))}
          </MediaRow>
        </LazySection>
      )}

      {/* ── Airing Today ── Pattern D: Banner Section ── */}
      {airingToday.length > 0 && (
        <LazySection fallback={<BannerSectionSkeleton />}>
          <BannerSection title={t('airingToday')} subtitle={t('airingTodayDesc')}>
            {airingToday.map((tv) => (
              <TvCard key={tv.id} tv={tv} genreMap={genreMap} />
            ))}
          </BannerSection>
        </LazySection>
      )}

      {/* ── Top Rated TV ── Derived from trending/popular/airing ── */}
      {topRatedTv.length > 0 && (
        <LazySection fallback={<PremiumRowSkeleton />}>
          <PremiumRow
            title={t('topRatedTv')}
            subtitle={t('topRatedTvDesc')}
            averageRating={
              topRatedTv.reduce((s, show) => s + show.vote_average, 0) / topRatedTv.length
            }
          >
            {topRatedTv.map((tv) => (
              <TvCard key={tv.id} tv={tv} genreMap={genreMap} />
            ))}
          </PremiumRow>
        </LazySection>
      )}

      {/* ── Explore Genres ── Pattern E: Genre Discovery ── */}
      {genreTiles.length > 0 && (
        <LazySection fallback={<GenreGridSkeleton />}>
          <GenreDiscovery
            title={t('exploreGenres')}
            subtitle={t('exploreGenresDesc')}
            genres={genreTiles}
          />
        </LazySection>
      )}

      {/* ── Popular Actors ── Standard carousel ── */}
      {popularPeople.length > 0 && (
        <LazySection fallback={<PersonRowSkeleton />}>
          <MediaRow
            title={t('popularActors')}
            subtitle={t('popularActorsDesc')}
            slidesPerView={6}
            slidesMobilePerView={3}
            spaceBetween={16}
          >
            {popularPeople.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </MediaRow>
        </LazySection>
      )}
    </div>
  );
}
