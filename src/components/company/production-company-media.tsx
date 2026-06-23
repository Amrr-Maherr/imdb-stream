import Image from "next/image";
import type { Image as TMDBImage } from "@/types/tmdb";
import { MovieSection } from "@/components/movie/movie-section";
import { ImageIcon } from "lucide-react";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type ProductionCompanyMediaProps = {
  logos: TMDBImage[];
};

export function ProductionCompanyMedia({ logos }: ProductionCompanyMediaProps) {
  if (logos.length === 0) return null;

  return (
    <MovieSection title="Logos" icon={<ImageIcon className="size-5" />}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {logos.map((logo) => (
          <div
            key={logo.file_path}
            className="relative aspect-[4/3] overflow-hidden rounded-lg bg-card border border-border flex items-center justify-center p-4"
          >
            <Image
              src={`${TMDB_IMAGE_BASE}/w342${logo.file_path}`}
              alt="Company logo"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>
    </MovieSection>
  );
}
