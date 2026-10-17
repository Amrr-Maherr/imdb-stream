import { getTranslations } from 'next-intl/server';
import { getHomeData } from '@/features/movies/services/homeData';
import {
  ProductionCompaniesSection,
  PlatformsSection,
} from '@/features/company/components/company-section';
import { LazySection } from '@/shared/components/lazy-section';
import {
  LazyAiringTodayRow,
  LazyEditorialSpotlight,
  LazyFeaturedBannerGrid,
  LazyGenreDiscovery,
  LazyNowPlayingRow,
  LazyPopularPeopleRow,
  LazyPopularMoviesRow,
  LazyPopularTvRow,
  LazyTopRatedMoviesRow,
  LazyTopRatedTvRow,
  LazyTrendingTvRow,
  LazyUpcomingRow,
} from './home-sections-lazy';
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
          <LazyPopularMoviesRow title={t('popularMovies')} movies={popular} genreMap={genreMap} />
        </LazySection>
      )}

      {/* ── Featured This Week ── Featured Banner Grid ── */}
      {featuredItems.length > 0 && (
        <LazySection fallback={<FeaturedBannerGridSkeleton />}>
          <LazyFeaturedBannerGrid
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
          <LazyTopRatedMoviesRow
            title={t('topRated')}
            subtitle={t('topRatedDesc')}
            movies={topRated}
            genreMap={genreMap}
          />
        </LazySection>
      )}

      {/* ── Now Playing ── Pattern D: Banner Section ── */}
      {nowPlaying.length > 0 && (
        <LazySection fallback={<BannerSectionSkeleton />}>
          <LazyNowPlayingRow
            title={t('nowPlaying')}
            subtitle={t('nowPlayingDesc')}
            movies={nowPlaying}
            genreMap={genreMap}
          />
        </LazySection>
      )}

      {/* ── Spotlight ── Pattern F: Premium Actor Spotlight ── */}
      {spotlight && spotlight.credits.length > 0 && (
        <LazySection fallback={<EditorialSpotlightSkeleton />}>
          <LazyEditorialSpotlight
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
          <LazyUpcomingRow
            title={t('upcomingMovies')}
            subtitle={t('upcomingMoviesDesc')}
            movies={upcoming}
            genreMap={genreMap}
          />
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
          <LazyTrendingTvRow
            title={t('trendingTv')}
            subtitle={t('trendingTvDesc')}
            shows={trendingTv}
            genreMap={genreMap}
          />
        </LazySection>
      )}

      {/* ── Popular TV ── Standard carousel with different config ── */}
      {popularTv.length > 0 && (
        <LazySection fallback={<SectionRowSkeleton />}>
          <LazyPopularTvRow
            title={t('popularTv')}
            subtitle={t('popularTvDesc')}
            shows={popularTv}
            genreMap={genreMap}
          />
        </LazySection>
      )}

      {/* ── Airing Today ── Pattern D: Banner Section ── */}
      {airingToday.length > 0 && (
        <LazySection fallback={<BannerSectionSkeleton />}>
          <LazyAiringTodayRow
            title={t('airingToday')}
            subtitle={t('airingTodayDesc')}
            shows={airingToday}
            genreMap={genreMap}
          />
        </LazySection>
      )}

      {/* ── Top Rated TV ── Derived from trending/popular/airing ── */}
      {topRatedTv.length > 0 && (
        <LazySection fallback={<PremiumRowSkeleton />}>
          <LazyTopRatedTvRow
            title={t('topRatedTv')}
            subtitle={t('topRatedTvDesc')}
            shows={topRatedTv}
            genreMap={genreMap}
          />
        </LazySection>
      )}

      {/* ── Explore Genres ── Pattern E: Genre Discovery ── */}
      {genreTiles.length > 0 && (
        <LazySection fallback={<GenreGridSkeleton />}>
          <LazyGenreDiscovery
            title={t('exploreGenres')}
            subtitle={t('exploreGenresDesc')}
            genres={genreTiles}
          />
        </LazySection>
      )}

      {/* ── Popular Actors ── Standard carousel ── */}
      {popularPeople.length > 0 && (
        <LazySection fallback={<PersonRowSkeleton />}>
          <LazyPopularPeopleRow
            title={t('popularActors')}
            subtitle={t('popularActorsDesc')}
            people={popularPeople}
          />
        </LazySection>
      )}
    </div>
  );
}
