import { useTranslations } from 'next-intl';
import Image from '@/shared/components/ui/image';
import Link from 'next/link';
import { ArrowUpRight, Film, Layers3 } from 'lucide-react';
import { slugify } from '@/shared/utils/slugify';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type Collection = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
};

type MovieCollectionProps = {
  collection: Collection;
};

export function MovieCollection({ collection }: MovieCollectionProps) {
  const t = useTranslations('Collection');
  return (
    <Link
      href={`/collection/${slugify(collection.name)}/${collection.id}`}
      className="group relative isolate flex min-h-40 items-center overflow-hidden rounded-3xl border border-brand/20 bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-48"
    >
      <div className="absolute inset-0 -z-10">
        {collection.backdrop_path ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w780${collection.backdrop_path}`}
            alt=""
            fill
            className="object-cover opacity-25 transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-card via-card/95 to-card/60 rtl:bg-gradient-to-l" />
      </div>
      <div className="flex w-full items-center gap-4 p-4 sm:gap-6 sm:p-6">
        <div className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-xl bg-muted shadow-lg ring-1 ring-border/70 transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-[1.03] sm:w-28">
          {collection.poster_path ? (
            <Image
              src={`${TMDB_IMAGE_BASE}/w185${collection.poster_path}`}
              alt={collection.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              <Film className="size-8" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1 py-2">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-foreground">
            <Layers3 className="size-3.5 text-brand" />
            {t('partOf')}
          </span>
          <h2 className="line-clamp-2 text-lg font-black leading-tight text-foreground transition-colors group-hover:text-brand sm:text-2xl">
            {collection.name}
          </h2>
          <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand">
            {t('viewCollection')}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:rotate-[-90deg]" />
          </span>
        </div>
      </div>
    </Link>
  );
}
