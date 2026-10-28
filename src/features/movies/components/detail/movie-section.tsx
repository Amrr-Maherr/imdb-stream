import { cn } from '@/shared/utils/utils';

type SectionTitleProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

/** Heading used by every section on the movie, TV, season and episode pages. */
export function SectionTitle({ children, icon, className }: SectionTitleProps) {
  return (
    <div className={cn('mb-5 flex items-center gap-3', className)}>
      {icon ? (
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand ring-1 ring-brand/25 [&_svg]:size-4.5">
          {icon}
        </span>
      ) : (
        <span className="h-6 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
      )}
      <h2 className="text-xl font-black tracking-tight text-foreground md:text-2xl">{children}</h2>
    </div>
  );
}

type MovieSectionProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** Anchor target for the page's section navigation. */
  id?: string;
  defaultExpanded?: boolean;
};

export function MovieSection({ title, icon, children, className, id }: MovieSectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-32', className)}>
      <SectionTitle icon={icon}>{title}</SectionTitle>
      {children}
    </section>
  );
}
