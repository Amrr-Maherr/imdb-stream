'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { TMDBPerson } from '@/shared/types/tmdb';
import { cn } from '@/shared/utils/utils';
import { slugify } from '@/shared/utils/slugify';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

type PersonCardProps = {
  person: TMDBPerson;
  featured?: boolean;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export function PersonCard({
  person,
  featured,
  className,
}: PersonCardProps & { className?: string }) {
  const t = useTranslations('Person');
  const knownFor = person.known_for
    ?.slice(0, 2)
    .map((item) => ('title' in item ? item.title : item.name))
    .join(', ');
  const href = `/people/${slugify(person.name)}/${person.id}`;

  const placeholder = (
    <div className="flex h-full items-center justify-center bg-muted">
      <span
        className={cn('font-black text-muted-foreground/60', featured ? 'text-5xl' : 'text-3xl')}
      >
        {initials(person.name)}
      </span>
    </div>
  );

  if (featured) {
    return (
      <Link href={href} className={cn('group w-full', className)}>
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-border/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:ring-brand/50">
          {person.profile_path ? (
            <Image
              src={`${TMDB_IMAGE_BASE}/w342${person.profile_path}`}
              alt={person.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="240px"
            />
          ) : (
            placeholder
          )}
        </div>
        <div className="mt-3 space-y-1 text-center">
          <h3 className="line-clamp-1 text-sm font-semibold leading-tight text-foreground transition-colors group-hover:text-brand">
            {person.name}
          </h3>
          <p className="text-xs text-muted-foreground">{person.known_for_department}</p>
          {knownFor && (
            <p className="line-clamp-1 text-xs text-muted-foreground/80">
              {t('knownForLabel')} {knownFor}
            </p>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className={cn('group w-full', className)}>
      <div className="relative aspect-square w-full overflow-hidden rounded-full bg-muted ring-2 ring-transparent ring-offset-2 ring-offset-background transition-all duration-300 group-hover:ring-brand">
        {person.profile_path ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/w185${person.profile_path}`}
            alt={person.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="160px"
          />
        ) : (
          placeholder
        )}
      </div>
      <div className="mt-3 space-y-0.5 text-center">
        <h3 className="line-clamp-1 text-sm font-semibold leading-tight text-foreground transition-colors group-hover:text-brand">
          {person.name}
        </h3>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {[person.known_for_department, knownFor].filter(Boolean).join(' · ')}
        </p>
      </div>
    </Link>
  );
}
