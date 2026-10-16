import type { ReactNode } from 'react';
import { cn } from '@/shared/utils/utils';

export type Fact = {
  label: string;
  value: ReactNode;
};

type FactsCardProps = {
  title: string;
  icon?: ReactNode;
  facts: Fact[];
  className?: string;
};

export function FactsCard({ title, icon, facts, className }: FactsCardProps) {
  const visible = facts.filter((fact) => fact.value != null && fact.value !== '');
  if (visible.length === 0) return null;

  return (
    <section className={cn('rounded-xl border border-border bg-card p-5', className)}>
      <div className="flex items-center gap-2 mb-4">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">{title}</h3>
      </div>
      <dl className="divide-y divide-border">
        {visible.map((fact, index) => (
          <div
            key={`${fact.label}-${index}`}
            className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] items-start gap-x-4 py-2.5 first:pt-0 last:pb-0"
          >
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {fact.label}
            </dt>
            <dd className="min-w-0 text-sm text-foreground">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
