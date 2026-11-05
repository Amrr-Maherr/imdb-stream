import { useTranslations } from 'next-intl';
import { Star, TrendingUp } from 'lucide-react';

type MovieRatingProps = {
  voteAverage: number;
  voteCount: number;
  popularity: number;
};

export function MovieRating({ voteAverage, voteCount, popularity }: MovieRatingProps) {
  const t = useTranslations('MovieDetail');
  const score = Math.min(10, Math.max(0, Number.isFinite(voteAverage) ? voteAverage : 0));
  const circumference = 2 * Math.PI * 42;
  const progressOffset = circumference * (1 - score / 10);

  return (
    <section className="space-y-4" aria-label={t('userScore')}>
      <div className="flex items-center gap-4">
        <div
          className="relative size-20 shrink-0"
          role="img"
          aria-label={`${score.toFixed(1)} / 10`}
        >
          <svg className="size-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="42" fill="none" className="stroke-muted" strokeWidth="7" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              className="stroke-brand transition-[stroke-dashoffset] duration-700"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black leading-none tracking-tight text-foreground">
              {score.toFixed(1)}
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              / 10
            </span>
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand ring-1 ring-brand/20">
              <Star className="size-4 fill-current" aria-hidden="true" />
            </span>
            <p className="text-sm font-bold text-foreground">{t('userScore')}</p>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {t('votes', { count: voteCount })}
          </p>
        </div>
      </div>
      <div
        className="flex items-center gap-2 border-t border-border/70 pt-3 text-xs font-medium text-muted-foreground"
        aria-label={t('popularity', { count: popularity })}
      >
        <TrendingUp className="size-3.5 text-brand" aria-hidden="true" />
        <span>{t('popularity', { count: popularity })}</span>
      </div>
    </section>
  );
}
