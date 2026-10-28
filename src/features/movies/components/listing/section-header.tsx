import { isValidElement, type ReactElement, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/shared/utils/utils';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  /** Small label above the title, e.g. "In theaters". */
  eyebrow?: string;
  /** A Lucide icon component, or an element when rendered from a server component. */
  icon?: LucideIcon | ReactElement;
  viewAllHref?: string;
  viewAllLabel?: string;
  /** Extra controls on the end side (carousel arrows, stats). */
  action?: ReactNode;
  className?: string;
  /** Kept for existing callers; every variant now shares one style. */
  variant?: 'default' | 'featured' | 'brand';
};

/** One heading style for every home and detail section. */
export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  icon,
  viewAllHref,
  viewAllLabel,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-5 flex items-end justify-between gap-4 md:mb-6', className)}>
      <div className="flex min-w-0 items-start gap-3">
        {icon ? (
          <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand ring-1 ring-brand/25 [&_svg]:size-5">
            {isValidElement(icon) ? icon : <IconComponent icon={icon as LucideIcon} />}
          </span>
        ) : (
          <span className="mt-1 h-7 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
        )}
        <div className="min-w-0">
          {eyebrow && (
            <p className="mb-0.5 text-[11px] font-bold uppercase tracking-widest text-brand">
              {eyebrow}
            </p>
          )}
          <h2 className="truncate text-xl font-black tracking-tight text-foreground md:text-2xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="group/all inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold text-brand transition-colors hover:bg-brand/10"
          >
            {viewAllLabel}
            <ArrowRight className="size-4 transition-transform group-hover/all:translate-x-0.5 rtl:rotate-180 rtl:group-hover/all:-translate-x-0.5" />
          </Link>
        )}
        {action}
      </div>
    </div>
  );
}

function IconComponent({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon className="size-5" />;
}
