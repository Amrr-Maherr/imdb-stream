'use client';

import type { TMDBPersonDetails } from '@/shared/types/tmdb';
import { useTranslations } from 'next-intl';
import { ImageIcon, Link2 } from 'lucide-react';
import { MovieSection } from '@/features/movies/components/detail/movie-section';
import { MovieExternalLinks } from '@/features/movies/components/detail/movie-external-links';
import { FadeIn } from '@/features/movies/components/detail/fade-in';
import { PersonKnownFor } from './person-known-for';
import { PersonPhotos } from './person-photos';
import { PersonCredits } from './person-credits';
import { CareerStats } from './career-stats';
import { BiographySection } from './biography-section';

/** TMDB TV genres for News, Reality and Talk, which crowd out a person's actual work. */
const NON_FICTION_TV_GENRES = new Set([10763, 10764, 10767]);

type PersonMainContentProps = {
  person: TMDBPersonDetails;
};

export function PersonMainContent({ person }: PersonMainContentProps) {
  const t = useTranslations('Person');
  const combinedCredits = person.combined_credits;

  // Rank by how widely a title was rated rather than current popularity, so the person's
  // signature work leads instead of whatever talk show they appeared on this week.
  const seen = new Set<string>();
  const allKnownFor = [...(combinedCredits?.cast ?? []), ...(combinedCredits?.crew ?? [])]
    .filter((credit) => {
      const key = `${credit.media_type}-${credit.id}`;
      if (seen.has(key)) return false;
      seen.add(key);
      const isSelf =
        'character' in credit &&
        /^(self|himself|herself|themselves)\b/i.test(credit.character ?? '');
      const isTalkOrNews = (credit.genre_ids ?? []).some((id) => NON_FICTION_TV_GENRES.has(id));
      return !isSelf && !isTalkOrNews;
    })
    .sort((a, b) => (b.vote_count ?? 0) - (a.vote_count ?? 0))
    .slice(0, 20);

  const profiles = person.images?.profiles ?? [];
  const taggedImages = person.tagged_images?.results ?? [];

  const socialIds = person.external_ids
    ? {
        imdb_id: null as string | null,
        facebook_id: person.external_ids.facebook_id,
        instagram_id: person.external_ids.instagram_id,
        twitter_id: person.external_ids.twitter_id,
        wikidata_id: person.external_ids.wikidata_id,
      }
    : null;

  return (
    <div className="flex-1 min-w-0 space-y-10">
      <CareerStats cast={combinedCredits?.cast ?? []} crew={combinedCredits?.crew ?? []} />

      <BiographySection biography={person.biography} />

      {allKnownFor.length > 0 && (
        <FadeIn delay={0.05}>
          <PersonKnownFor items={allKnownFor} />
        </FadeIn>
      )}

      <FadeIn delay={0.1}>
        <PersonCredits cast={combinedCredits?.cast ?? []} crew={combinedCredits?.crew ?? []} />
      </FadeIn>

      {profiles.length > 0 && (
        <FadeIn delay={0.15}>
          <MovieSection title={t('profilePhotos')} icon={<ImageIcon className="size-5" />}>
            <PersonPhotos profiles={profiles} />
          </MovieSection>
        </FadeIn>
      )}

      {taggedImages.length > 0 && (
        <FadeIn delay={0.2}>
          <MovieSection title={t('taggedImages')} icon={<ImageIcon className="size-5" />}>
            <PersonPhotos
              variant="landscape"
              profiles={taggedImages
                .map((item) => ({
                  file_path: item.image?.file_path ?? item.file_path,
                  caption: item.media?.title ?? item.media?.name,
                }))
                .filter((photo) => Boolean(photo.file_path))}
            />
          </MovieSection>
        </FadeIn>
      )}

      {(socialIds || person.homepage || person.imdb_id) && (
        <FadeIn delay={0.25}>
          <MovieSection title={t('externalLinks')} icon={<Link2 className="size-5" />}>
            <div className="flex flex-wrap gap-2">
              {person.imdb_id && (
                <a
                  href={`https://www.imdb.com/name/${person.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <Link2 className="size-3.5" />
                  {t('imdb')}
                </a>
              )}
              <MovieExternalLinks ids={socialIds} homepage={null} />
            </div>
          </MovieSection>
        </FadeIn>
      )}
    </div>
  );
}
