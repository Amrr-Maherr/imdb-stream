'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Slider } from '@/shared/components/ui/slider';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type PersonPhoto = {
  file_path: string;
  caption?: string;
};

type PersonPhotosProps = {
  profiles: PersonPhoto[];
  variant?: 'portrait' | 'landscape';
};

export function PersonPhotos({ profiles, variant = 'portrait' }: PersonPhotosProps) {
  const t = useTranslations('Person');
  if (profiles.length === 0) return null;

  const landscape = variant === 'landscape';

  return (
    <Slider
      slidesPerView={landscape ? 3 : 4}
      slidesMobilePerView={landscape ? 1.5 : 2}
      spaceBetween={12}
      grabCursor
      freeMode
      className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
    >
      {profiles.map((img, index) => (
        <div key={`${img.file_path}-${index}`} className="group">
          <div
            className={`relative w-full overflow-hidden rounded-lg bg-muted ${
              landscape ? 'aspect-video' : 'aspect-[2/3]'
            }`}
          >
            <Image
              src={`${TMDB_IMAGE_BASE}/${landscape ? 'w500' : 'w342'}${img.file_path}`}
              alt={img.caption ?? t('profilePhoto')}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes={
                landscape ? '(max-width: 640px) 75vw, 33vw' : '(max-width: 640px) 50vw, 25vw'
              }
            />
          </div>
          {img.caption && (
            <p className="mt-2 text-xs text-muted-foreground line-clamp-1">{img.caption}</p>
          )}
        </div>
      ))}
    </Slider>
  );
}
