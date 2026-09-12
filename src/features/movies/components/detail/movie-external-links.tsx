import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

type ExternalIds = {
  imdb_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
  wikidata_id: string | null;
};

type MovieExternalLinksProps = {
  ids: ExternalIds | null;
  homepage: string | null;
};

export function MovieExternalLinks({ ids, homepage }: MovieExternalLinksProps) {
  const t = useTranslations('MovieDetail');

  if (!ids && !homepage) return null;

  const LINKS: {
    key: keyof ExternalIds;
    label: string;
    href: (id: string) => string;
  }[] = [
    {
      key: 'imdb_id',
      label: t('imdb'),
      href: (id) => `https://www.imdb.com/title/${id}`,
    },
    {
      key: 'facebook_id',
      label: t('facebook'),
      href: (id) => `https://www.facebook.com/${id}`,
    },
    {
      key: 'instagram_id',
      label: t('instagram'),
      href: (id) => `https://www.instagram.com/${id}`,
    },
    {
      key: 'twitter_id',
      label: t('twitterX'),
      href: (id) => `https://twitter.com/${id}`,
    },
    {
      key: 'wikidata_id',
      label: t('wikidata'),
      href: (id) => `https://www.wikidata.org/wiki/${id}`,
    },
  ];

  const externalLinks = LINKS.filter((link) => ids?.[link.key]);

  if (externalLinks.length === 0 && !homepage) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {homepage && (
        <Link
          href={homepage}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <ExternalLink className="size-3.5" />
          {t('officialWebsite')}
        </Link>
      )}
      {externalLinks.map((link) => {
        const id = ids?.[link.key];
        if (!id) return null;
        return (
          <Link
            key={link.key}
            href={link.href(id)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <ExternalLink className="size-3.5" />
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
