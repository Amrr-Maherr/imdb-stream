import Image from "next/image";
import Link from "next/link";
import { Star, Film, Monitor } from "lucide-react";
import type { TMDBCompanyMovie } from "@/types/tmdb";
import { slugify } from "@/lib/slugify";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type CompanyFilmographyProps = {
  movies: TMDBCompanyMovie[];
};

export function CompanyFilmography({ movies }: CompanyFilmographyProps) {
  if (movies.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-bold text-foreground mb-6">Filmography</h2>
        <p className="text-muted-foreground">No productions available.</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-6">
        Productions
        <span className="text-muted-foreground font-normal text-lg ml-2">
          ({movies.length})
        </span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <ProductionCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

type ProductionCardProps = {
  movie: TMDBCompanyMovie;
};

function ProductionCard({ movie }: ProductionCardProps) {
  const year = movie.release_date?.slice(0, 4);
  const vote = movie.vote_average.toFixed(1);

  return (
    <Link
      href={`/movies/${slugify(movie.title)}/${movie.id}`}
      className="group"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted">
        {movie.poster_path ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w342${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-muted-foreground text-xs p-2 text-center gap-1">
            <Film className="size-6" />
            <span>{movie.title}</span>
          </div>
        )}
      </div>
      <div className="mt-2 space-y-1">
        <h3 className="text-sm font-medium text-foreground line-clamp-1 leading-tight">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-0.5">
            <Star className="size-3 fill-yellow-400 text-yellow-400" />
            <span>{vote}</span>
          </div>
          {year && <span>{year}</span>}
        </div>
      </div>
    </Link>
  );
}
