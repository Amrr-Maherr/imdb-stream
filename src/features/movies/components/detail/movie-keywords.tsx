import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Tags } from 'lucide-react';
import { slugify } from '@/shared/utils/slugify';

type MovieKeywordsProps = {
  keywords: { id: number; name: string }[];
};

export function MovieKeywords({ keywords }: MovieKeywordsProps) {
  const t = useTranslations('MovieDetail');

  if (keywords.length === 0) return null;

  return (
    <section
      aria-labelledby="title-keywords-heading"
      className="rounded-2xl border border-brand/10 bg-gradient-to-br from-card via-card to-brand/[0.035] p-5 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3
          id="title-keywords-heading"
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-foreground"
        >
          <span className="flex size-8 items-center justify-center rounded-xl bg-brand/15 text-brand ring-1 ring-brand/20">
            <Tags className="size-4" aria-hidden="true" />
          </span>
          {t('keywords')}
        </h3>
        <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
          {keywords.length}
        </span>
      </div>
      <ul className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <li key={keyword.id}>
            <Link
              href={`/keywords/${slugify(keyword.name)}/${keyword.id}`}
              className="inline-flex min-h-8 items-center rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-brand/40 hover:bg-brand/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {keyword.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
