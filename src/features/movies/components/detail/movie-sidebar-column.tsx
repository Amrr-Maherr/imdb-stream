import type { TMDBMovieDetails } from '@/shared/types/tmdb';
import { MovieSidebar } from './movie-sidebar';
import { FadeIn } from './fade-in';

type MovieSidebarColumnProps = {
  movie: TMDBMovieDetails;
};

export function MovieSidebarColumn({ movie }: MovieSidebarColumnProps) {
  return (
    <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-8">
      <FadeIn delay={0.05}>
        <MovieSidebar
          voteAverage={movie.vote_average}
          voteCount={movie.vote_count}
          popularity={movie.popularity}
          budget={movie.budget}
          revenue={movie.revenue}
          status={movie.status}
          originalLanguage={movie.original_language}
          releaseDate={movie.release_date}
          originalTitle={movie.original_title}
          title={movie.title}
          productionCompanies={movie.production_companies ?? []}
          productionCountries={movie.production_countries ?? []}
          keywords={movie.keywords?.keywords ?? []}
          translationsCount={movie.translations?.translations?.length ?? 0}
          spokenLanguagesCount={movie.spoken_languages?.length ?? 0}
          originCountry={movie.origin_country ?? []}
          adult={movie.adult}
        />
      </FadeIn>
    </div>
  );
}
