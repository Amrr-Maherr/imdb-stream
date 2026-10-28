import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/features/movies/components/detail/movie-section';

type MovieOverviewProps = {
  overview: string;
  director: string | null;
  writers: string[];
  directorLabel?: string;
  writersLabel?: string;
};

export function MovieOverview({
  overview,
  director,
  writers,
  directorLabel,
  writersLabel,
}: MovieOverviewProps) {
  const t = useTranslations('MovieDetail');
  if (!overview && !director && writers.length === 0) return null;

  return (
    <section>
      {overview && (
        <div>
          <SectionTitle>{t('storyline')}</SectionTitle>
          <p className="text-muted-foreground leading-relaxed">{overview}</p>
        </div>
      )}
      <div className="flex flex-wrap gap-x-8 gap-y-2 mt-4 text-sm">
        {director && (
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {directorLabel ?? t('director')}
            </h3>
            <p className="text-foreground font-medium mt-0.5">{director}</p>
          </div>
        )}
        {writers.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {writersLabel ?? t('writers')}
            </h3>
            <p className="text-foreground mt-0.5">{writers.join(', ')}</p>
          </div>
        )}
      </div>
    </section>
  );
}
