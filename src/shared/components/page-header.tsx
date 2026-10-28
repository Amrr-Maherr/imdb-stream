import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  /** Small facts shown as chips under the description, e.g. the result count. */
  stats?: ReactNode[];
};

export function PageHeaderSkeleton() {
  return (
    <section className="border-b border-border bg-card/50">
      <div className="app-container animate-pulse pb-8 pt-24 md:pb-10 md:pt-28">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-xl bg-muted md:size-12" />
          <div className="h-9 w-48 rounded-lg bg-muted md:h-12" />
        </div>
        <div className="mt-3 h-4 w-72 max-w-full rounded bg-muted" />
        <div className="mt-5 flex gap-2">
          <div className="h-6 w-32 rounded-full bg-muted" />
          <div className="h-6 w-24 rounded-full bg-muted" />
        </div>
      </div>
    </section>
  );
}

/** Title band for catalogue pages (movies, TV shows, people). Sits under the fixed header. */
export function PageHeader({ title, description, icon: Icon, stats }: PageHeaderProps) {
  return (
    <section className="border-b border-border bg-card/50">
      <div className="app-container pb-8 pt-24 md:pb-10 md:pt-28">
        <div className="flex items-center gap-3">
          {Icon ? (
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-glow md:size-12">
              <Icon className="size-5 md:size-6" />
            </span>
          ) : (
            <span className="h-9 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
          )}
          <h1 className="text-3xl font-black tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
        </div>

        {description && (
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">{description}</p>
        )}

        {stats && stats.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {stats.map((stat, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {stat}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
