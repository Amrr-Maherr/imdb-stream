import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { SectionHeader } from './section-header';
import { cn } from '@/shared/utils/utils';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export type FeaturedBanner = {
  id: number;
  href: string;
  title: string;
  backdropPath: string | null;
  posterPath: string | null;
  voteAverage: number;
  year?: string;
};

type FeaturedBannerGridProps = {
  title: string;
  subtitle?: string;
  items: FeaturedBanner[];
  viewAllHref?: string;
  viewAllLabel?: string;
};

function imageSrc(item: FeaturedBanner, featured: boolean) {
  if (item.backdropPath) return `${TMDB_IMAGE_BASE}/${featured ? 'w1280' : 'w780'}${item.backdropPath}`;
  if (item.posterPath) return `${TMDB_IMAGE_BASE}/w500${item.posterPath}`;
  return null;
}

function BannerCard({ item, featured }: { item: FeaturedBanner; featured: boolean }) {
  const src = imageSrc(item, featured);

  return (
    <Link
      href={item.href}
      className={cn(
        'group relative block overflow-hidden rounded-xl bg-muted',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        featured ? 'col-span-2 aspect-[16/9] md:col-span-2 md:row-span-2 md:aspect-auto' : 'aspect-[16/9]'
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={item.title}
          fill
          sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-3 text-center text-sm text-muted-foreground">
          {item.title}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
      <div className={cn('absolute bottom-0 start-0 end-0 p-3', featured && 'sm:p-5')}>
        <h3
          className={cn(
            'font-bold text-foreground line-clamp-1',
            featured ? 'text-lg sm:text-2xl' : 'text-sm sm:text-base'
          )}
        >
          {item.title}
        </h3>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:text-sm">
          {item.year && <span>{item.year}</span>}
          {item.voteAverage > 0 && (
            <span className="flex items-center gap-0.5">
              <Star className="size-3 fill-yellow-400 text-yellow-400 sm:size-4" />
              <span className="font-semibold text-foreground">{item.voteAverage.toFixed(1)}</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function FeaturedBannerGrid({
  title,
  subtitle,
  items,
  viewAllHref,
  viewAllLabel,
}: FeaturedBannerGridProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant="featured"
        action={
          viewAllHref && viewAllLabel ? (
            <Link
              href={viewAllHref}
              className="text-sm font-medium text-brand transition-colors hover:text-brand/80"
            >
              {viewAllLabel}
            </Link>
          ) : undefined
        }
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((item, index) => (
          <BannerCard key={`${item.id}-${index}`} item={item} featured={index === 0} />
        ))}
      </div>
    </section>
  );
}
