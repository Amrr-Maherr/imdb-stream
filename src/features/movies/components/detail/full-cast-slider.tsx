import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/shared/utils/slugify";
import { Slider } from "@/shared/components/ui/slider";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  credit_id: string;
};

type FullCastSliderProps = {
  cast: CastMember[];
};

export function FullCastSlider({ cast }: FullCastSliderProps) {
  if (cast.length === 0) return null;

  return (
    <Slider
      slidesPerView={6}
      slidesMobilePerView={2.5}
      spaceBetween={16}
      grabCursor
      freeMode
      className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
    >
      {cast.map((person, index) => (
        <Link
          key={person.credit_id || `${person.id}-${index}`}
          href={`/people/${slugify(person.name)}/${person.id}`}
          className="group w-full"
        >
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted">
            {person.profile_path ? (
              <Image
                src={`${TMDB_IMAGE_BASE}/w185${person.profile_path}`}
                alt={person.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="140px"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground text-xs p-2 text-center">
                {person.name}
              </div>
            )}
          </div>
          <div className="mt-2 text-center">
            <p className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-brand transition-colors">
              {person.name}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {person.character}
            </p>
          </div>
        </Link>
      ))}
    </Slider>
  );
}
