import type { ComponentProps } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/shared/utils/utils';

interface FooterColumnLink {
  href: ComponentProps<typeof Link>['href'];
  label: string;
  accent?: boolean;
  withArrow?: boolean;
}

interface FooterColumnProps {
  title: string;
  links: FooterColumnLink[];
}

export default function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={`${link.label}-${JSON.stringify(link.href)}`}>
            <Link
              href={link.href}
              className={cn(
                'inline-flex items-center gap-1 rounded-sm text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card',
                link.accent
                  ? 'font-medium text-brand hover:text-brand/80'
                  : 'text-muted-foreground hover:text-brand'
              )}
            >
              {link.label}
              {link.withArrow && (
                <ArrowRight className="size-3.5 shrink-0 rtl:rotate-180" aria-hidden="true" />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
