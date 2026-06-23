import type { TMDBMovieDetails } from "@/types/tmdb";
import { Building, Users, MessageSquare, Languages, Calendar, List, Link2 } from "lucide-react";
import { MoviePoster } from "./movie-poster";
import { MovieOverview } from "./movie-overview";
import { MovieSection } from "./movie-section";
import { MovieProductionCompanies } from "./movie-production-companies";
import { MovieCrewSection } from "./movie-crew";
import { MovieCast } from "./movie-cast";
import { FullCastSlider } from "./full-cast-slider";
import { MovieVideos } from "./movie-videos";
import { MoviePhotos } from "./movie-photos";
import { MovieReviews } from "./movie-reviews";
import { RelatedMovies } from "./related-movies";
import { MovieAlternativeTitles } from "./movie-alternative-titles";
import { MovieReleaseDates } from "./movie-release-dates";
import { MovieLists } from "./movie-lists";
import { MovieExternalLinks } from "./movie-external-links";
import { FadeIn } from "./fade-in";

type MovieMainContentProps = {
  movie: TMDBMovieDetails;
  directorName: string | null;
  writers: string[];
};

export function MovieMainContent({ movie, directorName, writers }: MovieMainContentProps) {
  const allCrew = movie.credits?.crew ?? [];
  const reviews = movie.reviews?.results ?? [];
  const altTitles = movie.alternative_titles?.titles ?? [];
  const releaseDates = movie.release_dates?.results ?? [];
  const lists = movie.lists?.results ?? [];

  return (
    <div className="flex-1 min-w-0 space-y-10">
      <FadeIn>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-shrink-0 w-full max-w-[200px] mx-auto sm:mx-0">
            <MoviePoster posterPath={movie.poster_path} title={movie.title} priority />
          </div>
          <div className="flex-1 min-w-0">
            <MovieOverview overview={movie.overview} director={directorName} writers={writers} />
          </div>
        </div>
      </FadeIn>

      {movie.production_companies && movie.production_companies.length > 0 && (
        <FadeIn delay={0.05}>
          <MovieSection title="Production Companies" icon={<Building className="size-5" />}>
            <MovieProductionCompanies companies={movie.production_companies} />
          </MovieSection>
        </FadeIn>
      )}

      {allCrew.length > 0 && (
        <FadeIn delay={0.1}>
          <MovieSection title="Full Crew" icon={<Users className="size-5" />}>
            <MovieCrewSection crew={allCrew} />
          </MovieSection>
        </FadeIn>
      )}

      <FadeIn delay={0.15}>
        <MovieCast cast={movie.credits?.cast ?? []} />
      </FadeIn>

      {movie.credits && movie.credits.cast.length > 0 && (
        <FadeIn delay={0.18}>
          <MovieSection title="Filmography">
            <FullCastSlider cast={movie.credits.cast} />
          </MovieSection>
        </FadeIn>
      )}

      <FadeIn delay={0.2}>
        <MovieVideos videos={movie.videos?.results ?? []} />
      </FadeIn>

      <FadeIn delay={0.25}>
        <MoviePhotos
          backdrops={movie.images?.backdrops ?? []}
          posters={movie.images?.posters ?? []}
          logos={movie.images?.logos ?? []}
        />
      </FadeIn>

      {reviews.length > 0 && (
        <FadeIn delay={0.3}>
          <MovieSection title="Reviews" icon={<MessageSquare className="size-5" />}>
            <MovieReviews reviews={reviews} />
          </MovieSection>
        </FadeIn>
      )}

      <FadeIn delay={0.35}>
        <RelatedMovies title="Recommendations" movies={movie.recommendations?.results ?? []} />
      </FadeIn>

      <FadeIn delay={0.4}>
        <RelatedMovies title="Similar Movies" movies={movie.similar?.results ?? []} />
      </FadeIn>

      {altTitles.length > 0 && (
        <FadeIn delay={0.45}>
          <MovieSection title="Alternative Titles" icon={<Languages className="size-5" />}>
            <MovieAlternativeTitles titles={altTitles} />
          </MovieSection>
        </FadeIn>
      )}

      {releaseDates.length > 0 && (
        <FadeIn delay={0.5}>
          <MovieSection title="Release Dates" icon={<Calendar className="size-5" />}>
            <MovieReleaseDates releaseDates={releaseDates} />
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
          <MovieExternalLinks ids={movie.external_ids ?? null} homepage={movie.homepage || null} />
        </MovieSection>
      </FadeIn>
    </div>
  );
}
