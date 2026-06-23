import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { slugify } from "@/lib/slugify";
import { Slider } from "@/components/ui/slider";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

type KnownForItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type: string;
  credit_id: string;
};

type PersonKnownForProps = {
  items: KnownForItem[];
};

function getTitle(item: KnownForItem) {
  return item.title || item.name || "Unknown";
}

function getYear(item: KnownForItem) {
  const date = item.release_date || item.first_air_date;
  return date ? date.slice(0, 4) : null;
}

function getHref(item: KnownForItem) {
  const title = item.title || item.name || "unknown";
  if (item.media_type === "movie") return `/movies/${slugify(title)}/${item.id}`;
  if (item.media_type === "tv") return `/tv-shows/${slugify(title)}/${item.id}`;
  return "#";
}

export function PersonKnownFor({ items }: PersonKnownForProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">Known For</h2>
      <Slider
        slidesPerView={6}
        slidesMobilePerView={2.5}
        spaceBetween={16}
        grabCursor
        freeMode
        className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
      >
        {items.map((item) => {
          const year = getYear(item);
          const vote = item.vote_average.toFixed(1);
          const href = getHref(item);

          return (
            <Link
              key={item.credit_id ?? `${item.id}-${getTitle(item)}`}
              href={href}
              className="group w-full"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted">
                {item.poster_path ? (
                  <Image
                    src={`${TMDB_IMAGE_BASE}/w342${item.poster_path}`}
                    alt={getTitle(item)}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="160px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-2 text-center text-xs text-muted-foreground">
                    {getTitle(item)}
                  </div>
                )}
                <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 rounded bg-black/60 px-1 py-0.5 text-[10px] text-white">
                  <Star className="size-2.5 fill-yellow-400 text-yellow-400" />
                  {vote}
                </div>
              </div>
              <p className="mt-1.5 text-sm font-medium text-foreground truncate group-hover:text-brand transition-colors">
                {getTitle(item)}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                {year && <span>{year}</span>}
                <span className="rounded bg-muted px-1 py-0.5 uppercase text-[10px]">
                  {item.media_type === "movie" ? "Movie" : "TV"}
                </span>
              </div>
            </Link>
          );
        })}
      </Slider>
    </section>
  );
}
